import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, KeyboardAvoidingView, Keyboard } from 'react-native';
import { Layout, Button, Card, Text } from '@ui-kitten/components';

import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase.config";

import { SIZES } from '../constants';

export default function UserRegistrationSignIn({ onRegistered }) {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const [keyboardSize, setKeyboardSize] = useState(0);

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", (e) => {
            setKeyboardSize(e.endCoordinates.height)
        })

        Keyboard.addListener("keyboardDidHide", (e) => {
            setKeyboardSize(e.endCoordinates.height)
        })

        return (() => {
            Keyboard.removeAllListeners("keyboardDidShow");
            Keyboard.removeAllListeners("keyboardDidHide");
        })
    }, [])

    const register = async () => {
        try {
            await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            // Log out immediately after account creation
            await signOut(auth);
            onRegistered();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <KeyboardAvoidingView>
            <Layout style={styles.container}>
                <Card 
                    status='info' 
                    disabled={true} 
                    style={[{ marginBottom: keyboardSize }, styles.card]}
                >
                    <Text category='h1' style={styles.title}>Register</Text>
                    <View style={styles.form}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email..."
                            value={registerEmail}
                            onChangeText={setRegisterEmail}
                        />
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Password..."
                            value={registerPassword}
                            onChangeText={setRegisterPassword}
                            secureTextEntry
                        />
                        <Button
                            style={styles.button}
                            title="Register User"
                            onPress={() => {
                                register();
                                setRegisterEmail("");
                                setRegisterPassword("");
                            }}
                        >REGISTER USER</Button>
                    </View>
                </Card>
            </Layout>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    form: {
        width: '80%',
    },
    header: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 0,
        padding: 5,
        marginVertical: 5,
    },
    card: {
        margin: 2,
        width: SIZES.width - 40,
    },
    label: {
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#003c71',
        borderColor: '#003c71'
    }
});
