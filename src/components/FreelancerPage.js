import React, { useContext, useEffect } from 'react'
import { Dimensions, Image, StyleSheet, Text, ScrollView, View } from "react-native"
import { Entypo as Icon } from "@expo/vector-icons"
import { useRoute } from '@react-navigation/native'

const { width } = Dimensions.get("window");

const FreelancerPage = ({ }) => {

    const { params } = useRoute();
    const { freelancer } = params

    { freelancer !== undefined ? console.log(freelancer) : null }



    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.user}>
                    <View>
                        <Text style={styles.title}>{freelancer.handle}</Text>
                        <View style={styles.details}>
                            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                <Icon name="star" color="rgb(255, 56, 92)" size={18} />
                                <Text style={styles.detailText}>4.93 (891)</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                <Icon name="email" color="rgb(255, 56, 92)" size={18} />
                                <Text style={styles.detailText}>{freelancer.email}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                <Icon name="phone" color="rgb(255, 56, 92)" size={18} />
                                <Text style={styles.detailText}>07717727712</Text>
                            </View>

                        </View>
                    </View>
                    <Image style={styles.avatar} source={require("../../assets/no-img.jpg")} />
                </View>
                <Text style={styles.text}> {freelancer.bio} </Text>


                <View>
                    <View style={styles.divider} />

                </View>
            </View>

            {/* 
            <Image
                style={styles.image}
                resizeMode="cover"
                source={require("../../assets/authHeader.png")}
            /> */}
            
        </ScrollView>
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
    }
});

export default FreelancerPage