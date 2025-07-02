import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../services/firebaseconfig';
import { doc, setDoc } from 'firebase/firestore';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../constants/styles';
import Colors from '../constants/colors';
import { MaterialIcons } from '@expo/vector-icons';

const CreateAC = () => {
    const [Name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigation = useNavigation<any>();

    const handleRegister = async () => {
        if (!Name || !email || !password || !confirmPassword) {
            alert('Completa todos los campos');
            return;
        }
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(db, 'users', user.uid), {
                name: Name,
                // email: email, // opcional, puedes dejarlo si lo necesitas
            });
            alert('Usuario creado correctamente');
            navigation.navigate('Login');
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                alert("Error al registrarse: " + error.message);
            } else {
                alert("Error al registrarse: Ocurrió un error desconocido.");
            }
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <LinearGradient
                        colors={[Colors.mint_green, Colors.green_emerald]}
                        style={styles.header}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                            <Text style={styles.backButtonText}>←</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.title, customStyles.bigTitle]}>Crea una cuenta nueva</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.subtitle, customStyles.bigSubtitle]}>¿Ya te has registrado? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate("Login")}> 
                                <Text style={[
                                    styles.subtitle,
                                    customStyles.bigIngresar,
                                    { textDecorationLine: 'underline', color: '#fff' }
                                ]}>
                                    Ingresar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                    <View style={styles.form}>
                        <Text style={[styles.label, customStyles.bigLabel]}>NOMBRE</Text>
                        <TextInput
                            style={[styles.input, customStyles.bigInput]}
                            placeholder="Ingresa tu nombre"
                            placeholderTextColor="#BDBDBD"
                            value={Name}
                            onChangeText={setName}
                            keyboardType="default"
                            autoCapitalize="none"
                        />
                        <Text style={[styles.label, customStyles.bigLabel]}>CORREO ELECTRÓNICO</Text>
                        <TextInput
                            style={[styles.input, customStyles.bigInput]}
                            placeholder="Ingresa tu correo electrónico"
                            placeholderTextColor="#BDBDBD"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                        <Text style={[styles.label, customStyles.bigLabel]}>CONTRASEÑA</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                            <TextInput
                                style={[styles.input, customStyles.bigInput, { flex: 1, paddingRight: 40 }]}
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
                        <Text style={[styles.label, customStyles.bigLabel]}>CONFIRMAR CONTRASEÑA</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                            <TextInput
                                style={[styles.input, customStyles.bigInput, { flex: 1, paddingRight: 40 }]}
                                placeholder="Confirma tu contraseña"
                                placeholderTextColor="#BDBDBD"
                                secureTextEntry={!showConfirmPassword}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                            />
                            <TouchableOpacity
                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
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
                                    name={showConfirmPassword ? "visibility-off" : "visibility"}
                                    size={24}
                                    color="#888"
                                />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={handleRegister} style={styles.button}>
                            <Text style={[styles.buttonText, customStyles.bigButtonText]}>Registrarse</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const customStyles = StyleSheet.create({
    bigTitle: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    bigSubtitle: {
        fontSize: 20,
    },
    bigIngresar: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    bigLabel: {
        fontSize: 18,
    },
    bigInput: {
        fontSize: 18,
    },
    bigButtonText: {
        fontSize: 22,
    },
});

export default CreateAC;
   