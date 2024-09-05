import { View, StyleSheet, RefreshControl, Platform, ScrollView, StatusBar } from "react-native";
import StyledText from "./StyledText";
import CardImage from "./CardGame/CardImage";
import { TabView, SceneMap } from 'react-native-tab-view';
import { useState, useEffect, useCallback } from "react";
import useUser from "../hooks/useUser";
import { ScrollView as WebScrollView } from 'react-native-web';

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);
const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});

const renderTabBar = props => (
    <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: 'white' }}
        style={{ backgroundColor: 'pink' }}
    />
);


const ProfileHeaderStats = ({user}) => {
    
    return (
        <View style={styles.headerStats}>
            <View style={styles.headerStatsText}>
                <StyledText fontSize='heading'>
                    {user ? user.cards.length : 0}
                </StyledText>
                <StyledText fontSize='subsubheading'>
                    Completed
                </StyledText>
            </View>
            
           <View style={styles.headerStatsText}>
                <StyledText fontSize='heading'>
                    {user ? user.coins : 0}
                </StyledText>
                <StyledText fontSize='subsubheading'>
                    Coins
                </StyledText>
            </View>
            
            <View style={styles.headerStatsText}>
                <StyledText fontSize='heading'>
                    12k
                </StyledText>
                <StyledText fontSize='subsubheading'>
                    StuffIDK
                </StyledText>
            </View>
        </View>
        
    )
}


const TabBar = () => {

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
    ]);

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
        />
    )
}

const ProfileHeader = () => {
    
    const {user, refetch} = useUser();
    console.log("user", user)

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }, [refetch]);

    const ScrollViewComponent = Platform.OS === 'web' ? WebScrollView : ScrollView;
    
    return (
        <ScrollViewComponent
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {user && 
                <>
                    <View style={styles.headerContainer}>
                        <CardImage style={[
                                            styles.image,
                                            styles.headerImage
                                            ]}/>
                        <StyledText fontSize='heading'>
                            {user ? user.username : "Loading..."}
                        </StyledText>
                    </View>
                
                
                    <ProfileHeaderStats user={user} />
                </>
            }
        </ScrollViewComponent>
    )
}


const Profile = ({route, navigation}) => {
    
    return (
        <View style={styles.container}>
            <ProfileHeader />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20
    },
    headerImage: {
        marginRight: 20
    },
    headerStats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 20
    },
    headerStatsText: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 80 / 2,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "gray"
      }

})

export default Profile