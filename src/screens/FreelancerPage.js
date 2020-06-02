import React, { useState } from 'react'
import { StyleSheet, ScrollView, Dimensions } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { TabView, SceneMap } from 'react-native-tab-view'
import FreelancerCard from '../components/FreelancerCard'
import Reviews from '../components/Reviews'

const initialLayout = { width: Dimensions.get('window').width }

const FreelancerPage = ({}) => {

    const { params } = useRoute()
    const { freelancer } = params
    const [index, setIndex] = useState(0)

    const [routes] = useState([
        { key: 'first', title: 'Reviews' }
    ])

    return (
        <ScrollView style={styles.scroll}>

            <FreelancerCard freelancer={freelancer} />

            <TabView
                navigationState={{ index, routes }}
                renderScene={SceneMap({
                    first: () => <Reviews freelancer={freelancer} />
                })}
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
})

export default FreelancerPage