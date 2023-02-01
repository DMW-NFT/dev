import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  TextInput,
  Dimensions,
} from "react-native";
import { useDmwApi } from "../../../DmwApiProvider/DmwApiProvider";
import React, { useEffect, useState } from "react";
const screenWidth = Dimensions.get("window").width;
import { useTranslation } from "react-i18next";
import { useDmwWallet } from "../../../DmwWallet/DmwWalletProvider";
import Web3 from "web3";
import { ScrollView } from "react-native-gesture-handler";
const Privatekeyimport = (props) => {
  const web3 = new Web3();
  const { addWalletToAccountStorage } = useDmwWallet();
  const { t, i18n } = useTranslation();
  const { Toast, Copy } = useDmwApi();
  const [secureTextEntry, setsecureTextEntry] = useState(true);

  const [word, setword] = useState("");
  const [password, setpassword] = useState("");
  const [password1, setpassword1] = useState("");
  const isValidPrivateKey = (privateKey) => {
    // 去掉前缀 "0x"
    privateKey = privateKey.replace(/^0x/, "");
    // 私钥的长度应该是 64 个字符
    if (privateKey.length !== 64) {
      return false;
    }
    // 私钥应该是 16 进制格式，只包含 0-9 和 a-f
    const pattern = /^[0-9a-f]+$/i;
    if (!pattern.test(privateKey)) {
      return false;
    }
    return true;
  };
  const introduce = () => {
    if (password == password1) {
      if (isValidPrivateKey(word)) {
        const newAccount = web3.eth.accounts.privateKeyToAccount(word);
        // console.log(newAccount);
        addWalletToAccountStorage(newAccount.privateKey, password);
        Toast(t("导入成功"));
        setTimeout(() => {
          props.navigation.popToTop();
        }, 1000);
      } else {
        Toast(t("私钥验证不通过，请检查后重试"));
      }
    }
  };
  return (
    <SafeAreaView style={styles.box}>
      <ScrollView>
        <View style={{ paddingLeft: 20, paddingRight: 20 }}>
          <Image
            style={styles.daoruimg}
            source={require("../../assets/img/money/daorusiyao.png")}
          ></Image>
          <Text style={styles.title}>{t("导入账户")}</Text>
          <Text style={styles.text}>
            {t("导入的钱包可在【钱包】中查看，但无法通过DMW助记词找回")}
          </Text>
        </View>
        <View style={styles.twoBox}>
          <Text style={styles.Ttitle}>{t("粘贴您的私钥字符串")}</Text>
          <TextInput
            multiline={true}
            textAlignVertical="top"
            numberOfLines={5}
            maxLength={100}
            // secureTextEntry={secureTextEntry}
            placeholder={
              t("例如") + t("4d56sd46sd445d6s4d6544d56s4d656d4s65465")
            }
            keyboardType="ascii-capable"
            style={{
              borderStyle: "dotted", // 虚线 效果
              borderWidth: 1, //虚线 线宽
              borderColor: "#e8e8e8", // 虚线颜色
              borderRadius: 10,
              padding: 20,
            }}
            onChangeText={(e) => {
              setword(e);
            }}
            value={word}
          />
          <View style={{ marginTop: 40 }}>
            <View
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Text>{t("新密码")}</Text>
              <TouchableWithoutFeedback
                onPress={() => {
                  setsecureTextEntry(!secureTextEntry);
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
              placeholder={t("新密码")}
              keyboardType="number-pad"
              style={[styles.input]}
              onChangeText={(e) => {
                setpassword(e);
              }}
              value={password}
            />
            <Text>{t("确认密码")}</Text>
            <TextInput
              maxLength={6}
              secureTextEntry={secureTextEntry}
              placeholder={t("确认密码")}
              keyboardType="number-pad"
              style={[styles.input]}
              onChangeText={(e) => {
                setpassword1(e);
              }}
              value={password1}
            />
          </View>
        </View>

        <Text style={styles.btn} onPress={() => introduce()}>
          导入
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Privatekeyimport;
const styles = StyleSheet.create({
  box: {
    paddingBottom: 0,
    paddingTop: 30,
    backgroundColor: "#F0EFFE",
    flex: 1,
  },
  daoruimg: {
    width: 40,
    height: 40,
    // marginBottom: 72 / 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 24,
  },
  text: {
    marginBottom: 60,
    fontSize: 14,
  },
  twoBox: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 20,
    paddingTop: 36,
  },
  Ttitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 16,
  },
  Btn: {
    backgroundColor: "#897EF8",
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
    // position: "absolute",
    bottom: 14,
    marginTop:30
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
  lis: {
    marginBottom: 52 / 2,
  },
});
