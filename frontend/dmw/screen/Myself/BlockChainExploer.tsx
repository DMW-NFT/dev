import React, { Component } from "react";
import { WebView } from "react-native-webview";
import { ScrollView, useWindowDimensions } from "react-native";

const BlockChainExploer = ({ route, navigation }) => {
  const { width } = useWindowDimensions();

  const {uri} = route.params;
  return (
    <WebView
      originWhitelist={["*"]}
      contentWidth={width}
      source={{ uri: uri }}
      // style={{ marginTop: 20 }}
    />
  );
};

export default BlockChainExploer;
