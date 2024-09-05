import { BackHandler, Alert } from "react-native";
import { useEffect } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HistoryView from "../components/CardGame/HistoryView";
import Icon from "react-native-vector-icons/FontAwesome";
import CardContext from "../context/CardContext";
import CurrentTaskView from "./CurrentTaskView";
import NFCView from "../components/NFC/NFCView";

const Tab = createBottomTabNavigator();

const BottomTabs = ({cardCode, step, finished}) => {
    const progress = { step, finished };

    return (
        <Tab.Navigator
            initialRouteName="CurrentTask"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                    let iconName;
                    let size = 20;

                    if (route.name === 'NFC') {
                    iconName = focused
                        ? 'bell'
                        : 'bell-o';
                    } else if (route.name === 'History') {
                    iconName = focused ? 'bookmark' : 'bookmark-o';
                    } else if (route.name === 'CurrentTask') {
                    iconName = focused ? 'question-circle' : 'question-circle-o';
                    size = 25;
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}>

            <Tab.Screen 
                name="NFC" 
                component={NFCView}
                options={{headerShown: false}}
                initialParams={{cardCode, step:progress.step}}
                listeners={({navigation}) => ({
                    tabPress: e => {
                        navigation.setParams({ cardCode, step:progress.step });
                    }
                })} />
            <Tab.Screen 
                name="CurrentTask" 
                component={CurrentTaskView}
                key={progress.step}
                initialParams={{cardCode, step:progress.step, finish:progress.finished}}
                listeners={({navigation}) => ({
                    tabPress: e => {
                        navigation.setParams({ cardCode, step:progress.step, finish:progress.finished });
                    }
                })} />

            <Tab.Screen 
                name="History" 
                component={HistoryView} 
                options={{headerShown: false}} />
        
        </Tab.Navigator>
    );
    
}


const GameStartNoUser = ({ route, navigation }) => {

    const { cardCode, step, finished } = route.params;

    useEffect(() => {
        const onBackPress = () => {
            Alert.alert(
            'Exit Game',
            'Do you want to exit?',
            [
              {
                text: 'Cancel',
                onPress: () => {
                  // Do nothing
                },
                style: 'cancel',
              },
              { text: 'YES', onPress: () => navigation.goBack() },
            ],
            { cancelable: false }
          );
      
          return true;
        };
      
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          onBackPress
        );
      
        return () => backHandler.remove();
      }, []);


    return (
        <CardContext.Provider value={{cardCode, step}}>
            <BottomTabs cardCode={cardCode} step={step} finished={finished}/>
        </CardContext.Provider>
    );
}


export default GameStartNoUser