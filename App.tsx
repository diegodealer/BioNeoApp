import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Password from './screens/Password';
import CreateAC from './screens/CreateAC'; 
import Login from './screens/LogIn';
import ProfileEdit from './screens/profile';
import RecoverPassword from './screens/RecoverPassword';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import ChatBoot from './screens/ChatBoot';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ChatBoot" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ChatBoot" component={ChatBoot} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="profile" component={ProfileEdit} />
        <Stack.Screen name="Login" component={Login} />
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


