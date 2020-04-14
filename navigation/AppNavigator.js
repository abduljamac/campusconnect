import React, { useState, useReducer, useEffect, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AsyncStorage } from 'react-native';

import CampusConnectApi from '../src/api/CampusConnectApi'
import SplashScreen from '../src/screens/SplashScreen'
import SignIn from '../src/screens/SignInScreen'
import SignUp from '../src/screens/SignUpScreen'
import Profile from '../src/screens/ProfileScreen'
import Home from '../src/screens/HomeScreen'
import CreateProfile from '../src/screens/CreateProfileScreen'

import { AuthContext } from '../src/context/AuthContext'
import { Provider as ProfilePage } from '../src/context/Feed'
import { Provider as Feed } from '../src/context/Feed'

const AuthStack = createStackNavigator()
const HomeStack = createStackNavigator()
const ProfileStack = createStackNavigator()
const CreateProfileStack = createStackNavigator()
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

const CreateProfileStackScreen = () => (
    <CreateProfileStack.Navigator>
        <CreateProfileStack.Screen name="CreateProfile" component={CreateProfile} options={{ headerShown: false }} />
    </CreateProfileStack.Navigator>
)


const TabsScreen = () => (
    <Tabs.Navigator initialRouteName={"Profile"}>
        <Tabs.Screen name="Home" component={HomeStackSreen} />
        <Tabs.Screen name="Profile" component={ProfileStackSreen} />
        <Tabs.Screen name="Edit Profile" component={CreateProfileStackScreen} />
    </Tabs.Navigator>
)


const AppNavigator = () => {

    // const [isLoading, setIsLoading] = useState(true)

    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'SIGN_UP':
                    return { ...prevState,  errorMessage: '', token: action.payload }
                case 'SIGN_IN':
                    return {  ...prevState, errorMessage: '', token: action.payload }
                case 'SIGN_OUT':
                    return { ...prevState,  errorMessage: '', token: null }
                case 'ADD_ERROR':
                    return { ...prevState, errorMessage: action.payload }
                case 'SUCCESS_MESSAGE':
                    return { ...prevState, successMessage: action.payload }
                default:
                    return state
            }
        },
        { token: null, errorMessage: null, successMessage: null }
    )

    useEffect(() => {
        const tryLocalSignin = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                dispatch({ type: 'SIGN_IN', payload: token });
            }
        }
        tryLocalSignin()
    }, [])


    // if (isLoading) {
    //     return <SplashScreen />
    // }

    const authContext = useMemo(
        () => ({
            signUp: async ({ email, password, confirmPassword, handle }) => {
                try {
                    const response = await CampusConnectApi.post('/signup', { email, password, confirmPassword, handle })
                    await AsyncStorage.setItem('token', response.data.token)
                    dispatch({ type: 'SIGN_UP', payload: response.data.token })
                    // setIsLoading(false)
                } catch (error) {
                    console.log(error.message)
                    dispatch({ type: 'ADD_ERROR', payload: 'Please Check Email & Password' })
                }
            },
            signIn: async ({ email, password }) => {
                try {
                    const response = await CampusConnectApi.post('/login', { email, password })
                    console.log( response.data);
                    await AsyncStorage.setItem('token', response.data.token)
                    dispatch({ type: 'SIGN_IN', payload: response.data.token })
                    //  setIsLoading(false)
                } catch (error) {
                    console.log(error.message)
                    setErrorMessage('Please Check Email & Password')
                    dispatch({ type: 'ADD_ERROR', payload: 'Something Went Wrong With Sign In' })
                }
            },
            createProfile: async ({ uni, bio, category, price }) => {
                try {
                    const response = await CampusConnectApi.post('/user', { uni, bio, category, price })
                    dispatch({ type: 'SUCCESS_MESSAGE', payload: response.data })
                } catch (error) {
                    dispatch({ type: 'ADD_ERROR', payload: 'Something Went Wrong With Updating Details' })
                }
            },
            signOut: async () => {
                await AsyncStorage.removeItem('token')
                dispatch({ type: 'SIGN_OUT' })
            },
        }),
        []
    );

    // console.log(successMessage)
    return (

        <Feed>
            <ProfilePage>
                <AuthContext.Provider value={authContext}>
                    <NavigationContainer>
                        {
                            state.token === null ? (
                                <AuthStackScreen />
                            ) : (
                                    <TabsScreen />
                                )
                        }
                    </NavigationContainer>
                </AuthContext.Provider>
            </ProfilePage>
        </Feed >
    )
}

export default AppNavigator