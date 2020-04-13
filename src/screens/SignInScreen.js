import React, { useContext } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-elements';
import AuthForm from '../components/AuthForm'
import { AuthContext } from '../context/AuthContext'

const SignInScreen = ({ navigation , errorMessage }) => {
    
    const { signIn } = useContext(AuthContext)

    return (
        <View style={styles.container}>

            <AuthForm
                headerText='Sign In'
                errorMessage={errorMessage}
                submitButtonText='Sign In'
                onSubmit={signIn}
            />


            <View style={styles.footer}>
                <Text style={styles.footerText} > Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')} >
                    <Text style={styles.footerNav}> Sign Up </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 200
    },
    footer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
    },
    footerText: {
        fontSize: 16,
        fontFamily: "Helvetica Neue",
        color: "#273746"
    },
    footerNav: {
        fontSize: 16,
        color: "#17202A",
        fontWeight: "500",
        fontFamily: "Helvetica Neue"
    }
})

export default SignInScreen