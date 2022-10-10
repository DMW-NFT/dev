import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import Screen from "./BottomPopUpWindow";
import Lmodal from "./leftModal";
import { useDmwWallet } from "../../../DmwWallet/DmwWalletProvider";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const scale = Dimensions.get("window").scale;
const Money = (props) => {
  const [type, setType] = useState(2);
  const [list, setList] = useState([{}, {}]);
  const [visible, setVisible] = useState(false);
  const [lMvisible, setLMvisible] = useState(false);
  const { dmwWalletList } = useDmwWallet();

  const axios = () => {
  
  };

  const close = () => {
    setVisible(false);
    setLMvisible(false);
  };
  const lMvisibleopen = () => {
    setLMvisible(true);
  };
  const open = () => {
    setVisible(true);
  };
  const changetype = (val) => {
    setType(val);
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#fff",
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        position: "relative",
      }}
    >



      <View style={styles.hearder}>
        <View>
          <Text style={styles.hello}>hello</Text>
          <Text style={styles.HTitle}>Account 1</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => lMvisibleopen()}>
          <Image
            style={styles.top_img}
            source={require("../../assets/img/my/top_left_list.png")}
          ></Image>
        </TouchableWithoutFeedback>
      </View>
      <View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{
            marginBottom: 20,
            marginRight: -20,
            height: 336 / 2,
            marginLeft: -20,
          }}
        >
          <View style={styles.USDT}>
            <Text style={styles.WName}>DMW</Text>
            <View
              style={{ flexDirection: "row", marginTop: 15, marginBottom: 14 }}
            >
              <ImageBackground
                source={require("../../assets/img/money/WFCA.png")}
                style={{ marginRight: 10, justifyContent: "center" }}
              >
                <Text style={styles.CurrencyName}>USDT</Text>
              </ImageBackground>

              <Text style={styles.balance}>999.99</Text>
            </View>
            <Text style={{ color: "#fff" }}>$10.000</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: "#fff" }}>0xD652fw…G673C7C4</Text>
              <Image
                style={{ width: 10, height: 10, marginLeft: 5 }}
                source={require("../../assets/img/money/copyW.png")}
              ></Image>
            </View>
          </View>

          <View style={styles.WFCA}>
            <Text style={[styles.WName, { color: "#897EF8" }]}>DMW</Text>
            <View
              style={{ flexDirection: "row", marginTop: 15, marginBottom: 14 }}
            >
              <ImageBackground
                source={require("../../assets/img/money/USDT.png")}
                style={{ marginRight: 10, justifyContent: "center" }}
              >
                <Text style={[styles.CurrencyName, { color: "#897EF8" }]}>
                  USDT
                </Text>
              </ImageBackground>

              <Text style={[styles.balance, { color: "#897EF8" }]}>999.99</Text>
            </View>
            <Text style={{ color: "#897EF8" }}>$10.000</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: "#897EF8" }}>0xD652fw…G673C7C4</Text>
              <Image
                style={{ width: 10, height: 10, marginLeft: 5 }}
                source={require("../../assets/img/my/copy.png")}
              ></Image>
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text style={styles.service}>service</Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableWithoutFeedback onPress={() => open()}>
          <View style={styles.ListService}>
            <Image
              style={styles.ListServiceImg}
              source={require("../../assets/img/money/list1.png")}
            ></Image>
            <Text>接收</Text>
          </View>
        </TouchableWithoutFeedback>

        

        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.navigate("Exchange");
          }}
        >
          <View style={styles.ListService}>
            <Image
              style={styles.ListServiceImg}
              source={require("../../assets/img/money/list3.png")}
            ></Image>
            <Text>兑换</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.navigate("Gift");
          }}
        >
          <View style={styles.ListService}>
            <Image
              style={styles.ListServiceImg}
              source={require("../../assets/img/money/list4.png")}
            ></Image>
            <Text>赠予</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => axios()}>
          <View style={styles.ListService}>
            <Image
              style={styles.ListServiceImg}
              source={require("../../assets/img/money/list2.png")}
            ></Image>
            <Text>记录</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      {/* tab栏 -- start */}
      <View style={[styles.daohang]}>
        <Text
          style={[
            type === 2 ? styles.daonghang_text_ative : styles.daonghang_text,
          ]}
          onPress={() => changetype(2)}
        >
          代币
        </Text>
        <Text
          style={[
            type === 3 ? styles.daonghang_text_ative : styles.daonghang_text,
          ]}
          onPress={() => changetype(3)}
        >
          藏品
        </Text>
      </View>
      {/* tab栏 -- end */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.listbox]}>
          <View style={styles.ListLi}>
            <Image
              style={{ width: 40, height: 40 }}
              source={require("../../assets/img/money/list4.png")}
            ></Image>
            <View style={styles.ListLeftText}>
              <Text style={{ fontSize: 16, fontWeight: "700", lineHeight: 24 }}>
                999.99 USDT
              </Text>
              <Text style={{ fontSize: 12 }}>$10.000</Text>
            </View>
          </View>

          <View style={styles.ListLi}>
            <Image
              style={{ width: 40, height: 40 }}
              source={require("../../assets/img/money/list4.png")}
            ></Image>
            <View style={styles.ListLeftText}>
              <Text style={{ fontSize: 16, fontWeight: "700", lineHeight: 24 }}>
                999.99 USDT
              </Text>
              <Text style={{ fontSize: 12 }}>$10.000</Text>
            </View>
          </View>

          <View style={styles.ListLi}>
            <Image
              style={{ width: 40, height: 40 }}
              source={require("../../assets/img/money/list4.png")}
            ></Image>
            <View style={styles.ListLeftText}>
              <Text style={{ fontSize: 16, fontWeight: "700", lineHeight: 24 }}>
                999.99 USDT
              </Text>
              <Text style={{ fontSize: 12 }}>$10.000</Text>
            </View>
          </View>

          <View style={styles.ListLi}>
            <Image
              style={{ width: 40, height: 40 }}
              source={require("../../assets/img/money/list4.png")}
            ></Image>
            <View style={styles.ListLeftText}>
              <Text style={{ fontSize: 16, fontWeight: "700", lineHeight: 24 }}>
                999.99 USDT
              </Text>
              <Text style={{ fontSize: 12 }}>$10.000</Text>
            </View>
          </View>

          <View style={styles.ListLi}>
            <Image
              style={{ width: 40, height: 40 }}
              source={require("../../assets/img/money/list4.png")}
            ></Image>
            <View style={styles.ListLeftText}>
              <Text style={{ fontSize: 16, fontWeight: "700", lineHeight: 24 }}>
                999.99 USDT
              </Text>
              <Text style={{ fontSize: 12 }}>$10.000</Text>
            </View>
          </View>

          <View style={styles.ListLi}>
            <Image
              style={{ width: 40, height: 40 }}
              source={require("../../assets/img/money/list4.png")}
            ></Image>
            <View style={styles.ListLeftText}>
              <Text style={{ fontSize: 16, fontWeight: "700", lineHeight: 24 }}>
                999.99 USDT
              </Text>
              <Text style={{ fontSize: 12 }}>$10.000</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <Screen
        style={[styles.Screen]}
        visible={visible}
        close={() => close()}
      ></Screen>

      <Lmodal
        goto={(path) => {
          props.navigation.navigate(path);
        }}
        style={[styles.Screen]}
        close={() => close()}
        visible={lMvisible}
      ></Lmodal>
    </SafeAreaView>
  );
};

