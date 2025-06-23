import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    form: {
        flex: 1,
        marginTop: 40,
        paddingHorizontal: 30,
    },
    label: {
        color: '#BDBDBD',
        fontSize: 12,
        marginBottom: 10,
        letterSpacing: 1,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#F2F2F2',
        borderRadius: 20,
        paddingHorizontal: 18,
        paddingVertical: 12,
        fontSize: 16,
        marginBottom: 24,
        color: '#333',
    },
    button: {
        backgroundColor: '#3D7A64',
        borderRadius: 20,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'lowercase',
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 40,
        padding: 8,
        zIndex: 10,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    title: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle:{
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    header: {
        width: '100%',
        minHeight: 180,
        paddingTop: 40,
        paddingBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default styles;