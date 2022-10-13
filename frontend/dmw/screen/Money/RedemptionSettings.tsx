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
  TextInput,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import Screen from "./BottomPopUpWindow";
import Lmodal from "./leftModal";
import { useDmwWallet } from "../../../DmwWallet/DmwWalletProvider";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const scale = Dimensions.get("window").scale;
const RedemptionSettings = (props) => {
  const [strText, setSstrText] = useState("30");
  const [tolerance, setTolerance] = useState("50");
  const [isAuto, setIsAuto] = useState(true);
  const onChange = (strText) => {
    setSstrText(strText);
  };

  const onChangeTolerance = (val) => {
    setTolerance(val);
    setIsAuto(false);
  };
  const Auto = () => {
    setIsAuto(true);
    setTolerance('50')
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#fff",
        flex: 1,
        paddingLeft: 24,
        paddingRight: 24,
        position: "relative",
      }}
    >
      <Text style={{ marginBottom: 20 }}>滑点容差</Text>

      <View style={styles.btnBox}>
        <Text style={[isAuto ? styles.leftBtn : styles.leftBtnNoAuto]} onPress={() => Auto()}>
          自动
        </Text>
        {/* <Text style={styles.rightBtn}>50%</Text> */}
        <View
          style={[
            {
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              borderColor: "#ccc",
              borderWidth: 1,
              borderRadius: 20,
            },
            styles.rightBtn,
          ]}
        >
          <TextInput
            value={tolerance}
            placeholderTextColor="#ccc"
            placeholder="请输入"
            style={{ flex: 1, textAlign: "right", fontSize: 16 }}
            onChangeText={(tolerance) => onChangeTolerance(tolerance)}
          />
          <Text style={{ fontSize: 16 }}>%</Text>
        </View>
      </View>

      <Text style={{ marginBottom: 20 }}>交易截止期限</Text>

      <View style={styles.timeBtn}>
        <View>
          <TextInput
            value={strText}
            placeholderTextColor="#ccc"
            placeholder="请输入"
            style={styles.time}
            onChangeText={(strText) => onChange(strText)}
          />
        </View>
        <Text style={styles.timeText}>分钟</Text>
      </View>
    </SafeAreaView>
  );
};

export default RedemptionSettings;

const styles = StyleSheet.create({
  btnBox: {
    flexDirection: "row",
    marginBottom: 36,
  },
  leftBtn: {
    marginRight: 20,
    borderRadius: 20,
    backgroundColor: "#897EF8",
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20,
    paddingRight: 20,
    color: "#fff",
  },
  leftBtnNoAuto: {
    marginRight: 20,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20,
    paddingRight: 20,
    color: "#333",
    borderWidth:1,
    borderColor:'#ccc'
  },
  rightBtn: {
    marginRight: 20,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    color: "#333",
    flex: 1,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    textAlign: "right",
  },
  time: {
    width: 279 / 2,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    height: 40,
    paddingLeft: 14,
    paddingRight: 14,
    textAlign: "right",
  },
  timeBtn: {
    flexDirection: "row",
    // justifyContent:'center',
    alignItems: "center",
  },
  timeText: {
    fontSize: 16,
    color: "#333333",
    marginLeft: 14,
  },
});
