import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import BackButton from '../components/BackButton';
import { useNavigation } from "@react-navigation/native";
import { sendMessageToGemini} from "../services/gemini";
import { MaterialIcons } from '@expo/vector-icons';

const bot = require("../assets/images/chatbot.png");

const ChatBot = () => {
    const navigation = useNavigation<any>();
    const [input, setInput] = useState('');
    const [mensajes, setMensajes] = useState([
        { texto: '¡Hola! ¿En qué puedo ayudarte?', autor: 'bot' }
    ]);

    const scrollViewRef = React.useRef<ScrollView>(null);

    const handleEnviar = async () => {
        if (!input.trim()) return;
        // Agrega el mensaje del usuario
        setMensajes(prev => [...prev, { texto: input, autor: 'usuario' }]);
        setInput('');
        // Espera la respuesta del bot
        const res = await sendMessageToGemini(input);
        setMensajes(prev => [...prev, { texto: res, autor: 'bot' }]);
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#42796b' }}>
            {/* Header fijo */}
            <View style={styles.headerContainer}>
                <BackButton onPress={() => navigation.navigate("Menu")} />
                <View style={styles.header}>
                    <Image source={bot} style={styles.botImage} />
                    <Text style={styles.title}>¿Te puedo ayudar en algo?</Text>
                </View>
            </View>
            {/* Chat y input se ajustan con el teclado */}
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            >
                <View style={styles.chatArea}>
                    <ScrollView
                        ref={scrollViewRef}
                        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                        showsVerticalScrollIndicator={false}
                    >
                        {mensajes.map((msg, idx) => (
                            <View
                                key={idx}
                                style={[
                                    styles.burbuja,
                                    msg.autor === 'bot' ? styles.burbujaBot : styles.burbujaUsuario
                                ]}
                            >
                                <Text style={styles.textoBurbuja}>{msg.texto}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.inputRow}>
                    <TextInput
                        style={styles.input}
                        placeholder="Escribe tu mensaje..."
                        placeholderTextColor="#888"
                        value={input}
                        onChangeText={setInput}
                        onSubmitEditing={handleEnviar}
                        returnKeyType="send"
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={handleEnviar}>
                        {/* Cambia Ionicons por MaterialIcons, que suele estar instalado por defecto */}
                        <MaterialIcons name="send" size={28} color="#fff" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
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
        top: 48,
        left: 16,
        zIndex: 10,
        backgroundColor: "transparent",
    },
    headerContainer: {
        backgroundColor: '#42796b',
        paddingTop: 32,
    },
    header: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
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
        justifyContent: 'center',
        paddingHorizontal: 12,
        paddingBottom: 16,
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    chatArea: {
        flex: 1,
        backgroundColor: "#fff",
        marginHorizontal: 16,
        borderRadius: 16,
        padding: 12,
        marginBottom: 8,
        minHeight: 100,
        maxHeight: undefined,
    },
    burbuja: {
        maxWidth: '80%',
        padding: 10,
        borderRadius: 16,
        marginVertical: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    burbujaBot: {
        backgroundColor: '#e0f7fa',
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 0,
    },
    burbujaUsuario: {
        backgroundColor: '#c8e6c9',
        alignSelf: 'flex-end',
        borderBottomRightRadius: 0,
    },
    textoBurbuja: {
        color: '#222',
        fontSize: 16,
    },
    input: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 16,
        marginRight: 8,
        marginLeft: 8,
    },
    sendButton: {
        backgroundColor: "#42796b",
        padding: 10,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 0,
    },
});

export default ChatBot;