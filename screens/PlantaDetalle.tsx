import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Alert, ActivityIndicator } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { db, rtdb } from '../services/firebaseconfig';
import { ref, get } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PlantaDetalle() {
  const navigation = useNavigation();
  const route = useRoute();
  const { plantaId } = route.params as any;

  const [planta, setPlanta] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [ultimoSensor, setUltimoSensor] = useState<any>(null);
  const [loadingSensor, setLoadingSensor] = useState(true);
  const [localImage, setLocalImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlanta = async () => {
      try {
        const plantaRef = doc(db, 'plantas', plantaId);
        const plantaSnap = await getDoc(plantaRef);
        if (plantaSnap.exists()) {
          setPlanta(plantaSnap.data());
        } else {
          setPlanta(null);
        }
        // Obtener imagen local
        const stored = await AsyncStorage.getItem('imagenesPlantas');
        if (stored) {
          const imagenes = JSON.parse(stored);
          setLocalImage(imagenes[plantaId] || null);
        } else {
          setLocalImage(null);
        }
      } catch (error) {
        console.error('Error obteniendo la planta:', error);
        setPlanta(null);
        setLocalImage(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPlanta();
  }, [plantaId]);

  useEffect(() => {
    const fetchUltimoSensor = async () => {
      setLoadingSensor(true);
      try {
        const sensoresRef = ref(rtdb, `sensors/${plantaId}`);
        const snapshot = await get(sensoresRef);
        const data = snapshot.val();
        if (data) {
          // Si hay varios registros, buscar el de mayor timestamp
          let registros = Object.values(data);
          registros = registros.filter((r: any) => r.timestamp); // solo los que tienen timestamp
          registros.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
          setUltimoSensor(registros[0]);
        } else {
          setUltimoSensor(null);
        }
      } catch (error) {
        console.error('Error obteniendo sensores:', error);
        setUltimoSensor(null);
      } finally {
        setLoadingSensor(false);
      }
    };
    fetchUltimoSensor();
  }, [plantaId]);

  const data = {
    labels: ['Luminosidad', 'Humedad', 'Temperatura', 'Humedad suelo'],
    datasets: [
      {
        data: [
          Number(ultimoSensor?.luminosidad || 0),
          Number(ultimoSensor?.humedad || 0),
          Number(ultimoSensor?.temperatura || 0),
          Number(ultimoSensor?.humedad_suelo || 0),
        ],
      },
    ],
  };

  const handleRegar = () => {
    Alert.alert('¡Listo!', 'La planta ha sido regada 🌱');
    // Aquí puedes agregar lógica para actualizar la base de datos si lo deseas
  };

  if (loading || loadingSensor) {
    return <ActivityIndicator size="large" color="#00e6e6" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {planta ? (
          <>
            <Text style={styles.title}>{planta.name?.toUpperCase()}</Text>
            <Text style={styles.subtitle}>(NOMBRE {planta.scientificName?.toUpperCase() || 'NO DEFINIDO'})</Text>
            <Image
              source={localImage ? { uri: localImage } : require('../assets/images/favicon.png')}
              style={styles.image}
            />
          </>
        ) : (
          <Text style={styles.title}>No se encontraron datos de la planta</Text>
        )}
        {ultimoSensor ? (
          <BarChart
            data={data}
            width={Dimensions.get('window').width - 64}
            height={220}
            yAxisLabel=""
            chartConfig={{
              backgroundColor: '#6d3b2c',
              backgroundGradientFrom: '#6d3b2c',
              backgroundGradientTo: '#6d3b2c',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 230, 230, ${opacity})`,
              labelColor: () => '#fff',
              style: { borderRadius: 16 },
              propsForBackgroundLines: { stroke: '#fff' },
              propsForLabels: { fontSize: 10, fontWeight: 'bold' },
            }}
            style={{ marginVertical: 8, borderRadius: 16 }}
            yAxisSuffix={''}
          />
        ) : (
          <Text style={{ color: 'red' }}>No hay datos de sensores disponibles.</Text>
        )}
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
    width: '100%',
    height: '100%',
    backgroundColor: '#fff', 
    flex: 1, 
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
  subtitle: { 
    color: '#fff', 
    fontSize: 12, 
    marginBottom: 8 
  },
  title: { 
    color: '#fff', 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 2 
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