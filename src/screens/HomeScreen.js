import React from 'react'
import { StyleSheet, View, Text, FlatList, Dimensions, TouchableHighlight, Image } from 'react-native'
import {useNavigation} from '@react-navigation/native';

// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
// item size
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;


const HomeScreen = () => {

    const { navigate } = useNavigation();

    const categories = [
        { id: 1, category: 'Tutoring', img: require('../../assets/logo.png') },
        { id: 2, category: 'Personal Care', img: require('../../assets/logo.png') },
        { id: 3, category: 'Photography', img: require('../../assets/logo.png') },
        { id: 4, category: 'Fitness', img: require('../../assets/logo.png') },
        { id: 5, category: 'Web Dev', img: require('../../assets/logo.png') },
        { id: 6, category: 'Design', img: require('../../assets/logo.png') },
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
        <View style={{ alignContent: 'center', marginTop: 10 }}>

            <FlatList
                vertical
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={categories}
                renderItem={this.renderCategories}
                keyExtractor={item => `${item.id}`}
            />

            {/* <FlatList
                verticle
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={categories}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableHighlight onPress={() => navigation.navigate('FreelancerFeed')}>
                            <View style={styles.container}>
                                <Image style={styles.photo} source={item.img} />
                                <Text style={styles.title}>{item.category}</Text>
                            </View>
                        </TouchableHighlight>


                    )
                }}
            /> */}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: RECIPE_ITEM_MARGIN,
        marginTop: 20,
        width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
        height: RECIPE_ITEM_HEIGHT + 75,
        borderColor: '#cccccc',
        borderWidth: 0.5,
        borderRadius: 15
    },
    photo: {
        width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
        height: RECIPE_ITEM_HEIGHT,
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