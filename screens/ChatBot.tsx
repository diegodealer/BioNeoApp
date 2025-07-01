import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const bot = require("../assets/images/chatbot.png");

const ChatBot = () => {
    const navigation = useNavigation<any>();
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="padding"
        >
            <View style={styles.container}>
                {/* Botón de regreso */}
                <TouchableOpacity style={styles.backButton}
                onPress={() => navigation.navigate("Menu")}
                >
                    <Ionicons name="arrow-back" size={32} color="#fff" />
                </TouchableOpacity>

                {/* Bot avatar y título */}
                <View style={styles.header}>
                    <Image source={bot} style={styles.botImage} />
                    <Text style={styles.title}>¿Te puedo ayudar en algo?</Text>
                </View>

                {/* Input y botón de enviar */}
                <View style={styles.inputRow}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enviar una pregunta"
                        placeholderTextColor="#888"
                    />
                    <TouchableOpacity style={styles.sendButton}>
                        <Ionicons name="send" size={28} color="#222" />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#42796b",
        paddingTop: 32,
    },
    backButton: {
        position: "absolute",
        top: 24,
        left: 16,
        zIndex: 10,
        backgroundColor: "transparent",
    },
    header: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    botImage: {
        width: 140,
        height: 140,
        resizeMode: "contain",
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#222",
        textAlign: "center",
    },
    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingBottom: 16,
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    input: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 16,
        marginRight: 8,
    },
    sendButton: {
        backgroundColor: "transparent",
        padding: 6,
    },
});

export default ChatBot;