export default Money;

const styles = StyleSheet.create({
  Screen: {
    width: screenWidth,
    position: "absolute",
  },
  ListLi: {
    flexDirection: "row",
    borderBottomWidth: 1 / scale,
    borderBottomColor: "#CCCCCC",
    paddingBottom: 16,
    marginBottom: 20,
  },
  ListLeftText: {
    marginLeft: 10,
    flex: 1,
  },
  hearder: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  HTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333333",
  },
  hello: {
    fontSize: 12,
    color: "#666666",
  },
  top_img: {
    width: 40,
    height: 40,
  },
  WFCA: {
    width: 610 / 2,
    height: 336 / 2,
    backgroundColor: "#F0EFFE",
    borderRadius: 10,
    marginRight: 15,
    paddingTop: 24,
    paddingLeft: 20,
  },
  USDT: {
    marginLeft: 20,
    width: 610 / 2,
    height: 336 / 2,
    backgroundColor: "#897EF8",
    borderRadius: 10,
    marginRight: 15,
    paddingTop: 24,
    paddingLeft: 20,
  },
  WName: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "Source Han Sans CN",
    lineHeight: 24,
  },
  CurrencyName: {
    color: "#fff",
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  balance: {
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 24,
    color: "#fff",
  },
  service: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333333",
  },
  ListService: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  ListServiceImg: {
    marginBottom: 5,
    width: 60,
    height: 60,
  },
  listbox: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  daohang: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  daonghang_text: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Source Han Sans CN",
    height: 56,
    lineHeight: 56,
    flex: 1,
    color: "#666666",
    textAlign: "center",
  },
  daonghang_text_ative: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Source Han Sans CN",
    height: 56,
    lineHeight: 56,
    flex: 1,
    textAlign: "center",
    borderBottomColor: "#897EF8",
    borderBottomWidth: 3,
    color: "#897EF8",
    borderRadius: 1,
  },
});
