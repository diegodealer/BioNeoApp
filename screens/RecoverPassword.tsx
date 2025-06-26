import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import Colors from '../constants/colors';
import styles from '../constants/styles';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const RecoverPassword = () => {
    const [password, setPassword] = useState('');
    const navigation = useNavigation<any>();
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

          <TouchableOpacity
            style={{ position: 'absolute', top: 20, left: 16, zIndex: 10 }}
            onPress={() => navigation.navigate("Password")}
          >
            <Text style={{ color: '#fff', fontSize: 32 }}>←</Text>
          </TouchableOpacity>
          <View style={Recoverstyles.lockIcon}>
            {/* Ejemplo usando emoji*/}
            <Text style={{ fontSize: 60, textAlign: 'center' }}>🔒</Text>
          </View>
          <Text style={Recoverstyles.headerText}>
            Crea una contraseña nueva y segura{'\n'}
          </Text>
        </LinearGradient>
        <View style={styles.form}>
          <Text style={[styles.label, Recoverstyles.bigLabel]}>NUEVA CONTRASEÑA</Text>
          <TextInput
            style={[styles.input, Recoverstyles.bigInput]}
            placeholder="******"
            placeholderTextColor={Colors.placeholder}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Text style={[styles.label, Recoverstyles.bigLabel]}>CONFIRMAR CONTRASEÑA</Text>
          <TextInput
            style={[styles.input, Recoverstyles.bigInput]}
            placeholder="******"
            placeholderTextColor={Colors.placeholder}
            secureTextEntry
            value={confirm}
            onChangeText={setConfirm}
          />
          <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate("CreateAC")}
          >
            <Text style={Recoverstyles.buttonText}>Confirmar cambios</Text> //styles
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
        fontSize: 32,
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
        fontSize: 22,
        fontWeight: 'bold',
    },
    bigLabel:{
        fontSize: 18,
    },
    bigInput:{
        fontSize: 18,
    },  
});

export default RecoverPassword;

