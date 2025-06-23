import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import Colors from '../constants/colors';
import styles from '../constants/styles';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const RecoverPassword = () => {
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const [confirm, setConfirm] = useState('');

    return (
     <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
      <View style={styles.container}>
        <LinearGradient
          colors={[Colors.mint_green, Colors.green_emerald]}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
            <View style={Recoverstyles.lockIcon}>
            {/* Ejemplo usando emoji*/}
            <Text style={{ fontSize: 60, textAlign: 'center' }}>🔒</Text>
          </View>
          <Text style={Recoverstyles.headerText}>
            Crea una contraseña nueva y segura{'\n'}
          </Text>
        </LinearGradient>
        <View style={styles.form}>
          <Text style={styles.label}>NUEVA CONTRASEÑA</Text>
          <TextInput
            style={styles.input}
            placeholder="******"
            placeholderTextColor={Colors.placeholder}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Text style={styles.label}>CONFIRMAR CONTRASEÑA</Text>
          <TextInput
            style={styles.input}
            placeholder="******"
            placeholderTextColor={Colors.placeholder}
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

const Recoverstyles = StyleSheet.create({
    
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
    }
});

export default RecoverPassword;

