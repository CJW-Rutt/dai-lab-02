import React from 'react';
import { Button, Pressable, Text } from 'react-native';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

export default function BackButton({ onBackToLogin, onLogout, userLoggedIn }) {
    const handlePress = () => {
        if (userLoggedIn) {
            signOut(auth).then(onLogout).catch(error => console.error("Logout Error:", error));
        } else {
            onBackToLogin();
        }
    };

  return (
    <Pressable onPress={handlePress}>
        <Text style={{ fontSize: 40, color: 'white', fontWeight: 'bold', marginBottom: 13, marginRight: 5, }}>←</Text>
    </Pressable>
  );
}
