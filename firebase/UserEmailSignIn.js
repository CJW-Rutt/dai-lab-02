import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, View, Keyboard  } from 'react-native';
import { Layout, Input, Button, Card, Text } from '@ui-kitten/components';

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.config";

import { SIZES } from '../constants';


export default function UserEmailSignIn({ onRegisterPress }) {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

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

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            console.log(user);
        } catch (error) {
            console.log(error);
        }
    };

    const Footer = () => (
        <View style={styles.footerContainer}>
            <Pressable onPress={onRegisterPress}>
                <Text>Register</Text>
            </Pressable>
        </View>
    );

    return (
        <Layout style={styles.container}>
            <Card 
                status='info' 
                disabled={true} 
                footer={Footer} 
                style={[{ marginBottom: keyboardSize }, styles.card]}
            >
                <Text category='h6' style={styles.title}>Sign In</Text>
                <Text category='s1' style={styles.label}>Email</Text>
                <Input
                    placeholder="email..."
                    value={loginEmail}
                    onChangeText={setLoginEmail}
                    style={styles.input}
                />
                <Text category='s1' style={styles.label}>Password</Text>
                <Input
                    placeholder="Password..."
                    value={loginPassword}
                    onChangeText={setLoginPassword}
                    secureTextEntry
                    style={styles.input}
                />
                <Button
                    onPress={() => {
                        login();
                        setLoginEmail("");
                        setLoginPassword("");
                    }}
                    style={styles.footerControl}
                >
                LOGIN
            </Button>
            </Card>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    card: {
        margin: 2,
        width: SIZES.width - 40,
    },
    title: {
        textAlign: 'left',
        marginBottom: 20,
    },
    input: {
        marginVertical: 5,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: 10,
    },
    footerControl: {
        marginHorizontal: 2,
        backgroundColor: '#003c71',
        borderColor: '#003c71'
    },
});
