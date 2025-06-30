import React, { useEffect, useState } from 'react';
import type { RootStackParamList } from '../types';
import cardstiles from '../constants/CardsStyles';
import styles from '../constants/styles';
import { View, Text, FlatList,TouchableOpacity, Image } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getPlantas } from '../services/Data';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Menu() {
  const [plantas, setPlantas] = useState<any[]>([]);
  const [imagenes, setImagenes] = useState<{ [id: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
      <View style={cardstiles.headerBox}>
        <Image source={require('../assets/images/splash-icon.png')} style={cardstiles.avatar} />
        <Text style={cardstiles.headerText}>HOLA, DIEGO</Text>
        <Image source={require('../assets/images/icon.png')} style={cardstiles.leaf} />
      </View>
      {/* Título */}
      <Text style={cardstiles.header}>PLANTAS</Text>
      {/* Lista de plantas */}
      {loading ? (
        <Text>Cargando...</Text>
      ) : (
        <FlatList
          data={plantas}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 80 }}
          renderItem={({ item }) => (
            <View style={cardstiles.card}>
              <Image
                source={imagenes[item.id] ? { uri: imagenes[item.id] } : require('../assets/images/favicon.png')}
                style={cardstiles.image}
              />
              <View style={cardstiles.cardContent}>
                <Text style={cardstiles.cardTitle}>{item.name?.toUpperCase()}</Text>
                <Text style={cardstiles.cardSubtitle}>(NOMBRE {item.scientificName?.toUpperCase() || 'IDK'})</Text>
                <View style={cardstiles.infoRow}>
                  <Text style={cardstiles.cardInfo}>HUMEDAD: {item.datos?.humidity || '--'}</Text>
                </View>
                <View style={cardstiles.infoRow}>
                  <Text style={cardstiles.cardInfo}>TEMPERATURA: {item.datos?.temperature || '--'}</Text>
                </View>
                <View style={cardstiles.infoRow}>
                  <Text style={cardstiles.cardInfo}>LUMINOSIDAD: {item.datos?.luminosity || '--'}</Text>
                </View>
                <TouchableOpacity
                  style={cardstiles.verMasBtn}
                  onPress={() =>
                    navigation.navigate('PlantaDetalle', {
                      planta: item,
                      imageUri: imagenes[item.id],
                    })
                  }
                >
                  <Text style={cardstiles.verMasText}>🔍 Ver más</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
      {/* Botón flotante para agregar planta */}
      <TouchableOpacity style={cardstiles.fab} onPress={handleAgregarPlanta}>
        <Text style={cardstiles.fabText}>+</Text>
      </TouchableOpacity>
      {/* Barra de navegación inferior */}
      <View style={cardstiles.bottomBar}>
        <TouchableOpacity style={cardstiles.bottomBtn}>
          <Text style={cardstiles.bottomIcon}>⚙️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={cardstiles.bottomBtn}>
          <Text style={cardstiles.bottomIcon}>💬</Text>
        </TouchableOpacity>
        <TouchableOpacity style={cardstiles.bottomBtn}>
          <Text style={cardstiles.bottomIcon}>🏠</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
