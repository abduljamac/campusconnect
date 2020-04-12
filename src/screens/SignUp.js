import React, { Component } from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image } from 'react-native'

export default class SignUp extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: {}
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container2}>
                    <Image
                        source={require("./../../assets/logo.png")}
                        style={{ width: 330, height: 100 }}
                    />

                    <TextInput
                        style={styles.inputBox}
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        placeholder="Email"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    <TextInput
                        style={styles.inputBox}
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        placeholder="Password"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    <TextInput
                        style={styles.inputBox}
                        value={this.state.confirmPassword}
                        onChangeText={confirmPassword => this.setState({ confirmPassword })}
                        placeholder="Confirm Password"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />


                    <TextInput
                        style={styles.inputBox}
                        value={this.state.name}
                        onChangeText={name => this.setState({ name })}
                        placeholder="Name"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}> Sign Up </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    container2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 200,
        backgroundColor: "white"
    },
    inputBox: {
        width: '85%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'center'
    },
    button: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: 'blue',
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 5,
        width: 200
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    buttonSignup: {
        fontSize: 12
    }
})