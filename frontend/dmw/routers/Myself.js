import {StyleSheet} from 'react-native'
import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MyselfScreen from '../screen/Myself/Myself'
import SellOrder from '../screen/Myself/SellOrder'
import SetUp from '../screen/Myself/SetUp'
import ModifyInfo from '../screen/Myself/ModifyInfo'
import TransferNft from '../screen/Myself/TransferNft'
import BlockchainQuery from '../screen/Myself/BlockchainQuery'
import SelectLanguage from '../screen/Myself/SelectLanguage'
import MessageCenter from '../screen/Myself/MessageCenter'
import SystemNotification from '../screen/Myself/SystemNotification'
import NoticeDetails from '../screen/Myself/NoticeDetails'
import ILikeIt from '../screen/Myself/ILikeIt'
import TransferredIntoCollection from '../screen/Myself/TransferredIntoCollection'
import CreateCollection from '../screen/Myself/CreateCollection'
import CreatedSuccessfully from '../screen/Myself/CreatedSuccessfully'

import AuctionOrderr from '../screen/Myself/AuctionOrder'
import CompleteBackup from '../screen/Money/CompleteBackup'
import TradeSuccessfully from '../screen/Myself/TradeSuccessfully'  
import CollectionDetails from '../screen/Other/CollectionDetails'
import MyCollection from '../screen/Myself/MyCollection'  
import Sell from '../screen/Myself/Sell'  //卖出

import GoodsDetail from '../screen/Other/GoodsDetail'
import QuotationDetails from '../screen/Other/QuotationDetails'
const Stack=createStackNavigator()
export default class Home extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName='myself' screenOptions={{headerShadowVisible: false}}>
          <Stack.Screen   
            component={MyselfScreen}  
            name='myself'
            options={{ 
              headerMode:'none'
            }}
          >
         </Stack.Screen>
          <Stack.Screen   
            component={Sell}  
            name='sell'
            options={{ 
              headerTitle:'卖出' 
            }}
          >
         </Stack.Screen>
          <Stack.Screen  
            component={MyCollection}  
            name='myCollection'
            options={{  
              headerTitle:'合集'
            }}
          >
         </Stack.Screen>
          <Stack.Screen  
            component={CompleteBackup}  
            name='completeBackup'
            options={{ 
              headerMode:'none'
            }} 
          >
         </Stack.Screen>
          <Stack.Screen  
            component={SellOrder} 
            name='sellOrder'
            options={{  
              title:'售卖订单'
            }}
          >
          </Stack.Screen>
          <Stack.Screen  
            component={AuctionOrderr} 
            name='auctionOrder'
            options={{   
              title:'拍卖订单'
            }}
          >
          </Stack.Screen>
          <Stack.Screen  
            component={TradeSuccessfully} 
            name='tradeSuccessfully'
            options={{  
              title:'交易成功'
            }}
          >
          </Stack.Screen>

         <Stack.Screen  
            component={SetUp} 
            name='SetUp'
            options={{  
              title:'设置'  
             }}
          >  
         </Stack.Screen>

         <Stack.Screen  
            component={ModifyInfo} 
            name='ModifyInfo'
            options={{  
              title:'修改个人信息'  
             }}
          >  
         </Stack.Screen>

         <Stack.Screen  
            component={TransferNft} 
            name='TransferNft'
            options={{  
              title:'转移藏品'  
             }}
          >  
         </Stack.Screen>

         <Stack.Screen  
            component={BlockchainQuery} 
            name='BlockchainQuery'
            options={{  
              title:'区块链信息查询'  
             }}
          >  
         </Stack.Screen>

         <Stack.Screen  
            component={SelectLanguage} 
            name='SelectLanguage'
            options={{  
              title:'选择语言'  
             }}
          >  
         </Stack.Screen>

         <Stack.Screen  
            component={MessageCenter} 
            name='MessageCenter'
            options={{  
              title:'消息中心'  
             }}
          >  
         </Stack.Screen>
         {/* 合集详情 */}
         <Stack.Screen  
            component={CollectionDetails} 
            name='collectionDetails'
            options={{  
              headerTransparent: true ,// 会将页面与标题重叠
              title:''  
             }}
          >  
         </Stack.Screen>

         <Stack.Screen  
            component={SystemNotification} 
            name='SystemNotification'
            options={{  
              title:'系统通知'  
             }}
          >  
         </Stack.Screen>

         <Stack.Screen  
            component={NoticeDetails} 
            name='NoticeDetails'
            options={{  
              title:'通知详情'  
             }}
          >  
         </Stack.Screen>

         <Stack.Screen  
            component={ILikeIt} 
            name='ILikeIt'
            options={{  
              title:'喜欢'  
             }}
          >  
         </Stack.Screen>


         <Stack.Screen  
            component={TransferredIntoCollection} 
            name='TransferredIntoCollection'
            options={{  
              title:'转入藏品'  
             }}
          >  
         </Stack.Screen>

         <Stack.Screen  
            component={CreateCollection} 
            name='CreateCollection'
            options={{  
              title:'创建藏品'  
             }}
          >  
         </Stack.Screen>

         <Stack.Screen  
            component={CreatedSuccessfully} 
            name='CreatedSuccessfully'
            options={{  
              title:''  
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
          component={QuotationDetails}
          name='QuotationDetails'
          options={{
            title: "",
          }}
        >
        </Stack.Screen>

      </Stack.Navigator>
    )
  }
}

const styles = StyleSheet.create({})