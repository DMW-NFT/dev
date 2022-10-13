import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
const scale = Dimensions.get("window").scale;
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Lmodal = (props) => {
  const close = () => {
    props.close();
  };
  const cilck = (path) => {
    props.goto(path);
  };
  const FNZ = () => {
    props.openModal()
  }

  return (
    <View style={{ position: "absolute" }}>
      <Text
        onPress={() => close()}
        style={[props.visible ? styles.black : null, { position: "absolute" }]}
      ></Text>

      {props.visible ? (
        <View style={styles.Lm_box}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginRight: 10,
              }}
              source={require("../../assets/img/index/any2.jpg")}
            ></Image>
            <Text style={{ fontSize: 16, fontWeight: "700" }}>DMW</Text>
          </View>
          <View
            style={{
              borderTopColor: "#ccc",
              borderTopWidth: 1,
              marginLeft: -20,
              marginRight: -20,
              marginBottom: 20,
            }}
          ></View>

          <TouchableWithoutFeedback onPress={() => FNZ()}>
            <View style={styles.listBox}>
              <Image
                style={styles.Limg}
                source={require("../../assets/img/money/zhujici.png")}
              ></Image>
              <Text>助记词</Text>
            </View>
          </TouchableWithoutFeedback>


          <TouchableWithoutFeedback>
            <View style={styles.listBox}>
              <Image
                style={styles.Limg}
                source={require("../../assets/img/money/daoru.png")}
              ></Image>
              <Text>导入助记词</Text>
            </View>
          </TouchableWithoutFeedback>



          <TouchableWithoutFeedback>
            <View style={styles.listBox}>
              <Image
                style={styles.Limg}
                source={require("../../assets/img/money/xiugai.png")}
              ></Image>
              <Text>修改支付密码</Text>
            </View>
          </TouchableWithoutFeedback>


          <TouchableWithoutFeedback>
            <View style={styles.listBox}>
              <Image
                style={styles.Limg}
                source={require("../../assets/img/money/lainjie.png")}
              ></Image>
              <Text>连接第三方钱包</Text>
            </View>
          </TouchableWithoutFeedback>


          <TouchableWithoutFeedback>
            <View style={styles.listBox}>
              <Image
                style={styles.Limg}
                source={require("../../assets/img/money/siyao.png")}
              ></Image>
              <Text>从私钥导入钱包</Text>
            </View>
          </TouchableWithoutFeedback>



          <TouchableWithoutFeedback>
            <View style={styles.listBox}>
              <Image
                style={styles.Limg}
                source={require("../../assets/img/money/fuwutiaokuan.png")}
              ></Image>
              <Text>服务条款</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      ) : null}
    </View>
  );
};

export default Lmodal;

const styles = StyleSheet.create({
  listBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom:20
  },
  Limg: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  black: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 9,
  },
  Lm_box: {
    zIndex: 10,
    width: screenWidth - 60,
    height: screenHeight,
    backgroundColor: "#fff",
    position: "absolute",
    top: 0,
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontFamily: "Source Han Sans CN",
    fontWeight: "700",
    marginBottom: 20,
  },
  img_bottom_text: {
    fontSize: 12,
    textAlign: "center",
  },
  moreimg: {
    width: 45,
    height: 45,
    marginRight: 10,
  },
  more: {
    flexDirection: "row",
    alignItems: "center",
    height: 45,
    justifyContent: "space-between",
    marginBottom: 20,
  },
  more_text: {
    fontSize: 14,
    fontWeight: "500",
  },
});
