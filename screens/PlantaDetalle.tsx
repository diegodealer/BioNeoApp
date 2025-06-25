import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function PlantaDetalle() {
  const navigation = useNavigation();
  const route = useRoute();
  // Recibe la planta desde navigation params
  const { planta } = route.params as any;

  // Datos para el gráfico (puedes adaptar según tus datos reales)
  const data = {
    labels: ['Luminosidad', 'Humedad', 'Temperatura', 'Humedad del suelo'],
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
          }}
          style={{ marginVertical: 8, borderRadius: 16 }} yAxisSuffix={''}        />
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
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 20 },
  card: {
    backgroundColor: '#6d3b2c',
    borderRadius: 16,
    margin: 16,
    padding: 12,
    borderWidth: 3,
    borderColor: '#fff',
    alignItems: 'center',
  },
  title: { color: '#fff', fontWeight: 'bold', fontSize: 22, marginBottom: 2 },
  subtitle: { color: '#fff', fontSize: 12, marginBottom: 8 },
  image: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#fff', marginBottom: 8 },
  regarBtn: {
    backgroundColor: '#2e7d5b',
    borderRadius: 20,
    paddingHorizontal: 32,
    paddingVertical: 12,
    marginTop: 16,
  },
  regarText: { color: '#fff', fontWeight: 'bold', fontSize: 18, textAlign: 'center' },
  verMenosBtn: {
    marginTop: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  verMenosText: { color: '#6d3b2c', fontWeight: 'bold', fontSize: 14 },
});