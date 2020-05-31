import React, { useState, useContext } from 'react'
import { StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import Spacer from '../components/Spacer'
import { AuthContext } from '../context/AuthContext'
import * as ImagePicker from 'expo-image-picker'
import CampusConnectApi from '../api/CampusConnectApi'

const EditProfileScreen = () => {

    const [bio, setBio] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [number, setNumber] = useState('')

    const { editProfile } = useContext(AuthContext)


    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled === true) {
            return;
        }

        let localUri = pickerResult.uri;
        let filename = localUri.split('/').pop();

        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;


        let formData = new FormData();
        formData.append('photo', { uri: localUri, name: filename, type })


        CampusConnectApi.post('/user/image', formData)
            .then(() => {
                Alert.alert("Sucess Uploading Image")
            })
            .catch(error => {
                Alert.alert(error)
            })
    }


    return (
        <View style={styles.container}>
            <Spacer>
                <Text h3 style={styles.header}> Edit Profile </Text>
            </Spacer>

            <View style={{ marginTop: 10, alignItems: "center" }}>
                <TouchableOpacity onPress={openImagePickerAsync}>
                    <Image
                        source={require('../../assets/no-img.jpg')}
                        style={styles.avatar}
                    />
                </TouchableOpacity>

            </View>


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
    avatar: {
        width: 136,
        height: 136,
        borderRadius: 68
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