import React, { useContext } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-elements';
import Spacer from '../components/Spacer'
import AuthForm from '../components/AuthForm'

const SignUpScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>

            <AuthForm
                headerText='Sign Up'
                // errorMessage={state.errorMessage}
                submitButtonText='Sign Up'
            // onSubmit={signUp}
            />

            <View style={styles.footer}>
                <Text style={styles.footerText} > Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')} >
                    <Text style={styles.footerNav}> Sign In </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 250
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

export default SignUpScreen