import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../constants/styles';
import Colors from '../constants/colors';

const CreateAC = () => { 
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();

    return (
<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
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
                <Text style={styles.title}>Crea una cuenta nueva</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.subtitle}>¿Ya te has registrado? </Text>
                <TouchableOpacity>
                    <Text style={[styles.subtitle, { textDecorationLine: 'underline', color: '#fff' }]}>Ingresar</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
        <View style={styles.form}>
            <Text style={styles.label}>NOMBRE</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingresa tu nombre"
                placeholderTextColor="#BDBDBD"
                value={username}
                onChangeText={setUsername}
                keyboardType="default"
                autoCapitalize="none"
            />
            <Text style={styles.label}>CORREO ELECTRÓNICO</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingresa tu correo electrónico"
                placeholderTextColor="#BDBDBD"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <Text style={styles.label}>CONTRASEÑA</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingresa tu contraseña"
                placeholderTextColor="#BDBDBD"
                value={password}
                onChangeText={setPassword}
                keyboardType="default"
            />
            <Text style={styles.label}>CONFIRMAR CONTRASENA</Text>
            <TextInput
                style={styles.input}
                placeholder="Confirma tu contraseña"
                placeholderTextColor="#BDBDBD"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                keyboardType="default"
            />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
        </View>
    </View>
</KeyboardAvoidingView>
    );
};

export default CreateAC;
   