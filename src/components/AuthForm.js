import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Text, Label, Form, Item, Input, Button } from 'native-base'
import Spacer from './Spacer'

const AuthForm = ({ headerText, errorMessage, submitButtonText, onSubmit }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [handle, setHandle] = useState('')

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
                        />
                    </Item>
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
                        />
                    </Item>
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
                                    />
                                </Item>
                            </Spacer>

                            <Spacer>
                                <Item inlineLabel>
                                    <Label>Name</Label>
                                    <Input
                                        value={handle}
                                        onChangeText={newText => setHandle(newText)}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />
                                </Item>
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