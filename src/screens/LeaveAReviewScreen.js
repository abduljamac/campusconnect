import React, { useState, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { Input, Button, Text } from 'react-native-elements'
import Spacer from '../components/Spacer'
import { Context as Review } from '../context/Review'


const LeaveAReviewScreen = () => {

    const { params } = useRoute()
    const { freelancer } = params

    const [body, setBody] = useState('')
    const { sendReview } = useContext(Review)

    let freelancerId
    if(freelancer !== undefined){
        freelancerId = freelancer.userId 
    } else {
        freelancerId = null
    }

    return (
        <View style={styles.container}>

            <Spacer>
                <Text h3 style={styles.header}> Leave A Review! </Text>
            </Spacer>

            <Spacer>
                <Input
                    placeholder="Comment"
                    value={body}
                    multiline={true}
                    onChangeText={newText => setBody(newText)}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </Spacer>

            <Spacer>
                <Button
                    buttonStyle={{ backgroundColor: '#273746' }}
                    title="Submit Review"
                    onPress={() => sendReview({ body, freelancerId })}
                />
            </Spacer>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 200
    },
})

export default LeaveAReviewScreen
