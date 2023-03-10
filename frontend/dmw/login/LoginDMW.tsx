import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Keyboard
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleDown, faPhone } from "@fortawesome/free-solid-svg-icons";
import DialogToast from "../Components/DialogToast";
import Api from "../Request/http";
import storage from "../Storage/storage";
import { useDmwLogin } from "../../loginProvider/constans/DmwLoginProvider";
import { useDmwApi } from "../../DmwApiProvider/DmwApiProvider";
import { useTranslation } from "react-i18next";

const api = new Api();
const LoginDMW = (props) => {
  const { t, i18n } = useTranslation();
  const { login, setlanguage, language } = useDmwLogin();

  const [type, setType] = useState(props.route.params["type"]);
  const [areaCode, setAreaCode] = useState("+86");
  const [areaCodeList, setAreaCodeList] = useState([
    "+86",
    "+81",
    "+1",

  ]);
  const flagMap = {
    "+86":require("../assets/img/login/zh.png"),
    "+81":require("../assets/img/login/Japaneseflag.jpeg"),
    "+1":require("../assets/img/login/us_flag.png"),

  }
  const [showareaCode, setShowareaCode] = useState(false);
  const [showlocal, setShowlocal] = useState(false);
  const [local, setLocal] = useState({ name: "日文", id: "jp" });
  const [localLIst, setLocalLIst] = useState([
    { name: "中文", id: "zh" },
    { name: "英文", id: "en" },
    { name: "日文", id: "jp" },
  ]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [agree, setAgree] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState(t("提示"));
  const { post, formData, Toast, setlanguageType } = useDmwApi();
  const onChangeText = (e, num) => {
    if (num == 1) {
      setEmail(e);
    } else if (num == 2) {
      setPassword(e);
    } else if (num == 3) {
      setPhone(e);
    }
  };
  const typecheck = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const changeCloca = (item) => {
    setLocal(item);
    i18n.changeLanguage(item.id);
    setlanguage(item.id);
    setlanguageType(item.id);
    setShowlocal(false);
  };
  const changeAreaCode = (item) => {
    setAreaCode(item);
    setShowareaCode(false);
  };
  // 提示弹窗
  // const DT = (val) => {
  //   setVisible(true);
  //   setMessage(val);
  // };

  // 登录按钮
  const loginFn = () => {
    if (!agree) {
      Toast(t("请勾选用户协议"));
      return;
    }
    let data = {};
    let Fdata = {};
    let url = "";
    if (type == 1) {
      // 邮箱登录
      data = { email, password };
      Fdata = formData(data);
      url = "/index/login/login_by_email";
    } else {
      // 手机登录
      data = { phone, password };
      Fdata = formData(data);
      url = "/index/login/login_by_phone";
    }
    post(url, Fdata)
      .then((res) => {
        console.log(res, "res");
        if (res.code == 202) {
          Toast(t(res.message));
          return;
        }
        // Toast(t("切换成功"));
        console.log(res.data.token);

        storage.save({
          key: "loginState", // 注意:请不要在key中使用_下划线符号!
          data: {
            token: res.data.token,
            languageType: local.id,
          },
          // 如果不指定过期时间，则会使用defaultExpires参数
          // 如果设为null，则永不过期
          expires: null,
        });
        setTimeout(() => {
          login();
          // props.navigation.navigate("FaceLogin")
        }, 2000);
      })
      .catch((err) => {
        Toast(t(err.message));
      });
  };

  return (
    <SafeAreaView
      style={{ width: "100%", backgroundColor: "#fff", height: "100%" }}
    >
      <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
        <View style={{ paddingHorizontal: 20 }}>
          <View style={[styles.TopBox]}>
            <Text style={[styles.topText]}>{t("欢迎登录DMW")}</Text>
          </View>
          {/* 邮箱 */}
          {type == 1 ? (
            <View style={{ zIndex: 99 }}>
              <View style={[styles.inputBox, { justifyContent: "center" }]}>
                <Image
                  style={[styles.imageInput]}
                  source={require("../assets/img/login/email.png")}
                ></Image>
                <TextInput
                  placeholder={t("请输入邮箱")}
                  keyboardType="email-address"
                  onChangeText={(text) => onChangeText(text, 1)}
                  value={email}
                />
              </View>
            </View>
          ) : (
            <View style={{ zIndex: 99 }}>
              <View
                style={[
                  styles.inputBox,
                  { paddingLeft: 100, zIndex: 90, justifyContent: "center" },
                ]}
              >
                <TouchableWithoutFeedback
                  onPress={() => {
                    setShowareaCode(true);
                  }}
                >
                  <View
                    style={[
                      styles.imageInput,
                      {
                        flexDirection: "row",
                        width: 80,
                        justifyContent: "space-between",
                      },
                    ]}
                  >
                    <FontAwesomeIcon icon={faPhone} color="#707070" size={20} />
                    <Text>{areaCode}</Text>
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      color="#707070"
                      size={20}
                    />
                  </View>
                </TouchableWithoutFeedback>
                <TextInput
                  onStartShouldSetResponderCapture={(ev) => true}
                  placeholder={t("请输入电话号码")}
                  keyboardType="phone-pad"
                  onChangeText={(text) => onChangeText(text, 3)}
                  value={phone}
                  style={{}}
                />
              </View>
              {/* <View> */}
              {showareaCode ? (
                <ScrollView
                  style={[styles.checkColac, { left: 20, top: 50, height: 200 }]}
                  showsVerticalScrollIndicator={false}
                >
                  {areaCodeList.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          changeAreaCode(item);
                        }}
                        style={{flexDirection:"row",justifyContent: "center",alignItems: "center",marginTop:20}}
                      >
                        <Image
                          style={{
                            width: 50,
                            height: 30,
                            borderRadius: 5,
                            borderWidth: 1,
                            borderColor: "#f5f5f5",
                          }}
                          source={flagMap[item]}
                        ></Image>
                        <Text
                          style={[
                            styles.liscloca,
                            {paddingLeft:10 },
                          ]}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              ) : (
                <View></View>
              )}
              {/* </View> */}
            </View>
          )}

          <View
            style={[
              styles.inputBox,
              {
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              },
            ]}
          >
            <Image
              style={[styles.imageInput, { width: 37 / 2, height: 20 }]}
              source={require("../assets/img/login/password.png")}
            ></Image>

            <TextInput
              style={{ flex: 1 }}
              onStartShouldSetResponderCapture={() => true}
              placeholder={t("请输入密码")}
              keyboardType="ascii-capable"
              secureTextEntry={secureTextEntry}
              onChangeText={(text) => onChangeText(text, 2)}
              value={password}
            />
            <TouchableOpacity
              onPress={() => setSecureTextEntry(!secureTextEntry)}
              style={{
                marginLeft: 5,
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              {secureTextEntry ? (
                <Image
                  style={[styles.imageshow]}
                  source={require("../assets/img/login/nopass.png")}
                ></Image>
              ) : (
                <Image
                  style={[styles.imageshow]}
                  source={require("../assets/img/login/showpass.png")}
                ></Image>
              )}
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("ForgetPassword", { type: type });
              }}
              style={{  width: "auto", padding: 5 }}
            >
              <Text
                style={[styles.forget]}
              >
                {t("忘记密码")}
              </Text>
            </TouchableOpacity>
          </View>


          <TouchableOpacity
            onPress={() => loginFn()}
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
              {t("登录")}
            </Text>
          </TouchableOpacity>

          <View style={[styles.agren]}>
            <TouchableOpacity
              onPress={() => {
                setAgree(!agree);
              }}
              style={[
                styles.checkbox,
                {
                  backgroundColor: agree ? "#897EF8" : "#fff",
                  justifyContent: "center",
                },
              ]}
            >
              <Text style={[{ color: "white", textAlign: "center" }]}>
                {agree && "✓"}
              </Text>
            </TouchableOpacity>

            {language != "jp" && (
              <Text>
                <Text style={[styles.textinfo]}>{t("我已阅读并同意")}</Text>
                <Text
                  style={[styles.text]}
                  onPress={() => {
                    props.navigation.navigate("WebViewModal", {
                      type: "userAgreement",
                      language: language,
                    });
                  }}
                >
                  {t("《用户协议》")}
                </Text>
                <Text style={[styles.textinfo]}>{t("及")}</Text>
                <Text
                  style={[styles.text]}
                  onPress={() => {
                    props.navigation.navigate("WebViewModal", {
                      type: "privacyPolicy",
                      language: language,
                    });
                  }}
                >
                  {t("《隐私政策》")}
                </Text>
                {/* <Text> {t("我已阅读并同意《用户协议》及《隐私政策》")}</Text> */}
              </Text>
            )}

            {language == "jp" && (
              <Text>
                <Text style={[styles.textinfo]}>{t("我已阅读并同意《用户协议》及《隐私政策》")}</Text>
                <Text
                  style={[styles.text]}
                  onPress={() => {
                    props.navigation.navigate("WebViewModal", {
                      type: "userAgreement",
                      language: language,
                    });
                  }}
                >
                  {"\n(" + t("《用户协议》") + " "}
                </Text>
                <Text
                  style={[styles.text]}
                  onPress={() => {
                    props.navigation.navigate("WebViewModal", {
                      type: "privacyPolicy",
                      language: language,
                    });
                  }}
                >
                  {t("《隐私政策》") + ")"}
                </Text>
                {/* <Text> {t("我已阅读并同意《用户协议》及《隐私政策》")}</Text> */}
              </Text>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>

    </SafeAreaView>
  );
};
export default LoginDMW;
const styles = StyleSheet.create({
  lisEnglish: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    borderTopColor: "#ccc",
    borderTopWidth: 1,
  },
  liscloca: {
    textAlign: "center",
    height: 40,
    lineHeight: 40,
  },
  coale: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },
  container: {
    padding: 20,
  },

  topText: {
    color: "#0F172C",
    marginBottom: 40,
    fontSize: 16,
  },
  checkColac: {
    position: "absolute",
    width: 120,
    borderWidth: 1,
    backgroundColor: "white",
    top: 40,
    right: 0,
    zIndex: 999,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  TopBox: {
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row",
  },
  loginBtnBox: {
    justifyContent: "flex-end",
    marginTop: 60,
    width: "100%",
    backgroundColor: "#897EF8",
    height: 50,
    borderRadius: 25,
  },
  inputBox: {
    height: 48,
    // position: 'relative',
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 24,
    paddingLeft: 46,
    paddingRight: 10,
    marginBottom: 30,
    width: "100%",
    // alignItems:'center',
    // justifyContent: "center",
  },
  imageInput: {
    width: 20,
    height: 17,
    position: "absolute",
    top: 23,
    left: 15,
    marginTop: -17 / 2,
  },
  imageshow: {
    width: 24,
    height: 24,
    // position: "absolute",
    // backgroundColor: "red",
  },
  forget: {
    textAlign: "right",
    fontSize: 12,
    color: "#0F172C",
  },
  agren: {
    flexDirection: "row",
    marginTop: 21,
    alignItems: "center",
    borderRadius: 15,
  },
  textinfo: {
    fontSize: 12,
    color: "#666",
  },
  text: {
    color: "#897EF8",
    fontSize: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    backgroundColor: "#FFFFFF",
    borderColor: "#c2c2c2",
    borderWidth: 1,
    borderRadius: 15,
    marginRight: 5,
  },
});
