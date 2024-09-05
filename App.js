import 'react-native-gesture-handler';
import 'font-awesome/css/font-awesome.min.css';
import { decode } from 'base-64';
global.atob = decode;
import AuthProvider from './src/components/AuthProvider';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Main from './src/components/Main';
import { NavigationContainer } from '@react-navigation/native';
import ApolloClientComponent from './src/utils/apolloClientComponent';


export default function App() {

    return (
        <AuthProvider>
            <ApolloClientComponent>
                <View style={styles.container}>
                    <NavigationContainer>
                    <Main />
                    </NavigationContainer>
                    <StatusBar style="auto" />
                </View>
            </ApolloClientComponent>
        </AuthProvider>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFDED',
  },
});
