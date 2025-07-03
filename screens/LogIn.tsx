import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Dimensions } from 'react-native';
import Colors from '../constants/colors';
import styles from '../constants/styles';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<any>();
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <LinearGradient
                        colors={[Colors.mint_green, Colors.green_emerald]}
                        style={styles.header}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <TouchableOpacity
                            style={customStyles.absoluteBackButton}
                            onPress={() => navigation.navigate("WelcomeScreen")}
                            hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
                        >
                            <Text style={customStyles.bigBackButtonText}>←</Text>
                        </TouchableOpacity>
                        <Text style={[styles.title, customStyles.bigTitle]}>Ingresar</Text>
                        <Text style={[styles.subtitle, customStyles.bigSubtitle]}>Inicia sesión para continuar</Text>
                    </LinearGradient>
                    <View style={styles.form}>
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
                        <TouchableOpacity
                            style={customStyles.bigButton}
                            onPress={() => navigation.navigate("Menu")}
                        >
                            <Text style={[styles.buttonText, customStyles.bigButtonText]}>Ingresar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={customStyles.bigButton}
                            onPress={() => navigation.navigate("Password")}
                        >
                            <Text style={[styles.buttonText, customStyles.bigButtonText]}>Olvide mi contraseña</Text>
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
        textAlign: 'center',
        marginTop: 10,
    },
    bigSubtitle: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
    },
    bigLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 18,
        marginBottom: 6,
        color: '#A0A0A0',
        letterSpacing: 1,
    },
    bigInput: {
        fontSize: 18,
        minHeight: 54,
        borderRadius: 20,
        backgroundColor: '#F2F2F2',
        paddingHorizontal: 20,
        marginBottom: 10,
        width: width * 0.9,
        alignSelf: 'center',
    },
    bigButton: {
        backgroundColor: '#39796b',
        paddingVertical: 16,
        borderRadius: 24,
        marginTop: 16,
        alignItems: 'center',
        width: width * 0.9,
        alignSelf: 'center',
    },
    bigButtonText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
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
});

export default Login;