import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, KeyboardAvoidingView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addPlanta } from '../services/Data';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../constants/styles';
import Colors from '../constants/colors';

export default function AgregarPlanta() {
  const [name, setName] = useState('');
  const [scientificName, setScientificName] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const navigation = useNavigation();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso requerido', 'Se necesita permiso para acceder a la galería.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso requerido', 'Se necesita permiso para acceder a la cámara.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const guardarPlanta = async () => {
    if (!name || !scientificName) {
      Alert.alert('Completa todos los campos');
      return;
    }
    // Crea la planta en la base de datos
    const id = await addPlanta({
      name,
      scientificName,
      datos: {
        humidity: '--',
        luminosity: '--',
        soilhumidity: '--',
        temperature: '--',
      },
    });
    // Guarda la imagen localmente asociada al id de la planta
    if (imageUri) {
      try {
        const stored = await AsyncStorage.getItem('imagenesPlantas');
        const imagenes = stored ? JSON.parse(stored) : {};
        imagenes[id] = imageUri;
        await AsyncStorage.setItem('imagenesPlantas', JSON.stringify(imagenes));
      } catch (e) {
        // Manejo de error opcional
      }
    }
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <View style={styles.container}>
        <LinearGradient
          colors={[Colors.mint_green, Colors.green_emerald]}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Agregar Planta</Text>
        </LinearGradient>
        <View style={styles.form}>
          <Text style={styles.label}>NOMBRE</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa el nombre"
            placeholderTextColor="#BDBDBD"
            value={name}
            onChangeText={setName}
            keyboardType="default"
            autoCapitalize="none"
          />
          <Text style={styles.label}>NOMBRE CIENTÍFICO</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa el nombre científico"
            placeholderTextColor="#BDBDBD"
            value={scientificName}
            onChangeText={setScientificName}
            keyboardType="default"
            autoCapitalize="none"
          />
          <Text style={styles.label}>IMAGEN</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <TouchableOpacity onPress={pickImage} style={[styles.input, { flex: 1, marginRight: 4, alignItems: 'center', justifyContent: 'center' }]}>
              <Text style={{ color: '#BDBDBD' }}>Galería</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={takePhoto} style={[styles.input, { flex: 1, marginLeft: 4, alignItems: 'center', justifyContent: 'center' }]}>
              <Text style={{ color: '#BDBDBD' }}>Cámara</Text>
            </TouchableOpacity>
          </View>
          {imageUri && (
            <View style={{ alignItems: 'center', marginVertical: 12 }}>
              <Image source={{ uri: imageUri }} style={{ width: 100, height: 100, borderRadius: 12 }} />
            </View>
          )}
          <TouchableOpacity style={styles.button} onPress={guardarPlanta}>
            <Text style={styles.buttonText}>Guardar planta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}