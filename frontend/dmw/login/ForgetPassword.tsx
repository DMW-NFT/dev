import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
  Touchable,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPhone, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import storage from "../Storage/storage";
import { useDmwApi } from "../../DmwApiProvider/DmwApiProvider";
import { useDmwLogin } from "../../loginProvider/constans/DmwLoginProvider";
import Toast from "../Components/Toast.js"
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from "react-native-gesture-handler";
const ForgetPassword = (props) => {
  const { t, i18n } = useTranslation();
  const [type, Settype] = useState(props.route.params["type"]);
  const [phone, Setphone] = useState("");
  const [email, Setemail] = useState("");
  const [sancode, Setsancode] = useState("");
  const [password, Setpassword] = useState("");
  const [password1, Setpassword1] = useState("");
  const [numend, Setnumend] = useState(60);
  const [areaCode, SetareaCode] = useState("86");
  const [areaCodeList, SetareaCodeList] = useState([
    "86",
    "81",
    "1",
    "86",
    "81",
    "1",
  ]);
  const [showareaCode, SetshowareaCode] = useState(false);
  const [secureTextEntry, SetsecureTextEntry] = useState(true);
  const [visible, Setvisible] = useState(false);
  const [message, Setmessage] = useState("温馨提示");
  const { post, get, formData, Toast } = useDmwApi();
  const { login } = useDmwLogin();

  const onChangeText = (e, num) => {
    if (num == 1) {
      Setemail(e);
    } else if (num == 2) {
      Setphone(e);
    } else if (num == 3) {
      Setsancode(e);
    } else if (num == 4) {
      Setpassword(e);
    } else {
      Setpassword1(e);
    }
  };

  //    // 提示弹窗
  //    const DT = (val) => {
  //     Setvisible(true);
  //     Setmessage(val);
  //     setTimeout(() => {
  //         Setvisible(false);
  //         Setmessage('');
  //     }, 2000);
  //   };

  // 获取验证码
  const getsancode = () => {
    let url = "";
    let data = {};
    let fdata = {};
    if (type == 1) {
      // 邮箱验证码
      url = "/index/forgot_password/get_email_code";
      data = { email };
      fdata = formData(data);
    } else {
      // 手机验证码
      url = "/index/forgot_password/get_phone_code";
      data = { phone_prefix: areaCode, phone };
      fdata = formData(data);
    }
    post(url, fdata).then((res) => {
      Toast(res.message)
      console.log(res, "忘记密码验证码");
    });
  };


  const loginFn = () => {
    let url = "";
    let data = {};
    let fdata = {};
    if (type == 1) {
      // 邮箱修改密码登录
      url = "/index/forgot_password/reset_password_by_email";
      data = { email, email_code: sancode, password };
      fdata = formData(data);
    } else {
      // 手机修改密码登录
      url = "/index/forgot_password/reset_password_by_phone";
      data = { phone, phone_code: sancode, password, phone_prefix: areaCode };
      fdata = formData(data);
    }

    post(url, fdata).then(res => {
      console.log(res, '+++++++++++++++++');

      if (res.code == 200) {
        // storage.save({
        //     key: "loginState", // 注意:请不要在key中使用_下划线符号!
        //     data: {
        //       token: res.data.token,
        //     },
        //     // 如果不指定过期时间，则会使用defaultExpires参数
        //     // 如果设为null，则永不过期
        //     expires: null,
        //   });
        Toast(t('重置成功'))
        // login()
        props.navigation.navigate('LoginDMW', { type: 2 })

      } else {
        Toast(t(res.message))
      }
    }).catch(err => {
      Toast(t(err.message))
    })

  }

  const changeAreaCode = (item) => {
    SetareaCode(item);
    SetshowareaCode(false);
  };
  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}
    >
      <View style={[styles.container,]}>
        <Text style={[styles.topText]}>{t("忘记密码")}</Text>
        {/* 邮箱/电话号码 */}
        {type == 1 ? (
          <View style={[styles.inputBox]}>
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
        ) : (
          <View style={{ zIndex: 99 }}>
            <View style={[styles.inputBox, { paddingLeft: 100 }]}>
              <TouchableWithoutFeedback
                onPress={() => {
                  SetshowareaCode(true);
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
                keyboardType="phone-pad"
                onChangeText={(text) => onChangeText(text, 2)}
                value={phone}
              />
            </View>
            {/* <View> */}
            {showareaCode ? (
              <ScrollView
                style={[styles.checkColac, { left: 0, top: 50 }]}
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
        {/* 验证码 */}
        <View style={[styles.inputBox, { paddingRight: 80 }]}>
          <Image
            style={[styles.imageInput, { width: 37 / 2, height: 20 }]}
            source={require("../assets/img/login/forgetpass.png")}
          ></Image>
          <TouchableWithoutFeedback onPress={() => getsancode()}>
            <Text style={[styles.getsancode]}>{t("获取验证码")}</Text>
          </TouchableWithoutFeedback>
          <TextInput
            maxLength={6}
            placeholder={t("请输入验证码  ")}
            keyboardType="number-pad"
            onChangeText={(text) => onChangeText(text, 3)}
            value={sancode}
          />
        </View>
        <View style={[styles.inputBox, { paddingRight: 40 }]}>
          <Image
            style={[styles.imageInput, { width: 37 / 2, height: 20 }]}
            source={require("../assets/img/login/password.png")}
          ></Image>
          <TouchableWithoutFeedback
            onPress={() => {
              SetsecureTextEntry(!secureTextEntry);
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
            maxLength={20}
            secureTextEntry={secureTextEntry}
            placeholder={t("请输入密码")}
            keyboardType="ascii-capable"
            onChangeText={(text) => onChangeText(text, 4)}
            value={password}
          />
        </View>
        <View style={[styles.inputBox]}>
          <Image
            style={[styles.imageInput, { width: 37 / 2, height: 20 }]}
            source={require("../assets/img/login/password.png")}
          ></Image>
          <TextInput
            maxLength={20}
            secureTextEntry={secureTextEntry}
            placeholder={t("请再次输入密码")}
            keyboardType="ascii-capable"
            numberOfLines={4}
            onChangeText={(text) => onChangeText(text, 5)}
            value={password1}
          />
        </View>
        <TouchableOpacity onPress={() => loginFn()} style={[styles.loginBtnBox]}>
          <Text style={{
            fontSize: 16,
            fontWeight: "bold",
            lineHeight: 50,
            textAlign: "center",
            color: "#fff",
          }}>{t("登录")}</Text>
        </TouchableOpacity>

        {/* <Toast
        visible={visible}
        value={message}>
      </Toast> */}
      </View>

    </SafeAreaView>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  liscloca: {
    textAlign: "center",
    height: 40,
    lineHeight: 40,
  },
  checkColac: {
    position: "absolute",
    width: 100,
    paddingHorizontal: 20,
    height: 160,
    borderWidth: 1,
    backgroundColor: "#fff",
    top: 40,
    right: 0,
    zIndex: 99,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  container: {
    padding: 20,
  },
  topText: {
    color: "#0F172C",
    marginBottom: 40,
    fontSize: 16,
  },
  getsancode: {
    position: "absolute",
    right: 18,
    top: 16,
    fontSize: 12,
    color: "#897EF8",
  },
  loginBtnBox: {
    marginTop: 60,
    width: "100%",
    backgroundColor: "#897EF8",
    height: 50,

    borderRadius: 25,

  },
  inputBox: {
    height: 48,
    lineHeight: 48,
    borderColor: "gray",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingLeft: 46,
    paddingRight: 15,
    marginBottom: 30,
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
    width: 16,
    height: 16,
    position: "absolute",
    right: 18,
    top: 14,
  },
});
