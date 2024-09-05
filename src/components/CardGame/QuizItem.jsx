import { View, Image, StyleSheet, Text, TouchableHighlight } from "react-native";
import StyledText from "../StyledText";
import CardImage from "./CardImage";
import RadioBtnGroup from "./RadioBtnGroup";
import StyledButton from "../StyledButton";
import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import CardContext from "../../context/CardContext";


       


const QuizItemFooter = ({onPress}) => {
    return (
        <View style={styles.submitBtnContainer}>
            <StyledButton fontSize='subheading' onPress={onPress} style={styles.submitButton}>
                <Text >Submit</Text>
            </StyledButton>
        </View>
    )
}
    

const QuizItem = ({quest}) => {
    const { question, options, image, code } = quest;
    const {gameid, step} = useContext(CardContext);

    const navigation = useNavigation();

    const [selectedOption, setSelectedOption] = useState("");

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    }; 

    const handleSubmit = () => {
        navigation.navigate('CheckAnswer', {code, answer:selectedOption, gameid, step});
    }

    return (
        <View style={styles.container}>
            <CardImage img={image} style={styles.image}/>
        
            <View style={styles.scrollContainer}>
                <StyledText style={styles.question} fontSize='heading' fontWeight='bold'>{question}</StyledText>
                <RadioBtnGroup options={options  || []} onOptionSelected={handleOptionSelect} style={styles.body}/>
                <QuizItemFooter onPress={handleSubmit}/>
            </View>
           
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '100%',
        backgroundColor: '#FFF',
        flex: 1,
        height: 300,
        marginBottom: -15
    },
    scrollContainer: {
        flex: 2,
        padding: 20,
        alignItems: 'flex-start',
        backgroundColor: '#F0F0F0',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    body: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 5,
        
    },
    submitBtnContainer: {
        flex: 1,
        width: '100%',
    },
    submitButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        backgroundColor: '#F28F2B',
        borderRadius: 10,
        marginVertical: 10,
    },
    question: {
        marginVertical: 10,
    }
})

export default QuizItem