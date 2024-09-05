import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StyledText from '../StyledText';
import CardImage from './CardImage';
import StyledButton from '../StyledButton';
import { useContext } from 'react';
import CardContext from '../../context/CardContext';


const RiddleItem = ({quest}) => {
    const { question, image, code, description } = quest;
    const {gameid, step} = useContext(CardContext);

    const navigation = useNavigation();
    const [text, setText] = useState('');

    const handleSubmit = () => {
        navigation.navigate('CheckAnswer', {code, answer:text, gameid, step});
    }

    return (
        <View style={styles.container}>
            <CardImage img={image} style={styles.image}/>
            <View style={styles.scrollContainer}>
                <StyledText style={styles.question} fontSize='heading2' fontWeight='bold'>{question}</StyledText>
                <StyledText style={styles.question} fontSize='subsubheading'>{description}</StyledText>
                <TextInput
                    style={styles.input}
                    onChangeText={setText}
                    placeholder="Escribe la respuesta"
                />
                <View style={styles.submitBtnContainer}>
                    <StyledButton fontSize='subheading' onPress={handleSubmit} style={styles.submitButton}>
                        <Text >Submit</Text>
                    </StyledButton>
                </View>
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
        height: 300,
        marginBottom: -15
    },
    submitButton: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        flex: 1,
        backgroundColor: '#F28F2B',
    },
    scrollContainer: {
        flex: 2,
        padding: 25,
        alignItems: 'flex-start',
        backgroundColor: '#F0F0F0',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    input: {
        height: 50,
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#D9D9D9',
        padding: 10,
        marginVertical: 10,
    },
    submitBtnContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end',
    },
    submitButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#F28F2B',
        borderRadius: 10,
        marginVertical: 10,
    },
})

export default RiddleItem