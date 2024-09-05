import { Text, View } from 'react-native'
import { useContext } from 'react'
import CardContext from '../context/CardContext'
import useCardByCode from '../hooks/useCardByCode';
import StyledButton from '../components/StyledButton';

const GameOver = ({navigation}) => {
    const {cardCode} = useContext(CardContext);
    const {card} = useCardByCode(cardCode);

    return (
        <View>
            {card && <Text>Ganaste {card.coins} monedas wey</Text>}
            
            <StyledButton onPress={()=>navigation.navigate('MainPage')}>
                <Text>Back</Text>
            </StyledButton>
        </View>
    )
}

export default GameOver