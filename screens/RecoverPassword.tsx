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
        style={[styles.header, { paddingTop: 32, paddingBottom: 24 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity
          style={{ left: 20, zIndex: 10, top: 50, position: 'absolute' }}
          onPress={() => navigation.navigate("Password")}
        >
          <Text style={{ color: '#fff', fontSize: 36 }}>←</Text>
        </TouchableOpacity>

        {/* Ícono del candado */}
        <View style={{ alignItems: 'center', marginTop: 50 }}>
          <Text style={{ fontSize: 60 }}>🔒</Text>
        </View>

        {/* Texto debajo del candado */}
        <Text style={[Recoverstyles.headerText, { textAlign: 'center', marginTop: 12 }]}>
          Crea una contraseña nueva{'\n'}y segura
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
        <TouchableOpacity
          style={[styles.button, { marginTop: 42 }]}
          onPress={() => navigation.navigate("CreateAC")}
        >
          <Text style={Recoverstyles.buttonText}>Confirmar cambios</Text>
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

