import {View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Dimensions} from 'react-native';
import Colors from '../constants/colors';
import styles from '../constants/styles';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../services/firebaseconfig';
import BackButton from '../components/BackButton';


const Password = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation<any>();

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
  
  const {width} = Dimensions.get('window');
  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior='padding'>
      <ScrollView>
      <View style ={styles.container}>  
        {/* Botón de regreso fijo arriba a la izquierda */}
        <BackButton onPress={() => navigation.navigate("Login")} />
        <LinearGradient
            colors={[Colors.mint_green, Colors.green_emerald]}
            style={[styles.header, { paddingTop: 80 }]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
          >
          <Text style={styles.title}>¿Has olvidado tu contraseña?</Text>
          <Text style={styles.subtitle}>Nueva contraseña</Text>
        </LinearGradient>
          <View style={styles.form}>
           <Text style={styles.label}>INGRESA TU CORREO ELECTRÓNICO</Text>
           <TextInput
            style={styles.input}
            placeholder="Ingresa tu correo electrónico"
            placeholderTextColor="#BDBDBD"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.button}
          onPress={handleForgotPassword}
          >
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
        </View>
      </ScrollView>
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

export default Password;