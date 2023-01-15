import React, { useState, useEffect } from "react";
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
  ScrollView,
} from "react-native";

import { Icon, Avatar } from "@rneui/themed";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faListUl,
  faChevronRight,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";
import { useDmwLogin } from "../../../loginProvider/constans/DmwLoginProvider";
import { useDmwApi } from "../../../DmwApiProvider/DmwApiProvider";
import { Spinner } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
const screenWidth = Dimensions.get("window").width;
const scale = Dimensions.get("window").scale;
const screenHeight = Dimensions.get("window").height;
const SystemNotification = (props) => {
  const { t, i18n } = useTranslation();
  const { post, formData, Toast } = useDmwApi();
  const [list, setlist] = useState([]);
  useEffect(() => {
    getlist();
  }, []);

  const getlist = () => {
    post(
      "/index/message/get_messages_list",
      formData({ type: props.route.params.type })
    ).then((res) => {
      console.log(res.data.data, "消息列表");
      setlist(res.data.data);
    });
  };

  const delnotice = (id) => {
    post(
      "/index/message/del_message",
      formData({ id, type: props.route.params.type })
    ).then((res) => {
      console.log(res);
      Toast(t("删除成功"));
      getlist();
    });
  };

  const cleanAll = () => {
    const id = list.map((item) => item.id);
    console.log(id, props.route.params.type);
    post(
      "/index/message/del_message",
      formData({ id: id, type: props.route.params.type })
    ).then((res) => {
      console.log(res);
      Toast(t("删除成功"));
      getlist();
    });
  };

  const tradeStatusMap = {
    "1": "拍卖成功",
    "2": "拍卖成功",
    "3": "拍卖成功",
    "4": "拍卖失败",
    "5": "offer到期",
    "6": "发起offer",
    "7": "发起offer",
    "8": "售卖成功",
    "9": "购买成功",
    "10": "售卖到期",
    "11": "售卖到期",
    "12": "offer到期",
    "13": "发起offer",
    "14": "售卖取消",
  };

  const likeMsgCard = (item) => {
    return (
      <View style={styles.View}>
        <View style={styles.header}>
          <View style={[styles.headerLeft]}>
            <Avatar
              size={50}
              rounded
              // avatarStyle={}
              source={{ uri: item.avatar_url }}
            />
            <View
              style={{
                alignItems: "flex-start",
                flexDirection: "column",
                marginHorizontal: 5,
              }}
            >
              <Text style={{ fontSize: 22 }}>{item.nickname} </Text>
              <Text style={{ fontSize: 15 }}>{t("赞了这个合集")} </Text>
              <Text style={{ color: "gray" }}>{item.create_time} </Text>
            </View>
          </View>
          <Avatar
            size={60}
            // rounded
            avatarStyle={{ borderRadius: 15 }}
            source={{ uri: item.image_attachment_url }}
          />
          {/* <FontAwesomeIcon icon={faListUl} color="#707070" size={16} /> */}
          {/* <Text style={styles.del} onPress={() => delnotice(item.id)}>
            删除
          </Text> */}
        </View>
      </View>
    );
  };
  const auctionMsg = (item) => {
    return (
      <View style={styles.View}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <FontAwesomeIcon icon={faCogs} color="#707070" size={16} />
            <Text style={{ marginLeft: 10 }}>{item.type}</Text>
          </View>
          <FontAwesomeIcon icon={faListUl} color="#707070" size={16} />
        </View>

        <View style={styles.titleBox}>
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.time}>{item.create_time}</Text>
          </View>
          <Text style={styles.del} onPress={() => delnotice(item.id)}>
            删除
          </Text>
        </View>

        <View style={{ marginBottom: 15 }}>
          <Text style={styles.content} numberOfLines={3}>
            {item.content}
            {/* <Text style={{ fontSize: 12, color: '#999999' }}>全文</Text> */}
          </Text>
        </View>

        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.navigate("NoticeDetails", { id: item.id });
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 5,
              paddingBottom: 10,
            }}
          >
            <Text>查看详情</Text>
            <FontAwesomeIcon icon={faChevronRight} color="#707070" size={16} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };
  const saleMsg = (item) => {
    return (
      <View style={styles.View}>
        <View style={styles.header}>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ marginLeft: 10, fontSize: 20, marginBottom: 10 }}>
              {t(tradeStatusMap[item.type])} :{item.nft_name}
            </Text>
            <Text style={{ marginLeft: 10, color: "gray" }}>{item.msg}</Text>
          </View>
        </View>

        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.navigate("TradeSuccessfully", {
              id: item.offer_id,
            });
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // paddingTop: 5,
              paddingBottom: 10,
              marginStart: 10,
            }}
          >
            <Text>{t("查看详情")}</Text>
            <FontAwesomeIcon icon={faChevronRight} color="#707070" size={16} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };
  const systemMsg = (item) => {
    return (
      <View style={styles.View}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <FontAwesomeIcon icon={faCogs} color="#707070" size={16} />
            <Text style={{ marginLeft: 10 }}>{item.type}</Text>
          </View>
          {/* <FontAwesomeIcon icon={faListUl} color="#707070" size={16} /> */}
        </View>

        {/* <View style={styles.titleBox}>
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.time}>{item.create_time}</Text>
          </View>
          <Text style={styles.del} onPress={() => delnotice(item.id)}>
            删除
          </Text>
        </View> */}

        <View style={{ marginBottom: 15 }}>
          <Text style={styles.content} numberOfLines={3}>
            {item.content}
            {/* <Text style={{ fontSize: 12, color: '#999999' }}>全文</Text> */}
          </Text>
        </View>

        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.navigate("NoticeDetails", { id: item.id });
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 5,
              paddingBottom: 10,
            }}
          >
            <Text>查看详情</Text>
            <FontAwesomeIcon icon={faChevronRight} color="#707070" size={16} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  return (
    <ScrollView>
      <SafeAreaView
        style={{
          // paddingTop: 44,
          position: "relative",
          height: Dimensions.get("window").height,
          backgroundColor: "#F5F5F5",
          marginBottom:100
        }}
      >
        {list[0] && (
          <TouchableWithoutFeedback
            onPress={() => {
              cleanAll();
            }}
          >
            <View
              style={{
                alignSelf: "flex-end",
                paddingHorizontal: 10,
                paddingVertical: 5,
                marginHorizontal: 20,
                marginVertical: 5,
                backgroundColor: "gray",
                borderRadius: 15,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon name="delete" type="material-community" color="white" />
              <Text style={{ color: "white", textAlign: "center" }}>ALL</Text>
            </View>
          </TouchableWithoutFeedback>
        )}

        <View style={{ paddingLeft: 20, paddingRight: 20,marginBottom:100 }}>
          {props.route.params.type == 1 &&
            list.map((item, index) => systemMsg(item))}
          {props.route.params.type == 2 &&
            list.map((item, index) => likeMsgCard(item))}
          {props.route.params.type == 4 &&
            list.map((item, index) => saleMsg(item))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SystemNotification;

const styles = StyleSheet.create({
  View: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  circles: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    marginRight: 10,
  },
  titleBox: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  time: {
    fontSize: 10,
    color: "#999999",
    marginTop: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  content: {
    fontSize: 12,
    color: "#666666",
  },
  del: {
    color: "#666666",
    fontSize: 12,
    fontWeight: "500",
  },
});
