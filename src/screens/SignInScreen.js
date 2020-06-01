import React, { useContext } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native'
import { Content } from 'native-base'
import AuthForm from '../components/AuthForm'
import { AuthContext } from '../context/AuthContext'

const SignInScreen = ({ navigation, errorMessage }) => {

    const { signIn } = useContext(AuthContext)

    return (
        <View style={styles.container}>

            <Image source={require("../../assets/authHeader.png")} style={{ marginTop: -176, marginLeft: -50, backgroundColor: 'white' }} />
            <Image source={require("../../assets/authFooter.png")} style={{ position: "absolute", bottom: -325, right: -225 }} />

            <Content>
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
            </Content>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    footerText: {
        fontSize: 16,
        color: "#273746"
    },
    footerNav: {
        fontSize: 16,
        color: "#17202A",
        fontWeight: "500",
    }
})

export default SignInScreen