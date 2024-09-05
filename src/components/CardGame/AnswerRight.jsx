import { View, StyleSheet, Text, Image } from "react-native";
import StyledText from "../StyledText";
import StyledButton from "../StyledButton";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import StorageManager from "../../utils/StorageManager";
    

const AnswerRight = ({navigation, cardCode, step, finished}) => {
    const {token} = useContext(AuthContext);

    const onPress = async() => {
        if(token) {
            navigation.navigate('GameStart', {
                cardCode, 
                step: step + 1, 
                screen: 'CurrentTask'
            });
        } else {

            if(finished) {
                StorageManager.storeItem(cardCode, JSON.stringify({ step: step + 1, finish: true }));
            }

            navigation.reset({
                index: 2,
                routes: [
                    { name: 'CardList' },
                    { name: 'CardDetail', 
                        params: { 
                            code: cardCode,
                            step: step + 1,
                            finished,
                        } 
                    },
                    {
                        name: 'GameStart.NoUser',
                        params: { 
                            cardCode, step: step + 1, 
                            screen: 'CurrentTask',
                            finished,
                        },
                    }

                ],
            });
        }
    }
    
    
    return (
        <View style={styles.container}>
            <View styles={styles.iconContainer}>
                <Image style={styles.icon} source={require('../../img/hopeful-ym.png')}  />
                <View style={styles.textContainer}>
                    <StyledText fontSize='heading3' fontWeight='bold'>
                        Yay!
                    </StyledText>
                    <StyledText fontSize='subheading' fontWeight='semibold'>
                    {finished ? 'You won!' : 'Good Job'}
                    </StyledText>
                </View>

            </View>
            <View style={styles.btnContainer}>
                <StyledButton onPress={onPress} fontSize='heading' style={styles.btn}>
                    <Text>{finished ? 'Exit!' : 'Continue'}</Text>
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
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
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

})

export default AnswerRight