import React from 'react'
import { StyleSheet, View, Button } from 'react-native'
import {useNavigation} from '@react-navigation/native'

const Review = ({ freelancer }) => {
    
    const { navigate } = useNavigation()

    return (
        <View>
            <Button
                title='Leave a Review!'
                buttonStyle={{ borderColor: '#17202A', marginRight: 5 }}
                onPress={() => navigate('LeaveAReviewScreen', { freelancer: freelancer  })}
            />
        </View>
    )
}

const styles = StyleSheet.create({})

export default Review