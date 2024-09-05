import React from "react"
import theme from '../theme'
import { Text, View, TouchableOpacity, StyleSheet } from "react-native"
import {useState} from 'react';
import StyledText from "../StyledText";

const styles = StyleSheet.create({
    textAlignCenter: {
        textAlign: 'center',
    },
    subsubheading: {
        fontSize: theme.fontSizes.subsubheading
    },
    subheading: {
        fontSize: theme.fontSizes.subheading
    },
    heading: {
        fontSize: theme.fontSizes.heading
    },
    btnNormal: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#D4D4D4',
        backgroundColor: '#D9D9D9',
    },
    btnPressed: {
        borderWidth: 0.5,
        borderColor: '#D4D4D4',
        borderRadius: 10,
        backgroundColor: '#F7B538',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    box: {
        width: '100%',
        height: 100,
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemCointainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    letterContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginStart: 30,
    },
    optionTextContainer: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

const RadioBtnGroup = ({options, onOptionSelected, fontsize, color, align, style, ...restOfProps}) => {
    const [selectedOption, setSelectedOption] = useState(null)

    const handlePress = (option) => {
        setSelectedOption(option)
        onOptionSelected(option)
    }

    return (
        <View style={styles.container}>
            {options.map((option, index) => {
                const letter = String.fromCharCode(Math.min(65 + index, 90)); // 65 is the ASCII code for 'A'
                return (
                    <TouchableOpacity 
                        onPress={() => handlePress(option)}
                        key={index}
                        style={
                            [
                                style,
                                styles.box,
                                selectedOption == option ? styles.btnPressed : styles.btnNormal
                            ]
                        } >
                            <View style={styles.itemCointainer}>
                                <StyledText style={styles.letterContainer} fontSize='heading'>{letter}.</StyledText>
                                <Text style={styles.optionTextContainer}>{option}</Text>
                            </View>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default RadioBtnGroup
