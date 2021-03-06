import React, { useState, useReducer, useEffect, useMemo } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from "@react-navigation/drawer"
import { AsyncStorage } from 'react-native'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import jwtDecode from 'jwt-decode'

import CampusConnectApi from '../src/api/CampusConnectApi'
import Loading from '../src/components/Loading'
import SignIn from '../src/screens/SignInScreen'
import SignUp from '../src/screens/SignUpScreen'
import Profile from '../src/screens/ProfileScreen'
import Home from '../src/screens/HomeScreen'
import EditProfileScreen from '../src/screens/EditProfileScreen'
import FavoritesScreen from '../src/screens/FavoritesScreen'
import FreelancerFeedScreen from '../src/screens/FreelancerFeedScreen'
import FreelancerPage from '../src/screens/FreelancerPage'
import LeaveAReviewScreen from '../src/screens/LeaveAReviewScreen'

import { AuthContext } from '../src/context/AuthContext'
import { Provider as ProfilePage } from '../src/context/ProfilePage'
import { Provider as Feed } from '../src/context/Feed'
import { Provider as Review } from '../src/context/Review'
import { Provider as UserReviews } from '../src/context/UserReviews'

const AuthStack = createStackNavigator()
const HomeStack = createStackNavigator()
const ProfileStack = createStackNavigator()
const EditProfileStack = createStackNavigator()
const FavoritesStack = createStackNavigator()
const Tabs = createBottomTabNavigator()
const Drawer = createDrawerNavigator()

const AuthStackScreen = () => (
    <AuthStack.Navigator>
        <AuthStack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
        <AuthStack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
    </AuthStack.Navigator>
)

const HomeStackSreen = () => (
    <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={Home} options={{ title: 'Category Page', headerStyle: { backgroundColor: '#eb567c' }, headerTintColor: '#fff' }} />
        <HomeStack.Screen name="FreelancerFeedScreen" component={FreelancerFeedScreen} options={{ title: 'Freelancer Feed', headerStyle: { backgroundColor: '#eb567c' }, headerTintColor: '#fff' }} />
        <HomeStack.Screen name="FreelancerPage" component={FreelancerPage} options={{ title: 'Freelancer Page', headerStyle: { backgroundColor: '#eb567c' }, headerTintColor: '#fff' }} />
        <HomeStack.Screen name="LeaveAReviewScreen" component={LeaveAReviewScreen} options={{ title: 'Leave A Review', headerStyle: { backgroundColor: '#eb567c' }, headerTintColor: '#fff' }} />
    </HomeStack.Navigator>
)

const ProfileStackSreen = () => (
    <ProfileStack.Navigator>
        <ProfileStack.Screen name="Profile" component={Profile} options={{ headerStyle: { backgroundColor: '#eb567c' }, headerTintColor: '#fff' }} />
        <ProfileStack.Screen name="Edit Profile" component={EditProfileScreen} options={{ headerStyle: { backgroundColor: '#17202A' }, headerTintColor: '#fff' }} />
    </ProfileStack.Navigator>
)

const EditProfileStackScreen = () => (
    <EditProfileStack.Navigator>
        <EditProfileStack.Screen name="Edit Profile" component={EditProfileScreen} options={{ headerStyle: { backgroundColor: '#eb567c' }, headerTintColor: '#fff' }} />
    </EditProfileStack.Navigator>
)

const FavoritesStackScreen = () => (
    <FavoritesStack.Navigator>
        <FavoritesStack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favorites', headerStyle: { backgroundColor: '#eb567c' }, headerTintColor: '#fff' }} />
    </FavoritesStack.Navigator>
)


const TabsScreen = () => (
    <Tabs.Navigator initialRouteName={"Home"}>
        <Tabs.Screen name="My Feed" component={HomeStackSreen} options={{ tabBarIcon: () => (<AntDesign name="home" size={20} color="black" />), tabBarOptions: { showIcon: true } }} />
        <Tabs.Screen name="Profile" component={ProfileStackSreen} options={{ tabBarIcon: () => (<AntDesign name="profile" size={20} color="black" />), tabBarOptions: { showIcon: true } }} />
        <Tabs.Screen name="Favorites" component={FavoritesStackScreen} options={{ tabBarIcon: () => (<AntDesign name="star" size={20} color="black" />), tabBarOptions: { showIcon: true } }} />
    </Tabs.Navigator>
)

const DrawerScreen = () => (
    <Drawer.Navigator>
        <Drawer.Screen name="Home" component={TabsScreen} />
        <Drawer.Screen name="EditProfileScreen" component={EditProfileStackScreen} options={{ title: 'Edit Profile' }} />
    </Drawer.Navigator>
)


const AppNavigator = () => {

    const [isLoading, setIsLoading] = useState(true)

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
        Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        })
    }, [])



    useEffect(() => {
        const tryLocalSignin = async () => {
            const token = await AsyncStorage.getItem('token')
            const decodedToken = jwtDecode(token)
            if (!decodedToken.exp * 1000 < Date.now()) {
                dispatch({ type: 'SIGN_IN', payload: token })
            } else {
                await AsyncStorage.removeItem('token')
            }
        }
        tryLocalSignin()
    }, [])


    const authContext = useMemo(
        () => ({
            signUp: async ({ email, password, confirmPassword, handle }) => {
                try {
                    setIsLoading(false)
                    const response = await CampusConnectApi.post('/signup', { email, password, confirmPassword, handle })
                    await AsyncStorage.setItem('token', response.data.token)
                    dispatch({ type: 'SIGN_UP', payload: response.data.token })
                } catch (error) {
                    dispatch({ type: 'ADD_ERROR', payload: error.message })
                }
            },
            signIn: async ({ email, password }) => {
                try {
                    setIsLoading(false)
                    const response = await CampusConnectApi.post('/login', { email, password })
                    await AsyncStorage.setItem('token', response.data.token)
                    dispatch({ type: 'SIGN_IN', payload: response.data.token })
                } catch (error) {
                    dispatch({ type: 'ADD_ERROR', payload: error.message })
                }
            },
            editProfile: async ({ uni, bio, category, price }) => {
                try {
                    setIsLoading(false)
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
    )


    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 100)
    }, [])

    if (isLoading) {
        return <Loading />
    }

    return (
        <UserReviews>
            <Review>
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
                </Feed>
            </Review>
        </UserReviews>
    )
}

export default AppNavigator