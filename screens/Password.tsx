import {View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView} from 'react-native';
import Colors from '../constants/colors';
import styles from '../constants/styles';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';



const Password = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation<any>();
  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior='padding'>
      <ScrollView>
      <View style ={styles.container}>  
        <LinearGradient
            colors={[Colors.mint_green, Colors.green_emerald]}
            style={styles.header}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
          >
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Login")}>
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
          <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate("RecoverPassword")}
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