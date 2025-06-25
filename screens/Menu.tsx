import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, Image, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { ref as storageRef, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { ref as dbRef, get, child, set} from 'firebase/database';
import { db as realtimeDb } from '../services/firebaseconfig';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Planta, RootStackParamList } from '../types';

type MenuScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Menu'>;

const Menu = () => {
  const [plantas, setPlantas] = useState<Planta[]>([]);
  const navigation = useNavigation<MenuScreenNavigationProp>();

  useEffect(() => {
    cargarPlantas();
  }, []);

  const cargarPlantas = async () => {
    const snapshot = await get(child(dbRef(realtimeDb), 'Plantas'));
    if (snapshot.exists()) {
      const data = snapshot.val();
      const lista = Object.keys(data).map(id => ({
        id,
        nombre: data[id].name,
        nombreCientifico: data[id].ScientificName,
        imagenUrl: data[id].imageurl,
        humedad: Number(data[id].datos?.humidity ?? 0),
        temperatura: Number(data[id].datos?.temperature ?? 0),
        luminosidad: Number(data[id].datos?.luminosity ?? 0),
        humedadSuelo: Number(data[id].datos?.soilhumidity ?? 0),
      }));
      setPlantas(lista);
    } else {
      setPlantas([]);
    }
  };

  const subirImagen = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length) {
      const uri = result.assets[0].uri;
      const response = await fetch(uri);
      const blob = await response.blob();

      const id = uuid.v4() as string;
      const nombreArchivo = `plantas/${id}.jpg`;
      const storage = getStorage();
      const imgRef = storageRef(storage, nombreArchivo);

      await uploadBytes(imgRef, blob);
      const url = await getDownloadURL(imgRef);

      const planta = {
        name: 'PLANTA NUEVA',
        ScientificName: 'Nombre Científico',
        imageurl: url,
        datos: {
          humidity: '60',
          temperature: '22',
          luminosity: '15',
          soilhumidity: '40',
        },
      };

      await set(dbRef(realtimeDb, `Plantas/${id}`), planta);
      Alert.alert('Listo', 'Planta agregada con éxito');
      cargarPlantas();
    }
  };

  const tomarFoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.canceled && result.assets?.length) {
      const uri = result.assets[0].uri;
      const response = await fetch(uri);
      const blob = await response.blob();

      const id = uuid.v4() as string;
      const nombreArchivo = `plantas/${id}.jpg`;
      const storage = getStorage();
      const imgRef = storageRef(storage, nombreArchivo);

      await uploadBytes(imgRef, blob);
      const url = await getDownloadURL(imgRef);

      const planta = {
        name: 'PLANTA NUEVA',
        ScientificName: 'Nombre Científico',
        imageurl: url,
        datos: {
          humidity: '60',
          temperature: '22',
          luminosity: '15',
          soilhumidity: '40',
        },
      };

      await set(dbRef(realtimeDb, `Plantas/${id}`), planta);
      Alert.alert('Listo', 'Planta agregada desde cámara');
      cargarPlantas();
    }
  };

  const Item = ({ item }: { item: Planta }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.nombre}</Text>
      <Text>({item.nombreCientifico})</Text>
      <Image source={{ uri: item.imagenUrl }} style={styles.image} />
      <TouchableOpacity
        style={styles.verMasBtn}
        onPress={() => navigation.navigate('PlantaDetalle', { planta: item })}
      >
        <Text style={styles.verMasTxt}>Ver más</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Plantas</Text>
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.btn} onPress={subirImagen}>
            <Text style={styles.btnText}>Desde galería</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={tomarFoto}>
            <Text style={styles.btnText}>Desde cámara</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={plantas}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#f2e2c4',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 8,
  },
  verMasBtn: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#6fa18c',
    borderRadius: 8,
  },
  verMasTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  btn: {
    backgroundColor: '#6495ed',
    padding: 10,
    borderRadius: 8,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Menu;
