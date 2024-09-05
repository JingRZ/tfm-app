import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../Profile';
import LoginView from '../../views/LoginView';
import HomePage from './HomePage';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {

    const {token} = useContext(AuthContext);

    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;

            if (route.name === 'HomePage') {
              iconName = focused
                ? 'circle'
                : 'circle-o';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'bookmark' : 'bookmark-o';
            } else {
                iconName = focused ? 'user' : 'user-o';
            }

            return <Icon name={iconName} size={17} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
            <Tab.Screen 
                name="HomePage" 
                component={HomePage}
                options={{headerShown: false}}/>
            
            {token ? <Tab.Screen 
                name="Profile" 
                component={Profile} 
                options={{headerShown: false}} />
                :
                <Tab.Screen 
                name="LoginView" 
                component={LoginView} 
                options={{headerShown: false}} /> }

        </Tab.Navigator>
    );
}

const MainPage = ({ navigation }) => {
    return (
        <BottomTabs />
    )
}



export default MainPage;