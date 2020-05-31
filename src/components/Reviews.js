import React, { useContext, useEffect } from 'react'
import { StyleSheet, View, SafeAreaView, Button, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Context as Review } from '../context/Review'
import { ListItem } from 'react-native-elements'
import Loading from './Loading'

const Reviews = ({ navigation, freelancer }) => {

    const { navigate } = useNavigation()

    const { state, getAllReviews } = useContext(Review)

    useEffect(() => {
        getAllReviews()
    }, [navigation])

    // console.log(state)
    // console.log(freelancer)

    return (
        <SafeAreaView>
            <View>
                <Button
                    title='Leave a Review!'
                    buttonStyle={{ borderColor: '#17202A', marginRight: 5 }}
                    onPress={() => navigate('LeaveAReviewScreen', { freelancer: freelancer })}
                />
            </View>

            <View>
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
            </View>
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