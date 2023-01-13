import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import React, { Component } from "react";
import { createStackNavigator,Navigator } from "@react-navigation/stack";
import HomeScreen from "../screen/Home/Home";
import SearchScreen from "../screen/Home/Search";
import CategrayScreen from "../screen/Home/Categray";
import GoodsDetail from "../screen/Other/GoodsDetail";
import QuotationDetails from "../screen/Other/QuotationDetails";
import { useTranslation } from "react-i18next";
import MessageCenter from "../screen/Myself/MessageCenter";
import SystemNotification from "../screen/Myself/SystemNotification";
import NoticeDetails from "../screen/Myself/NoticeDetails";
import TradeSuccessfully from "../screen/Myself/TradeSuccessfully";
import ILikeIt from "../screen/Myself/ILikeIt";
const Stack = createStackNavigator();

const Home = () => {
  const { t, i18n } = useTranslation();
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{ headerShadowVisible: false }}
    >
      <Stack.Screen
        component={HomeScreen}
        name="home"
        defaultNavigationOptions={{
          tabBarVisible: false,
        }}
        options={{
          headerBackTitleVisible: false, //对于后退按钮标题是否应该可见
          headerMode: "none",
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
        component={TradeSuccessfully}
        name="TradeSuccessfully"
        options={{
          title: t("交易成功"),
        }}
      ></Stack.Screen>


      <Stack.Screen
        component={MessageCenter}
        name="MessageCenter"
        options={{
          title: t("消息中心"),
        }}
      ></Stack.Screen>

      <Stack.Screen
        component={SearchScreen}
        name="searchScreen"
        options={{
          title: t("搜索"),
          headerRight: () => {
            // return <TouchableWithoutFeedback onPress={() => {
            //   this.props.navigation.navigate('searchScreen', { visible: true })
            // }}><ImageBackground source={require('../assets/img/allIconAndlImage/3574.png')} style={{ width: 40, height: 40, marginRight: 15 }}></ImageBackground></TouchableWithoutFeedback>
          },
        }}
      ></Stack.Screen>
      <Stack.Screen
        component={CategrayScreen}
        name="categrayScreen"
        options={{
          // headerTransparent: true ,// 会将页面与标题重叠
          title: "分类",
        }}
      ></Stack.Screen>

      <Stack.Screen
        component={SystemNotification}
        name="SystemNotification"
        options={{
          title: t("消息通知"),
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
        component={NoticeDetails}
        name="NoticeDetails"
        options={{
          title: t("消息详情"),
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default Home;
const styles = StyleSheet.create({});
