import React, { useState } from 'react'
import { StyleSheet, ScrollView, Dimensions } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { TabView, SceneMap } from 'react-native-tab-view'
import FreelancerCard from '../components/FreelancerCard'
import Review from '../components/Review'
import Gallary from '../components/Gallary'



const initialLayout = { width: Dimensions.get('window').width }

const FreelancerPage = ({}) => {

    const { params } = useRoute()
    const { freelancer } = params

    // { freelancer !== undefined ? console.log(freelancer) : null }

    const [index, setIndex] = useState(0)

    const [routes] = useState([
        { key: 'first', title: 'Review' },
        { key: 'second', title: 'Gallary' },
    ])

    // const renderScene = SceneMap({
    //     first: Review,
    //     second: Gallary,
    // })


    return (
        <ScrollView style={styles.scroll}>

            <FreelancerCard freelancer={freelancer} />

            <TabView
                navigationState={{ index, routes }}
                renderScene={SceneMap({
                    first: () => <Review freelancer={freelancer} />,
                    second: Gallary,
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