import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import React, { Component, useEffect, useState, useContext } from "react";

import StepComp from "./StepComp";

const ImportWord = (props) => {
  const [secureTextEntry, setsecureTextEntry] = useState(false);
  const [word, setword] = useState("");
  const [password, setpassword] = useState("");
  const [password1, setpassword1] = useState("");

  return (
    <SafeAreaView style={{ backgroundColor: "#fff",flex:1 }}>
      <View style={[styles.container]}>
        <StepComp type={1} />
        <View>
          <Text style={[styles.topInfo]}>创建支付密码</Text>
          <Text style={[styles.topInfo1]}>
            此密码将用在您签名资产或者您在支付代币时使用。
          </Text>
        </View>
        <View style={styles.lis}>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text style={styles.text}>新密码</Text>
            <TouchableWithoutFeedback
              onPress={() => {
                setsecureTextEntry(!setsecureTextEntry);
              }}
            >
              {secureTextEntry ? (
                <Image
                  style={[styles.imageshow]}
                  source={require("../../assets/img/login/nopass.png")}
                ></Image>
              ) : (
                <Image
                  style={[styles.imageshow]}
                  source={require("../../assets/img/login/showpass.png")}
                ></Image>
              )}
            </TouchableWithoutFeedback>
          </View>
          <TextInput
            maxLength={6}
            secureTextEntry={secureTextEntry}
            placeholder="新密码"
            keyboardType="decimal-pad"
            style={[styles.input]}
            onChangeText={(e) => setpassword(e)}
            value={password}
          />
        </View>
        <View style={styles.lis}>
          <Text style={styles.text}>新密码</Text>
          <TextInput
            maxLength={6}
            secureTextEntry={secureTextEntry}
            placeholder="确认新密码"
            keyboardType="decimal-pad"
            style={[styles.input]}
            onChangeText={(e) => setpassword1(e)}
            value={password1}
          />
          <Text style={[styles.text, { marginTop: 10, marginBottom: 32 }]}>
            请输入6位数数字
          </Text>
        </View>
        <Text
          style={[styles.import]}
          onPress={() => {
            props.navigation.navigate("walletSafe",{password,password1});
          }}
        >
          创建密码
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ImportWord;

const styles = StyleSheet.create({
  topInfo: {
    textAlign: "center",
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    marginBottom: 20,
  },
  topInfo1: {
    textAlign: "center",
    color: "#333333",
    fontSize: 12,
    marginBottom: 72 / 2,
  },
  import: {
    marginTop: 60,
    width: "100%",
    backgroundColor: "#897EF8",
    height: 50,
    lineHeight: 50,
    textAlign: "center",
    color: "#fff",
    borderRadius: 25,
    fontSize: 16,
    fontWeight: "bold",
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    paddingLeft: 15,
    paddingRight: 15,
  },
  imageshow: {
    width: 24,
    height: 24,
  },
  text: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 10,
  },
  lis: {
    marginBottom: 52 / 2,
  },
  container: {
    padding: 20,
  },
});
