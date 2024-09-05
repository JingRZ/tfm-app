
import { View,  Text, ActivityIndicator, StyleSheet, Pressable, Animated, Dimensions, ImageBackground, SafeAreaView, Vibration } from "react-native";
import React, { useState, useEffect, useRef, useContext } from "react";
import CardImage from "../components/CardGame/CardImage";
import StyledText from "../components/StyledText";
import DetailStats from "../components/DetailStats";
import useCardByCode from "../hooks/useCardByCode";
import AuthContext from "../context/AuthContext";
import useCardProgressUpdate from "../hooks/useCardProgressUpdate";
import GameUtils from "../utils/GameUtils";
import Icon from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native";
import TagList from "../components/CardGame/TagList";


const DetailBody = (props) => {

    const onPress = () => {
        console.log('Reiniciar esta partida');
        GameUtils.resetProgress(props.code);
        props.reset(true);
    }

    return (
        <ScrollView style={styles.body}>
            <View  style={styles.tagList}>
                <TagList tags={props.tags} />
            </View>
            <StyledText fontSize='heading' fontWeight='bold' style={styles.bodyTitle}>{props.title}</StyledText>
            <View style={styles.locationContainer}>
                <Icon style={styles.locationIcon} name="map-marker" size={20} color="#000" />
                <StyledText fontSize='subheadiing' style={styles.bodyTitle}>{props.location}</StyledText>
            </View>
            <DetailStats {...props} />
            <View>
                <Text>{props.description}</Text>
                <Pressable onPress={onPress}>
                    <Text></Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

//<Text>Reiniciar esta partida</Text>

const { width, height } = Dimensions.get('window');


const CardDetail = ({ route, navigation }) => {

    const {card, loading} = useCardByCode(route.params.code)
    const [currentStep, setCurrentStep] = useState(route.params.step || 1);
    const [finished, setFinished] = useState(false);
    const [reset, setReset] = useState(false);
    const {token} = useContext(AuthContext);
    const  {handleUpdate, finished:fin, currentStep:curr } = useCardProgressUpdate({ cardCode: route.params.code, step: 1 });

    useEffect(() => {
        if (token && handleUpdate) {
            // Call handleUpdate only when token is available and handleUpdate is defined
            handleUpdate();
        }
    }, [token, handleUpdate]); // Dependencies array: call useEffect when token or handleUpdate changes

                
    useEffect(() => {
        setCurrentStep(curr);
        setFinished(fin);
    }, [fin, curr]);


    const animation = useRef(new Animated.Value(0)).current;
    const [buttonLayout, setButtonLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });

    const [isPressing, setIsPressing] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const [fadeAnim] = useState(new Animated.Value(0));

    const onPressIn = () => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 500,
           useNativeDriver: false
        }).start();
    };

    const onLongPress = () => {
        setIsPressing(true);
    };

    const onPressOut = () => {
        setIsPressing(false);
        Animated.timing(animation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false
        }).start();
    };

    const interpolatedColor = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['transparent', '#F28F2B']
    });
    
    const maxDimension = Math.max(width, height) * 2;

    const animatedStyle = {
        backgroundColor: interpolatedColor,
        width: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, maxDimension]
        }),
        height: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, maxDimension]
        }),
        borderRadius: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, maxDimension / 2]
        }),
        top: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [buttonLayout.y + buttonLayout.height / 2, -maxDimension / 2 + height / 2]
        }),
        left: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [buttonLayout.x + buttonLayout.width / 2, -maxDimension / 2 + width / 2]
        }),
        transform: [
          { translateX: animation.interpolate({ inputRange: [0, 1], outputRange: [0, 0] }) },
          { translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [0, 0] }) }
        ],
    };



    useEffect(() => {
        const fetch = async () => {
            try {
                if (token) {
                    setCurrentStep(currentStep);
                    console.log('currentStep', currentStep);
                } else {
                    const progress = await GameUtils.fetchProgress(route.params.code);
                    console.log('progress', progress);
                    setCurrentStep(progress.step);
                    setFinished(progress.finish);
                }
            } catch (error) {
                console.error('[useEffect] Error fetching progress:', error);
            }
        }
        fetch();
    }, [token, reset]);

    useEffect(() => {
        let timer;
        if (isPressing) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
            
            if (countdown > 0) {
                timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            } else {
                console.log('Gamestart: ' + card.code);
                Vibration.vibrate(250);
                navigation.navigate(token?'GameStart':'GameStart.NoUser', { cardCode: card.code, step:currentStep, finished });
            }
        } else {
            clearTimeout(timer);
            setCountdown(3);
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
        
        return () => clearTimeout(timer);

    }, [isPressing, countdown, fadeAnim]);

    if (loading || !card) {
        return <ActivityIndicator 
                    style={styles.center} />
    }

    
    return (
        <SafeAreaView style={[styles.container]}>
            <View style={styles.imageContainer}>
                 <CardImage img={card.image} style={{flex:1}} />
            </View>
            <View style={styles.bodyContainer}>
                <DetailBody {...card} reset={setReset} />
            </View>
            <Animated.View style={[styles.droplet, animatedStyle]} />
            {isPressing && (
                <View style={styles.overlayContainer}>
                    <ImageBackground
                        source={require('../img/waiting_animation.gif')}
                        style={styles.backgroundImage}>
                        <Animated.View style={[styles.countdownContainer, { opacity: fadeAnim }]}>
                            <Text style={styles.countdownText}>{countdown}</Text>
                        </Animated.View>
                    </ImageBackground>
                </View>
            )}
            
            <Pressable 
                onPressIn={onPressIn} 
                onLongPress={onLongPress} 
                onPressOut={onPressOut}
                onLayout={(event) => setButtonLayout(event.nativeEvent.layout)} >
                <Animated.View style={[styles.startButton]}>
                    <Text>Hold to start</Text>
                </Animated.View>
            </Pressable>
       
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        flex: 2,
        marginBottom: -15
    },
    droplet: {
        position: 'absolute',
    },
    bodyContainer: {
        flex: 3,
        overflow: 'hidden',
        backgroundColor: '#F0F0F0',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    body: {
        marginHorizontal: 20,
        textAlign: 'center',
    },
    bodyTitle: {
        textAlign: 'left',
        marginVertical: 10,
    },
    startButton: {
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#F28F2B',
    },
    center:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    countdownContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10,
    },
    overlayContainer: {
        flex: 1,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: height/3,
        width: width,
        height: 200,
    },  
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        ...StyleSheet.absoluteFillObject
    },
    countdownText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#F28F2B',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationIcon: {
        marginRight: 5,
    },
    tagList: {
        flex: 1,
        marginTop: 20,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    }


});

export default CardDetail