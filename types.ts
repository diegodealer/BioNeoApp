export type Planta = {
  id: string;
  nombre: string;
  nombreCientifico: string;
  humedad: number;
  temperatura: number;
  luminosidad: number;
  humedadSuelo: number;
  imagenUrl: string;
};

export type RootStackParamList = {
  Menu: undefined;
  PlantaDetalle: { planta: Planta };
};