import React, { useContext, useEffect } from 'react'
import { StyleSheet, View, FlatList, Text} from 'react-native'
import { ListItem , Button} from 'react-native-elements'
import { Context as Feed } from '../context/Feed'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/Loading'

const FreelancerFeedScreen = ({ navigation }) => {

    const { navigate } = useNavigation()
    const { state, fetchUsers } = useContext(Feed)
    const { params } = useRoute()
    const { categories, userUni } = params

    useEffect(() => {
        const users = navigation.addListener('focus', () => {
            fetchUsers()
        })
        return users
    }, [navigation])

    console.log(state)

    return (
        <View>
            {
                state !== undefined ? (
                    <FlatList
                        data={state}
                        keyExtractor={(item) => item.userId}
                        renderItem={({ item }) => {
                            if (item.category === categories.category && item.uni === userUni) {
                                return (
                                    <ListItem
                                        key={item.userId}
                                        leftAvatar={{ source: { uri: item.profileImage } }}
                                        title={item.handle}
                                        rightTitle={item.price}
                                        // subtitle={item.bio}
                                        subtitle={
                                            <View style={styles.subtitleView}>
                                                <Text style={styles.subtitle}>{item.bio}</Text>
                                                <Text style={{ borderColor: '#17202A', marginRight: 3 }}> {item.category} </Text>
                                            </View>
                                        }
                                        titleStyle={styles.title}
                                        onPress={() => navigate('FreelancerPage', { freelancer: item })}
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