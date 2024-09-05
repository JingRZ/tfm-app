import CardDetail from "../views/CardDetail";
import CardList from "./CardGame/CardList";
import GameStart from "../views/GameStart";
import GameStartNoUser from "../views/GameStart.NoUser";
import QuestView from "../views/QuestView";
import LoginView from "../views/LoginView";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CheckAnswer from "../views/CheckAnswer";
//import MainPage from "./MainPage";
import CurrentTaskView from "../views/CurrentTaskView";
import ScanDeviceList from "./BLE/ScanDeviceList";
import BLENavigationView from "../views/BLENavigationView";
import GamePage from "./Main/GamePage";
import NewsPage from "./Main/NewsPage";
import MainPage from "./Main/MainPage";
import NavigationPage from "./Main/NavigationPage";
import NFCView from "./NFC/NFCView";

const Stack = createNativeStackNavigator();

const Main = () => {

    return (
        <Stack.Navigator initialRouteName="MainPage">
            <Stack.Screen name="BLENavigationView" component={BLENavigationView} />
            <Stack.Screen 
                name="GamePage" 
                component={GamePage}
                options={{
                    headerTransparent: true,
                    headerTitle: '',
                    headerTintColor: '#000',
                }} />
            <Stack.Screen 
                name="NewsPage" 
                component={NewsPage}
                options={{
                    headerTransparent: true,
                    headerTitle: '',
                    headerTintColor: '#000',
                }} />
            <Stack.Screen 
                name="NavigationPage" 
                component={NavigationPage}
                options={{
                    headerTransparent: true,
                    headerTitle: '',
                    headerTintColor: '#000',
                }} />

            <Stack.Screen 
                name="MainPage" 
                component={MainPage}
                options={{headerShown: false}} />

            <Stack.Screen name="CardList" component={CardList} />

            <Stack.Screen name="CurrentTask" component={CurrentTaskView} options={{headerShown: false}} />
            <Stack.Screen name="LoginView" component={LoginView} options={{headerShown: false}} />
            
            <Stack.Screen name="NFC" component={NFCView} options={{headerShown: false}}/>
            <Stack.Screen name="GameStart" component={GameStart} options={{headerShown: false}} />
            <Stack.Screen name="GameStart.NoUser" component={GameStartNoUser} options={{headerShown: false}} />
            <Stack.Screen name="ScanDeviceList" component={ScanDeviceList} />

            <Stack.Screen 
                name="CardDetail" 
                component={CardDetail} 
                options={{
                    headerTransparent: true,
                    headerTitle: '',
                    headerTintColor: '#000',
                }} />
            <Stack.Screen 
                name="QuestView" 
                component={QuestView}
                options={{
                    headerTransparent: true,
                    headerTitle: '',
                    headerTintColor: '#000',
                }} />
            
            <Stack.Screen 
                name="CheckAnswer" 
                component={CheckAnswer}
                options={{
                    headerTransparent: true,
                    headerTitle: '',
                    headerTintColor: '#000',
                }}  />
        </Stack.Navigator>
    )
}

export default Main;