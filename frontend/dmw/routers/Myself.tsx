import { StyleSheet } from "react-native";
import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyselfScreen from "../screen/Myself/Myself";
import SellOrder from "../screen/Myself/SellOrder";
import SetUp from "../screen/Myself/SetUp";
import ModifyInfo from "../screen/Myself/ModifyInfo";
import TransferNft from "../screen/Myself/TransferNft";
import BlockchainQuery from "../screen/Myself/BlockchainQuery";
import SelectLanguage from "../screen/Myself/SelectLanguage";
import MessageCenter from "../screen/Myself/MessageCenter";
import SystemNotification from "../screen/Myself/SystemNotification";
import NoticeDetails from "../screen/Myself/NoticeDetails";
import ILikeIt from "../screen/Myself/ILikeIt";
import TransferredIntoCollection from "../screen/Myself/TransferredIntoCollection";
import CreateCollection from "../screen/Myself/CreateCollection";
import CreatedSuccessfully from "../screen/Myself/CreatedSuccessfully";

import AuctionOrderr from "../screen/Myself/AuctionOrder";
import CompleteBackup from "../screen/Money/CompleteBackup";
import TradeSuccessfully from "../screen/Myself/TradeSuccessfully";
import CollectionDetails from "../screen/Other/CollectionDetails";
import MyCollection from "../screen/Myself/MyCollection";
import Sell from "../screen/Myself/Sell"; //卖出
import AddCreateCollection from "../screen/Myself/AddCreateCollection"; //卖出

import GoodsDetail from "../screen/Other/GoodsDetail";
import QuotationDetails from "../screen/Other/QuotationDetails";
import WebViewModal from "../screen/Other/WebViewModal";
import ContactUs from "../screen/Myself/ContactUs";
import BlockChainExploer from "../screen/Myself/BlockChainExploer";

import { useTranslation } from "react-i18next";
const Stack = createStackNavigator();
const Home = () => {
  const { t, i18n } = useTranslation();
  return (
    <Stack.Navigator
      initialRouteName="myself"
      screenOptions={{ headerShadowVisible: false }}
    >
      <Stack.Screen
        component={MyselfScreen}
        name="myself"
        options={{
          headerMode: "null",
          title:null,
          headerTransparent: true
        }}
      ></Stack.Screen>
      <Stack.Screen
        component={Sell}
        name="sell"
        options={{
          headerTitle: t("卖出"),
        }}
      ></Stack.Screen>
      <Stack.Screen
        component={MyCollection}
        name="myCollection"
        options={{
          headerTitle: t("合集"),
        }}
      ></Stack.Screen>
      <Stack.Screen
        component={CompleteBackup}
        name="completeBackup"
        options={{
          headerMode: "none",
        }}
      ></Stack.Screen>
      <Stack.Screen
        component={SellOrder}
        name="sellOrder"
        options={{
          title: t("售卖订单"),
        }}
      ></Stack.Screen>
      <Stack.Screen
        component={AuctionOrderr}
        name="auctionOrder"
        options={{
          title: t("拍卖订单"),
        }}
      ></Stack.Screen>
      <Stack.Screen
        component={TradeSuccessfully}
        name="TradeSuccessfully"
        options={{
          title: t("交易成功"),
        }}
      ></Stack.Screen>

      <Stack.Screen
        component={SetUp}
        name="SetUp"
        options={{
          title: t("设置"),
        }}
      ></Stack.Screen>

      <Stack.Screen
        component={ModifyInfo}
        name="ModifyInfo"
        options={{
          title: t("修改个人信息"),
        }}
      ></Stack.Screen>

      <Stack.Screen
        component={TransferNft}
        name="TransferNft"
        options={{
          title: t("转移藏品"),
        }}
      ></Stack.Screen>

      <Stack.Screen
        component={BlockchainQuery}
        name="BlockchainQuery"
        options={{
          title: t("区块链信息查询"),
        }}
      ></Stack.Screen>

      <Stack.Screen
        component={SelectLanguage}
        name="SelectLanguage"
        options={{
          title: t("选择语言"),
        }}
      ></Stack.Screen>

      <Stack.Screen
        component={MessageCenter}
        name="MessageCenter"
        options={{
          title: t("消息中心"),
        }}
      ></Stack.Screen>
      {/* 合集详情 */}
      <Stack.Screen
        component={CollectionDetails}
        name="CollectionDetails"
        options={{
          headerTransparent: true, // 会将页面与标题重叠
          title: "",
        }}
      ></Stack.Screen>

      <Stack.Screen
        component={SystemNotification}
        name="SystemNotification"
        options={{
          title: t("系统通知"),
        }}
      ></Stack.Screen>

      <Stack.Screen
        component={NoticeDetails}
        name="NoticeDetails"
        options={{
          title: t("通知详情"),
        }}
      ></Stack.Screen>

      <Stack.Screen
        component={ILikeIt}
        name="ILikeIt"
        options={{
          title: t("喜欢"),
        }}
      ></Stack.Screen>

      <Stack.Screen
        component={TransferredIntoCollection}
        name="TransferredIntoCollection"
        options={{
          title: t("转入藏品"),
        }}
      ></Stack.Screen>

      <Stack.Screen
        component={CreateCollection}
        name="CreateCollection"
        options={{
          title: t("创建藏品"),
        }}
      ></Stack.Screen>

      <Stack.Screen
        component={AddCreateCollection}
        name="AddCreateCollection"
        options={{
          title: t("创建合集"),
        }}
      ></Stack.Screen>

      <Stack.Screen
        component={CreatedSuccessfully}
        name="CreatedSuccessfully"
        options={{
          title: "",
        }}
      ></Stack.Screen>

      <Stack.Screen
        component={GoodsDetail}
        name="goodsDetail"
        options={{
          title: "",
        }}
      ></Stack.Screen>
      <Stack.Screen
        component={QuotationDetails}
        name="QuotationDetails"
        options={{
          title: "",
        }}
      ></Stack.Screen>
      <Stack.Screen
        component={WebViewModal}
        name="WebViewModal"
        options={{
          title: "",
        }}
      ></Stack.Screen>
      <Stack.Screen
        component={ContactUs}
        name="ContactUs"
        options={{
          title: t("联系我们"),
        }}
      ></Stack.Screen>
      <Stack.Screen
        component={BlockChainExploer}
        name="BlockChainExploer"
        options={{
          title: t("区块链信息查询"),
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({});
