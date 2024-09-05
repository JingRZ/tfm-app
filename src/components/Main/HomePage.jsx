import React from 'react';
import {  View, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import StyledText from '../StyledText';



const SqueezeEffect = ({childImg, childText, onPress}) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    const handlePressIn = () => {
        scale.value = withSpring(0.6);
    };

    const handlePressOut = () => {
        scale.value = withSpring(1);
        onPress();
    };

    return (
        <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
            <View style={styles.pageContainer} >
                <Animated.View style={[animatedStyle]}>
                    {childImg}
                </Animated.View>
                {childText}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row', 
    },
    pageIcon: {
        height: 70,
        width: 70,
        resizeMode: 'contain',
    },
    newsIcon: {
        height: 70,
        width: 85,
        marginEnd: 20,
    },
    pageContainer: {
        flex: 1,
        alignItems: 'center',
    }
    
});

const HomePage = ({ navigation }) => {

    const icons = [
        {img: require('../../img/adventure_icon.png'), text: 'Explora', style: styles.pageIcon, onPress: () => navigation.navigate('GamePage')},
        {img: require('../../img/navigation_icon.png'), text: 'Navega', style: styles.pageIcon, onPress: () => navigation.navigate('NavigationPage')},
        {img: require('../../img/news_icon.png'), text: 'Noticias', style: styles.newsIcon, onPress: () => navigation.navigate('NewsPage')},
    ];

    return (
        <View style={styles.header} >
            {icons.map((icon, index) => (

                <SqueezeEffect 
                    key={index} 
                    childImg={<Image source={icon.img} style={icon.style} />} 
                    childText={<StyledText fontSize='subsubheading'>{icon.text}</StyledText>} 
                    onPress={icon.onPress}/>
            ))}
        </View>
    )
}



export default HomePage;