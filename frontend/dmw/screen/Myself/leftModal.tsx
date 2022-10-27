import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import storage from "../../Storage/storage";
import { useDmwLogin } from "../../../loginProvider/constans/DmwLoginProvider";
import { useTranslation } from 'react-i18next'
const scale = Dimensions.get("window").scale;
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Lmodal = (props) => {
  const {logOut} = useDmwLogin()
  const { t, i18n } = useTranslation();
  const close = () => {
    props.close();
  };
  const cilck = (path) => {
    props.goto(path);
  };
  const logout = () => {
    storage.save({
      key: "loginState", // 注意:请不要在key中使用_下划线符号!
      data: {
        token: "",
      },

      // 如果不指定过期时间，则会使用defaultExpires参数
      // 如果设为null，则永不过期
      expires: null,
    });
    // this.props.LoginFailed()
    logOut();
  };
  let visible = props.visible;
  return (
    <View style={{ position: "absolute" }}>
      <Text
        onPress={() => close()}
        style={[visible ? styles.black : {}, { position: "absolute" }]}
      ></Text>

      {visible ? (
        <View style={styles.Lm_box}>
          <Text style={styles.title}>{t("常用功能")}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 44,
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                props.goto("auctionOrder");
              }}
            >
              <View style={{ flexDirection: "column" }}>
                <Image
                  style={{ width: 96 / 2, height: 96 / 2 }}
                  source={require("../../assets/img/my/3422.png")}
                ></Image>
                <Text style={styles.img_bottom_text}>{t("拍卖订单")}</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                props.goto("sellOrder");
              }}
            >
              <View style={{ flexDirection: "column" }}>
                <Image
                  style={{ width: 96 / 2, height: 96 / 2 }}
                  source={require("../../assets/img/my/3338.png")}
                ></Image>
                <Text style={styles.img_bottom_text}>{t("售卖订单")}</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => {
                props.goto("myCollection");
              }}
            >
              <View style={{ flexDirection: "column" }}>
                <Image
                  style={{ width: 96 / 2, height: 96 / 2 }}
                  source={require("../../assets/img/my/3337.png")}
                ></Image>
                <Text style={styles.img_bottom_text}>{t("合集")}</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => cilck("CreateCollection")}>
              {
                <View style={{ flexDirection: "column" }}>
                  <Image
                    style={{ width: 96 / 2, height: 96 / 2 }}
                    source={require("../../assets/img/my/3336.png")}
                  ></Image>
                  <Text style={styles.img_bottom_text}>{t("创建")}</Text>
                </View>
              }
            </TouchableWithoutFeedback>
          </View>
          <Text style={styles.title}>{t("更多功能")}</Text>
          <View>
            <TouchableWithoutFeedback
              onPress={() => cilck("TransferredIntoCollection")}
            >
              {
                <View style={styles.more}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      style={styles.moreimg}
                      source={require("../../assets/img/my/b3.png")}
                    ></Image>
                    <Text style={styles.more_text}>{t("转入藏品")}</Text>
                  </View>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    color="#707070"
                    size={16}
                  />
                </View>
              }
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => cilck("MessageCenter")}>
              {
                <View style={styles.more}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      style={styles.moreimg}
                      source={require("../../assets/img/my/b1.png")}
                    ></Image>
                    <Text style={styles.more_text}>{t("消息中心")}</Text>
                  </View>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    color="#707070"
                    size={16}
                  />
                </View>
              }
            </TouchableWithoutFeedback>

            <View style={styles.more}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={styles.moreimg}
                  source={require("../../assets/img/my/b5.png")}
                ></Image>
                <Text style={styles.more_text}>{t("新闻资讯")}</Text>
              </View>
              <FontAwesomeIcon
                icon={faChevronRight}
                color="#707070"
                size={16}
              />
            </View>

            <View style={styles.more}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={styles.moreimg}
                  source={require("../../assets/img/my/b2.png")}
                ></Image>
                <Text style={styles.more_text}>{t("帮助")}</Text>
              </View>
              <FontAwesomeIcon
                icon={faChevronRight}
                color="#707070"
                size={16}
              />
            </View>

            <TouchableWithoutFeedback onPress={() => logout()}>
              {
                <View style={styles.more}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      style={styles.moreimg}
                      source={require("../../assets/img/my/b4.png")}
                    ></Image>
                    <Text style={styles.more_text}>{t("退出")}</Text>
                  </View>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    color="#707070"
                    size={16}
                  />
                </View>
              }
            </TouchableWithoutFeedback>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default Lmodal;

const styles = StyleSheet.create({
  black: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 9,
  },
  Lm_box: {
    zIndex: 10,
    width: screenWidth - 60,
    height: screenHeight,
    backgroundColor: "#fff",
    position: "absolute",
    top: 0,
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontFamily: "Source Han Sans CN",
    fontWeight: "700",
    marginBottom: 20,
  },
  img_bottom_text: {
    fontSize: 8,
    textAlign: "center",
  },
  moreimg: {
    width: 45,
    height: 45,
    marginRight: 10,
  },
  more: {
    flexDirection: "row",
    alignItems: "center",
    height: 45,
    justifyContent: "space-between",
    marginBottom: 20,
  },
  more_text: {
    fontSize: 14,
    fontWeight: "500",
  },
});
