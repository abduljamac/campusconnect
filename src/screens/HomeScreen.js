import React, { useContext } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
// import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { NavigationEvents } from '@react-navigation/native';
import { Context as Feed } from '../context/Feed'


const HomeScreen = ({ navigation }) => {

    const { state, fetchFreelancers } = useContext(Feed);

    React.useEffect(() => {
        const freelancers = navigation.addListener('focus', () => {
          // do something
          fetchFreelancers() 
        })
        return freelancers;
      }, [navigation]);
    
    console.log(state)

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text> Hello welcome to Home Page </Text>
        </View>
    )
}

const styles = StyleSheet.create({})

export default HomeScreen