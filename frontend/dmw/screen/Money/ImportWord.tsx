import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDmwWallet } from "../../../DmwWallet/DmwWalletProvider";
import { useDmwApi } from "../../../DmwApiProvider/DmwApiProvider";
import { useTranslation } from "react-i18next";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Spinner } from "@ui-kitten/components";
const ImportWord = (props) => {
  // state={
  //     secureTextEntry:false,
  //     word:"",
  //     password:'',
  //     password1:'',
  // }
  const { t, i18n } = useTranslation();
  const [secureTextEntry, setsecureTextEntry] = useState(true);

  const [word, setword] = useState("");
  const [password, setpassword] = useState("");
  const [password1, setpassword1] = useState("");
  const { Toast, setMoneyRouteState } = useDmwApi();
  const [loading, setLoading] = useState(false);
  const {
    addMnemonic,
    loadWalletFromMnemonic,
    addWalletToAccountStorage,
  } = useDmwWallet();

  const introduce = () => {
    if (!word) {
      Toast(t("请输入助记词"));
      return;
    }
    if (!password) {
      Toast(t("请输入密码"));
      return;
    }
    if (!password1) {
      Toast(t("请重新输入密码"));
      return;
    }
    if (password != password1) {
      Toast(t("密码不一致"));
      return;
    }
    let res = loadWalletFromMnemonic(word);
    if (res) {
      console.log(res.privateKey, "钱包地址");
      setLoading(true);
      addMnemonic(password1, word).then((resp) => {
        console.log(resp, "助记词登录");
        setMoneyRouteState("456");
        addWalletToAccountStorage(res.privateKey, password1).then((res) => {
          Toast(t("导入成功"));
          setLoading(false);
          setTimeout(() => {
            props.navigation.popToTop();
          }, 1000);
        });
      });
    } else {
      Toast(t("助记词解析错误，请重新尝试"));
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={[styles.container]}>
          <View style={styles.lis}>
            <Text style={styles.text}>{t("助记词")}</Text>
            <TextInput
              multiline={true}
              textAlignVertical="top"
              numberOfLines={5}
              placeholder={t("在此输入您的助记词")}
              style={[styles.textarea]}
              onChangeText={(e) => setword(e)}
              value={word}
            />
          </View>
          <View style={styles.lis}>
            <View
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Text style={styles.text}>{t("新密码")}</Text>
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
          </View>
          <View style={styles.lis}>
            <Text style={styles.text}>{t("确认密码")}</Text>
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
            <Text style={[styles.text, { marginTop: 10, marginBottom: 32 }]}>
              {t("请输入6位数字")}
            </Text>
          </View>

          {!loading ? (
            <TouchableOpacity
              style={[styles.import, { justifyContent: "center" }]}
              onPress={() => introduce()}
            >
              <Text
                style={{
                  textAlign: "center",
                  alignSelf: "center",
                  color: "white",
                  fontSize: 20,
                }}
              >
                {t("导入")}
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={[styles.import]}>{t("loading...")}</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ImportWord;
const styles = StyleSheet.create({
  import: {
    // marginTop: 60,
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
  textarea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    height:150
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
