import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function PlantaDetalle() {
  const navigation = useNavigation();
  const route = useRoute();
  const { planta } = route.params as any;

  const data = {
    labels: ['Luminosidad', 'Humedad', 'Temperatura', 'Humedad suelo'],
    datasets: [
      {
        data: [
          Number(planta.datos?.luminosity?.replace('%', '') || 0),
          Number(planta.datos?.humidity?.replace('%', '') || 0),
          Number(planta.datos?.temperature?.replace('°C', '') || 0),
          Number(planta.datos?.soilhumidity?.replace('%', '') || 0),
        ],
      },
    ],
  };

  const handleRegar = () => {
    Alert.alert('¡Listo!', 'La planta ha sido regada 🌱');
    // Aquí puedes agregar lógica para actualizar la base de datos si lo deseas
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{planta.name?.toUpperCase()}</Text>
        <Text style={styles.subtitle}>(NOMBRE {planta.scientificName?.toUpperCase() || 'NO DEFINIDO'})</Text>
        <Image source={{ uri: planta.imageurl }} style={styles.image} />
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