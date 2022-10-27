import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  TextInput,
  Button,
} from "react-native";
import DocumentPicker from "react-native-document-picker";
import { useDmwLogin } from "../../../loginProvider/constans/DmwLoginProvider";
import DialogToast from "../../Components/DialogToast.js";
import { useTranslation } from 'react-i18next'
import {useDmwApi} from "../../../DmwApiProvider/DmwApiProvider"

const screenWidth = Dimensions.get("window").width;
const scale = Dimensions.get("window").scale;
const screenHeight = Dimensions.get("window").height;

const ModifyInfo = (props) => {
  const { t, i18n } = useTranslation();
  const [userInfo, setUserInfo] = useState({});
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("温馨提示");
  const { username, setUsername } = useDmwLogin();
  const { avatarUrl, setAvatarUrl } = useDmwLogin();
  const {post,formData} = useDmwApi()

  const sava = () => {
    let data = { nickname: username };
    let fData = formData(data);
    post("/index/user/edit_user_msg", fData).then((res) => {
      setVisible(true);
      setMessage(res.message);
    });
  };

  const up = async () => {
    console.log(123);

    try {
      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(file, "文件");

      let formData = new FormData();
      formData.append("file", file[0]);
      formData.append("type", "1");
     post("/index/user/upload_avatar", formData).then((res) => {
        console.log(res, "上传");
        if (res.code == 200) {
          getUserInfo();
        }
      });
    } catch (err) {
      // 在文件上传过程中出现错误
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const getUserInfo = () => {
    console.log('用户信息');
    post("/index/user/get_user_msg").then((res) => {
      console.log(res, "用户信息");
      if (res.code == 200) {
        setUserInfo(res.data);
        setUsername(res.data.nickname);
        setAvatarUrl(res.data.avatar_url);
      }
    });
  };

  useEffect(() => {
    getUserInfo();

    console.log(userInfo["avatar_url"], "、、、、、、、");
    return () => {};
  }, []);

  return (
    <SafeAreaView
      style={{
        paddingTop: 20,
        position: "relative",
        height: Dimensions.get("window").height,
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <TouchableWithoutFeedback onPress={() => up()}>
          <View style={{ width: 90, height: 90, borderRadius: 90 / 2 }}>
            <Image
              style={{ width: 90, height: 90, borderRadius: 90 / 2 }}
              source={{ uri: avatarUrl }}
            ></Image>
            <Image
              style={{
                position: "absolute",
                width: 20,
                height: 20,
                bottom: 0,
                right: 0,
              }}
              source={require("../../assets/img/my/3588.png")}
            ></Image>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.line}></View>

      <View style={styles.lis}>
        <Text style={styles.text}>{t("昵称")}</Text>
        {/* <TouchableWithoutFeedback onPress={()=>{}} onStartShouldSetResponderCapture={()=>true} >
                       
                    </TouchableWithoutFeedback> */}
        <TextInput
          maxLength={6}
          placeholder={t("请输入昵称")}
          keyboardType="decimal-pad"
          style={[styles.input]}
          onChangeText={(e) => setUsername(e)}
          value={username}
        />
      </View>
      <Text style={styles.btn} onPress={() => sava()}>
      {t("保存")}
      </Text>

      <DialogToast
        visible={visible}
        isClose={true}
        value={message}
        title={t("温馨提示")}
        Size="18"
        textAlign="left"
        close={() => {
          setVisible(false);
        }}
      >
        <Text style={{ fontSize: 16 }}>OK</Text>
      </DialogToast>
    </SafeAreaView>
  );
};

export default ModifyInfo;

const styles = StyleSheet.create({
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
    position: "absolute",
    bottom: 138,
  },
  line: {
    borderColor: "#CCCCCC",
    width: screenWidth - 40,
    height: 1,
    borderWidth: 1 / scale,
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 20,
  },
  input: {
    height: 48,
    borderColor: "gray",
    borderWidth: 1,
    borderColor: "#ccc",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    paddingLeft: 15,
    paddingRight: 15,
  },
  text: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 10,
  },
  lis: {
    marginBottom: 52 / 2,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
