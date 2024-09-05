import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import createApolloClient from '../utils/apolloClient';
import Main from '../components/Main';
import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';

const ApolloClientComponent = ({children}) => {
    const { token } = useContext(AuthContext);

    const apolloClient = createApolloClient(token);

    return (
        <ApolloProvider client={apolloClient}>
            {children}
        </ApolloProvider>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FEFDED',
    },
});

export default ApolloClientComponent;