import React from 'react'
import { StyleSheet, View, Image, Dimensions, Text, TouchableHighlight } from 'react-native'
import { Icon } from '@expo/vector-icons'

const { width } = Dimensions.get('window')
const PADDING = 30

const Category = () => {
    return (
        <View>
            <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.onPressRecipe(item)}>
                <View style={styles.container}>
                    <Image style={styles.photo} />
                    <Text style={styles.title}> What is Lorem Ipsum? </Text>
                    <Text style={styles.category}> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  </Text>
                </View>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({})

export default Category