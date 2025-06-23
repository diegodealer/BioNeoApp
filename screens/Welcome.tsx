import {View, Text, StyleSheet, Image} from 'react-native';
import Colors from '../constants/colors';

const icon = require('../assets/images/icon.png'); 

const Welcome = ()=> {
    return (
        <View style={styles.container}>
            <Image source={icon} style={{
                width: 100,
                height: 100,
                resizeMode: 'center'  
            }}/>
            <Text style={styles.text}>Bienvenido a BioNeoApp</Text>
        </View> 
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.green_pine,
    },
    text: {
        fontSize: 24,
        color: Colors.toasted_coffee,
    },
});

export default Welcome;
