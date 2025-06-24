// Define Planta type here or import from the correct path
export type Planta = {
  // Add the correct properties for Planta here
  id: number;
  nombre: string;
  // ...otros campos según corresponda
};

export type RootStackParamList = {
  Menu: undefined;
  PlantaDetalle: { planta: Planta };
};