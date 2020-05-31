import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, Text, Image, ScrollView, Dimensions } from 'react-native'
import { Button } from 'react-native-elements'
import { AuthContext } from '../context/AuthContext'
import { Context as ProfilePage } from '../context/ProfilePage'
import Loading from '../components/Loading'
import { TabView, SceneMap } from 'react-native-tab-view'
import ProfilePageReviews from '../components/ProfilePageReviews'
import Gallary from '../components/Gallary'

const initialLayout = { width: Dimensions.get('window').width }

const ProfileScreen = ({ navigation }) => {

    const { signOut } = useContext(AuthContext)
    const { state, fetchUserDetails } = useContext(ProfilePage)

    useEffect(() => {
        const userDetails = navigation.addListener('focus', () => {
            fetchUserDetails()
        })
        return userDetails
    }, [navigation])


    const [index, setIndex] = useState(0)

    const [routes] = useState([
        { key: 'first', title: 'Reviews' },
        { key: 'second', title: 'Gallary' },
    ])


    return (
        <ScrollView style={styles.scroll}>

            {
                state.user !== undefined ?
                    <View style={styles.container}>

                        <View style={{ marginTop: 20, alignItems: "center" }}>
                            <View>
                                <Image
                                    source={{ uri: state.user.imageUrl }}
                                    style={styles.avatar}
                                />
                            </View>
                            <Text style={styles.userNameText}>{state.user.handle}</Text>
                            <View style={styles.userBioRow}>
                                <Text style={styles.userBioText}>{state.user.bio !== undefined ? state.user.bio : null}</Text>
                            </View>

                        </View>

                        <View style={styles.buttons}>

                            <Button
                                title='Sign Out'
                                buttonStyle={{ borderColor: '#17202A', marginRight: 5 }}
                                type="outline"
                                titleStyle={{ color: '#17202A' }}
                                onPress={() => signOut()}
                            />

                            <Button
                                title="Edit Profile"
                                buttonStyle={{ borderColor: '#17202A' }}
                                type="outline"
                                titleStyle={{ color: '#17202A' }}
                                onPress={() => navigation.navigate('EditProfileScreen')}
                            />

                        </View>

                        <View>
                            <TabView
                                navigationState={{ index, routes }}
                                renderScene={SceneMap({
                                    first: () => <ProfilePageReviews data={state.user} />,
                                    second: Gallary,
                                })}
                                onIndexChange={setIndex}
                                initialLayout={initialLayout}
                            />
                        </View>

                    </View> :
                    <Button
                        title='Sign Out'
                        buttonStyle={{ borderColor: '#17202A', marginRight: 5 }}
                        type="outline"
                        titleStyle={{ color: '#17202A' }}
                        onPress={() => signOut()}
                    />
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
        marginTop: 10,
        marginBottom: 10
    },

})

export default ProfileScreen