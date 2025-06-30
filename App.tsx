import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AgregarPlanta from './screens/AgregarPlanta';
import Menu from './screens/Menu';
import PlantaDetalle from './screens/PlantaDetalle';
import { RootStackParamList } from './types';
import WelcomeScreen from './screens/WelcomeScreen';
import CreateAC from './screens/CreateAC';
import Login from './screens/LogIn';
import Password from './screens/Password';
import RecoverPassword from './screens/RecoverPassword';
import ChatBoot from './screens/ChatBoot';
import ProfileEdit from './screens/profile';


const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Menu" component={Menu}  options={{headerShown: false}}/>
        <Stack.Screen name="PlantaDetalle" component={PlantaDetalle} options={{headerShown: false}}/>
        <Stack.Screen name="AgregarPlanta" component={AgregarPlanta} options={{headerShown: false}}/> 
        <Stack.Screen name="CreateAC" component={CreateAC} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Password" component={Password} options={{headerShown: false}}/>
        <Stack.Screen name="RecoverPassword" component={RecoverPassword} options={{headerShown: false}}/>
        <Stack.Screen name="profile" component={ProfileEdit} options={{headerShown: false}}/>
        <Stack.Screen name="ChatBoot" component={ChatBoot} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

