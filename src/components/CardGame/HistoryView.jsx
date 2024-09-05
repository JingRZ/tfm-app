import { createDrawerNavigator } from "@react-navigation/drawer";
import { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native";

const Drawer = createDrawerNavigator();

function MainScreen({ navigation }) {
    const [text, onChangeText] = useState('');

    return (
        
        <SafeAreaView style={styles.wrapper}>
            <ScrollView style={styles.wrapper}>
                <TextInput
                    style={[
                            styles.input, 
                            styles.wrapper
                        ]}
                    onChangeText={onChangeText}
                    value={text}
                    multiline={true}
                    placeholder='You can put here some annotations'
                />
            </ScrollView>
        </SafeAreaView>
        
    );
  }
  
  function NotificationsScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
               <Text>Notifications!</Text>
      </View>
    );
  }

const SideTab = () => {
    return (
        <Drawer.Navigator>
          <Drawer.Screen name="Main Screen" component={MainScreen} />
          <Drawer.Screen name="NotificationsScreen" component={NotificationsScreen} />
        </Drawer.Navigator>
    );
}

const HistoryView = ({ route, navigation }) => {

    return (
        <>
            <SideTab />
        </>
        
    );
}

const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    
    input: {
        margin: 12,
        padding: 10,
      },
  });
  

export default HistoryView