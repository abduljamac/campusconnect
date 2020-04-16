import React, { useContext, useEffect } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { Card, ListItem, Button, Icon, Text, Avatar } from 'react-native-elements'
import { Context as Feed } from '../context/Feed'
import Loading from '../components/Loading'

const HomeScreen = ({ navigation }) => {

    const { state, fetchFreelancers } = useContext(Feed)

    useEffect(() => {
        const freelancers = navigation.addListener('focus', () => {
            fetchFreelancers()
        })
        return freelancers
    }, [navigation])


    return (
        <View style={{ alignContent: 'center', marginTop: 10 }}>

            {state !== undefined ?
                <FlatList
                    data={state}
                    keyExtractor={item => item.userId}
                    renderItem={({ item }) => {
                        return (

                            <ListItem
                                key={item.userHandle}
                                leftAvatar={{ source: { uri: item.profileImage } }}
                                title={item.handle}
                                rightTitle={item.price}
                                subtitle={item.bio}
                                titleStyle={styles.title}
                                subtitleStyle={styles.subtitle}
                            />

                        )
                    }}
                />
                : <Loading /> }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: "black"
    },
    subtitle: {
        fontSize: 12,
        color: "black"
    }

})

export default HomeScreen