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
} from "react-native";
import { useTranslation } from "react-i18next";
import { IndexPath, Layout, Select, SelectItem } from "@ui-kitten/components";
const screenWidth = Dimensions.get("window").width;
const scale = Dimensions.get("window").scale;
const screenHeight = Dimensions.get("window").height;
const BlockchainQuery = () => {
  const { t, i18n } = useTranslation();
  // constructor(porps) {
  //   super(porps);
  //   state = {
  //       Blockchainval: '',
  //   };
  // }
  const [network, setNetWork] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const [searchContent, setSearchContent] = useState('');
  const networkList =  ['ethereume','bsc','polygon']
  useEffect(()=>{
    setNetWork(networkList[selectedIndex.row])
  },[selectedIndex])

  return (
    <SafeAreaView
      style={{
        paddingTop: 38,
        position: "relative",
        height: Dimensions.get("window").height,
        backgroundColor: "#fff",
      }}
    >
      <View style={{ paddingLeft: 20, paddingRight: 20 }}>
        <Select
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
          style={{paddingBottom:20}}
          // placeholder='ethereume'
          value={networkList[selectedIndex.row]}
        >
          <SelectItem title="ethereume" />
          <SelectItem title="bsc" />
          <SelectItem title="polygon" />
        </Select>
        <TextInput
          multiline={true}
          textAlignVertical="top"
          numberOfLines={5}
          placeholder={t("请输入地址")}
          keyboardType="default"
          style={[styles.textarea]}
          onChangeText={(e) => setSearchContent(e)}
          value={searchContent}
        />

        <Text style={{ color: "#999999", fontSize: 10 }}>
          {t("支持藏品、账户相关区块链信息查询")}
        </Text>
      </View>

      <Text style={styles.btn}>{t("查询")}</Text>
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
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 50,
    position: "absolute",
    bottom: 138,
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
