import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../services/firebaseconfig';
import { doc, setDoc } from 'firebase/firestore';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, StyleSheet, ScrollView, Dimensions, Platform, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
// import styles from '../constants/styles';
import Colors from '../constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import BackButton from '../components/BackButton';

const CreateAC = () => {
    const [Name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigation = useNavigation<any>();

    const handleRegister = async () => {
        if (!Name || !email || !password || !confirmPassword) {
            alert('Completa todos los campos');
            return;
        }
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(db, 'users', user.uid), {
                name: Name,
                // email: email, // opcional, puedes dejarlo si lo necesitas
            });
            alert('Usuario creado correctamente');
            navigation.navigate('Login');
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                alert("Error al registrarse: " + error.message);
            } else {
                alert("Error al registrarse: Ocurrió un error desconocido.");
            }
        }
    };

  function setUsername(text: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          {/* Botón de regreso fijo arriba a la izquierda */}
          <BackButton onPress={() => navigation.goBack()} />
          <LinearGradient
            colors={[Colors.mint_green, Colors.green_emerald]}
            style={[styles.header, { paddingTop: 80, paddingBottom: 32, borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={[styles.title, { fontSize: 32, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' }]}>Crea una cuenta nueva</Text>
            <Text style={[styles.subtitle, { fontSize: 18, textAlign: 'center', color: '#fff', marginBottom: 8 }]}>¿Ya te has registrado?</Text>
          </LinearGradient>

          <View style={[styles.form, { marginTop: 40 }]}>
            <Text style={[styles.label, customStyles.bigLabel]}>NOMBRE</Text>
            <TextInput
              style={[styles.input, customStyles.bigInput]}
              placeholder="Ingresa tu nombre"
              placeholderTextColor="#BDBDBD"
              value={Name}
              onChangeText={setName}
              keyboardType="default"
              autoCapitalize="none"
            />

            <Text style={[styles.label, customStyles.bigLabel]}>
              CORREO ELECTRÓNICO
            </Text>
            <TextInput
              style={[styles.input, customStyles.bigInput]}
              placeholder="Ingresa tu correo electrónico"
              placeholderTextColor="#BDBDBD"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={[styles.label, customStyles.bigLabel]}>
              CONTRASEÑA
            </Text>
            <TextInput
              style={[styles.input, customStyles.bigInput]}
              placeholder="Ingresa tu contraseña"
              placeholderTextColor="#BDBDBD"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />

            <Text style={[styles.label, customStyles.bigLabel]}>
              CONFIRMAR CONTRASEÑA
            </Text>
            <TextInput
              style={[styles.input, customStyles.bigInput]}
              placeholder="Confirma tu contraseña"
              placeholderTextColor="#BDBDBD"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Menu')}
            >
              <Text style={[styles.buttonText, customStyles.bigButtonText]}>
                Registrarse
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    textAlign: 'center',
    color: '#fff',
  },
  subtitle: {
    color: '#fff',
  },
  form: {
    paddingHorizontal: 20,
  },
  label: {
    marginTop: 12,
    color: '#A0A0A0',
  },
  input: {
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    paddingHorizontal: 20,
    marginBottom: 10,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#39796b',
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 20,
    alignItems: 'center',
    width: width * 0.9,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
  },
  absoluteBackButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 32 ,
    left: 16,
    zIndex: 10,
    backgroundColor: 'transparent',
  },
});

const customStyles = StyleSheet.create({
  bigTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  bigSubtitle: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 18,
  },
  bigIngresar: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  bigLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#A0A0A0',
    letterSpacing: 1,
  },
  bigInput: {
    fontSize: 20,
    minHeight: 54,
    width: width * 0.9,
  },
  bigButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bigBackButtonText: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CreateAC;
   