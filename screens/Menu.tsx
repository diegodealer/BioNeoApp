import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { ref as dbRef, get, update } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../services/firebaseconfig';
import { useNavigation, RouteProp} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define los tipos de tus rutas
type RootStackParamList = {
  Menu: undefined;
  PlantaDetalle: { planta: Planta };
};

// Usa el tipo correcto para navigation
const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Menu'>>();


interface Planta {
  id: string;
  name: string;
  scientificName: string;
  imageurl: string;
  datos: {
    humidity: string;
    luminosity: string;
    soilhumidity: string;
    temperature: string;
  };
}

async function uriToBlob(uri: string): Promise<Blob> {
  const file = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
  return await fetch(`data:image/jpeg;base64,${file}`).then(res => res.blob());
}

export default function Menu() {
  const [plantas, setPlantas] = useState<Planta[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchPlantas();
  }, []);

  const fetchPlantas = async () => {
    setLoading(true);
    try {
      const plantasRef = dbRef(db, 'Plantas');
      const snapshot = await get(plantasRef);
      const data = snapshot.val();
      if (!data) {
        setPlantas([]);
      } else {
        const plantasArray = Object.keys(data).map(id => ({
          id,
          name: data[id].name,
          scientificName: data[id].ScientificName,
          imageurl: data[id].imageurl,
          datos: data[id].datos,
        }));
        setPlantas(plantasArray);
      }
    } catch (err) {
      Alert.alert('Error', 'No se pudieron cargar las plantas');
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async (planta: Planta) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.assets && result.assets.length > 0 && result.assets[0].uri) {
        handleImageUpload(result.assets[0].uri, planta.id);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo seleccionar la imagen');
    }
  };

  const handleImageUpload = async (uri: string, plantaId: string) => {
    try {
      setUploading(true);
      const blob = await uriToBlob(uri);

      const filename = `plantas/${plantaId}_${Date.now()}.jpg`;
      const imgRef = storageRef(storage, filename);
      await uploadBytes(imgRef, blob);

      const downloadURL = await getDownloadURL(imgRef);

      // Actualiza solo el campo imageurl de la planta existente
      const plantaDbRef = dbRef(db, `Plantas/${plantaId}`);
      await update(plantaDbRef, { imageurl: downloadURL });

      Alert.alert('Éxito', 'Imagen subida correctamente');
      fetchPlantas();
    } catch (error) {
      console.log('Error al subir imagen:', error);
      Alert.alert('Error', 'No se pudo subir la imagen');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {uploading && (
        <View style={styles.center}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text>Subiendo imagen...</Text>
        </View>
      )}
      <Text style={styles.header}>PLANTAS</Text>
      <FlatList
        data={plantas}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity onPress={() => pickImage(item)}>
              {item.imageurl ? (
                <Image source={{ uri: item.imageurl }} style={styles.image} />
              ) : (
                <View style={styles.placeholder}>
                  <Text>Sin imagen</Text>
                </View>
              )}
            </TouchableOpacity>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.name?.toUpperCase()}</Text>
              <Text style={styles.cardSubtitle}>(NOMBRE {item.scientificName?.toUpperCase() || 'NO DEFINIDO'})</Text>
              <Text style={styles.cardInfo}>
                HUMEDAD: {item.datos?.humidity || '--'}   TEMPERATURA: {item.datos?.temperature || '--'}
              </Text>
              <Text style={styles.cardInfo}>
                LUMINOSIDAD: {item.datos?.luminosity || '--'}
              </Text>
              <TouchableOpacity style={styles.verMasBtn} onPress={() => navigation.navigate('PlantaDetalle', { planta: item })}>
                <Text style={styles.verMasText}>🔍 Ver más</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomBtn}>
          <Text style={styles.bottomIcon}>💬</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBtn}>
          <Text style={styles.bottomIcon}>🏠</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 22, fontWeight: 'bold', alignSelf: 'center', marginVertical: 8, letterSpacing: 2 },
  card: {
    backgroundColor: '#6d3b2c',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 10,
    padding: 12,
    borderWidth: 3,
    borderColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: { width: 80, height: 80, borderRadius: 12, marginRight: 12, backgroundColor: '#fff' },
  placeholder: {
    width: 80, height: 80, borderRadius: 12, marginRight: 12,
    backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center'
  },
  cardContent: { flex: 1 },
  cardTitle: { color: '#fff', fontWeight: 'bold', fontSize: 18, marginBottom: 2 },
  cardSubtitle: { color: '#fff', fontSize: 12, marginBottom: 4 },
  cardInfo: { color: '#fff', fontSize: 12 },
  verMasBtn: { marginTop: 8, alignSelf: 'flex-start', backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  verMasText: { color: '#6d3b2c', fontWeight: 'bold', fontSize: 14 },
  fab: {
    position: 'absolute', bottom: 60, left: '50%', marginLeft: -28,
    backgroundColor: '#fff', width: 56, height: 56, borderRadius: 28,
    justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#6d3b2c', elevation: 4,
  },
  fabText: { fontSize: 36, color: '#6d3b2c', fontWeight: 'bold' },
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', backgroundColor: '#6d3b2c', height: 56, justifyContent: 'space-around', alignItems: 'center'
  },
  bottomBtn: { flex: 1, alignItems: 'center' },
  bottomIcon: { fontSize: 28, color: '#fff' },
});