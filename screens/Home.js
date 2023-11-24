
import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { SIZES } from '../constants';
import { useHeaderHeight } from '@react-navigation/elements';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import UserEmailSignIn from '../firebase/UserEmailSignIn';
import UserRegistration from '../firebase/UserRegistration';

import BackButton from '../components/BackButton';
import LoggedInView from '../components/LoggedInView';

import stylesHome from './Home.styles';

export default function Home({ navigation }) {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(true);
    const [showBackButton, setShowBackButton] = useState(false);

    const headerHeight = useHeaderHeight();

    useEffect(() => {
        setShowBackButton(!showLogin || !!user);

        navigation.setOptions({
            headerLeft: () => showBackButton ? (
                <BackButton 
                    onBackToLogin={() => {
                        setShowLogin(true); 
                        setShowBackButton(false); 
                    }}
                    onLogout={() => {
                        signOut(auth);
                        setUser(null); 
                        setShowBackButton(false);
                    }}
                    userLoggedIn={!!user}
                />
            ) : null,
        });
    }, [navigation, user, showLogin, showBackButton]);

    const dynamicStyles = StyleSheet.create({
        container: {
            flex: 0,
            height: SIZES.height - headerHeight,
            backgroundColor: '#353839',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingBottom: 50,
        },
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                setShowLogin(true);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <View style={dynamicStyles.container}>
            {
                user && <LoggedInView />
            }
            {
                !user && showLogin && 
                    <UserEmailSignIn onRegisterPress={() => setShowLogin(false)} />
            }
            {
                !user && !showLogin && 
                    <UserRegistration onRegistered={() => setShowLogin(true)} />
            }
        </View>
    );
}