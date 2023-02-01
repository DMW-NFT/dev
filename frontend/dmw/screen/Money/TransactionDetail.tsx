import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import React, { useState, useEffect } from "react";
import { t } from "i18next";
import Web3 from "web3";
import { useDmwApi } from "../../../DmwApiProvider/DmwApiProvider";
import { Icon } from "@rneui/base";

const TransactionDetail = (props) => {
  const detail = props.route.params["detail"];
  const token = props.route.params["token"];
  const { Copy } = useDmwApi();

  const [clickCount, setClickCount] = useState(0);

  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        nestedScrollEnabled={false}
      >
        <View
          style={{
            borderRadius: 100,
            shadowOffset: { width: 100, height: 100 },
            shadowColor: "green",
            shadowOpacity: 1,
            elevation: 5,
            alignSelf: "center",
            position: "absolute",
            top: -2,
            zIndex: 10,
            justifyContent: "center",
          }}
        >
          <Icon
            name="check-circle"
            type="font-awesome"
            size={50}
            color={"green"}
            iconStyle={{}}
          />
        </View>
        <View style={styles.container}>
          <View style={[styles.whiteBox]}>
            <TouchableOpacity
              onPress={() => {
                Copy(detail.from_address);
              }}
            >
              <View style={styles.detailColStyle}>
                <Text style={[styles.ImageBoxName]}>From:</Text>
                <View style={{ flexDirection: "row", alignContent: "center" }}>
                  <Text style={[styles.ImageBoxColl]}>
                    {detail.from_address}{" "}
                    <Icon
                      name="copy"
                      type="feather"
                      color="#c7c0f7"
                      size={15}
                    />
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Copy(detail.to_address)}>
              <View style={styles.detailColStyle}>
                <Text style={[styles.ImageBoxName]}>To:</Text>
                <View style={{ flexDirection: "row", alignContent: "center" }}>
                  <Text style={[styles.ImageBoxColl]}>
                    {detail.to_address}{" "}
                    <Icon
                      name="copy"
                      type="feather"
                      color="#c7c0f7"
                      size={15}
                    />
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Copy(Web3.utils.fromWei(detail.value, "ether"))}
            >
              <View style={styles.detailColStyle}>
                <Text style={[styles.ImageBoxName]}>Value:</Text>
                <View style={{ flexDirection: "row", alignContent: "center" }}>
                  <Text style={[styles.ImageBoxColl]}>
                    {Web3.utils.fromWei(detail.value, "ether")} {token}{" "}
                  </Text>
                  <Icon name="copy" type="feather" color="#c7c0f7" size={15} />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                Copy(
                  Web3.utils.fromWei(
                    String(Number(detail.gas_price) * Number(detail.gas)),
                    "ether"
                  )
                );
              }}
            >
              <View style={styles.detailColStyle}>
                <Text style={[styles.ImageBoxName]}>Gas Used:</Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={"middle"}
                  style={[styles.ImageBoxColl, { width: 100 }]}
                >
                  {Web3.utils.fromWei(
                    String(Number(detail.gas_price) * Number(detail.gas)),
                    "ether"
                  )}
                </Text>
              </View>
            </TouchableOpacity>

            <View style={styles.detailColStyle}>
              <Text style={[styles.ImageBoxName]}>Input:</Text>
              <ScrollView
                style={{
                  height: 200,
                  backgroundColor: "#cfcfcf70",
                  borderRadius: 15,
                  padding: 10,
                  borderBottomRightRadius: 0,
                }}
                nestedScrollEnabled={true}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <Text style={{ fontSize: 10, color: "black" }}>
                    {detail.input}
                  </Text>
                </View>
              </ScrollView>
              <TouchableOpacity
                onPress={() => {
                  Copy(detail.input);
                }}
              >
                <View
                  style={{
                    width: 60,
                    backgroundColor: "#cfcfcf70",
                    padding: 5,
                    borderRadius: 15,
                    alignSelf: "flex-end",
                    borderTopRightRadius: 0,
                    borderTopLeftRadius: 0,
                  }}
                >
                  <Icon name="copy" type="feather" color="#c7c0f7" size={15} />
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                Copy(detail.hash);
              }}
            >
              <View style={styles.detailColStyle}>
                <Text style={[styles.ImageBoxName]}>Hash:</Text>
                <View style={{ flexDirection: "row", paddingRight: 10 }}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode={"middle"}
                    style={{ fontSize: 10, color: "gray" }}
                  >
                    {detail.hash}
                  </Text>
                  <Icon name="copy" type="feather" color="#c7c0f7" size={15} />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                Copy(detail.block_number);
              }}
            >
              <View style={styles.detailColStyle}>
                <Text style={[styles.ImageBoxName]}>Block Number:</Text>
                <View style={{ flexDirection: "row", paddingRight: 10 }}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode={"middle"}
                    style={{ fontSize: 10, color: "gray" }}
                  >
                    {detail.block_number}{" "}
                  </Text>
                  <Icon name="copy" type="feather" color="#c7c0f7" size={15} />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                Copy(detail.block_timestamp);
              }}
            >
              <View style={styles.detailColStyle}>
                <Text style={[styles.ImageBoxName]}>Block Time:</Text>
                <View style={{ flexDirection: "row", paddingRight: 10 }}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode={"middle"}
                    style={{ fontSize: 10, color: "gray" }}
                  >
                    {detail.block_timestamp}{" "}
                  </Text>
                  <Icon name="copy" type="feather" color="#c7c0f7" size={15} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TransactionDetail;

const styles = StyleSheet.create({
  borderling: {
    paddingBottom: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  detailColStyle: {
    flexDirection: "column",
    marginBottom: 10,
  },
  mb30: {
    marginBottom: 15,
  },
  ImageBoxColl: {
    color: "#999",
    fontSize: 12,
    justifyContent: "center",
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
    // marginTop: 60,
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
