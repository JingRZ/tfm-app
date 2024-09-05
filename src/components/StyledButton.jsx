import React from "react"
import { StyleSheet } from "react-native"
import theme from './theme'
import { TouchableOpacity } from "react-native"

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
})

export default function StyledButton ({children, navigation, to, args, onPress, fontSize, color, align, style, ...restOfProps}) {
    const textStyles = [
        styles.text,
        align == 'center' && styles.textAlignCenter,
        fontSize == 'heading' && styles.heading,
        fontSize == 'subheading' && styles.subheading,
        fontSize == 'subsubheading' && styles.subsubheading,
        style
    ]

    const handlePress = () => {
        if(navigation && to){
            navigation.navigate(to, args || {});
        }
        else{
            console.log("No navigation prop or to prop found.")
        }
    };

    return (
        <TouchableOpacity 
            onPress={onPress || handlePress} 
            style={textStyles} >
            {children}
        </TouchableOpacity>
    )
}