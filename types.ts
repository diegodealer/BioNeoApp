// Define Planta type here or import from the correct path
export type Planta = {
  // Add the correct properties for Planta here
  id: number;
  nombre: string;
  // ...otros campos según corresponda
};

export type RootStackParamList = {
  WelcomeScreen: undefined;
  CreateAC: undefined;
  Login: undefined;
  Password: undefined;
  RecoverPassword: undefined;
  profile: undefined;
  ChatBoot: undefined;
  Menu: undefined;
  AgregarPlanta: undefined;
  PlantaDetalle: { planta: Planta, imageUri: string};
};