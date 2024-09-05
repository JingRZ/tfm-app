import { Text, View, ActivityIndicator, StyleSheet, BackHandler, Alert } from "react-native";
import {useContext, useEffect, useState, useRef, useCallback } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NFCView from "../components/NFC/NFCView";
import HistoryView from "../components/CardGame/HistoryView";
import Icon from "react-native-vector-icons/FontAwesome";
import CardContext from "../context/CardContext";
import CurrentTaskView from "./CurrentTaskView";
import useCardProgressUpdate from "../hooks/useCardProgressUpdate";
import AuthContext from "../context/AuthContext";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    const { cardCode, step } = useContext(CardContext);
    const { finished, currentStep, error, loading } = useCardProgressUpdate({cardCode, step});
    const [stp, setStep] = useState(step||currentStep);

    const {token} = useContext(AuthContext);
    //const progress = { step, finished };

    /*
    useEffect(() => {
        if (token && handleUpdate) {
            handleUpdate();
        }
    }, [token, handleUpdate]);
*/


    useEffect(() => {
        if (currentStep && currentStep > 0) {
            setStep(currentStep);
        }
    }, [step, currentStep, finished]);

    if (loading || loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
            </View>
        );
    }
    
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
                initialParams={{cardCode, step:step}}
                listeners={({navigation}) => ({
                    tabPress: e => {
                        navigation.setParams({ cardCode, step:step });
                    }
                })} />
            <Tab.Screen 
                name="CurrentTask" 
                component={CurrentTaskView}
                options={{headerShown: false}}
                initialParams={{cardCode, step, finished}}
                listeners={({navigation}) => ({
                    tabPress: e => {
                        navigation.setParams({ cardCode, step, finished });
                    }
                })} />

            <Tab.Screen 
                name="History" 
                component={HistoryView} 
                options={{headerShown: false}} />
        
        </Tab.Navigator>
    );
}


const GameStart = ({ route, navigation }) => {

    const { cardCode, step } = route.params;

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
            <BottomTabs/>
        </CardContext.Provider>
    );
}

const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  

export default GameStart