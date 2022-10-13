import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { Modal } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCaretDown,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
const scale = Dimensions.get("window").scale;
const screenWidth = Dimensions.get("window").width;

const Exchange = (props) => {
  const [visible, setVisible] = useState(false);
  const [currency, setCurrency] = useState("100");
  const [rate, setRate] = useState(false);
  const close = () => {
    setVisible(false);
  };
  const open = () => {
    setVisible(true);
  };

  const onChangeCurrency = (currency) => {
    setCurrency(currency);
  };

  return (
    <SafeAreaView
      style={[
        props.style,
        {
          backgroundColor: "#fff",
          flex: 1,
          paddingTop: 22,
          paddingLeft: 20,
          paddingRight: 20,
        },
      ]}
    >
      <View style={styles.Exchangecurrency}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            value={currency}
            placeholderTextColor="#ccc"
            placeholder="请输入"
            style={{ flex: 1, textAlign: "left", fontSize: 16 }}
            onChangeText={(currency) => onChangeCurrency(currency)}
          />
          <TouchableWithoutFeedback
            onPress={() => {
              setVisible(true);
            }}
          >
            <View style={styles.EXrightTop}>
              <Text>ETH</Text>
              <Text style={{ marginLeft: 5, marginRight: 12 }}>ETH</Text>
              <FontAwesomeIcon icon={faCaretDown} color="#707070" size={17} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.EXrIGHT}>
          <View style={{ flex: 1 }}></View>
          <View style={styles.EXrightBtm}>
            <Text>余额：99,990,000</Text>
            <Image
              style={{ width: 40, height: 15 }}
              source={require("../../assets/img/money/max.png")}
            ></Image>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
          marginTop: 10,
        }}
      >
        <Text style={styles.underline}></Text>
        <Image
          style={{ width: 15, height: 15, marginLeft: 15, marginRight: 15 }}
          source={require("../../assets/img/money/duanhaun2.png")}
        ></Image>
        <Text style={styles.underline}></Text>
      </View>

      <View style={[styles.Exchangecurrency, { marginBottom: 20 }]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            value={currency}
            placeholderTextColor="#ccc"
            placeholder="请输入"
            style={{ flex: 1, textAlign: "left", fontSize: 16 }}
            onChangeText={(currency) => onChangeCurrency(currency)}
          />
          <View style={styles.EXrightTop}>
            <Text>ETH</Text>
            <Text style={{ marginLeft: 5, marginRight: 12 }}>ETH</Text>
            <FontAwesomeIcon icon={faCaretDown} color="#707070" size={17} />
          </View>
        </View>

        <View style={styles.EXrIGHT}>
          <View style={{ flex: 1 }}></View>
          <View style={styles.EXrightBtm}>
            <Text>余额：99,990,000</Text>
            <Image
              style={{ width: 40, height: 15 }}
              source={require("../../assets/img/money/max.png")}
            ></Image>
          </View>
        </View>
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          setRate(!rate);
        }}
      >
        <View style={styles.exchangeRate}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ width: 15, height: 15, marginRight: 5 }}
              source={require("../../assets/img/money/!.png")}
            ></Image>
            <Text style={{ fontSize: 12 }}>1 USDT=1.001WFCA</Text>
          </View>
          <FontAwesomeIcon
            icon={rate ? faAngleUp : faAngleDown}
            color="#707070"
            size={14}
          />
        </View>
      </TouchableWithoutFeedback>
{
    rate?
    <View style={styles.rateInfo}>
        <View style={styles.infoText}>
          <Text style={styles.infoFs}>预期获得</Text>
          <Text style={styles.infoFs}>110.145USDT</Text>
        </View>
        <View style={styles.infoText}>
          <Text style={styles.infoFs}>兑换率影响</Text>
          <Text style={styles.infoFs}>0.00%</Text>
        </View>
        <View style={styles.rateInfoTline}></View>
        <View style={[styles.infoText]}>
          <Text style={styles.infoFs}>收到的最低数额 滑点后（0.50%）</Text>
          <Text style={styles.infoFs}>110.145USDT</Text>
        </View>
      </View> : null
}
      

      <Modal
        visible={visible}
        onDismiss={() => close()}
        contentContainerStyle={[styles.footer]}
      >
        <View style={[styles.btnline]}></View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View style={styles.copy}>
            <Text style={{ fontSize: 12 }}>0xD652fw…G673C7C4</Text>
            <Text style={styles.CopyBtn}>复制</Text>
          </View>
        </View>
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          复制地址以接收付款
        </Text>
      </Modal>

      {visible ? null : <Text style={styles.btn}>兑换</Text>}
    </SafeAreaView>
  );
};

export default Exchange;

const styles = StyleSheet.create({
  infoText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoFs:{
    fontSize:12,
    fontFamily:'Source Han Sans CN'
  },
  rateInfo: {
    height: 221 / 2,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 10,
    padding: 14,
    justifyContent: "space-between",
    
  },
  rateInfoTline: {
    borderTopWidth:1,
    borderTopColor: "#CCC",
    marginRight:-14,
    marginLeft:-14
  },
  exchangeRate: {
    height: 64 / 2,
    backgroundColor: "#F5F5F5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 14,
    paddingLeft: 14,
    marginBottom: 10,
  },
  EXrightBtm: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  EXrightTop: {
    flexDirection: "row",
    height: 40,
    backgroundColor: "#EEEEEE",
    borderRadius: 20,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: "center",
    width: 224 / 2,
  },
  EXrIGHT: {
    flexDirection: "row",
  },
  Exchangecurrency: {
    height: 164 / 2,
    backgroundColor: "#F5F5F5",
    paddingTop: 8,
    paddingLeft: 20,
    paddingBottom: 9,
    paddingRight: 10,
  },
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
    bottom: 14,
    zIndex: 1,
  },
  Ethimg: {
    width: 15,
    height: 24,
  },
  EthsStyle: {
    height: 40,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 20,
  },
  CopyBtn: {
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#897EF8",
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    color: "#fff",
    marginLeft: 20,
  },
  copy: {
    paddingLeft: 20,
    paddingRight: 20,
    height: 50,
    backgroundColor: "#F5F5F5",
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  btnline: {
    position: "absolute",
    width: 40,
    height: 6,
    backgroundColor: "#E0E0E0",
    top: 6,
    borderRadius: 50,
    left: "50%",
  },
  footer: {
    height: 428 / 2,
    zIndex: 999,
    width: Dimensions.get("window").width,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    // paddingTop: 23,
    paddingBottom: 48,
  },
  createMoneyBtn: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#897EF8",
    height: 50,
    lineHeight: 50,
    textAlign: "center",
    color: "#897EF8",
    borderRadius: 25,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 30,
  },
  sureMoneyBtn: {
    backgroundColor: "#897EF8",
    width: "100%",
    borderWidth: 1,
    borderColor: "#897EF8",
    height: 50,
    lineHeight: 50,
    textAlign: "center",
    color: "#fff",
    borderRadius: 25,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 100,
  },
  container: {
    height: Dimensions.get("window").height,
    padding: 70 / 2,
    paddingTop: 10,
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    top: 0,
  },
  modal_text: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Source Han Sans CN",
    textAlign: "center",
    marginBottom: 30,
  },
  line: {
    borderColor: "#CCCCCC",
    width: screenWidth - 40,
    height: 1,
    borderWidth: 1 / scale,
    marginBottom: 20,
  },
  underline: {
    flex: 1,
    width: screenWidth - 40,
    height: 15,
    borderBottomWidth: 1 / scale,
    marginBottom: 20,
    borderBottomColor: "#CCCCCC",
  },
});
