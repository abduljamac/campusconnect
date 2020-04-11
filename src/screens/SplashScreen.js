import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Loading...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default SplashScreen