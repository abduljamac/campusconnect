import React, { useContext, useEffect } from 'react'
import { StyleSheet, View, SafeAreaView, Button, FlatList } from 'react-native'
import { Context as Review } from '../context/Review'
import { ListItem } from 'react-native-elements'
import Loading from './Loading'

const ProfilePageReviews = ({ navigation }) => {

    const { state, getAllReviews } = useContext(Review)

    useEffect(() => {
        getAllReviews()
    }, [navigation])

    // console.log(state)
    // console.log(freelancer)

    return (
        <View>
                {
                    state !== undefined ? (
                        <FlatList
                            data={state}
                            renderItem={({ item }) => {
                                    return (
                                        <ListItem
                                            key={item.freelancerId}
                                            leftAvatar={{ source: { uri: item.userImage } }}
                                            title={item.userHandle}
                                            rightTitle={item.createdAt.split("T")[0]}
                                            subtitle={item.body}
                                            titleStyle={styles.title}
                                            subtitleStyle={styles.subtitle}
                                            rightTitleStyle={styles.rightTitle}
                                        />
                                    )
                            }}
                            keyExtractor={(item) => item.createdAt}
                            extraData={state}
                        />
                    ) : <Loading />
                }
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
    },
    rightTitle: {
        fontSize: 11
    }
})

export default ProfilePageReviews