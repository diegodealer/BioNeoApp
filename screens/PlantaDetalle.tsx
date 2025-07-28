import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { query, ref, limitToLast, onValue, DataSnapshot } from 'firebase/database';
import { db, rtdb } from '../services/firebaseconfig';

export default function PlantaDetalle() {
  const navigation = useNavigation();
  const route = useRoute();
  const { planta } = route.params as any;

  const [datos, setDatos] = useState({
    luminosity: '0',
    humidity: '0',
    temperature: '0',
    soilhumidity: '0',
  });

  useEffect(() => {
    const sensorQuery = query(ref(rtdb, 'sensors'), limitToLast(1));

    const unsubscribe = onValue(sensorQuery, (snapshot: DataSnapshot) => {
      if (snapshot.exists()) {
        const dataObj = snapshot.val();
        const firstKey = Object.keys(dataObj)[0];
        const latestData = dataObj[firstKey];

        setDatos({
          luminosity: String(latestData.luminosidad ?? '0'),
          humidity: String(latestData.humedad ?? '0'),
          temperature: String(latestData.temperatura ?? '0'),
          soilhumidity: String(latestData.humedad_suelo ?? '0'),
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const datosConFormato = [
    { label: 'Luminosidad', value: datos.luminosity + ' lux', numeric: Number(datos.luminosity), color: '#00e6e6' },
    { label: 'Humedad ambiente', value: datos.humidity + '%', numeric: Number(datos.humidity), color: '#4caf50' },
    { label: 'Temperatura', value: datos.temperature + '°C', numeric: Number(datos.temperature), color: '#ff9800' },
    { label: 'Humedad del suelo', value: datos.soilhumidity + '%', numeric: Number(datos.soilhumidity), color: '#3f51b5' },
  ];

  const handleRegar = () => {
    Alert.alert('¡Listo!', 'La planta ha sido regada 🌱');
    // Aquí podrías escribir en Firebase si lo deseas
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{planta.name?.toUpperCase()}</Text>
        <Text style={styles.subtitle}>(NOMBRE {planta.scientificName?.toUpperCase() || 'NO DEFINIDO'})</Text>
        <Image source={{ uri: planta.imageurl }} style={styles.image} />

        <View style={{ marginTop: 16, width: '100%' }}>
          {datosConFormato.map((item, index) => (
            <View key={index} style={{ marginVertical: 10, paddingHorizontal: 4 }}>
              <Text style={styles.dataLabel}>{item.label}: <Text style={styles.dataValue}>{item.value}</Text></Text>
              <View style={[styles.bar, { backgroundColor: item.color, width: `${Math.min(item.numeric, 100)}%` }]} />
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.regarBtn} onPress={handleRegar}>
          <Text style={styles.regarText}>Regar planta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.verMenosBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.verMenosText}>🔍 Ver menos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff', 
    paddingTop: 40,
    paddingBottom: 20,
  },
  card: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6d3b2c',
    borderColor: '#fff',
    borderRadius: 25,
    borderWidth: 3,
    margin: 0,
    width: '100%',
    flex: 1,
    padding: 12,
  },
  image: { 
    backgroundColor: '#fff',
    borderRadius: 60, 
    height: 120, 
    marginBottom: 8, 
    width: 120 
  },
  title: { 
    color: '#fff', 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 2 
  },
  subtitle: { 
    color: '#fff', 
    fontSize: 12, 
    marginBottom: 8 
  },
  dataLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dataValue: {
    fontWeight: 'normal',
    fontSize: 14,
  },
  bar: {
    height: 14,
    borderRadius: 8,
  },
  regarBtn: {
    backgroundColor: '#2e7d5b',
    borderRadius: 20,
    marginTop: 16,
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  regarText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlign: 'center' 
  },
  verMenosBtn: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  verMenosText: { 
    color: '#6d3b2c', 
    fontSize: 14, 
    fontWeight: 'bold' 
  },
});
