import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SplashScreen from '../src/screens/SplashScreen'
import SignIn from '../src/screens/SignInScreen'
import SignUp from '../src/screens/SignUpScreen'
import Profile from '../src/screens/ProfileScreen'
import Home from '../src/screens/HomeScreen'

// import { AuthContext } from '../backend/Context'

const AuthStack = createStackNavigator()
const HomeStack = createStackNavigator()
const ProfileStack = createStackNavigator()
const Tabs = createBottomTabNavigator()

const AuthStackScreen = () => (
    <AuthStack.Navigator>
        <AuthStack.Screen name="SignIn" component={SignIn} options={{headerShown: false}} />
        <AuthStack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
    </AuthStack.Navigator>
)

const HomeStackSreen = () => (
    <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
)

const ProfileStackSreen = () => (
    <ProfileStack.Navigator>
        <ProfileStack.Screen name="Profile" component={Profile} />
    </ProfileStack.Navigator>
)


const TabsScreen = () => (
    <Tabs.Navigator initialRouteName={"Profile"}>
        <Tabs.Screen name="Home" component={HomeStackSreen} />
        <Tabs.Screen name="Profile" component={ProfileStackSreen} />
    </Tabs.Navigator>
)


export default AppNavigator = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [userToken, setUserToken] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
            // setUserToken("fakeToken")
        }, 100)
    }, [])

    if (isLoading) {
        return <SplashScreen />
    }

    return (
        <NavigationContainer>
            {
                userToken ? (

                    <TabsScreen />

                ) : (

                        <AuthStackScreen />

                    )}
        </NavigationContainer>
    )
}