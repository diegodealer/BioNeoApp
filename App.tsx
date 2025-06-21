import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
<<<<<<< HEAD
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './screens/Welcome';  

const Stack = createNativeStackNavigator();
=======
import Password from './screens/Password';
import RecoverPassword from './screens/RecoverPassword';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
>>>>>>> origin/sarai

export default function App() {
  return (
    <NavigationContainer>
<<<<<<< HEAD
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Welcome} />
      </Stack.Navigator>
    </NavigationContainer>
=======
      <Stack.Navigator initialRouteName="RecoverPassword" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
        <Stack.Screen name="Password" component={Password} />
        {/* Otras pantallas aquí */}
      </Stack.Navigator>
    </NavigationContainer>
    
    /*<View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>*/
>>>>>>> origin/sarai
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


