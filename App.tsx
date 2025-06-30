import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AgregarPlanta from './screens/AgregarPlanta';
import Menu from './screens/Menu';
import PlantaDetalle from './screens/PlantaDetalle';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen name="Menu" component={Menu}  options={{headerShown: false}}/>
        <Stack.Screen name="PlantaDetalle" component={PlantaDetalle} options={{headerShown: false}}/>
        <Stack.Screen name="AgregarPlanta" component={AgregarPlanta} options={{headerShown: false}}/> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

