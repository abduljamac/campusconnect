import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AsyncStorage } from 'react-native'

const FavoritesScreen = ({ navigation }) => {

    // AsyncStorage.getItem('favFreelancers', (err, result) => {
    //     console.log("**", result);
    // })

    // AsyncStorage.getAllKeys()
    //     .then((keys) => AsyncStorage.multiGet(keys)
    //         .then((data) => console.log(data)));

    // AsyncStorage.removeItem('favFreelancers')

    useEffect(() => {
        const favFreelancersArray = navigation.addListener('focus', () => {
            AsyncStorage.getItem('favFreelancers', (err, result) => {
                console.log(result);
            })
        })
        return favFreelancersArray
    }, [navigation])

    return (
        <View>
            <Text> Welcome to Messages Screen </Text>
        </View>
    )
}

const styles = StyleSheet.create({})

export default FavoritesScreen