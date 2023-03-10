import {StyleSheet} from 'react-native'
import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import loginHome from '../login/LoginHome'
const Stack=createStackNavigator()
export default class Home extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={{headerShadowVisible: false}}>
        <Stack.Screen  
            component={loginHome} 
            name='loginHome'
            options={{  
              headerMode:'none',
              title:null
            }}
          >  
         </Stack.Screen>
      </Stack.Navigator>
    )
  }
}

const styles = StyleSheet.create({})