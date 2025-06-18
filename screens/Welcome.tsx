import {View, Text, StyleSheet} from 'react-native';
import Colors from '../constants/colors';

const Welcome = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to the App!</Text>
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
