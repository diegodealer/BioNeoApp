import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import Colors from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const RecoverPassword = () => {
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const [confirm, setConfirm] = useState('');

    return (
     <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        <LinearGradient
          colors={['#2FBA87', '#00FA9F']}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
            <View style={styles.lockIcon}>
            {/* Ejemplo usando emoji*/}
            <Text style={{ fontSize: 60, textAlign: 'center' }}>🔒</Text>
          </View>
          <Text style={styles.headerText}>
            Crea una contraseña nueva y segura{'\n'}
          </Text>
        </LinearGradient>
        <View style={styles.form}>
          <Text style={styles.label}>NUEVA CONTRASEÑA</Text>
          <TextInput
            style={styles.input}
            placeholder="******"
            placeholderTextColor="#BDBDBD"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Text style={styles.label}>CONFIRMAR CONTRASEÑA</Text>
          <TextInput
            style={styles.input}
            placeholder="******"
            placeholderTextColor="#BDBDBD"
            secureTextEntry
            value={confirm}
            onChangeText={setConfirm}
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Confirmar cambios</Text>
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
        paddingTop: 40,
        paddingBottom: 30,
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    lockIcon:{
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        marginHorizontal: 20,
        textAlign: 'center',
    },
    form:{
        flex: 1,
        marginTop: 40,
        paddingHorizontal: 30,
    },
    label:{
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
        height: 50,
        color: '#333',
        marginBottom: 20,
    },
    button:{
        backgroundColor: '#3D7A64',
        borderRadius: 20,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'none',
    },

});

export default RecoverPassword;

