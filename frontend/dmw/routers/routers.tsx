import { Text, StyleSheet, Image, View } from 'react-native'
import React, { Component, } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const Tab = createBottomTabNavigator()
import HomeScreen from './Home'
import DateScreen from './Data'
import JiaoyiScreen from './Jiaoyi'  
import MyselfScreen from './Myself'
import MoneyScreen from './Money' 
import { useTranslation } from 'react-i18next'



const router = () =>{
  const { t, i18n } = useTranslation();
  return (
    <Tab.Navigator
    tabBarStyle={{height: 0, overflow: 'hidden'}}
      screenOptions={({ route }) => ({
        headerShown: false,  //取消顶部导航
        activeTintColor: "#897EF8",
        inactiveTintColor: "#333",
        tabBarIcon: ({ focused, color, size }) => {
          let url 
          if (route.name == 'Home') {
            url = focused ? require('../assets/img/tabBar/home.png') : require('../assets/img/tabBar/home1.png')
          } else if (route.name == 'Data') {
            url = focused ? require('../assets/img/tabBar/data.png') : require('../assets/img/tabBar/data1.png')
          } else if (route.name == 'Jiaoyi') {
            url = focused ? require('../assets/img/tabBar/jiaoyi.png') : require('../assets/img/tabBar/jiaoyi1.png')
          } else if (route.name == 'Myself') {
            url = focused ? require('../assets/img/tabBar/mine.png') : require('../assets/img/tabBar/mine1.png')
          } else if (route.name == 'Money') {
            url = focused ? require('../assets/img/tabBar/money.png') : require('../assets/img/tabBar/money1.png')
          }
          return <Image source={url} style={[styles.tabImg]}></Image>
        }
      })}
    >   
     
      <Tab.Screen name="Home" component={HomeScreen} options={{title: t('首页')}} ></Tab.Screen>
      <Tab.Screen name="Data" component={DateScreen} options={{title: t('数据')}}></Tab.Screen>
      <Tab.Screen name="Jiaoyi" component={JiaoyiScreen} options={{title: t('交易')}}></Tab.Screen>
      <Tab.Screen name="Money" component={MoneyScreen} options={{title: t('钱包')}}></Tab.Screen>
      <Tab.Screen name="Myself" component={MyselfScreen} options={{title: t('我的')}}></Tab.Screen>
    </Tab.Navigator> 
    
  )
}

// export default class router extends Component {
  
//   render() {
//     return (
//       <Tab.Navigator
//       tabBarStyle={{height: 0, overflow: 'hidden'}}
//         screenOptions={({ route }) => ({
//           headerShown: false,  //取消顶部导航
//           activeTintColor: "#897EF8",
//           inactiveTintColor: "#333",
//           tabBarIcon: ({ focused, color, size }) => {
//             let url 
//             if (route.name == 'Home') {
//               url = focused ? require('../assets/img/tabBar/home.png') : require('../assets/img/tabBar/home1.png')
//             } else if (route.name == 'Data') {
//               url = focused ? require('../assets/img/tabBar/data.png') : require('../assets/img/tabBar/data1.png')
//             } else if (route.name == 'Jiaoyi') {
//               url = focused ? require('../assets/img/tabBar/jiaoyi.png') : require('../assets/img/tabBar/jiaoyi1.png')
//             } else if (route.name == 'Myself') {
//               url = focused ? require('../assets/img/tabBar/mine.png') : require('../assets/img/tabBar/mine1.png')
//             } else if (route.name == 'Money') {
//               url = focused ? require('../assets/img/tabBar/money.png') : require('../assets/img/tabBar/money1.png')
//             }
//             return <Image source={url} style={[styles.tabImg]}></Image>
//           }
//         })}
//       >   
       
//         <Tab.Screen name="Home" component={HomeScreen} options={{title: '首页'}} ></Tab.Screen>
//         <Tab.Screen name="Data" component={DateScreen} options={{title: '数据'}}></Tab.Screen>
//         <Tab.Screen name="Jiaoyi" component={JiaoyiScreen} options={{title: '交易'}}></Tab.Screen>
//         <Tab.Screen name="Money" component={MoneyScreen} options={{title: '钱包'}}></Tab.Screen>
//         <Tab.Screen name="Myself" component={MyselfScreen} options={{title: '我的'}}></Tab.Screen>
//       </Tab.Navigator> 
      
//     )
//   }
// }
export default router
const styles = StyleSheet.create({
  tabImg: {
    width: 30,
    height: 30,
  }
})