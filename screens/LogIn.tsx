import {View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';
import Colors from '../constants/colors';
import styles from '../constants/styles';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    return (
     <KeyboardAvoidingView style={{flex: 1}} behavior='padding'>
        <View style ={styles.container}>  
            <LinearGradient
            colors={[Colors.mint_green, Colors.green_emerald]}
            style={styles.header}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
        >
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
             <Text style={styles.backButtonText}>←</Text>
           </TouchableOpacity>
           <Text style={styles.title}>Ingresar</Text>
          <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
        </LinearGradient>
        <View style={styles.form}>
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
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Olvide mi contraseña</Text>
            </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;