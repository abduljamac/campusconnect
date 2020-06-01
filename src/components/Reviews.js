import React, { useContext, useEffect, useCallback } from 'react'
import { StyleSheet, SafeAreaView, Button, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Context as Review } from '../context/Review'
import { ListItem } from 'react-native-elements'
import Loading from './Loading'
import { useIsFocused } from '@react-navigation/native';

const Reviews = ({ navigation, freelancer }) => {

    const { navigate } = useNavigation()
    const { state, getAllReviews } = useContext(Review)
    const isFocused = useIsFocused()


    useEffect(() => {
        getAllReviews()
    }, [navigation])


    if (isFocused === false) {
        getAllReviews()
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Button
                title='Leave a Review!'
                buttonStyle={{ borderColor: '#17202A', marginRight: 5 }}
                onPress={() => navigate('LeaveAReviewScreen', { freelancer: freelancer })}
            />

            {
                state !== undefined ? (
                    <FlatList
                        data={state}
                        renderItem={({ item }) => {
                            if (item.freelancerId == freelancer.userId) {
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
                            } else {
                                return null
                            }
                        }}
                        keyExtractor={(item) => item.createdAt}
                        extraData={state}
                    />
                ) : <Loading />
            }

        </SafeAreaView>
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

export default Reviews