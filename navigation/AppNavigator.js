import React, { useState, useEffect, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from "@react-navigation/drawer";

import SplashScreen from '../src/screens/SplashScreen'
import LogIn from '../src/screens/LogIn'
import SignUp from '../src/screens/SignUp'
import Profile from '../src/screens/Profile'
import Home from '../src/screens/Home'

const AuthStack = createStackNavigator()
const Tabs = createBottomTabNavigator()

const AuthStackScreen = () => (
    <AuthStack.Navigator>
        <AuthStack.Screen name="SignIn" component={LogIn} options={{ title: 'Sign In' }} />
        <AuthStack.Screen name="CreateAccount" component={SignUp} options={{ title: 'Create Account' }} />
    </AuthStack.Navigator>
)

const TabsScreen = () => (
    <Tabs.Navigator>
        <Tabs.Screen name="Home" component={Home} />
        <Tabs.Screen name="Profile" component={Profile} />
    </Tabs.Navigator>
)


export default AppNavigator = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [userToken, setUserToken] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
            setUserToken("fakeToken")
        }, 1000)
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


