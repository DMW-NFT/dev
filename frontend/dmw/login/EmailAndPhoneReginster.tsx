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
import React, { Component, useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPhone, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import DialogToast from "../Components/DialogToast";
import { useDmwApi } from "../../DmwApiProvider/DmwApiProvider";
import { useDmwLogin } from "../../loginProvider/constans/DmwLoginProvider";
import storage from "../Storage/storage";
import { useTranslation } from 'react-i18next'
const EmailAndPhoneReginster = (props) => {
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
  const [message, Setmessage] = useState(t("温馨提示"));
  const { post, get, formData } = useDmwApi();
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
  // 获取验证码
  const getsancode = () => {
    // let taol = 50
    // let timer = setInterval(() => {
    //     taol--
    //     this.setState({ numend: taol })
    //     if (taol == 0) {
    //         clearInterval(timer)
    //         this.setState({ numend: 60 })
    //     }
    // }, 1000)
  };
  const changeAreaCode = (item) => {
    SetareaCode(item);
    SetshowareaCode(false);
  };

  // 提示弹窗
  const DT = (val) => {
    Setvisible(true);
    Setmessage(val);
  };
  // 获取验证码
  const getPhoneCode = () => {
    if (type == 1) {
      // 邮箱验证码
      let data = { email: email };
      let fData = formData(data);
      console.log(formData);
      post("/index/register/get_email_code", fData)
        .then((res) => {
          console.log(res, phone, "验证码");
          if (res.code != 200) {
            DT(res.message);
          } else {
            DT(res.message);
          }
        })
        .catch((err) => {
          console.log(err, phone, "验证码");
          DT(err.message);
        });
    } else {
      // 手机验证码
      let data = { phone: phone, phone_prefix: areaCode };
      let fData = formData(data);
      console.log(formData);
      post("/index/register/get_phone_code", fData)
        .then((res) => {
          console.log(res, phone, "验证码");
          if (res.code != 200) {
            DT(res.message);
          } else {
            DT(res.message);
          }
        })
        .catch((err) => {
          console.log(err, phone, "验证码");
          DT(err.message);
        });
    }
  };

  const registerFn = () => {
    if (type == 1) {
      // 邮箱登录
      let data = { email, email_code: sancode, password: password };
      let fData = formData(data);
      post("/index/register/register_by_email", fData)
        .then((res) => {
          console.log(res, "注册");
          if (res.code != 200) {
            DT(res.message);
          } else {
            DT(t("登录成功"));
            storage.save({
              key: "loginState", // 注意:请不要在key中使用_下划线符号!
              data: {
                token: res.data.token,
              },
              // 如果不指定过期时间，则会使用defaultExpires参数
              // 如果设为null，则永不过期
              expires: null,
            });
            setTimeout(() => {
              login();
            }, 2000);
          }
        })
        .catch((err) => {
          DT(err.message);
          console.log(err.message, "错误");
        });
    } else {
      // 手机号注册
      let data = {
        phone,
        phone_prefix: areaCode,
        phone_code: sancode,
        password: password,
      };
      let fData = formData(data);
      console.log(formData);
      post("/index/register/register_by_phone", fData)
        .then((res) => {
          console.log(res, "注册");
          if (res.code != 200) {
            DT(res.message);
          } else {
            DT(t("登录成功"));
            storage.save({
              key: "loginState", // 注意:请不要在key中使用_下划线符号!
              data: {
                token: res.data.token,
              },
              // 如果不指定过期时间，则会使用defaultExpires参数
              // 如果设为null，则永不过期
              expires: null,
            });
            setTimeout(() => {
              login();
            }, 2000);
          }
        })
        .catch((err) => {
          DT(err.message);
          console.log(err.message, "错误");
        });
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: "#fff", flex: 1 }]}
    >
      <Text style={[styles.topText]}>{t('注册一个新账号')}</Text>
      {/* 邮箱/电话号码 */}
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
              keyboardType="decimal-pad"
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
        <TouchableWithoutFeedback onPress={() => getPhoneCode()}>
          {/* {numend == 60 ? '获取验证码' : numend} */}
          <Text style={[styles.getsancode]}>{t('获取验证码')}</Text>
        </TouchableWithoutFeedback>
        <TextInput
          maxLength={6}
          placeholder={t("请输入验证码  ")}
          keyboardType="decimal-pad"
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
          maxLength={6}
          placeholder={t("请输入密码")}
          keyboardType="default"
          secureTextEntry={secureTextEntry}
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
          maxLength={6}
          placeholder={t("请再次输入密码")}
          keyboardType="default"
          secureTextEntry={true}
          numberOfLines={4}
          onChangeText={(text) => onChangeText(text, 5)}
          value={password1}
        />
      </View>
      <Text
        style={{ marginTop: -15 }}
        onPress={() => {
          Settype(type == 1 ? 2 : 1);
        }}
      >
        {type == 1 ? t("手机号注册") : t("邮箱注册")}
      </Text>
      <Text onPress={() => registerFn()} style={[styles.loginBtnBox]}>
        注册
      </Text>

      <DialogToast
        visible={visible}
        isClose={true}
        value={message}
        title={t("温馨提示")}
        Size="18"
        textAlign="left"
        close={() => {
          Setvisible(false);
        }}
      >
        <Text style={{ fontSize: 16 }}>OK</Text>
      </DialogToast>
    </SafeAreaView>
  );
};

export default EmailAndPhoneReginster;

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
    // top: 16,
    fontSize: 12,
    color: "#897EF8",
    height: 48,
    lineHeight: 48,
  },
  loginBtnBox: {
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
    lineHeight: 48,
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
