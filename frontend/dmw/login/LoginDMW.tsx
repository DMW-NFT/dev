import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleDown, faPhone } from "@fortawesome/free-solid-svg-icons";
import DialogToast from "../Components/DialogToast";
import Api from "../Request/http";
import storage from "../Storage/storage";
import { useDmwLogin } from "../../loginProvider/constans/DmwLoginProvider";
import { useDmwApi } from "../../DmwApiProvider/DmwApiProvider";
import { useTranslation } from 'react-i18next'
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
    "+86",
    "+81",
    "+1",
  ]);
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
  const [message, setMessage] = useState(t("温馨提示"));
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
    i18n.changeLanguage(item.id)
    setlanguage(item.id)
    setlanguageType(item.id)
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
      Toast(t('请勾选用户协议'))
      return
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
          Toast(res.message);
          return;
        }
        Toast(t("登录成功"));
        console.log(res.data.token);

        storage.save({
          key: "loginState", // 注意:请不要在key中使用_下划线符号!
          data: {
            token: res.data.token,
            languageType: local.id
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
        Toast(err.message);
      });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: "#fff", flex: 1 }]}
    >
      <View style={[styles.TopBox]}>
        <Text style={[styles.topText]}>{t("欢迎登录DMW")}</Text>
    
      </View>
      {/* 邮箱 */}
      {/* {
                    this.state.type==1?
                    
                } */}
      {type == 1 ? (
        <View style={[styles.inputBox]}>
          <Image
            style={[styles.imageInput]}
            source={require("../assets/img/login/email.png")}
          ></Image>
          <TextInput
            placeholder={t("请输入邮箱")}
            keyboardType="decimal-pad"
            onChangeText={(text) => onChangeText(text, 1)}
            value={email}
          />
        </View>
      ) : (
        <View>
          <View style={[styles.inputBox, { paddingLeft: 100 }]}>
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
                <FontAwesomeIcon icon={faAngleDown} color="#707070" size={20} />
              </View>
            </TouchableWithoutFeedback>
            <TextInput
              onStartShouldSetResponderCapture={(ev) => true}
              placeholder={t("请输入电话号码")}
              keyboardType="decimal-pad"
              onChangeText={(text) => onChangeText(text, 3)}
              value={phone}
            />
          </View>
          {/* <View> */}
          {showareaCode ? (
            <ScrollView
              style={[styles.checkColac, { left: 0, top: 50, height: 200 }]}
              showsVerticalScrollIndicator={false}
            >
              {areaCodeList.map((item, index) => {
                return (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => {
                      changeAreaCode(item);
                    }}
                  >
                    <Text
                      style={[
                        styles.liscloca,
                        { borderBottomColor: "#ccc", borderBottomWidth: 1 },
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableWithoutFeedback>
                );
              })}
            </ScrollView>
          ) : (
            <View></View>
          )}
          {/* </View> */}
        </View>
      )}
      <View style={[styles.inputBox, { paddingRight: 60 }]}>
        <Image
          style={[styles.imageInput, { width: 37 / 2, height: 20 }]}
          source={require("../assets/img/login/password.png")}
        ></Image>
        <TouchableWithoutFeedback
          onPress={() => {
            setSecureTextEntry(!secureTextEntry);
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
        </TouchableWithoutFeedback>
        <TextInput
          onStartShouldSetResponderCapture={() => true}
          placeholder={t("请输入密码")}
          keyboardType="default"
          secureTextEntry={secureTextEntry}
          onChangeText={(text) => onChangeText(text, 2)}
          value={password}
        />
      </View>
      <Text
        style={[styles.forget]}
        onPress={() => {
          props.navigation.navigate("ForgetPassword", { type: type });
        }}
      >
        {t("忘记密码")}
      </Text>
      <Text onPress={() => loginFn()} style={[styles.loginBtnBox]}>
        {t("登录")}
      </Text>
      <View style={[styles.agren]}>
        <Text
          style={[
            styles.checkbox,
            { backgroundColor: agree ? "#897EF8" : "#fff" },
          ]}
          onPress={() => {
            setAgree(!agree);
          }}
        ></Text>



         <Text>
          <Text style={[styles.textinfo]}>{t("我已阅读并同意")}</Text>
          <Text style={[styles.text]} onPress={()=>{props.navigation.navigate(language == 'en' ? 'yhen' : language == 'zh' ?"yhzh" : 'yhjp')}}>{t("《用户协议》")}</Text>
          <Text style={[styles.textinfo]}>{t("及")}</Text>
          <Text style={[styles.text]} onPress={()=>{props.navigation.navigate(language == 'en' ? 'stren' : language == 'zh' ?"str" : 'strjp')}}>{t("《隐私政策》")}</Text>
         {/* <Text> {t("我已阅读并同意《用户协议》及《隐私政策》")}</Text> */}
        </Text> 


      </View>

      {/* <DialogToast
        visible={visible}
        isClose={true}
        value={message}
        title="温馨提示"
        Size="18"
        textAlign="left"
        close={() => {
          setVisible(false);
        }}
      >
        <Text style={{ fontSize: 16 }}>OK</Text>
      </DialogToast> */}
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
    width: 100,
    paddingHorizontal: 20,
    // height:160,
    borderWidth: 1,
    backgroundColor: "#fff",
    top: 40,
    right: 0,
    zIndex: 99,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  TopBox: {
    justifyContent: "space-between",
    alignContent: "center",
    flexDirection: "row",
  },
  loginBtnBox: {
    justifyContent: "flex-end",
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
  inputBox: {
    height: 48,
    // position: 'relative',
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 24,
    paddingLeft: 46,
    paddingRight: 15,
    marginBottom: 30,
    // alignItems:'center',
    justifyContent: "center",
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
    position: "absolute",
    right: 18,
    top: 14,
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
    borderRadius: 4,
    marginRight: 5,
  },
});
