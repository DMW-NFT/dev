import { Text, StyleSheet, View, SafeAreaView, Image } from "react-native";
import React, { Component } from "react";

import StepComp from "./StepComp";
import { finished } from "stream";
import { useDmwApi } from "../../../DmwApiProvider/DmwApiProvider";

const ImportAccount = (props) => {
  const { setMoneyRouteState } = useDmwApi();
  const CreateWalletFinish = () => {
    setMoneyRouteState("456");
    props.navigation.popToTop();
  };
  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <View style={styles.topBox}></View>
    </SafeAreaView>
  );
};

export default ImportAccount;
const styles = StyleSheet.create({
  topBox: {},
});
