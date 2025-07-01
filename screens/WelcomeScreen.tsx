import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, Platform } from "react-native"; // <-- Agrega Image aquí
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../constants/styles";

// Asegúrate de que la ruta sea correcta y la imagen exista
const leaf = require("../assets/images/pngtree-cartoon-leaf-illustration-png-image_9036566.png"); // ruta de ejemplo, cambiar luego de agregar el logo final 
const { height, width } = Dimensions.get("window");

const WelcomeScreen = () => {
    const navigation = useNavigation<any>();
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#2FBA87', '#00FA9F']}
                style={customStyles.welcomeHeader}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />
            <View style={customStyles.welcomeContent}>
                <View style={{ height: 32 }} />
                <Text style={customStyles.welcomeTitle}>Bienvenido a</Text>
                <Text style={customStyles.welcomeBrand}>BioNeo</Text>
                <Text style={customStyles.welcomeSubtitle}>Tecnología que cultiva el futuro</Text>
                <Image source={leaf} style={customStyles.welcomeLeaf} />
                <View style={customStyles.welcomeButtonRow}>
                    <TouchableOpacity
                        style={[styles.button, customStyles.bigButton]}
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={[styles.buttonText, customStyles.bigButtonText]}>Iniciar sesión</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, customStyles.bigButton]}
                        onPress={() => navigation.navigate("CreateAC")}
                    >
                        <Text style={[styles.buttonText, customStyles.bigButtonText]}>Registrate</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const customStyles = StyleSheet.create({
    welcomeHeader: {
        width: '100%',
        height: height * 0.18, // Responsive header height
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
        marginTop: height * 0.16,
        paddingHorizontal: 20,
    },
    welcomeTitle: {
        fontSize: Platform.OS === 'ios' ? 38 : 36,
        color: '#222',
        fontWeight: '400',
        marginBottom: 0,
        marginTop: 10,
    },
    welcomeBrand: {
        fontSize: Platform.OS === 'ios' ? 48 : 46,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#222',
        marginBottom: 8,
    },
    welcomeSubtitle: {
        fontSize: Platform.OS === 'ios' ? 20 : 18,
        color: '#444',
        textAlign: 'center',
        marginBottom: 24,
    },
    welcomeLeaf: {
        width: width * 0.45,
        height: width * 0.27,
        resizeMode: 'contain',
        marginBottom: 40,
    },
    welcomeButtonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    bigButton: {
        paddingVertical: Platform.OS === 'ios' ? 16 : 14,
        paddingHorizontal: Platform.OS === 'ios' ? 28 : 24,
        marginHorizontal: 10,
        borderRadius: 24,
        minWidth: width * 0.36,
    },
    bigButtonText: {
        fontSize: Platform.OS === 'ios' ? 20 : 18,
    },
});

export default WelcomeScreen;