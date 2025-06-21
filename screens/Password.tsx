import {View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';
import Colors from '../constants/colors';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';

const Password = () => {
    const [email, setEmail] = useState('');
    const navigation = useNavigation();
    return (
     <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style ={styles.container}>  
            <LinearGradient
            colors={['#2FBA87', '#00FA9F']}
            style={styles.header}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
        >
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
             <Text style={styles.backButtonText}>←</Text>
           </TouchableOpacity>
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
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 30,
        overflow: 'hidden',
    },
    header: {
        paddingTop: 60,
        paddingBottom: 30,
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    title: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle:{
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    form: {
        flex: 1,
        marginTop: 40,
        paddingHorizontal: 30,
    },
    label: {
        color: '#BDBDBD',
        fontSize: 12,
        marginBottom: 10,
        letterSpacing: 1,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#F2F2F2',
        borderRadius: 20,
        paddingHorizontal: 18,
        paddingVertical: 12,
        fontSize: 16,
        marginBottom: 24,
        color: '#333',
    },
    button: {
        backgroundColor: '#3D7A64',
        borderRadius: 20,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'lowercase',
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 40,
        padding: 8,
        zIndex: 10,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default Password;