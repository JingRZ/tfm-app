
import { View, Text, StyleSheet, TextInput } from "react-native";
import StyledButton from "../components/StyledButton";
import { useState, useEffect } from "react";
import useLogin from "../hooks/useLogin";


const LoginView = ({ route, navigation }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { error, handleLogin } = useLogin();
   
    const onLoginPress = () => {
        if (username && password) {
            handleLogin({ username, password });

        } else {
            console.error('Invalid credentials')
        }
    };

    useEffect(() => {
        if (!error) {
            navigation.navigate('MainPage', { activeTab: 'CardList' });    //you've set login inside MainPage, thats why doesnt work!!!!
        }
    }, [error, navigation]);

    return (
        <View style={styles.container}>
            {error 
                && <Text style={styles.errorText}>{error}</Text>}

            <TextInput
                placeholder='Username'
                style={styles.input}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder='Password'
                style={styles.input}
                onChangeText={setPassword}
                secureTextEntry
            />

            <View style={styles.forgotPasswordContainer}>
                <StyledButton>
                    <Text style={styles.forgotPassword}>Forgot my password</Text> 
                </StyledButton>
            </View>
      
            <StyledButton 
                align='center' 
                fontSize='heading'
                style={styles.loginButton}
                onPress={onLoginPress}
                >
                <Text style={styles.loginButtonText}>Log In</Text>
            </StyledButton>

            <View style={styles.createAccountContainer}>
                <StyledButton>
                    <Text style={styles.createAccount}>Create Account</Text> 
                </StyledButton>
            </View>

            
       
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    input: {
        width: '95%',
        height: 40,
        backgroundColor: '#FFF',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    forgotPasswordContainer: {
        width: '95%',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    forgotPassword: {
        color: '#007BFF',
        marginBottom: 20,
        alignContent: 'flex-start',
    },
    loginButton: {
        backgroundColor: '#FF9500',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginButtonText: {
        fontWeight: 'semibold',
    },
    createAccountContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    createAccount: {
        color: '#007BFF',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default LoginView