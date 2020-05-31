import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View, TouchableOpacity, Clipboard } from "react-native"
import { Button } from 'react-native-elements'
import { Entypo as Icon } from "@expo/vector-icons"
import { AsyncStorage } from 'react-native'

const { width } = Dimensions.get("window")

const FreelancerCard = ({ freelancer }) => {
    // console.log(freelancer)

    const favFreelanceArray = []

    const addToFav = async(freelacer) => {
        favFreelanceArray.push(freelacer)
        // console.log(favFreelanceArray);
        let storedData = AsyncStorage.getItem('favFreelancers')
        storedData = JSON.parse(storedData)
        storedData.push(favFreelanceArray)
        
        try {
            await AsyncStorage.setItem('favFreelancers', JSON.stringify(storedData));
        } catch (error) {
            // Error saving data
            console.log(error)
        }
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.user}>

                    <View>
                        <Text style={styles.title}>{freelancer.handle}</Text>

                        <View style={styles.details}>


                            <TouchableOpacity onPress={() => Clipboard.setString(`${freelancer.email}`)} style={{ flexDirection: 'row', alignItems: "center" }}>
                                <Icon name="email" color="#17202A" size={18} />
                                <Text style={styles.detailText} >{freelancer.email}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => Clipboard.setString(`${freelancer.number}`)} style={{ flexDirection: 'row', alignItems: "center" }}>
                                <Icon name="phone" color="#17202A" size={18} />
                                <Text style={styles.detailText}>{freelancer.number}</Text>
                            </TouchableOpacity>

                            <Button
                                title='Favorite'
                                buttonStyle={{ borderColor: '#17202A', margin: 5 }}
                                type="outline"
                                onPress={() => addToFav( freelancer )}
                            />


                        </View>

                    </View>

                    <Image style={styles.avatar} source={require("../../assets/no-img.jpg")} />

                </View>

                <Text style={styles.text}> {freelancer.bio} </Text>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        overflow: "hidden"
    },
    image: {
        height: 150,
        width: width - 32,
        marginVertical: 8
    },
    title: {
        fontSize: 32,
        lineHeight: 36,
        marginBottom: 5
    },
    text: {
        fontSize: 16,
        lineHeight: 18,
        overflow: "hidden"
    },
    details: {
        flexDirection: "column",
        marginBottom: 16
    },
    detailText: {
        fontSize: 14,
        color: "grey",
        marginLeft: 4,
        marginRight: 16
    },
    divider: {
        height: 1,
        backgroundColor: "#DCDDDE",
        marginVertical: 16
    },
    user: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    avatar: {
        width: 76,
        height: 76,
        borderRadius: 76 / 2
    },
    scene: {
        flex: 1,
    }
})

export default FreelancerCard