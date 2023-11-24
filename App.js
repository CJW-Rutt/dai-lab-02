import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

import Home from './screens/Home';
import BackButton from './components/BackButton';

export default function App() {
  const Stack = createNativeStackNavigator();

	return (
		<ApplicationProvider {...eva} theme={eva.light}>
			<SafeAreaView style={{flex: 1}}>
				<NavigationContainer>
					<Stack.Navigator initialRouteName='Home'>
					<Stack.Screen 
						name="Home"
						component={Home}
						options={({ navigation }) => ({
							title: 'BCIT',
							headerStyle: {
							backgroundColor: '#003c71',
							},
							headerTintColor: '#fff',
							headerTitleStyle: {
							fontWeight: 'bold',
							},
							headerLeft: () => <BackButton navigation={navigation} />,
						})}
					/>
				</Stack.Navigator>
				</NavigationContainer>
			</SafeAreaView>
		</ApplicationProvider>
	);
}

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: '#fff',
			alignItems: 'center',
			justifyContent: 'center',
		},
	});
