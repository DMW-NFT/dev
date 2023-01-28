import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  TextInput,
  Button,
  Linking,
  ScrollView,
} from "react-native";
import { useTranslation } from "react-i18next";

import { ButtonGroup } from "@rneui/themed";
import { useDmwApi } from "../../../DmwApiProvider/DmwApiProvider";
import BlockChainExploer from "./BlockChainExploer";
const screenWidth = Dimensions.get("window").width;
const scale = Dimensions.get("window").scale;
const screenHeight = Dimensions.get("window").height;

const BlockchainQuery = (props) => {
  const { t, i18n } = useTranslation();
  const { post, formData, Toast } = useDmwApi();
  // constructor(porps) {
  //   super(porps);
  //   state = {
  //       Blockchainval: '',
  //   };
  // }
  const [queryContent, setQueryContent] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const blockChainExploerList = [
    "https://etherscan.io/",
    "https://polygonscan.com/",
    "https://bscscan.com/",
  ];
  const openLinkUrl = (url: string) => {
    props.navigation.navigate("BlockChainExploer", { uri: url });
  };

  function checkInput(input) {
    if (input.length === 66 && input.startsWith("0x")) {
      return "tx/";
    } else if (input.length === 42 && input.startsWith("0x")) {
      return "address/";
    } else {
      return false;
    }
  }

  const queryData = () => {
    const prefix = checkInput(queryContent);
    if (prefix) {
      openLinkUrl(blockChainExploerList[selectedIndex] + prefix + queryContent);
    } else {
      Toast(t("请输入正确的交易哈希或钱包地址"));
    }
  };

  return (
    <SafeAreaView
      style={{
        paddingTop: 38,
        position: "relative",
        height: Dimensions.get("window").height,
        backgroundColor: "#fff",
      }}
    >
      <ScrollView>
        <View style={{ paddingLeft: 20, paddingRight: 20 }}>
          <ButtonGroup
            buttons={["Ethereume", "Polygon", "BSC"]}
            selectedIndex={selectedIndex}
            onPress={(value) => {
              setSelectedIndex(value);
              console.log(value);
            }}
            containerStyle={{ marginBottom: 20, borderRadius: 20 }}
            selectedButtonStyle={{ backgroundColor: "#897EF8" }}
          />
          <TextInput
            multiline={true}
            textAlignVertical="top"
            numberOfLines={5}
            placeholder={t("请输入地址")}
            keyboardType="default"
            style={[styles.textarea]}
            onChangeText={(e) => setQueryContent(e)}
            value={queryContent}
          />

          <Text style={{ color: "#999999", fontSize: 10 }}>
            {t("支持藏品、账户相关区块链信息查询")}
          </Text>
          <Text
            style={styles.btn}
            onPress={() => {
              queryData();
            }}
          >
            {t("查询")}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BlockchainQuery;

const styles = StyleSheet.create({
  btn: {
    width: screenWidth - 40,
    backgroundColor: "#897EF8",
    color: "#fff",
    height: 50,
    lineHeight: 50,
    textAlign: "center",
    // marginRight: 20,
    // marginLeft: 20,
    borderRadius: 50,
    marginTop: 100,
    // position: "absolute",
    // bottom: 138,
  },

  textarea: {
    paddingTop: 10,
    // borderColor: 'gray',
    borderWidth: 1,
    borderColor: "#ccc",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 9,
  },
});
