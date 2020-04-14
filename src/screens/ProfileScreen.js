import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-elements';
import { AuthContext } from '../context/AuthContext'

const ProfileScreen = ({ navigation }) => {

    const { signOut } = useContext(AuthContext)

    return (
        <View>

            <Text> Profile Page </Text>

            <Button
                title='Sign Out'
                onPress={() => signOut()}
            />


        </View>
    )
}

const styles = StyleSheet.create({})

export default ProfileScreen