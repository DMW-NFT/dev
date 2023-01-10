import React, { Component } from "react";
import { WebView } from "react-native-webview";

const WebViewModal = () => {
  return (
    <WebView
      source={{ uri: "www.baidu.com" }}
      style={{ marginTop: 20 }}
    />
  );
};

export default WebViewModal