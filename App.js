import React, { Component } from 'react'
import AppNavigator from './navigation/AppNavigator'
import {YellowBox} from 'react-native'

console.disableYellowBox = true
YellowBox.ignoreWarnings(['Warning: ...'])

export default class App extends Component {
  render() {
    return (
      <AppNavigator />
    )
  }
}