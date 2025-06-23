import React, {useState} from 'react';
import { KeyboardAvoidingView, Platform, TouchableOpacity, View, Text } from 'react-native';
import Colors from '../constants/colors';
import styles from '../constants/styles';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';

/*
type RootStackParamList = {
    // Define your routes here, e.g.:
    // CreateAC: undefined;
    // LogIn: undefined;
};


const HomeScreen = () => {
    const navigation = useNavigation();

    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior='padding'>
            <View style={styles.container}>
                <LinearGradient
                    colors={[Colors.mint_green, Colors.green_emerald]}
                    style={styles.header}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                >
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.backButtonText}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Home Screen</Text>
                </LinearGradient>
                <View style={styles.form}>
                    <Text style={styles.label}>Welcome to the Home Screen!</Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateAC')}>
                    <Text style={styles.buttonText}>Go to Create Account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LogIn')}>
                    <Text style={styles.buttonText}>Go to Log In</Text>
            </View>
        </KeyboardAvoidingView>
    );
};
*/