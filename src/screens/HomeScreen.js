import React from 'react'
import { StyleSheet, View, Text, FlatList, Dimensions, TouchableHighlight, Image } from 'react-native'
import {useNavigation} from '@react-navigation/native'

const { width, height } = Dimensions.get('window')
const SCREEN_WIDTH = width < height ? width : height

const NumColums = 2

const ITEM_HEIGHT = 145
const ITEM_MARGIN = 20


const HomeScreen = () => {

    const { navigate } = useNavigation()

    const categories = [
        { id: 1, category: 'Tutoring', img: require('../../assets/tutoring.png') },
        { id: 2, category: 'Personal Care', img: require('../../assets/personal.png') },
        { id: 3, category: 'Photography', img: require('../../assets/photography.png') },
        { id: 4, category: 'Fitness', img: require('../../assets/fitness.png') },
        { id: 5, category: 'Web Dev', img: require('../../assets/web-dev.png') },
        { id: 6, category: 'Design', img: require('../../assets/design.png') },
    ]

    onPressCategory = item => {
        navigate('FreelancerFeedScreen', { categories: item })
    }

    renderCategories = ({ item }) => (
        <TouchableHighlight underlayColor='white' onPress={() => this.onPressCategory(item)}>
            <View style={styles.container}>
                <Image style={styles.photo} source={item.img} />
                <Text style={styles.title}>{item.category}</Text>
            </View>
        </TouchableHighlight>
    )

    return (
        <View style={{ alignContent: 'center', marginTop: 10, backgroundColor: 'white' }}>

            <FlatList
                vertical
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={categories}
                renderItem={this.renderCategories}
                keyExtractor={item => `${item.id}`}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: ITEM_MARGIN,
        marginTop: 20,
        width: (SCREEN_WIDTH - (NumColums + 1) * ITEM_MARGIN) / NumColums,
        height: ITEM_HEIGHT + 75,
        borderColor: '#cccccc',
        borderWidth: 0.5,
        borderRadius: 15
    },
    photo: {
        width: (SCREEN_WIDTH - (NumColums + 1) * ITEM_MARGIN) / NumColums,
        height: ITEM_HEIGHT,
        borderRadius: 15,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    },
    title: {
        flex: 1,
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#444444',
        marginTop: 3,
        marginRight: 5,
        marginLeft: 5,
    },
    category: {
        marginTop: 5,
        marginBottom: 5
    }

})

export default HomeScreen