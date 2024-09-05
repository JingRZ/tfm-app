import { View, StyleSheet, Text } from "react-native";
import useCheckAns from "../hooks/useCheckAns";
import AnswerRight from "../components/CardGame/AnswerRight";
import AnswerWrong from "../components/CardGame/AnswerWrong";


const CheckAnswer = ({ route, navigation }) => {

    const {code, answer, gameid, step} = route.params;
    const {isCorrect, finished, loading} = useCheckAns(code, answer)

    if (loading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }

    return (
        <View style={styles.wrapper}>
           {isCorrect 
                ? <AnswerRight navigation={navigation} cardCode={gameid} step={step} finished={finished} /> 
                : <AnswerWrong navigation={navigation}/>}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      justifyContent: 'center',
    },
    
  });
  

export default CheckAnswer