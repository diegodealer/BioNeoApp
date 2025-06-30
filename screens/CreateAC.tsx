import React, { useState } from 'react';
import { createUserWithEmailAndPassword} from 'firebase/auth';
import {auth, db} from '../services/firebaseconfig';
import {doc, setDoc} from 'firebase/firestore';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../constants/styles';
import Colors from '../constants/colors';

const CreateAC = () => { 
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation<any>();

    const handleRegister = async () => {
        if (!username || !email || !password || !confirmPassword) {
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
                username: username,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
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
    }

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
                value={username}
                onChangeText={setUsername}
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
            <TextInput
                style={[styles.input, customStyles.bigInput]}
                placeholder="Ingresa tu contraseña"
                placeholderTextColor="#BDBDBD"
                value={password}
                onChangeText={setPassword}
                keyboardType="default"
            />
            <Text style={[styles.label, customStyles.bigLabel]}>CONFIRMAR CONTRASENA</Text>
            <TextInput
                style={[styles.input, customStyles.bigInput]}
                placeholder="Confirma tu contraseña"
                placeholderTextColor="#BDBDBD"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                keyboardType="default"
            />
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
   