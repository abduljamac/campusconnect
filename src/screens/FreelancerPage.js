import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { useRoute } from '@react-navigation/native'
import FreelancerCard from '../components/FreelancerCard'

import { TabView, SceneMap } from 'react-native-tab-view'

const FirstRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
)

const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
)

const initialLayout = { width: Dimensions.get('window').width }

const FreelancerPage = ({ }) => {

    const { params } = useRoute();
    const { freelancer } = params

    { freelancer !== undefined ? console.log(freelancer) : null }

    const [index, setIndex] = useState(0)

    const [routes] = useState([
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
    ])

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    })


    return (
        <ScrollView style={styles.scroll}>
            <FreelancerCard freelancer={freelancer} />
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
    container: {
        padding: 16,
        overflow: "hidden"
    },
    scene: {
        flex: 1,
    }
});

export default FreelancerPage