import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Store the email and password locally
        console.log('Email:', email);
        console.log('Password:', password);

        // Navigate to the main app
        navigation.navigate('Main');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Log In</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Log In" onPress={handleLogin} color="#003071" />
            <Button title="Don't have an account? Sign Up" onPress={() => navigation.navigate('SignUp')} color="#003071" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
        color: '#003071',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
    },
});

export default Login;