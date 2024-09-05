import { Platform } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import CardList from "./CardGame/CardList";
import Profile from "./Profile";
import LoginView from "../views/LoginView";
import ScanDevices from "./BLE/ScanDevices.native";
import {ScanDevices as ScanDevicesWeb} from "./BLE/ScanDevices.web";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;

            if (route.name === 'CardList') {
              iconName = focused
                ? 'circle'
                : 'circle-o';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'bookmark' : 'bookmark-o';
            } else {
                iconName = focused ? 'user' : 'user-o';
            }

            return <Icon name={iconName} size={15} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
            <Tab.Screen 
                name="CardList" 
                component={CardList}
                options={{headerShown: false}}/>
                
            <Tab.Screen 
                name="Profile" 
                component={Profile} 
                options={{headerShown: false}} />

            <Tab.Screen 
                name="LoginView" 
                component={LoginView} 
                options={{headerShown: false}} />

            <Tab.Screen
                name="BLE"
                component={Platform.OS === 'web' ? ScanDevicesWeb : ScanDevices}
                options={{headerShown: false}} />
        </Tab.Navigator>
    );
}

const MainPage = ({ navigation }) => {
    return (
        <BottomTabs />
    )
}


export default MainPage