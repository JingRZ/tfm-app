import React from "react"
import { Text, StyleSheet } from "react-native"
import theme from './theme'

const styles = StyleSheet.create({
    text: {
        fontSize: theme.fontSizes.body,
        color: theme.colors.textPrimary,
        fontFamily: theme.fonts.main,
        fontWeight: theme.fontWeight.normal
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
    heading2: {
        fontSize: theme.fontSizes.heading2
    },
    heading3: {
        fontSize: theme.fontSizes.heading3
    },
    bold: {
        fontWeight: theme.fontWeight.bold
    },
    bold2: {
        fontWeight: theme.fontWeight.bold2
    },
    semibold: {
        fontWeight: theme.fontWeight.semibold
    },
    light: {
        fontWeight: theme.fontWeight.light
    },
    colorPrimary: {
        color: theme.colors.primary
    },
    colorSecondary: {
        color: theme.colors.textSecondary
    },
    colorSubtle: {
        color: theme.colors.textSubtle
    },
    textAlignCenter: {
        textAlign: 'center'
    }
})

export default function StyledText ({children, color, align, fontSize, fontWeight, style, ...restOfProps}) {
    const textStyles = [
        styles.text,
        align == 'center' && styles.textAlignCenter,
        color == 'primary' && styles.colorPrimary,
        color == 'seconday' && styles.colorSecondary,
        fontSize == 'subheading' && styles.subheading,
        fontSize == 'subsubheading' && styles.subsubheading,
        fontSize == 'heading' && styles.heading,
        fontSize == 'heading2' && styles.heading2,
        fontSize == 'heading3' && styles.heading3,
        fontSize == 'colorSubtle' && styles.colorSubtle,
        fontWeight == 'bold' && styles.bold,
        fontWeight == 'bold2' && styles.bold2,
        fontWeight == 'semibold' && styles.semibold,
        fontWeight == 'light' && styles.light,
        style   //Se coloca el styles que tiene asignado el objeto aquí para que sobrescriba todo lo demás
    ]
    return (
        <Text style={textStyles}>
            {children}
        </Text>
    )
}