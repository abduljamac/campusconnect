import React, { useState, useReducer, useEffect, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AsyncStorage } from 'react-native';

import CampusConnectApi from '../src/api/CampusConnectApi'
import SplashScreen from '../src/screens/SplashScreen'
import SignIn from '../src/screens/SignInScreen'
import SignUp from '../src/screens/SignUpScreen'
import Profile from '../src/screens/ProfileScreen'
import Home from '../src/screens/HomeScreen'
import EditProfileScreen from '../src/screens/EditProfileScreen'
import MessagesScreen from '../src/screens/MessagesScreen'

import { AuthContext } from '../src/context/AuthContext'
import { Provider as ProfilePage } from '../src/context/Feed'
import { Provider as Feed } from '../src/context/Feed'

const AuthStack = createStackNavigator()
const HomeStack = createStackNavigator()
const ProfileStack = createStackNavigator()
const EditProfileStack = createStackNavigator()
const MessagesStack = createStackNavigator()
const Tabs = createBottomTabNavigator()
const Drawer = createDrawerNavigator();

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
        <ProfileStack.Screen name="Edit Profile" component={EditProfileScreen} />
    </ProfileStack.Navigator>
)

const EditProfileStackScreen = () => (
    <EditProfileStack.Navigator>
        <EditProfileStack.Screen name="EditProfileScreen" component={EditProfileScreen}  options={{ title: 'Edit Profile'  }}  />
    </EditProfileStack.Navigator>
)


const MessagesStackScreen = () => (
    <MessagesStack.Navigator>
        <MessagesStack.Screen name="EditProfileScreen" component={MessagesScreen}  options={{ title: 'Edit Profile'  }}  />
    </MessagesStack.Navigator>
)


const TabsScreen = () => (
    <Tabs.Navigator initialRouteName={"Home"}>
        <Tabs.Screen name="Home" component={HomeStackSreen} />
        <Tabs.Screen name="Profile" component={ProfileStackSreen} />
        <Tabs.Screen name="Messages" component={MessagesStackScreen} />
    </Tabs.Navigator>
)

const DrawerScreen = () => (
    <Drawer.Navigator>
        <Drawer.Screen name="Home" component={TabsScreen} />
        <Drawer.Screen name="EditProfileScreen" component={EditProfileStackScreen}   options={{ title: 'Edit Profile' }}  />
    </Drawer.Navigator>
);


const AppNavigator = () => {

    // const [isLoading, setIsLoading] = useState(true)

    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'SIGN_UP':
                    return { ...prevState, errorMessage: '', token: action.payload }
                case 'SIGN_IN':
                    return { ...prevState, errorMessage: '', token: action.payload }
                case 'SIGN_OUT':
                    return { ...prevState, errorMessage: '', token: null }
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
                    dispatch({ type: 'ADD_ERROR', payload: error.message })
                }
            },
            signIn: async ({ email, password }) => {
                try {
                    const response = await CampusConnectApi.post('/login', { email, password })
                    console.log(response.data);
                    await AsyncStorage.setItem('token', response.data.token)
                    dispatch({ type: 'SIGN_IN', payload: response.data.token })
                    //  setIsLoading(false)
                } catch (error) {
                    console.log(error.message)
                    setErrorMessage('Please Check Email & Password')
                    dispatch({ type: 'ADD_ERROR', payload: error.message })
                }
            },
            editProfile: async ({ uni, bio, category, price }) => {
                try {
                    const response = await CampusConnectApi.post('/user', { uni, bio, category, price })
                    console.log(response)
                    dispatch({ type: 'SUCCESS_MESSAGE', payload: response.data })
                } catch (error) {
                    dispatch({ type: 'ADD_ERROR', payload: error.message })
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
    // console.log(AsyncStorage.getItem('name'));
    return (

        <Feed>
            <ProfilePage>
                <AuthContext.Provider value={authContext}>
                    <NavigationContainer>
                        {
                            state.token === null ? (
                                <AuthStackScreen />
                            ) : (
                                    <DrawerScreen />
                                )
                        }
                    </NavigationContainer>
                </AuthContext.Provider>
            </ProfilePage>
        </Feed >
    )
}

export default AppNavigator