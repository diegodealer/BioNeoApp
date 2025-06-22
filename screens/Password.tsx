import {View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';
import Colors from '../constants/colors';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';
import styles from '../constants/styles';

const Password = () => {
    const [email, setEmail] = useState('');
    const navigation = useNavigation();
    return (
     <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style ={passtyles.container}>  
            <LinearGradient
            colors={[Colors.mint_green, Colors.green_emerald]}
            style={passtyles.header}
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

const passtyles = StyleSheet.create({
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
});

export default Password;