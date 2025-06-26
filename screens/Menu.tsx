import React, { useEffect, useState } from 'react';
import type { RootStackParamList } from '../types';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getPlantas } from '../services/Data';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Menu() {
  const [plantas, setPlantas] = useState<any[]>([]);
  const [imagenes, setImagenes] = useState<{ [id: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Menu'>>();

  useEffect(() => {
    cargarPlantas();
    cargarImagenes();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      cargarPlantas();
      cargarImagenes();
    }, [])
  );

  const cargarPlantas = async () => {
    setLoading(true);
    try {
      const data = await getPlantas();
      setPlantas(data);
    } catch (error) {
      setPlantas([]);
    } finally {
      setLoading(false);
    }
  };

  const cargarImagenes = async () => {
    try {
      const stored = await AsyncStorage.getItem('imagenesPlantas');
      if (stored) setImagenes(JSON.parse(stored));
    } catch (e) {
      setImagenes({});
    }
  };

  const handleAgregarPlanta = () => {
    navigation.navigate({ name: 'AgregarPlanta' } as any);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerBox}>
        <Image source={require('../assets/images/splash-icon.png')} style={styles.avatar} />
        <Text style={styles.headerText}>HOLA, DIEGO</Text>
        <Image source={require('../assets/images/icon.png')} style={styles.leaf} />
      </View>
      <Text style={styles.header}>PLANTAS</Text>
      {loading ? (
        <Text>Cargando...</Text>
      ) : (
        <FlatList
          data={plantas}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 80 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={imagenes[item.id] ? { uri: imagenes[item.id] } : require('../assets/images/favicon.png')}
                style={styles.image}
              />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.name?.toUpperCase()}</Text>
                <Text style={styles.cardSubtitle}>(NOMBRE {item.scientificName?.toUpperCase() || 'IDK'})</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.cardInfo}>HUMEDAD: {item.datos?.humidity || '--'}</Text>
                  <Text style={styles.cardInfo}>TEMPERATURA: {item.datos?.temperature || '--'}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.cardInfo}>LUMINOSIDAD: {item.datos?.luminosity || '--'}</Text>
                </View>
                <TouchableOpacity
                  style={styles.verMasBtn}
                  onPress={() =>
                    navigation.navigate('PlantaDetalle', {
                      planta: item,
                      //imageUri: imagenes[item.id],
                    })
                  }
                >
                  <Text style={styles.verMasText}>🔍 Ver más</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
      {/* Botón flotante para agregar planta */}
      <TouchableOpacity style={styles.fab} onPress={handleAgregarPlanta}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
      {/* Barra de navegación inferior */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomBtn}>
          <Text style={styles.bottomIcon}>⚙️</Text>
        </TouchableOpacity>
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
  headerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2ee59d',
    marginHorizontal: 10,
    borderRadius: 12,
    marginBottom: 10,
    padding: 8,
    marginTop: 10,
  },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  headerText: { fontWeight: 'bold', fontSize: 18, color: '#222', flex: 1 },
  leaf: { width: 32, height: 32 },
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
  cardContent: { flex: 1 },
  cardTitle: { color: '#fff', fontWeight: 'bold', fontSize: 18, marginBottom: 2 },
  cardSubtitle: { color: '#fff', fontSize: 12, marginBottom: 4 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between' },
  cardInfo: { color: '#fff', fontSize: 12, marginRight: 10 },
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
  bottomIcon: { fontSize: 28, color: '#fff'},
});