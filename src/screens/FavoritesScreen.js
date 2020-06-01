import React, { useEffect } from 'react'
import { StyleSheet, View, FlatList, Text, Button } from 'react-native'
import {useNavigation} from '@react-navigation/native'
import { AsyncStorage } from 'react-native'
import { ListItem } from 'react-native-elements'

const FavoritesScreen = ({ navigation }) => {

    const { navigate } = useNavigation()

    // AsyncStorage.getAllKeys()
    //     .then((keys) => AsyncStorage.multiGet(keys)
    //         .then((data) => console.log(data)))

    const [favs, setFav] = React.useState([])

    // AsyncStorage.removeItem('favFreelancers')

    useEffect(() => {
        const favFreelancersArray = navigation.addListener('focus', () => {
            AsyncStorage.getItem('favFreelancers', (err, result) => {
                // console.log("**", result);
                setFav(JSON.parse(result))
            })
        })
        return favFreelancersArray
    }, [navigation])

    console.log("favs :", favs);

    const displayData = () => {

    }
    return (
        <View>
            <View>
                <Button
                    title='Clear Favorites'
                    buttonStyle={{ borderColor: '#17202A', marginRight: 5 }}
                    onPress={() => AsyncStorage.removeItem('favFreelancers')}
                />
            </View>
            {
                favs !== undefined ? (
                    <FlatList
                        data={favs}
                        renderItem={({ item }) => {
                            return (
                                <ListItem
                                    key={item.freelancerId}
                                    leftAvatar={{ source: { uri: item.profileImage } }}
                                    title={item.handle}
                                    rightTitle={item.category}
                                    subtitle={item.bio}
                                    titleStyle={styles.title}
                                    subtitleStyle={styles.subtitle}
                                    rightTitleStyle={styles.rightTitle}
                                    onPress={ () => navigate('FreelancerPage' , { freelancer: item  } ) }
                                />
                            )
                        }}
                        keyExtractor={(item) => item.number}
                        extraData={favs}
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
        fontSize: 15,
        color: "black"
    },
    rightTitle: {
        fontSize: 15,
        fontWeight: 'bold',
    }
})

export default FavoritesScreen