import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { SIZES } from '../../constants';

export default function Chart() {

    const chartConfig = {
        backgroundGradientFrom: "#f4f4f4",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#f4f4f4",
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false
    };

    const data = {
        labels: ["New Media", "Digital Design", "Computer Systems"],
        datasets: [
            {
                data: [40, 50, 60],
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                strokeWidth: 2
            }
        ],
    };

    return (
        <View style={styles.container}>
            <LineChart
                data={data}
                width={SIZES.width}
                height={256}
                chartConfig={chartConfig}
                bezier
            />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
});
