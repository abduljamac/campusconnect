import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Text, Input, Button } from 'react-native-elements';
import Spacer from './Spacer'

const AuthForm = ({ headerText, errorMessage, submitButtonText, onSubmit }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [handle, setHandle] = useState('')

    return (
        <>
            <Spacer>
                <Text h3 style={styles.header}>{headerText}</Text>
            </Spacer>

            <Spacer>
                <Input
                    label='Email'
                    value={email}
                    onChangeText={newText => setEmail(newText)}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </Spacer>

            <Spacer>
                <Input
                    secureTextEntry
                    label='Password'
                    value={password}
                    onChangeText={newText => setPassword(newText)}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </Spacer>

            {
                headerText === 'Sign Up' ? (
                    <>
                        <Spacer>
                            <Input
                                secureTextEntry
                                label='Confirm Password'
                                value={confirmPassword}
                                onChangeText={newText => setConfirmPassword(newText)}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </Spacer>

                        <Spacer>
                            <Input
                                label='Name'
                                value={handle}
                                onChangeText={newText => setHandle(newText)}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </Spacer>
                    </>

                ) : null
            }


            { 
                errorMessage ? (
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                ) : null
            }


            {
                headerText === 'Sign Up' ? (

                    <Spacer>
                        <Button
                            buttonStyle={{ backgroundColor: '#273746' }}
                            title={submitButtonText}
                            onPress={() => onSubmit({ email, password, confirmPassword, handle })}
                        />
                    </Spacer>


                ) : (
                        <Spacer>
                            <Button
                                buttonStyle={{ backgroundColor: '#273746' }}
                                title={submitButtonText}
                                onPress={() => onSubmit({ email, password })}
                            />
                        </Spacer>
                    )
            }


        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 250
    },
    header: {
        height: 50,
        marginLeft: 10,
        justifyContent: "center",
        fontSize: 25,
        color: "#273746",
        fontWeight: "400",
        fontFamily: "Helvetica Neue"
    },
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
        marginTop: 15,
        textAlign: 'center'
    },
    link: {
        color: 'blue',
        textAlign: 'center'
    }
})


export default AuthForm