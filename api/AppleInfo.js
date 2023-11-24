import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { SIZES } from '../constants';

export default function AppleInfo() {
    const [appleData, setAppleData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://www.fruityvice.com/api/fruit/apple')
            .then(response => response.json())
            .then(data => {
                setAppleData(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching apple data:', error);
                setIsLoading(false);
            });
    }, []);

    const renderNutritionInfo = () => {
        return Object.entries(appleData.nutritions).map(([key, value], index) => (
            <Text key={index} style={styles.nutritionText}>
                {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
            </Text>
        ));
    };

    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (!appleData) {
        return <Text>Failed to load data!</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.apple}>
                Make sure to eat an {appleData.name.toLowerCase()} a day.
            </Text>
            <View style={styles.nutritionInfo}>
                
                {renderNutritionInfo()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingLeft: 5,
        width: SIZES.width,
    },
    apple: {
        fontSize: 18,
        marginBottom: 10,
        color: '#fff'
    },
    nutritionText: {
        fontSize: 14,
        color: '#fff'
    },
});
