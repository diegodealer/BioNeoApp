import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addPlanta } from '../services/Data';
import { useNavigation } from '@react-navigation/native';

export default function AgregarPlanta() {
  const [name, setName] = useState('');
  const [scientificName, setScientificName] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const navigation = useNavigation();

  const pickImage = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'image/*',
      copyToCacheDirectory: true,
      multiple: false,
    });
    if (result.assets && result.assets.length > 0 && result.assets[0].uri) {
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
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Planta</Text>
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Nombre científico"
        value={scientificName}
        onChangeText={setScientificName}
        style={styles.input}
      />
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text>Seleccionar imagen</Text>
        )}
      </TouchableOpacity>
      <Button title="Guardar planta" onPress={guardarPlanta} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, alignSelf: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 12, padding: 8 },
  imagePicker: { alignItems: 'center', marginBottom: 16, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8 },
  image: { width: 100, height: 100, borderRadius: 12 },
});