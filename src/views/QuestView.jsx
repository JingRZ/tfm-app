import {SafeAreaView, StyleSheet, ScrollView } from "react-native";
import QuestItem from "../components/CardGame/QuestItem";
import CardContext from "../context/CardContext";

const QuestView = ({ route, navigation }) => {
    const { gameid, step } = route.params.tagDetails;
    return (
        <SafeAreaView >
            <ScrollView>
                <CardContext.Provider value={{gameid, step}}>
                    <QuestItem />
                </CardContext.Provider>
            </ScrollView>
        </SafeAreaView>
    );
}


export default QuestView