import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { ref, update } from 'firebase/database';
import { db } from '../firebaseconfig';
import { Planta } from './Menu';

const screenWidth = Dimensions.get('window').width;

const PlantaDetalle = () => {
  const route = useRoute<RouteProp<{ params: { planta: Planta } }, 'params'>>();
  const { planta } = route.params;

  const [nombre, setNombre] = useState(planta.nombre);
  const [nombreCientifico, setNombreCientifico] = useState(planta.nombreCientifico);

  const actualizarNombre = async () => {
    try {
      await update(ref(db, `plants/${planta.id}`), {
        nombre,
        nombreCientifico,
      });
      Alert.alert('Actualizado', 'Los datos se actualizaron correctamente');
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar');
    }
  };

  const data = {
    labels: ['Luminosidad', 'Humedad', 'Temperatura', 'Humedad suelo'],
    datasets: [
      {
        data: [
          planta.luminosidad,
          planta.humedad,
          planta.temperatura,
          planta.humedadSuelo,
        ],
      },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{nombre}</Text>
      <Text style={styles.subtitle}>({nombreCientifico})</Text>
      <Image source={{ uri: planta.imagenUrl }} style={styles.image} />

      <BarChart
        data={data}
        width={screenWidth - 32}
        height={220}
        yAxisLabel=""             
        yAxisSuffix=""            
        chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: () => '#fff',
        }}
        verticalLabelRotation={0}
        fromZero
        />


      <View style={styles.editSection}>
        <Text style={styles.editLabel}>Editar Nombre:</Text>
        <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />
        <Text style={styles.editLabel}>Editar Nombre Científico:</Text>
        <TextInput
          style={styles.input}
          value={nombreCientifico}
          onChangeText={setNombreCientifico}
        />
        <Button title="Guardar cambios" onPress={actualizarNombre} />
      </View>

      <View style={styles.regarBtn}>
        <Button title="Regar planta" color="#2e7d32" onPress={() => Alert.alert('Planta regada')} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 18,
    fontStyle: 'italic',
  },
  image: {
    width: 120,
    height: 120,
    marginVertical: 10,
  },
  editSection: {
    marginTop: 20,
    width: '100%',
  },
  editLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    borderRadius: 6,
  },
  regarBtn: {
    marginTop: 20,
    width: '100%',
  },
});

export default PlantaDetalle;