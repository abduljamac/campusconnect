import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Context as Feed } from '../context/Feed'
import Loading from '../components/Loading'

const FreelancerFeedScreen = ({ item , navigation }) => {

    const { state, fetchFreelancers } = useContext(Feed)

     useEffect(() => {
        const freelancers = navigation.addListener('focus', () => {
            fetchFreelancers()
        })
        return freelancers
    }, [navigation])


    console.log(state)

    return (
        <View>
            <Text> Freelancer Feed Page </Text>
        </View>
    )
}

const styles = StyleSheet.create({})

export default FreelancerFeedScreen