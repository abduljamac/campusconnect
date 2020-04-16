import React, { useContext, useEffect } from 'react'
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native'
import { Text, Image, Button, Avatar } from 'react-native-elements'
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
    const [index, setIndex] = React.useState(0)

    useEffect(() => {
        const userDetails = navigation.addListener('focus', () => {
            fetchUserDetails()
        })
        return userDetails
    }, [navigation])

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

            {state.user !== undefined ?
                <>
                    <View style={styles.cardContainer}>
                        <View style={styles.headerContainer}>
                            <View style={styles.userRow}>
                                <View>
                                    <Avatar
                                        rounded
                                        size="large"
                                        source={{ uri: state.user.imageUrl }}
                                    // renderPlaceholderContent={require('../../assets/no-img.jpg')}
                                    />
                                </View>
                                <View style={styles.userNameRow}>
                                    <Text style={styles.userNameText}>{state.user.handle}</Text>
                                </View>
                                <View style={styles.userBioRow}>
                                    <Text style={styles.userBioText}>{state.user.bio}</Text>
                                </View>

                                <View style={styles.buttons}>
                                    <Button
                                        title='Sign Out'
                                        buttonStyle={{ borderColor: '#273746', marginRight: 5 }}
                                        type="outline"
                                        titleStyle={{ color: '#273746' }}
                                        onPress={() => signOut()}
                                    />
                                    <Button
                                        title="Edit Profile"
                                        buttonStyle={{ borderColor: '#273746' }}
                                        type="outline"
                                        titleStyle={{ color: '#273746' }}
                                        onPress={() => navigation.navigate('EditProfileScreen')}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                    <View>
                        <TabView
                            navigationState={{ index, routes }}
                            renderScene={renderScene}
                            onIndexChange={setIndex}
                            initialLayout={initialLayout}
                        />
                    </View>
                </>
                : <Loading />}

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: '#FFF',
    },
    cardContainer: {
        flex: 1,
    },
    headerContainer: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        marginBottom: 10,
        marginTop: 20,
    },
    userBioRow: {
        marginLeft: 40,
        marginRight: 40,
    },
    userBioText: {
        color: 'gray',
        fontSize: 13.5,
        textAlign: 'center',
    },
    userNameRow: {
        marginBottom: 10,
    },
    userNameText: {
        color: '#5B5A5A',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    userRow: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: 12,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
    },
    scene: {
        flex: 1,
    }

})

export default ProfileScreen