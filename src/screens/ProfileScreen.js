import React, { useContext, useEffect } from 'react'
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'
import { AuthContext } from '../context/AuthContext'
import { Context as ProfilePage } from '../context/ProfilePage'
import Loading from '../components/Loading'


const ProfileScreen = ({ navigation }) => {

    const { signOut } = useContext(AuthContext)
    const { state, fetchUserDetails } = useContext(ProfilePage)

    useEffect(() => {
        const userDetails = navigation.addListener('focus', () => {
            fetchUserDetails()
        })
        return userDetails
    }, [navigation])

    console.log(state.user);

    return (
        <ScrollView style={styles.scroll}>

            {

                state.user ?

                    <View style={styles.container}>

                        <View style={{ marginTop: 20, alignItems: "center" }}>
                            <View>
                                <Image
                                    source={{ uri: state.user.imageUrl }}
                                    style={styles.avatar}
                                />
                            </View>
                            <Text style={styles.userNameText}>Abdul</Text>
                            <View style={styles.userBioRow}>
                                <Text style={styles.userBioText}>Hello my name is Abdul I'm computer science tutor</Text>
                            </View>

                        </View>

                        <View style={styles.buttons}>

                            <Button
                                title='Sign Out'
                                buttonStyle={{ borderColor: '#E74C3C', marginRight: 5 }}
                                type="outline"
                                titleStyle={{ color: '#273746' }}
                                onPress={() => signOut()}
                            />
                            
                            <Button
                                title="Edit Profile"
                                buttonStyle={{ borderColor: '#E74C3C' }}
                                type="outline"
                                titleStyle={{ color: '#273746' }}
                                onPress={() => navigation.navigate('EditProfileScreen')}
                            />

                        </View>

                    </View> : <Loading />
            }


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: '#FFF',
    },
    container: {
        flex: 1
    },
    profile: {
        // marginTop: 30,
        alignItems: "center"
    },
    avatar: {
        width: 136,
        height: 136,
        borderRadius: 68
    },
    userNameText: {
        color: '#5B5A5A',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5
    },
    userBioRow: {
        marginTop: 5,
        marginLeft: 40,
        marginRight: 40,
    },
    userBioText: {
        color: 'gray',
        fontSize: 16,
        textAlign: 'center'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },

})

export default ProfileScreen