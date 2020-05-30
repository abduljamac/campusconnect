import React, { useState, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import Spacer from '../components/Spacer'
import { AuthContext } from '../context/AuthContext'

const EditProfileScreen = () => {

    const [bio, setBio] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [number, setNumber] = useState('')

    const { editProfile } = useContext(AuthContext)

    return (
        <View style={styles.container}>
            <Spacer>
                <Text h3 style={styles.header}> Edit Profile </Text>
            </Spacer>

            <Spacer>
                <Input
                    label='Bio'
                    value={bio}
                    onChangeText={newText => setBio(newText)}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </Spacer>

            <Spacer>
                <Input
                    label='Category'
                    value={category}
                    onChangeText={newText => setCategory(newText)}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </Spacer>

            <Spacer>
                <Input
                    label='Price'
                    value={price}
                    onChangeText={newText => setPrice(newText)}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </Spacer>

            <Spacer>
                <Input
                    label='Phone Number'
                    value={number}
                    onChangeText={newText => setNumber(newText)}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </Spacer>

            <Spacer>
                <Button
                    buttonStyle={{ backgroundColor: '#273746' }}
                    title="Submit Details"
                    onPress={() => editProfile({ bio, category, price, number })}
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
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    footerText: {
        fontSize: 16,
        // fontFamily: "Helvetica Neue",
        color: "#273746"
    },
    footerNav: {
        fontSize: 16,
        color: "#17202A",
        fontWeight: "500",
        // fontFamily: "Helvetica Neue"
    }
})

export default EditProfileScreen