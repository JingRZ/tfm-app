import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import {useState} from 'react';
import StyledButton from "../components/StyledButton";
import useCheckAns from "../hooks/useCheckAns";
import AnswerRight from "../components/AnswerRight";
import AnswerWrong from "../components/AnswerWrong";
import StyledText from "../components/StyledText";



const UnrelatedTag = ({ navigation }) => {

    return (
        //View does not have a onPress attribute, so we use TouchableOpacity
        <TouchableOpacity style={styles.wrapper} onPress={() => navigation.goBack()}>
            <View>
                <StyledText fontSize='heading'>Oops</StyledText>
                <StyledText fontSize='subheading'>Unrelated Tag</StyledText>
                <StyledText fontSize='subsubheading'>This tag is not the one you are looking for</StyledText>
            </View>
            <StyledText fontSize='subsubheading'>Touch anywhere to continue</StyledText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      justifyContent: 'space-between',

    },
  });
  

export default UnrelatedTag