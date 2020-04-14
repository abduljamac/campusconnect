import React, { useContext } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Text, Image, Button } from 'react-native-elements'
import { AuthContext } from '../context/AuthContext'

const ProfileScreen = ({ navigation }) => {

    const { signOut } = useContext(AuthContext)

    return (
        <ScrollView style={styles.scroll}>
            <View style={styles.cardContainer}>
                <View style={styles.headerContainer}>
                    <View style={styles.userRow}>
                        <Image
                            style={styles.userImage}
                        // source={{uri: }}
                        />
                        <View style={styles.userNameRow}>
                            <Text style={styles.userNameText}>Abdul</Text>
                        </View>
                        <View style={styles.userBioRow}>
                            <Text style={styles.userBioText}>Hello my name is Abdul I'm computer science tutor</Text>
                        </View>

                        <View style={styles.buttons}>
                             <Button
                                 title='Sign Out'
                                buttonStyle={{ borderColor: '#273746' , marginRight: 5 }}
                                type="outline"
                                titleStyle={{ color: '#273746' }}
                                onPress={() => signOut()}
                            />
                            <Button
                                title="Edit Profile"
                                buttonStyle={{ borderColor: '#273746'  }}
                                type="outline"
                                titleStyle={{ color: '#273746' }}
                                onPress={() => navigation.navigate('EditProfileScreen')}
                            />
                        </View>
                    </View>
                </View>


            </View>
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
        marginTop: 45,
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
    userImage: {
        borderRadius: 60,
        height: 120,
        marginBottom: 10,
        width: 120,
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
    
})

export default ProfileScreen