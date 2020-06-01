import React, { useContext, useEffect } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Context as Feed } from '../context/Feed'
import { useRoute } from '@react-navigation/native'
import {useNavigation} from '@react-navigation/native'
import Loading from '../components/Loading'

const FreelancerFeedScreen = ({ navigation }) => {

    const { navigate } = useNavigation()
    const { state, fetchUsers } = useContext(Feed)
    const { params } = useRoute()
    const { categories } = params

    useEffect(() => {
        const users = navigation.addListener('focus', () => {
            fetchUsers()
        })
        return users
    }, [navigation])

    return (
        <View>
            {
                state !== undefined ? (
                    <FlatList
                        data={state}
                        keyExtractor={(item) => item.userId}
                        renderItem={({ item }) => {
                            if (item.category == categories.category) {
                                return (
                                    <ListItem
                                        key={item.userId}
                                        leftAvatar={{ source: { uri: item.profileImage } }}
                                        title={item.handle}
                                        rightTitle={item.price}
                                        subtitle={item.bio}
                                        titleStyle={styles.title}
                                        subtitleStyle={styles.subtitle}
                                        onPress={ () => navigate('FreelancerPage' , { freelancer: item  } ) }
                                    />
                                )
                            } else {
                                return null
                            }
                        }}
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
    }
})

export default FreelancerFeedScreen