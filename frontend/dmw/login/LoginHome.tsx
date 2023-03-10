import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDmwLogin } from "../../loginProvider/constans/DmwLoginProvider";
import { useDmwApi } from "../../DmwApiProvider/DmwApiProvider";
// import { Button } from 'react-native-paper'
const screenHeight = Dimensions.get("window").height;

const LoginHome = (props) => {
  const [LanguageDisplay, setLanguageDisplay] = useState(false);
  const [localLIst, setLocalLIst] = useState([
    { name: "中文", id: "zh", url: require("../assets/img/login/zh.png") },
    { name: "English", id: "en", url: require("../assets/img/login/en.png") },
    {
      name: "日本語",
      id: "jp",
      url: require("../assets/img/login/Japaneseflag.jpeg"),
    },
  ]);
  const { t, i18n } = useTranslation();
  const { setlanguage, language } = useDmwLogin();
  const { setlanguageType } = useDmwApi();
  const [SelectedObj, setSelectedObj] = useState(
    language == "en"
      ? {
        name: "English",
        id: "en",
        url: require("../assets/img/login/en.png"),
      }
      : language == "zh"
        ? { name: "中文", id: "zh", url: require("../assets/img/login/zh.png") }
        : {
          name: "日本語",
          id: "jp",
          url: require("../assets/img/login/Japaneseflag.jpeg"),
        }
  );
  // 手机登录
  const PhoneSignIn = (app = { a: 1 }) => {
    props.navigation.navigate("LoginDMW", { type: 2 });
  };
  // 邮箱登录
  const mailboxSignIn = () => {
    props.navigation.navigate("LoginDMW", { type: 1 });
  };

  // 注册
  const register = () => {
    props.navigation.navigate("EmailAndPhoneReginster", { type: 2 });
  };

  // 选择语言
  const switchlanguage = () => {
    setLanguageDisplay(!LanguageDisplay);
  };

  const Choice = (item) => {
    setSelectedObj(item);
    switchlanguage();
    i18n.changeLanguage(item.id);
    setlanguage(item.id);
    setlanguageType(item.id);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <ScrollView style={{ height: screenHeight }}>
        <View style={[styles.container]}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              elevation: 10,
              zIndex: 99,
            }}
          >
            <View></View>
            <TouchableWithoutFeedback
              onPress={() => {
                switchlanguage();
              }}
            >
              <View>
                <View style={{}}>
                  {/* <Text style={{ color: '#fff' }}>切换语言</Text> */}
                  <View style={{}}>
                    <Image
                      style={{
                        width: 50,
                        height: 30,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: "#f5f5f5",
                      }}
                      source={SelectedObj.url}
                    ></Image>
                    {/* <Text style={{ color: '#fff', marginRight: 4, fontWeight: '700', fontSize: 10, textAlign: 'center' }}>{SelectedObj.name}</Text> */}
                  </View>
                </View>

                {LanguageDisplay ? (
                  <View
                    style={{
                      position: "absolute",
                      width: 200,
                      top: 30,
                      left: -150,
                      padding: 10,
                      paddingBottom: 0,
                      paddingLeft: 20,
                      paddingTop: 0,
                      backgroundColor: "#f5f5f5",
                      borderRadius: 10,
                      marginTop: 4,
                      justifyContent: "space-between",
                      borderWidth: 1,
                      overflow: "hidden",
                      borderColor: "#897EF8",
                      elevation: 10,
                      // zIndex:99
                    }}
                  >
                    {localLIst.map((item, index) => (
                      <TouchableWithoutFeedback onPress={() => Choice(item)}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor:
                              item.id == SelectedObj.id
                                ? "rgba(133, 122, 229,0.4)"
                                : "rgba(133, 122, 229,0.1)",
                            marginLeft: -20,
                            marginRight: -10,
                            paddingLeft: 20,
                            paddingTop: 10,
                            paddingBottom: 10,
                            paddingRight: 10,
                          }}
                        >
                          <Text
                            style={{
                              color:
                                item.id == SelectedObj.id ? "#fff" : "#333",
                            }}
                          >
                            {item.name}
                          </Text>
                          <Image
                            style={{ width: 50, height: 30, borderRadius: 5 }}
                            source={item.url}
                          ></Image>
                        </View>
                      </TouchableWithoutFeedback>
                    ))}
                  </View>
                ) : null}
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={[styles.loginImgBox]}>
            <Image
              source={require("../assets/img/login/loginHome.png")}
              style={[styles.loginImg]}
            ></Image>
          </View>
          <View style={{ paddingHorizontal: 50 }}>
            <TouchableOpacity
              onPress={() => PhoneSignIn()}
              style={[styles.loginBtnBox]}
            >
              <Text
                style={{
                  lineHeight: 50,
                  textAlign: "center",
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {t("手机号登录")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => mailboxSignIn()}
              style={[styles.loginBtnBox]}
            >
              <Text
                style={{
                  lineHeight: 50,
                  textAlign: "center",
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {t("邮箱号登录")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => register()}>
              <Text style={[styles.regiset]}>
                {t("注册")}
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginHome;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    height: screenHeight,
    justifyContent: "space-between",
    paddingBottom: 70,
  },
  faceLogin: {
    textAlign: "right",
    fontSize: 14,
    color: "#897EF8",
  },
  loginImgBox: {
    marginTop: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    elevation: 1,
  },
  loginImg: {
    width: 512 / 2,
    height: 512 / 2,
    elevation: 1,
  },
  loginBtnBox: {
    width: "100%",
    backgroundColor: "#897EF8",
    height: 50,
    lineHeight: 50,
    textAlign: "center",
    color: "#fff",
    borderRadius: 25,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  regiset: {
    color: "#897EF8",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,
    fontSize: 16,
    marginBottom: 14,
  },
});
