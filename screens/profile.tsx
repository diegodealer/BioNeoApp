import React from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet, Dimensions } from "react-native";
import styles from "../constants/styles";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const ProfileEdit = () => {
    const navigation = useNavigation<any>();
    const [profileName, setProfileName] = React.useState("");
    const [confirmProfileName, setConfirmProfileName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const { width } = Dimensions.get("window");


    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior= "padding">
            <View style={styles.container}>
                <LinearGradient
                    colors={["#2FBA87", "#00FA9F"]}
                    style={styles.header}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                <TouchableOpacity style={customStyles.absoluteBackButton} 
                onPress={() => navigation.navigate("Menu")}
                hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
                >
                    <Text style={customStyles.bigBackButtonText}>←</Text>
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
                        secureTextEntry
                    />
                    <Text style={styles.label}>CONTRASEÑA</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingresa tu contraseña"
                        placeholderTextColor="#BDBDBD"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity style={styles.button}
                    onPress={() => navigation.navigate("Menu")}>
                        <Text style={styles.buttonText}>Guardar Cambios</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={customStyles.buttonRed}
                    onPress={() => navigation.navigate("Password")}>
                        <Text style={customStyles.buttonTextRed}>Cambiar la contraseña</Text>    
                    </TouchableOpacity> 
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const customStyles = StyleSheet.create({
     absoluteBackButton: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 60 : 32,
        left: 16,
        zIndex: 10,
        backgroundColor: 'transparent',
    },
    bigBackButtonText: {
        fontSize: 36,
        color: '#fff',
        fontWeight: 'bold',
    },
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