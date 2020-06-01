import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Text, Label, Form, Item, Input, Button } from 'native-base'
import Spacer from './Spacer'

const AuthForm = ({ headerText, errorMessage, submitButtonText, onSubmit }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [handle, setHandle] = useState('')
    const [uni, setUni] = useState('')

    const [state, setState] = useState({
        emailError: '',
        passwordError: '',
        confirmPasswordError: '',
        handleError: '',
        uniError: ''
    })

    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    const handleEmail = () => {
        if (email == "" || !validateEmail(email)) {
            setState(prevState => ({
                ...prevState,
                emailError: "Please enter a valid email"
            }))
        } else {
            setState(prevState => ({
                ...prevState,
                emailError: ""
            }))
        }
    }

    const handlePasswordError = () => {
        if (password == "") {
            setState(prevState => ({
                ...prevState,
                passwordError: "Password Required"
            }))
        }
    }

    const handleConfirmPasswordError = () => {
        if (confirmPassword == "") {
            setState(prevState => ({
                ...prevState,
                confirmPasswordError: "Confirm Password is Required"
            }))
        }
    }

    const handleNameError = () => {
        if (handle == "") {
            setState(prevState => ({
                ...prevState,
                handleError: "Full Name is Required"
            }))
        }
    }

    const handleUniError = () => {
        if (uni == "") {
            setState(prevState => ({
                ...prevState,
                uniError: "Univeristy is Required"
            }))
        }
    }



    return (
        <>
            <Form>
                <Spacer>
                    <Text style={styles.header}>{headerText}</Text>
                </Spacer>

                <Spacer>
                    <Item inlineLabel>
                        <Label>Email</Label>
                        <Input
                            value={email}
                            onChangeText={newText => setEmail(newText)}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onBlur={() => handleEmail()}
                        />
                    </Item>
                    <Text style={{ color: 'red', marginLeft: 15, fontSize: 12 }}>
                        {state.emailError}
                    </Text>
                </Spacer>

                <Spacer>
                    <Item inlineLabel>
                        <Label>Password</Label>
                        <Input
                            secureTextEntry
                            value={password}
                            onChangeText={newText => setPassword(newText)}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onBlur={() => handlePasswordError()}
                        />
                    </Item>
                    <Text style={{ color: 'red', marginLeft: 15, fontSize: 12 }}>
                        {password == '' ? state.passwordError : null}
                    </Text>
                </Spacer>

                {
                    headerText === 'Sign Up' ? (
                        <>
                            <Spacer>
                                <Item inlineLabel>
                                    <Label>Confirm Password</Label>
                                    <Input
                                        secureTextEntry
                                        value={confirmPassword}
                                        onChangeText={newText => setConfirmPassword(newText)}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        onBlur={() => handleConfirmPasswordError()}
                                    />
                                </Item>
                                <Text style={{ color: 'red', marginLeft: 15, fontSize: 12 }}>
                                    {confirmPassword == '' ? state.confirmPasswordError : null}
                                </Text>
                            </Spacer>

                            <Spacer>
                                <Item inlineLabel>
                                    <Label>Full Name</Label>
                                    <Input
                                        value={handle}
                                        onChangeText={newText => setHandle(newText)}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        onBlur={() => handleNameError()}
                                    />
                                </Item>
                                <Text style={{ color: 'red', marginLeft: 15, fontSize: 12 }}>
                                    {handle == '' ? state.handleError : null}
                                </Text>
                            </Spacer>

                            <Spacer>
                                <Item inlineLabel>
                                    <Label>University</Label>
                                    <Input
                                        value={uni}
                                        onChangeText={newText => setUni(newText)}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        onBlur={() => handleUniError()}
                                    />
                                </Item>
                                <Text style={{ color: 'red', marginLeft: 15, fontSize: 12 }}>
                                    {uni == '' ? state.uniError : null}
                                </Text>
                            </Spacer>
                        </>

                    ) : null
                }

            </Form>

            {
                headerText === 'Sign Up' ? (

                    <Button block style={{ margin: 15, marginTop: 20, backgroundColor: '#17202A' }} onPress={() => onSubmit({ email, password, confirmPassword, handle })}>
                        <Text>Sign Up</Text>
                    </Button>
                ) : (
                        <Button block style={{ margin: 15, marginTop: 20, backgroundColor: '#17202A' }} onPress={() => onSubmit({ email, password })}>
                            <Text>Sign In</Text>
                        </Button>
                    )

            }





        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50
    },
    header: {
        height: 50,
        marginLeft: 10,
        justifyContent: "center",
        fontSize: 25,
        color: "#273746",
        fontWeight: "600",
        // fontFamily: "Helvetica Neue"
    }
})


export default AuthForm