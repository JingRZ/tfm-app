import { View, Platform, StyleSheet, TouchableHighlight } from "react-native";
import StyledText from "../StyledText";
import TagList from "./TagList";
import Icon from "react-native-vector-icons/FontAwesome";
import CardImage from "./CardImage";
import formatMintoHMin from "../../utils/timeFormatter";
import { icon } from "@fortawesome/fontawesome-svg-core";

const CardItemHeader = (props) => (
   
    <View style={styles.header}>
       <CardImage img={props.image} style={styles.image} />
    </View>
)


const CardItemBody = (props) => {

    return (
        <View style={styles.body}>
            <StyledText fontSize='subsubheading' fontWeight='bold'>{props.title}</StyledText>
            <StyledText color='secondary'>{props.location}</StyledText>
            <View style={styles.footer}>
                <View style={styles.duration}>
                    <Icon style={styles.icon} name="clock-o" size={15} color="#000" />
                    <StyledText style={styles.duration}>{formatMintoHMin(props.duration)}</StyledText>
                </View>
                <TagList tags={props.tags} />
            </View>
        </View>
    )
}
    

const CardItem = (props) => {

    const onPress = () => {
        props.navigation.navigate('CardDetail', {code:props.code})
    }

    return (
        <TouchableHighlight 
            underlayColor="transparent" 
            style={[styles.highlightMod, styles.card]}
            onPress={onPress}>
                <View key={props.code} style={styles.container}>
                    <CardItemHeader {...props}/>
                    <CardItemBody {...props} />
                </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 10,
        backgroundColor: '#E5E5E5',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D1D1D1',
        height: 220,
    },
    highlightMod: { 
        borderRadius: 10, 
        overflow: 'hidden' 
    },
    card: Platform.OS === 'web' ? {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 10,
        margin: 10
    }: {},
    image: {
        width: '100%',
        height: Platform.OS === 'web' ? 130 : 'auto',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        flex: 1
    },
    header: {
        flexDirection: 'row', 
        paddingBottom: 5,
        flex: 1,
    },
    body: {
        paddingHorizontal: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 5,
        
    },
    duration: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginRight: 5,
    }
})

export default CardItem