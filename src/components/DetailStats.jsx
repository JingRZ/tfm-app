import { View, Text, StyleSheet } from "react-native";
import StyledText from "./StyledText";
import formatMintoHMin from "../utils/timeFormatter";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons'

const DetailStats = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <Icon style={styles.icon} name="clock-o" size={20} />
                <StyledText fontSize='subheading' fontWeight='semibold'>{formatMintoHMin(props.duration)}</StyledText>
            </View>
            <View style={styles.item}>
                <Icon style={styles.icon} name="flag-o" size={20} />
                <StyledText fontSize='subheading' fontWeight='semibold' >{props.checkpoints}</StyledText>
            </View>
            <View style={styles.item}>
                <FontAwesomeIcon  style={styles.icon} icon={faCoins} />
                <StyledText fontSize='subheading' fontWeight='semibold'>{props.coins}</StyledText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderTopColor: '#797979',
        borderTopWidth: 1,
        borderBottomColor: '#797979',
        borderBottomWidth: 1,
        marginVertical: 10,
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon:{
        marginRight: 5,
    }
   
});

export default DetailStats