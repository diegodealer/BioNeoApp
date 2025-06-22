import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Password from './screens/Password';
import RecoverPassword from './screens/RecoverPassword';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Password" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
        <Stack.Screen name="Password" component={Password} />
        {/* Otras pantallas aquí */}
      </Stack.Navigator>
    </NavigationContainer>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


