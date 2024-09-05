
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useState, useLayoutEffect, useContext } from "react";
import useHint from "../hooks/useHint";
import StyledText from "../components/StyledText";
import CardImage from "../components/CardGame/CardImage";
import GameOver from "./GameOver";
import CardContext from "../context/CardContext";

const Continue = ({step}) => {
    const {cardCode} = useContext(CardContext);
    console.log("[continue] cardCode, step", cardCode, step);
    const {hint} = useHint({cardId: cardCode, step});

    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useLayoutEffect(() => {
        if (hint) {
            setTitle(hint.title);
            setContent(hint.description);
        }
        
    }, [hint]);

    if (!hint) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <CardImage img={hint.image} style={styles.image}/>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <StyledText fontSize='heading' fontWeight='bold'>
                    {title}
                </StyledText>
                <StyledText style={styles.description} fontSize='subsubheading'>
                    {content}
                </StyledText>
            </ScrollView>
        </View>
    );
}

const CurrentTaskView = ({route, navigation}) => {
    const {cardCode, step, finish} = route.params || {};
    const [cardValue, setCardValue] = useState({cardCode, step});

    useLayoutEffect(() => {
        console.log("[CurrentTaskView] cardCode, step", cardCode, step, finish);
        setCardValue({cardCode, step});
    }, [finish]);

    return (
        <CardContext.Provider value={cardValue}>
            {!finish 
                ? <Continue step={step}/>
                : <GameOver navigation={navigation}/>
            }
        </CardContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flex: 2,
        padding: 20,
        alignItems: 'flex-start',
        backgroundColor: '#F0F0F0',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    image: {
        width: '100%',
        backgroundColor: '#FFF',
        flex: 1,
        marginBottom: -15
    },
    description: {
        marginVertical: 10,
    }
    
});

export default CurrentTaskView