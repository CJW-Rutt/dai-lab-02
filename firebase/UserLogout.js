import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Layout, Button, Text, Avatar } from '@ui-kitten/components';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.config";

export default function UserLogout() {
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserEmail(user.email);
            } else {
                console.log('ERROR: USER NOT SIGNED IN?!');
            }
        });

        return () => unsubscribe();
    }, []);

    const logoutUser = async () => {
        await signOut(auth);
        console.log("User Logged Out");
    }

    const userName = userEmail ? userEmail.split('@')[0] : '';

    return (
        <Layout style={styles.container}>

            { userEmail && <Text style={styles.welcomeText}>USER LOGGED IN:</Text> }
            <Pressable onPress={logoutUser}>
                <Avatar
                    style={styles.avatar}
                    source={require('../assets/vanilla_ice.png')}
                />
            </Pressable>
            <Text style={styles.text}>Welcome, {userName}</Text>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#353839'
    },
    welcomeText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
        color: '#fff'
    },
    text: {
        fontSize: 16,
        marginVertical: 10,
        color: '#fff'
    },
    avatar: {
        width: 90,
        height: 90,
        marginVertical: 10,
    },
});
