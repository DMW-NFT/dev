import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import StepComp from "./StepComp";
import { useDmwWallet } from "../../../DmwWallet/DmwWalletProvider";
const WalletSafe = (props) => {
  const [password, setpassword] = useState(props.route.params.password);
  const [password1, setpassword1] = useState(props.route.params.password1);
  const { newMnemonic, loadMnemonicFromStorage } = useDmwWallet();

            useEffect(() => {
                newMnemonic(password, true).then((res) => {
                console.log(res, "zhujici");
                });
               
            }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <View style={[styles.container]}>
        <StepComp type={2} />
        <View>
          <Text style={[styles.topInfo]}>保护您的钱包安全</Text>
          <Text style={[styles.topInfo1]}>
            保护好您的钱包<Text style={[styles.textcolor]}>助记词</Text>
            。下一个界面将显示助记词，
            助记词是您钱包的唯一密钥。如果您的手机丢失或被盗，
            它将允许您恢复对钱包的访问。
            <Text style={[styles.textcolor]}>它为什么重要？</Text>
          </Text>
        </View>
        <View style={[styles.blackBox]}>
          <TouchableWithoutFeedback
            onPress={() => {
              props.navigation.navigate("walletSafeShow");
            }}
          >
            <Image
              style={[styles.imageshow]}
              source={require("../../assets/img/login/nopass.png")}
            ></Image>
          </TouchableWithoutFeedback>
          <View>
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 14,
              }}
            >
              点按可显示助记词
            </Text>
            <Text
              style={{
                marginTop: 10,
                color: "#fff",
                textAlign: "center",
                fontSize: 10,
              }}
            >
              确保没有人在看您的屏幕。
            </Text>
          </View>
          <Text
            style={[styles.lookBtn]}
            onPress={() => {
              props.navigation.navigate("walletSafeShow",{password});
            }}
          >
            查看
          </Text>
        </View>

        <Text
          style={[styles.import]}
          onPress={() => {
            props.navigation.navigate("walletSafeShow",{password});
          }}
        >
          继续
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default WalletSafe;

const styles = StyleSheet.create({
  Align: {
    textAlign: "center",
  },
  lookBtn: {
    width: 114,
    height: 32,
    lineHeight: 32,
    textAlign: "center",
    fontSize: 12,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 16,
  },
  blackBox: {
    padding: 20,
    width: "100%",
    height: 496 / 2,
    backgroundColor: "#333",
    borderRadius: 10,
    justifyContent: "space-around",
    alignItems: "center",
  },
  textcolor: {
    color: "#897EF8",
  },
  topInfo: {
    textAlign: "center",
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    marginBottom: 20 / 2,
  },
  topInfo1: {
    paddingHorizontal: 35 / 2,
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

  imageshow: {
    width: 24,
    height: 24,
  },
  container: {
    padding: 20,
  },
});
