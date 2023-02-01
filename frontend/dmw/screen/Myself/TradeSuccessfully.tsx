import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDmwApi } from "../../../DmwApiProvider/DmwApiProvider";
import { t } from "i18next";
import chainNameMap from "../../../constans/chainNameMap.json";

const TradeSuccessfully = (props) => {
  // state = {
  //   type: 1, //1是交易成功  2是交易关闭
  // }
  const [list, setList] = useState(null);
  const { post, formData, Toast } = useDmwApi();
  const [type, setType] = useState(1);
  useEffect(() => {
    console.log(props.route.params.id, "订单id");

    post(
      "/index/order/get_succeed_order_details",
      formData({ offer_id: props.route.params.id })
    ).then((res) => {
      console.log(res, "交易成功！");
      res.code == 200
        ? setList(res.data)
        : (props.navigation.navigate("sellOrder"), Toast(res.message));
    });
  }, [props]);

  const PlatformFee = list && (
    <View style={[styles.flexJBC, styles.mb30]}>
      <Text style={[styles.ImageBoxName]}>
        {t("服务费") + list.service * 100}%
      </Text>
      <Text style={[styles.ImageBoxColl]}>
        {list.service_fee.number}{" "}
        {list.service_fee.currency_name == "ETH"
          ? chainNameMap[list.network].nativeToken
          : list.service_fee.currency_name}
      </Text>
    </View>
  );
  const NftInfo = list && (
    <View style={[styles.imageBox]}>
      <View style={[styles.flex]}>
        <Image
          source={{ uri: list.image_attachment_url }}
          style={[styles.imgBoxImage]}
        ></Image>
        <View style={{ flex: 1 }}>
          <View style={[styles.flexJBC]}>
            <Text style={[styles.ImageBoxName, { marginBottom: 23 }]}>
              {list.nft_name}
            </Text>
            <Text style={[styles.ImageBoxName, { fontWeight: "bold" }]}>
              {list.buyout_price_per.number}{" "}
              {list.buyout_price_per.currency_name == "ETH"
                ? chainNameMap[list.network].nativeToken
                : list.buyout_price_per.currency_name}
            </Text>
          </View>
          <Text style={[styles.ImageBoxColl]}>{list.collection_name}</Text>
        </View>
      </View>
    </View>
  );

  const RoyaltiesFee = list && (
    <View style={[styles.flexJBC, styles.mb30]}>
      <Text style={[styles.ImageBoxName]}>
        {t("版权费") + " " + list.royalties * 100}%
      </Text>
      <Text style={[styles.ImageBoxColl]}>
        {list.royalties_fee.number}{" "}
        {list.royalties_fee.currency_name == "ETH"
          ? chainNameMap[list.network].nativeToken
          : list.royalties_fee.currency_name}
      </Text>
    </View>
  );
  const PricePerToken = list && (
    <View style={[styles.flexJBC, styles.mb30]}>
      <Text style={[styles.ImageBoxName]}>
        {t("价格/NFT") + " " }
      </Text>
      <Text style={[styles.ImageBoxColl]}>
        {list.total_offer_amount_per.number}{" "}
        {list.total_offer_amount_per.currency_name == "ETH"
          ? chainNameMap[list.network].nativeToken
          : list.total_offer_amount_per.currency_name}
      </Text>
    </View>
  );
  const QuantityWanted = list && (
    <View style={[styles.flexJBC, styles.mb30]}>
      <Text style={[styles.ImageBoxName]}>
        {t("数量") + " " }
      </Text>
      <Text style={[styles.ImageBoxColl]}>
        {list.quantity_wanted}{" "}
      </Text>
    </View>
  );

  const TotalPrice = list && (
    <View style={[styles.flexJBC, styles.borderling]}>
      <Text style={[styles.ImageBoxName]}>{t("成交价") + ""}</Text>
      <Text
        style={[
          styles.ImageBoxColl,
          { color: "#897EF8", fontSize: 16, fontWeight: "bold" },
        ]}
      >
        {list.total_offer_amount.number}{" "}
        {list.total_offer_amount.currency_name == "ETH"
          ? chainNameMap[list.network].nativeToken
          : list.total_offer_amount.currency_name}
      </Text>
    </View>
  );
  return (
    list && (
      <SafeAreaView style={{ backgroundColor: "#fff" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={[styles.whiteBox]}>
              {/* <View style={[styles.flex]}>
              <Image source={require('../../assets/img/index/any3.jpg')} style={[styles.whiteImage]}></Image>
              <Text style={[styles.whiteImageText]}>Simon D</Text>
            </View> */}
              {NftInfo}
              {type == 1 ? (
                <View>
                  {PlatformFee}
                  {RoyaltiesFee}
                  {PricePerToken}
                  {QuantityWanted}
                  {TotalPrice}
                </View>
              ) : (
                <View style={[styles.borderling, { paddingBottom: 0 }]}></View>
              )}

              <View style={[styles.flexJBC, styles.mb30]}>
                <Text style={[styles.ImageBoxName]}>{t("创建时间") + ""}</Text>
                <Text style={[styles.ImageBoxColl]}>{list.create_time}</Text>
              </View>
              {type == 1 ? (
                <View style={[styles.flexJBC, styles.mb30]}>
                  <Text style={[styles.ImageBoxName]}>
                    {t("成交时间") + ""}
                  </Text>
                  <Text style={[styles.ImageBoxColl]}>{list.deal_time}</Text>
                </View>
              ) : (
                <Text></Text>
              )}
              <View style={[styles.flexJBC, styles.mb30]}>
                <Text style={[styles.ImageBoxName]}>{t("买方") + ""}</Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={"middle"}
                  style={[styles.ImageBoxColl, { width: 100 }]}
                >
                  {list.offeror}
                </Text>
              </View>
              <View style={[styles.flexJBC, styles.mb30]}>
                <Text style={[styles.ImageBoxName]}>{t("藏品地址") + ""}</Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={"middle"}
                  style={[
                    styles.ImageBoxColl,
                    { color: "#897EF8", width: 100 },
                  ]}
                >
                  {list.contract_address}
                </Text>
              </View>

              <View style={[styles.flexJBC, styles.mb30]}>
                <Text style={[styles.ImageBoxName]}>{t("网络") + ""}</Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={"middle"}
                  style={[
                    styles.ImageBoxColl,
                    { color: "#897EF8", textAlign: "right" },
                  ]}
                >
                  {list.network}
                </Text>
              </View>

              <View style={[styles.flexJBC, styles.mb30]}>
                <Text style={[styles.ImageBoxName]}>Token ID</Text>
                <Text style={[styles.ImageBoxColl]}>{list.token_id}</Text>
              </View>
              <View style={[styles.flexJBC, styles.mb30]}>
                <Text style={[styles.ImageBoxName]}>{t("哈希地址") + ""}</Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={"middle"}
                  style={[
                    styles.ImageBoxColl,
                    { color: "#897EF8", width: 100 },
                  ]}
                >
                  {list.hash}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  );
};

export default TradeSuccessfully;

const styles = StyleSheet.create({
  borderling: {
    paddingBottom: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  mb30: {
    marginBottom: 15,
  },
  ImageBoxColl: {
    color: "#999",
    fontSize: 12,
  },
  ImageBoxName: {
    fontSize: 12,
    color: "#333",
  },
  imgBoxImage: {
    width: 75,
    height: 75,
    borderRadius: 10,
    marginRight: 10,
  },
  imageBox: {
    marginTop: 15,
    marginBottom: 17,
  },
  whiteImageText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  whiteImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 5,
  },
  whiteBox: {
    minheight: 858 / 2,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
  },
  container: {
    minHeight: Dimensions.get("window").height - 106,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },
  flexJBC: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
