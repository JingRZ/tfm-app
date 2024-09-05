import { View, StyleSheet, Text } from "react-native";
import StyledText from "../StyledText";
import StyledButton from "../StyledButton";
import { Image } from "react-native";

    

const AnswerWrong = ({navigation}) => {

    const onPress = () => {
        navigation.goBack();
    }
    
    return (
        <View style={styles.container}>
            <View styles={styles.iconContainer}>
                <Image style={styles.icon} source={require('../../img/sad-ym.png')}  />
                <View style={styles.textContainer}>
                    <StyledText fontSize='heading3' fontWeight='bold'>
                        Oops!
                    </StyledText>
                    <StyledText fontSize='subheading' fontWeight='semibold'>
                        That's not the right answer
                    </StyledText>
                </View>
            </View>
            <View style={styles.btnContainer}>
                <StyledButton onPress={onPress} fontSize='heading' style={styles.btn}>
                    <Text>Try Again</Text>
                </StyledButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    icon: {
        flex: 1,
        maxHeight: '30%',
        maxWidth: '80%',
        resizeMode: 'contain',
        marginTop: 200,
    },
    iconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end'
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#F28F2B',
        borderRadius: 10,
        margin: 20,
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },

})

export default AnswerWrong