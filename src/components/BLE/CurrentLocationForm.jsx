import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import StyledButton from '../StyledButton';

const CurrentLocationForm = ({onSubmit}) => {
    const [start, setStart] = useState('');

    const handleSubmit = () => {
        onSubmit({ start });
    }
    
    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder="Start"
                onChangeText={setStart}
                value={start}
            />
            <StyledButton onPress={handleSubmit} style={styles.btn}>
                <Text>Submit</Text>
            </StyledButton>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#F28F2B',
    },
});


export default CurrentLocationForm;