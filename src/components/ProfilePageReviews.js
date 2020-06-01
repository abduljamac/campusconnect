import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, Alert, Text } from 'react-native'
import { Context as Review } from '../context/Review'
import { ListItem } from 'react-native-elements'
import Loading from './Loading'
import CampusConnectApi from '../api/CampusConnectApi'


const ProfilePageReviews = ({ navigation, data }) => {

    const { state, getAllUserReviews } = useContext(Review)

    useEffect(() => {
        getAllUserReviews()
    }, [navigation])


    const deleteReview = (reviewId) => {
        CampusConnectApi.delete(`/reviews/${reviewId}`)
            .then(() => {
                Alert.alert("Review succesfully deleted")
                getAllUserReviews()
            })
            .catch(err => {
                Alert.alert(error)
            })
    }

    return (
        <View style={[styles.scene]}>
            {
                state !== undefined ? (
                    <FlatList
                        data={state}
                        extraData={state}
                        renderItem={({ item }) => {
                            if (item.userHandle == data.handle) {
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
                                        onLongPress={() => deleteReview(item.reviewId)}
                                    />
                                )
                            } else {
                                return null
                            }
                        }}
                        keyExtractor={(item) => item.createdAt}
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