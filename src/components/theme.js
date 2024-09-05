import { Platform } from "react-native"

const theme = {
    appBar: {
        primary: '#24292e',
        textPrimary: '#fff',
        textSecondary: '#aaa',
    },
    colors: {
        textPrimary: '#24292e',
        textSecondary: '#586069',
        primary: '#0366d6',
        white: '#fefefe',
        textSubtle: '#868686',
    },
    fontSizes: {
        body: 14,
        subsubheading: 16,
        subheading: 18,
        heading: 20,
        heading2: 24,
        heading3: 28,
        heading4: 32,
    },
    fonts: {
        main: Platform.select({
            android: 'Roboto',
            ios: 'Arial',
            default: 'System'
        }),
    },
    fontWeight: {
        light: '200',
        normal: '400',
        semibold: '600',
        bold: '700',
        bold2: '900',
    }
}

export default theme