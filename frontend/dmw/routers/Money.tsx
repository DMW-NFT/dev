import {
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import React, { Component, useContext, useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MoneyScreen from "../screen/Money/Money";
import CreateMoney from "../screen/Money/CreateMoney"; //进入钱包主页
import ImportWord from "../screen/Money/ImportWord"; // 导入钱包
import CreateWord from "../screen/Money/CreateWord"; // 创建钱包
import WalletSafe from "../screen/Money/WalletSafe"; // 保护钱包安全1
import WalletSafeShow from "../screen/Money/WalletSafeShow"; // 保护钱包安全2
import DetermineWord from "../screen/Money/DetermineWord"; // 确认助记词
import CompleteBackup from "../screen/Money/CompleteBackup"; // 完成备份
import Exchange from "../screen/Money/Exchange"; // 兑换
import Gift from "../screen/Money/Gift"; // 发送
import ViewMnemonics from "../screen/Money/ViewMnemonics"; // 助记词
import RedemptionSettings from "../screen/Money/RedemptionSettings"; // 发送
import TermsOfService from "../screen/Money/TermsOfService"; // 发送
import Privatekeyimport from "../screen/Money/Privatekeyimport"; // 发送
import { useDmwApi } from "../../DmwApiProvider/DmwApiProvider";
import { useDmwWallet } from "../../DmwWallet/DmwWalletProvider";
import { useTranslation } from 'react-i18next'

const Stack = createStackNavigator();
const Home = (props) => {
  const { t, i18n } = useTranslation();
  const { MoneyRouteState, setMoneyRouteState } = useDmwApi();
  const {dmwWalletList} = useDmwWallet()
  useEffect(()=>{
console.log(MoneyRouteState,dmwWalletList,'----------------');
if(dmwWalletList && dmwWalletList.length){
  setMoneyRouteState('456')
}
  },[MoneyRouteState,dmwWalletList])
  return (
    <Stack.Navigator
      initialRouteName={"createMoney"}
      screenOptions={{ headerShadowVisible: false }}
    >
      <Stack.Screen
        component={MoneyRouteState == "createMoney" ? CreateMoney : MoneyScreen}
        name="createMoney"
        options={{
          headerMode: "none",
        }}
      ></Stack.Screen>
      <Stack.Screen
        component={MoneyScreen}
        name="money"
        options={{
          headerMode: "none",
        }}
      ></Stack.Screen>

      <Stack.Screen
        component={ImportWord}
        name="importWord"
        options={{
          title: t("从助记词导入"),
        }}
      ></Stack.Screen>

<Stack.Screen
        component={Privatekeyimport}
        name="Privatekeyimport"
        options={{
          title: "",
        }}
      ></Stack.Screen>


      <Stack.Screen
        component={CreateWord}
        name="createWord"
        options={{
          title: "",
        }}
      ></Stack.Screen>
      <Stack.Screen
        component={WalletSafe}
        name="walletSafe"
        options={{
          title: "",
        }}
      ></Stack.Screen>
      {/*  */}
      <Stack.Screen
        component={WalletSafeShow}
        name="walletSafeShow"
        options={{
          title: "",
        }}
      ></Stack.Screen>
      <Stack.Screen
        component={DetermineWord}
        name="determineWord"
        options={{
          title: "",
        }}
      ></Stack.Screen>
      <Stack.Screen
        component={CompleteBackup}
        name="completeBackup"
        options={{
          title: "",
        }}
      ></Stack.Screen>

      <Stack.Screen
        component={Exchange}
        name="Exchange"
        options={{
          title: t("兑换"),
          headerRight: () => {
            return (
              <TouchableWithoutFeedback
                onPress={() => {
                  props.navigation.navigate("RedemptionSettings", {
                    visible: true,
                  });
                }}
              >
                <ImageBackground
                  source={require("../assets/img/money/setup.png")}
                  style={{ width: 40, height: 40, marginRight: 15 }}
                ></ImageBackground>
              </TouchableWithoutFeedback>
            );
          },
        }}
      ></Stack.Screen>

      <Stack.Screen
        component={Gift}
        name="Gift"
        options={{
          title: t("发送"),
        }}
      ></Stack.Screen>

      <Stack.Screen
        component={RedemptionSettings}
        name="RedemptionSettings"
        options={{
          title: t("兑换设置"),
        }}
      ></Stack.Screen>

<Stack.Screen
        component={ViewMnemonics}
        name="ViewMnemonics"
        options={{
          title: t("助记词"),
        }}
      ></Stack.Screen>

<Stack.Screen
        component={TermsOfService}
        name="TermsOfService"
        options={{
          title: t("服务条款"),
        }}
      ></Stack.Screen>

    </Stack.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({});
