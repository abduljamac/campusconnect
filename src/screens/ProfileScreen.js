import React, { useContext, useEffect } from 'react'
import { View, StyleSheet, Text, Image, ScrollView, Dimensions } from 'react-native'
import { Button } from 'react-native-elements'
import { AuthContext } from '../context/AuthContext'
import { Context as ProfilePage } from '../context/ProfilePage'
import Loading from '../components/Loading'


import { TabView, SceneMap } from 'react-native-tab-view'

const FirstRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
)

const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
)

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

    console.log(state.user);

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
    ])

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    })

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

                    </View> : <Loading />
            }

            {/* <Button
                title='Sign Out'
                buttonStyle={{ borderColor: '#E74C3C', marginRight: 5 }}
                type="outline"
                titleStyle={{ color: '#273746' }}
                onPress={() => signOut()}
            /> */}

            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
            />

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