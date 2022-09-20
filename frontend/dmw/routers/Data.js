import {StyleSheet} from 'react-native'
import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import DataScreen from '../screen/Data/Data'
const Stack=createStackNavigator()
export default class Home extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={{headerShadowVisible: false}}>
        <Stack.Screen  
            component={DataScreen} 
            name='dataScreen'
            options={{  
              title:"stats"
            }}
          >  
         </Stack.Screen>
      </Stack.Navigator>
    )
  }
}

const styles = StyleSheet.create({})