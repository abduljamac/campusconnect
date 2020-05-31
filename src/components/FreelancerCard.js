import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View, Button } from "react-native"
import { Entypo as Icon } from "@expo/vector-icons"
import * as Linking from 'expo-linking';

const { width } = Dimensions.get("window")

const FreelancerCard = ({ freelancer }) => {
    console.log(freelancer)
    return (
        <>
            <View style={styles.container}>
                <View style={styles.user}>

                    <View>
                        <Text style={styles.title}>{freelancer.handle}</Text>

                        <View style={styles.details}>
                            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                <Icon name="email" color="#17202A" size={18} />
                                {/* <Text style={styles.detailText} onPress={() => Linking.openURL('mailto:support@example.com')>{freelancer.email}</Text> */}
                                <Button
                                    title={freelancer.email}
                                    onPress={() => Linking.mailto('mailto:support@example.com')}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                <Icon name="phone" color="#17202A" size={18} />
                                <Text style={styles.detailText}>{freelancer.number}</Text>
                            </View>
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