import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Dimensions } from 'react-native';
import Colors from '../constants/colors';
import styles from '../constants/styles';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import {sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../services/firebaseconfig';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const navigation = useNavigation<any>();

    const handleLogin = async () => {
        if (!email || !password){
            alert('Por favor, ingresa tu correo y contraseña');
            return;
        }
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            alert('¡Bienvenido!');
            navigation.navigate('Menu');
        } catch (error){
            if (error instanceof Error) {
                alert("Error al iniciar sesión: " + error.message);
            } else {
                alert("Error al iniciar sesión: Ocurrió un error desconocido.");
            }
        }
    }

    const handleForgotPassword = async () => {
        if (!email) {
          alert('Por favor, ingresa tu correo electrónico para restablecer la contraseña.');
          return;
        }
        try {
          await sendPasswordResetEmail(auth, email);
          alert('Se ha enviado un correo para restablecer tu contraseña.');
        } catch (error) {
          if (error instanceof Error) {
            alert("Error al enviar el correo: " + error.message);
          } else {
            alert("Error desconocido al enviar el correo.");
          }
        }
      };
  


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
                        <Text style={styles.label}>CONTRASEÑA</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Ingresa tu contraseña"
          placeholderTextColor="#BDBDBD"
          secureTextEntry={!showPassword}
    value={password}
          onChangeText={setPassword}
        />
  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}
    style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        paddingHorizontal: 8,
        position: 'absolute',
        paddingVertical: 1,
        right: 16,
        alignContent: 'center',
        top: -9,
      }}
    >
  <MaterialIcons
    name={showPassword ? "visibility-off" : "visibility"}
              size={24}
    color="#888"
    style={{ marginLeft: 8 }}
  />
          </TouchableOpacity>
</View>
              <TouchableOpacity
                            style={customStyles.bigButton}
                            onPress={handleLogin}
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