import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native"; // <-- Agrega Image aquí
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../constants/styles";

// Asegúrate de que la ruta sea correcta y la imagen exista
const leaf = require("../assets/images/pngtree-cartoon-leaf-illustration-png-image_9036566.png"); // ruta de ejemplo, cambiar luego de agregar el logo final 

const WelcomeScreen = () => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#2FBA87', '#00FA9F']}
                style={customStyles.welcomeHeader}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />
            <View style={customStyles.welcomeContent}>
                <Text style={customStyles.welcomeTitle}>Bienvenido a</Text>
                <Text style={customStyles.welcomeBrand}>BioNeo</Text>
                <Text style={customStyles.welcomeSubtitle}>Tecnología que cultiva el futuro</Text>
                <Image source={leaf} style={customStyles.welcomeLeaf} />
                <View style={customStyles.welcomeButtonRow}>
                    <TouchableOpacity style={[styles.button, customStyles.bigButton]}>
                        <Text style={[styles.buttonText, customStyles.bigButtonText]}>iniciar sesión</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, customStyles.bigButton]}>
                        <Text style={[styles.buttonText, customStyles.bigButtonText]}>registrate</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const customStyles = StyleSheet.create({
    welcomeHeader: {
        width: '100%',
        height: 160,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    welcomeContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 140,
        paddingHorizontal: 20,
    },
    welcomeTitle: {
        fontSize: 44,
        color: '#222',
        fontWeight: '400',
        marginBottom: 0,
        marginTop: 10,
    },
    welcomeBrand: {
        fontSize: 56,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#222',
        marginBottom: 8,
    },
    welcomeSubtitle: {
        fontSize: 24,
        color: '#444',
        textAlign: 'center',
        marginBottom: 24,
    },
    welcomeLeaf: {
        width: 200,
        height: 120,
        resizeMode: 'contain',
        marginBottom: 40,
    },
    welcomeButtonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    bigButton: {
        paddingVertical: 18,
        paddingHorizontal: 32,
        marginHorizontal: 12,
        borderRadius: 24,
        minWidth: 160,
    },
    bigButtonText: {
        fontSize: 22,
    },
});

export default WelcomeScreen;