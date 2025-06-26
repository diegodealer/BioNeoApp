import {View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView} from 'react-native';
import Colors from '../constants/colors';
import styles from '../constants/styles';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<any>();
    return (
      <KeyboardAvoidingView style={{flex: 1}} behavior='padding'>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>  
                <LinearGradient
                    colors={[Colors.mint_green, Colors.green_emerald]}
                    style={styles.header}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                >
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Welcome")}>
                    <Text style={styles.backButtonText}>←</Text>
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
                    style={styles.button}
                    onPress={() => navigation.navigate("Welcome")}
                >
                    <Text style={[styles.buttonText, customStyles.bigButtonText]}>Ingresar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
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
    },
    bigSubtitle: {
        fontSize: 20,
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

export default Login;