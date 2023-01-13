import {
  Text,
  Image,
  StyleSheet,
  View,
  FlatList,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Item } from "react-native-paper/lib/typescript/components/List/List";
import { useDmwApi } from "../../DmwApiProvider/DmwApiProvider";
import chainNameMap from "../../constans/chainNameMap.json";
import { useTranslation } from "react-i18next";
const List = (props) => {
  const { t, i18n } = useTranslation();
  // type
  // 1是首页进入
  // 2是交易里的寄售
  // 3是交易里的拍卖
  // 4是我的页面
  const [refreshing, setrefreshing] = useState(false);
  const [imgs, setimgs] = useState(true);
  const [type, setype] = useState(props.type);
  const item = props.list;
  // const [imgurl, setImgurl] = useState(props.list.image_attachment_url);
  const [show, setshow] = useState(false);
  const { Copy } = useDmwApi();


  const setNftToTransfer = ()=>{
    props.setNftToTransfer(item)
    props.setTxNftModalVisible(true)
    setshow(false);
    console.log(item)
  }



  return (
    <TouchableWithoutFeedback
      onPress={() => {
        console.log(
          1,
          item.unique_id,
          item.contract_address,
          item.token_id,
          item.network,
          "详情传参"
        );
        props.navigatetoDetail(
          1,
          item.unique_id,
          item.contract_address,
          item.token_id,
          item.network
        );
      }}
    >
      <View style={[styles.lis]}>
        {show ? (
          <TouchableWithoutFeedback
            onPress={() => {
              setshow(false);
            }}
          >
            <View
              style={{
                backgroundColor: "rgba(0,0,0,0.3)",
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                zIndex: 100,
                borderRadius: 10,
                paddingTop: 60,
                paddingLeft: 12,
                paddingRight: 12,
              }}
            >
              <View>
                <Text
                  onPress={() => {
                    Copy(`${item.contract_address}/${item.token_id}`);
                  }}
                  style={{
                    paddingTop: 6,
                    paddingBottom: 6,
                    backgroundColor: "#fff",
                    borderRadius: 15,
                    textAlign: "center",
                    marginBottom: 20,
                  }}
                >
                  {t("复制链接")}
                </Text>
                {/* <Text
                  style={{
                    paddingTop: 6,
                    paddingBottom: 6,
                    backgroundColor: "#fff",
                    borderRadius: 15,
                    textAlign: "center",
                    marginBottom: 20,
                  }}
                  onPress={() => {
                    setNftToTransfer()
                   
                  }}
                >
                  {t("转移/赠与")}
                </Text> */}
              </View>
            </View>
          </TouchableWithoutFeedback>
        ) : null}
        <View>
          <View style={[styles.imgBox]}>
            {imgs ? (
              <ImageBackground
                onError={() => {
                  console.log(123456);
                  setImgurl("../assets/img/index/default.png");
                  setimgs(false);
                }}
                style={[styles.imageBox]}
                resizeMode="cover"
                source={{ uri: props.list.image_attachment_url }}
              >
                {type != 4 ? (
                  <Text numberOfLines={2} style={[styles.network]}>
                    {item.network || ""}
                  </Text>
                ) : null}
                {type == 3 ? (
                  <Text style={[styles.time, styles.timeBox]}>4h 16m 27s</Text>
                ) : (
                  <Text></Text>
                )}
                {type == 4 && !show ? (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setshow(true);
                    }}
                  >
                    <View
                      style={{
                        width: 22,
                        height: 22,
                        backgroundColor: "rgba(255,255,255,0.2)",
                        borderWidth: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingLeft: 2,
                        paddingRight: 2,
                        position: "absolute",
                        top: 10,
                        right: 10,
                        borderRadius: 6,
                        borderColor: "#ccc",
                      }}
                    >
                      <Text
                        style={{
                          width: 4,
                          height: 4,
                          backgroundColor: "#ccc",
                          borderRadius: 2,
                        }}
                      ></Text>
                      <Text
                        style={{
                          width: 4,
                          height: 4,
                          backgroundColor: "#ccc",
                          borderRadius: 2,
                        }}
                      ></Text>
                      <Text
                        style={{
                          width: 4,
                          height: 4,
                          backgroundColor: "#ccc",
                          borderRadius: 2,
                        }}
                      ></Text>
                    </View>
                  </TouchableWithoutFeedback>
                ) : null}
              </ImageBackground>
            ) : (
              <ImageBackground
                onError={() => {}}
                style={[styles.imageBox]}
                resizeMode="cover"
                source={require("../assets/img/index/default.png")}
              >
                {type == 3 ? (
                  <Text style={[styles.time, styles.timeBox]}>4h 16m 27s</Text>
                ) : (
                  <Text></Text>
                )}
              </ImageBackground>
            )}
          </View>
        </View>
        <View style={[styles.lisBottom, { height: type == 3 ? 248 / 2 : 100 }]}>
          {type != 4 ? (
            <>
              <Text style={[styles.name]} numberOfLines={1}>
                {item.collection_name || "--"}
              </Text>
              <Text numberOfLines={2} style={[styles.collName]}>
                {item.nft_name || ""}
              </Text>
            </>
          ) : (
            <>
              <Text style={[styles.name]} numberOfLines={1}>
                {item.collection_name || "--"}
              </Text>
              <Text numberOfLines={2} style={[styles.collName]}>
                {item.nft_name || ""}
              </Text>
            </>
          )}
          <View>
            {type != 3 && type != 4 ? (
              <View style={[styles.priceBox]}>
                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                  <Text style={[styles.price]}>
                    {item.reserve_price_per
                      ? item.reserve_price_per.number
                      : "--"}
                  </Text>
                  <Text style={[styles.coinType]}>
                    {item.reserve_price_per
                      ? item.reserve_price_per.currency_name == "ETH"
                        ? chainNameMap[item.network.toLowerCase()].nativeToken
                        : item.reserve_price_per.currency_name
                      : ""}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesomeIcon icon={faHeart} color="red" size={11} />
                  <Text style={[styles.like]}>{item.likes}</Text>
                </View>
              </View>
            ) : type == 3 ? (
              <View style={[styles.auction]}>
                <Text style={[styles.name]} numberOfLines={1}>
                  {t("起拍价")}
                </Text>
                <View style={[styles.priceBox]}>
                  <View
                    style={{ flexDirection: "row", alignItems: "flex-end" }}
                  >
                    <Text style={[styles.price]}>4,218</Text>
                    <Text style={[styles.coinType]}>Wfca</Text>
                  </View>
                  <Text style={[styles.button, { backgroundColor: "#897EF8" }]}>
                    {t("出价")}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={[styles.auction]}>
                <View style={[styles.priceBox]}>
                  <View
                    style={{ flexDirection: "row", alignItems: "flex-end" }}
                  >
                    <Text style={{ fontWeight: "700" }}>#{item.token_id}</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default List;
const styles = StyleSheet.create({
  network: {
    color: "#fff",
    position: "absolute",
    left: 10,
    top: 10,
    backgroundColor: "#ACA4FA",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 40,
    lineHeight: 15,
  },
  button: {
    fontSize: 12,
    color: "#fff",
    height: 22,
    lineHeight: 22,
    width: 44,
    textAlign: "center",
    borderRadius: 11,
    backgroundColor: "#ACA4FA",
  },
  imgBox: {
    position: "relative",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  timeBox: {
    position: "absolute",
    padding: 10,
    paddingLeft: 37 / 2,
    paddingRight: 37 / 2,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.23)",
  },
  time: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 12,
  },
  lis: {
    width: "47%",
    marginTop: 20,
    marginRight: "6%",
  },
  imageBox: {
    // width:  Dimensions.get('window').width
    width: "100%",
    height: 315 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  lisBottom: {
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#F5F5F5",
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  name: {
    fontSize: 10,
    color: "#666",
  },
  collName: {
    color: "#333",
    lineHeight: 18,
    fontWeight: "bold",
    fontSize: 12,
    // marginVertical: 10,
    // flexDirection:'column',
    // justifyContent:"space-between",
  },
  priceBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  price: {
    color: "#333333",
    fontWeight: "bold",
    fontSize: 12,
  },
  coinType: {
    fontWeight: null,
    fontSize: 10,
    marginLeft: 5,
  },
  like: {
    color: "#ccc",
    fontSize: 10,
  },
});
