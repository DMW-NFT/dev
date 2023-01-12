import React, { Component } from "react";
import { WebView } from "react-native-webview";
import { ScrollView, useWindowDimensions } from "react-native";
import PrivacyPolicy_EN from "../../login/Text/PrivacyPolicy_EN";
import PrivacyPolicy_JP from "../../login/Text/PrivacyPolicy_JP";
import PrivacyPolicy_ZH from "../../login/Text/PrivacyPolicy_ZH";
import UserAgreement_EN from "../../login/Text/UserAgreement_EN";
import UserAgreement_JP from "../../login/Text/UserAgreement_JP";
import UserAgreement_ZH from "../../login/Text/UserAgreement_ZH";

const WebViewModal = ({ route, navigation }) => {
  const { width } = useWindowDimensions();
  const { type, language } = route.params;
  const renderMap = {
    privacyPolicy: {
      zh: PrivacyPolicy_ZH,
      jp: PrivacyPolicy_JP,
      en: PrivacyPolicy_EN,
    },
    userAgreement: {
      zh: UserAgreement_ZH,
      jp: UserAgreement_JP,
      en: UserAgreement_EN,
    },
  };

  return (
    <WebView
      originWhitelist={["*"]}
      contentWidth={width}
      source={{ html: renderMap[type][language] }}
      // style={{ marginTop: 20 }}
    />
  );
};

export default WebViewModal;
