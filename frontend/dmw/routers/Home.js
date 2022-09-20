import { StyleSheet, Text, View, ImageBackground, TouchableWithoutFeedback } from 'react-native'
import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screen/Home/Home'
import SearchScreen from '../screen/Home/Search'
import CategrayScreen from '../screen/Home/Categray'
import GoodsDetail from '../screen/Other/GoodsDetail'
const Stack = createStackNavigator()
export default class Home extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName='home' screenOptions={{headerShadowVisible: false}}>
         <Stack.Screen
          component={HomeScreen}
          name='home'
          defaultNavigationOptions={{
            tabBarVisible:false
          }}
          options={{ 
            headerBackTitleVisible:false,//对于后退按钮标题是否应该可见
            headerMode: "none"
          }} 
        >
        </Stack.Screen> 
        <Stack.Screen
          component={GoodsDetail}
          name='goodsDetail'
          options={{
            title: "",
          }}
        >
        </Stack.Screen>
       
        <Stack.Screen
          component={SearchScreen}
          name='searchScreen'
          options={{
            title: "搜索",
            headerRight: () => {
              return <TouchableWithoutFeedback onPress={() => { this.props.navigation.navigate('searchScreen', { visible: true }) }}><ImageBackground source={require('../assets/img/allIconAndlImage/3574.png')} style={{ width: 40, height: 40, marginRight: 15 }}></ImageBackground></TouchableWithoutFeedback>
            }
          }}
        >
        </Stack.Screen>
        <Stack.Screen
          component={CategrayScreen}
          name='categrayScreen'
          options={{
            // headerTransparent: true ,// 会将页面与标题重叠
            title: "分类",
          }}
        >
        </Stack.Screen>
      </Stack.Navigator>
    )
  }
}

const styles = StyleSheet.create({})