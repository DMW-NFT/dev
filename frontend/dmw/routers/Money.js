import {StyleSheet} from 'react-native'
import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MoneyScreen from '../screen/Money/Money'
import CreateMoney from '../screen/Money/CreateMoney' //进入钱包主页
import ImportWord from '../screen/Money/ImportWord' // 导入钱包
import CreateWord from '../screen/Money/CreateWord' // 创建钱包
import WalletSafe from '../screen/Money/WalletSafe' // 保护钱包安全1
import WalletSafeShow from '../screen/Money/WalletSafeShow' // 保护钱包安全2
import DetermineWord from '../screen/Money/DetermineWord' // 确认助记词
import CompleteBackup from '../screen/Money/CompleteBackup' // 完成备份
import Exchange from '../screen/Money/Exchange' // 兑换
import Gift from '../screen/Money/Gift' // 发送
const Stack=createStackNavigator()
export default class Home extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName={'CreateMoney'} screenOptions={{headerShadowVisible: false}}>
        <Stack.Screen  
            component={CreateMoney} 
            name='createMoney'
            options={{  
              headerMode:'none'
            }}
          >  
         </Stack.Screen>
        <Stack.Screen  
            component={MoneyScreen} 
            name='money'
            options={{  
              headerMode:'none'
            }}
          >  
         </Stack.Screen>
        
        <Stack.Screen  
            component={ImportWord} 
            name='importWord'
            options={{  
             title:'从助记词导入'
            }}
          >  
         </Stack.Screen>
        <Stack.Screen  
            component={CreateWord} 
            name='createWord'
            options={{  
              title:''
             }}
          >  
         </Stack.Screen>
        <Stack.Screen  
            component={WalletSafe} 
            name='walletSafe'
            options={{  
              title:''
             }}
          >  
         </Stack.Screen>
         {/*  */}
        <Stack.Screen  
            component={WalletSafeShow} 
            name='walletSafeShow'
            options={{  
              title:''
             }}
          >  
         </Stack.Screen>
        <Stack.Screen  
            component={DetermineWord} 
            name='determineWord'
            options={{  
              title:''
             }}
          >  
         </Stack.Screen>
        <Stack.Screen  
            component={CompleteBackup} 
            name='completeBackup'
            options={{  
              title:''
             }}
          >  
         </Stack.Screen>

         <Stack.Screen  
            component={Exchange} 
            name='Exchange'
            options={{  
              title:'兑换'
             }}
          >  
         </Stack.Screen>

         <Stack.Screen  
            component={Gift} 
            name='Gift'
            options={{  
              title:'发送'
             }}
          >  
         </Stack.Screen>

      </Stack.Navigator>
    )
  }
}

const styles = StyleSheet.create({})