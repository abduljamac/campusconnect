import React, { useContext, useReducer, useMemo, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AsyncStorage } from 'react-native';
import axios from 'axios'


import CampusConnectApi from '../src/api/CampusConnectApi'
import SplashScreen from '../src/screens/SplashScreen'
import SignIn from '../src/screens/SignInScreen'
import SignUp from '../src/screens/SignUpScreen'
import Profile from '../src/screens/ProfileScreen'
import Home from '../src/screens/HomeScreen'

import { AuthContext } from '../src/context/AuthContext'

const AuthStack = createStackNavigator()
const HomeStack = createStackNavigator()
const ProfileStack = createStackNavigator()
const Tabs = createBottomTabNavigator()

const AuthStackScreen = () => (
    <AuthStack.Navigator>
        <AuthStack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
        <AuthStack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
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

    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'ADD_ERROR':
                    return { ...prevState, errorMessage: action.payload }
                case 'SIGN_UP':
                    return { errorMessage: '', token: action.payload }
                case 'SIGN_IN':
                    return { errorMessage: '', token: action.payload }
                case 'SIGN_OUT':
                    return { ...prevState, errorMessage: '', token: null }
                default:
                    return state
            }
        },
        { token: null, errorMessage: '' }
    )

    useEffect(() => {

        const tryLocalSignin = dispatch => async () => {

            const token = await AsyncStorage.getItem('token');

            if (token) {
                dispatch({ type: 'signin', payload: token });
            } else {

            }

        }

        tryLocalSignin()

    }, [])

    const authContext = React.useMemo(
        () => ({
            signUp: async ({ email, password, confirmPassword, handle }) => {

                try {
                    const response = await CampusConnectApi.post('/signup', { email, password, confirmPassword, handle })
                    await AsyncStorage.setItem('token', response.data.token)
                    dispatch({ type: 'SIGN_UP', payload: response.data.token })

                } catch (error) {

                    dispatch({ type: 'add_error', payload: 'Something went wrong with sign up' })
                }

            },
            signIn: async ({ email, password }) => {

                try {

                    const response = await CampusConnectApi.post('/login', { email, password })
                    await AsyncStorage.setItem('token', response.data.token)
                    dispatch({ type: 'SIGN_IN', payload: response.data.token })

                } catch (error) {

                    dispatch({ type: 'add_error', payload: 'Something went wrong with sign up' })
                }

            },
            signOut: () => dispatch({ type: 'SIGN_OUT' }),
        }),
        []
    );

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {
                    state.token === null ? (

                        <AuthStackScreen errorMessage={state.errorMessage} />

                    ) : (

                            <TabsScreen />

                        )}
            </NavigationContainer>
        </AuthContext.Provider>
    )
}