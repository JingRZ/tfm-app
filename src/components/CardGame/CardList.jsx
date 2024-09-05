import { View, FlatList, Text, StyleSheet, Dimensions, ActivityIndicator, RefreshControl, Platform } from "react-native"
import useCards from "../../hooks/useCards"
import CardItem from "./CardItem"
//import Constants from 'expo-constants';
import { useState, useCallback } from "react";
import PullToRefresh from 'react-simple-pull-to-refresh';

const EmptyCardList = () => {
    return (
        <View style={styles.center}>
            <ActivityIndicator size="large" />
            <Text>Loading cards</Text>
        </View>
    )
}


const CardList = ({ navigation }) => {

    const {cards, refetch} = useCards()

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await refetch();
        
        setRefreshing(false);
    }, [refetch]);

    const screenWidth = Dimensions.get('window').width;
    const cardWidth = 200;
    const numColumns = Math.floor(screenWidth / cardWidth);

    const TheList = () => {
        return (
            <FlatList 
            data={cards}
            numColumns={numColumns}
            style={styles.cardList}
            ItemSeparatorComponent={() => <Text> </Text>}
            renderItem={({item}) => (
                <CardItem {...item} navigation={navigation} />
            )} 
            ListEmptyComponent={EmptyCardList}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        />
        )
    }

    if(Platform.OS === 'web'){

        return (
            <PullToRefresh onRefresh={onRefresh}>
                <TheList />
            </PullToRefresh>
        )
    } else {
        return (
            <View style={styles.container}>
                <TheList />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',

    },
    cardList: {
        flex: 1,
        //marginTop: Constants.statusBarHeight,
        paddingHorizontal: 10,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default CardList