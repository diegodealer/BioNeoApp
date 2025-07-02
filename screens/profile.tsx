import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, StyleSheet } from "react-native";
import styles from "../constants/styles";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { auth, db } from '../services/firebaseconfig';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';

const ProfileEdit = () => {
    const navigation = useNavigation<any>();
    const [profileName, setProfileName] = useState("");
    const [confirmProfileName, setConfirmProfileName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
          const user = auth.currentUser;
          if (user) {
            const userRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              setProfileName(userSnap.data().name || '');
              setConfirmProfileName(userSnap.data().name || '');
            }
          }
        };
        fetchProfile();
    }, []);

    const handleSaveChanges = async () => {
        if (!profileName || !confirmProfileName) {
          alert('Completa ambos campos de nombre de usuario');
          return;
        }
        if (profileName !== confirmProfileName) {
          alert('Los nombres de usuario no coinciden');
          return;
        }
        try {
          const user = auth.currentUser;
          if (!user) {
            alert('No hay usuario autenticado');
            return;
          }
          // Actualiza el nombre de usuario en Firestore
          const userRef = doc(db, 'users', user.uid);
          await updateDoc(userRef, { username: profileName });
          alert('Perfil actualizado correctamente');
        } catch (error) {
          if (error instanceof Error) {
            alert('Error al actualizar el perfil: ' + error.message);
          } else {
            alert('Error desconocido al actualizar el perfil');
          }
        }
      };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior= "padding">
            <View style={styles.container}>
                <LinearGradient
                    colors={["#2FBA87", "#00FA9F"]}
                    style={styles.header}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={{fontSize: 90, marginBottom: 10}}>👤</Text>
                <Text style={styles.title}>Editar Perfil</Text>
                </LinearGradient>
                <View style={styles.form}>
                    <Text style={styles.label}>NOMBRE DE USUARIO</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingresa tu nombre de usuario"
                        placeholderTextColor="#BDBDBD"
                        value={profileName}
                        onChangeText={setProfileName}
                    />
                    <Text style={styles.label}>CONFIRMAR NOMBRE DE USUARIO</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirma tu nombre de usuario"
                        placeholderTextColor="#BDBDBD"
                        value={confirmProfileName}
                        onChangeText={setConfirmProfileName}
                    />
                    <Text style={styles.label}>CONTRASEÑA</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                        <TextInput
                            style={[styles.input, { flex: 1, paddingRight: 40 }]}
                            placeholder="Ingresa tu contraseña"
                            placeholderTextColor="#BDBDBD"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                right: 16,
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 0,
                                top: -9,
                            }}
                            activeOpacity={0.7}
                        >
                            <MaterialIcons
                                name={showPassword ? "visibility-off" : "visibility"}
                                size={24}
                                color="#888"
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
                        <Text style={styles.buttonText}>Guardar Cambios</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={customStyles.buttonRed} onPress={() => navigation.navigate("Password")}> 
                        <Text style={customStyles.buttonTextRed}>Cambiar la contraseña</Text>    
                    </TouchableOpacity> 
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const customStyles = StyleSheet.create({
    buttonRed: {
        backgroundColor: "#FF3B1F", 
        borderRadius: 20,
        paddingVertical: 14,
        alignItems: "center",
        marginTop: 18,
    },
    buttonTextRed: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textTransform: "none",
        textDecorationLine: "underline",
    },
});

export default ProfileEdit;