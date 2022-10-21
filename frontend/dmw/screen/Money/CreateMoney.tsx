import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
// import * as Animatable from 'react-native-animatable'
import { Modal } from "react-native-paper";
import { useDmwWeb3 } from "../../../DmwWeb3/DmwWeb3Provider";
import { useDmwApi } from "../../../DmwApiProvider/DmwApiProvider";
import { useDmwWallet } from "../../../DmwWallet/DmwWalletProvider";

const CreateMoney = (props) => {
  const [visible, setvisible] = useState(false);
  const { connected, connectWallet } = useDmwWeb3();
  const { Toast, setMoneyRouteState } = useDmwApi();
  const { dmwWalletList } = useDmwWallet();
  const navigate = (val) => {
    props.navigation.navigate(val);
    setvisible(false);
  };

  const clickWallet = () => {
    connectWallet()
  };
  useEffect(()=>{
    // clickWallet()
    // setTimeout(() => {
    //   setWalletState(connector.connected);
    //   console.log(connector.connected);
    //   if(WalletState){
    //     setMoneyRouteState("money");
    //   }else{
    //     setMoneyRouteState("createMoney");
    //     Toast("钱包已失效！");
    //   }
    // }, 5000);

    if(connected){
          setMoneyRouteState("money");
        }else{
          setMoneyRouteState("createMoney");
          Toast("钱包已断开链接！");
        }
  },[connected])

  useEffect(() => {
    console.log("====================================");
    console.log(dmwWalletList);
    console.log("====================================");
    if (connected || dmwWalletList.length) {
      setMoneyRouteState("money");
    } else {
      setMoneyRouteState("createMoney");
    }
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <View style={[styles.container]}>
        <Text style={[styles.title]}>Connect with Wallet</Text>
        <TouchableWithoutFeedback onPress={() => clickWallet()}>
          <View style={[styles.imgBox]}>
            <Image
              style={[styles.Image]}
              source={require("../../assets/img/money/78.png")}
            ></Image>
            <Image
              style={[styles.Image]}
              source={require("../../assets/img/money/79.png")}
            ></Image>
            <Image
              style={[styles.Image]}
              source={require("../../assets/img/money/80.png")}
            ></Image>
            <Image
              style={[styles.Image]}
              source={require("../../assets/img/money/81.png")}
            ></Image>
            <Image
              style={[styles.Image]}
              source={require("../../assets/img/money/82.png")}
            ></Image>
            <Image
              style={[styles.Image]}
              source={require("../../assets/img/money/83.png")}
            ></Image>
          </View>
        </TouchableWithoutFeedback>
        <Text
          style={[styles.createMoneyBtn]}
          onPress={() => {
            setvisible(true);
          }}
        >
          创建新钱包
        </Text>

        {/* <Animatable.View animation="fadeInUpBig" style={[styles.footer]}>
                        </Animatable.View> */}
      </View>
      <Modal
        visible={visible}
        onDismiss={() => {
          setvisible(false);
        }}
        contentContainerStyle={[styles.footer]}
      >
        <View style={[styles.btnline]}></View>
        <Text
          style={[styles.createMoneyBtn]}
          onPress={() => {
            navigate("createWord");
          }}
        >
          暂无助记词，去新建
        </Text>
        <Text
          style={[styles.createMoneyBtn]}
          onPress={() => {
            navigate("importWord");
          }}
        >
          已有助记词，去导入
        </Text>
      </Modal>
    </SafeAreaView>
  );
};

export default CreateMoney;

const styles = StyleSheet.create({
  btnline: {
    position: "absolute",
    width: 40,
    height: 6,
    backgroundColor: "#E0E0E0",
    top: 6,
    borderRadius: 50,
    left: "50%",
  },
  footer: {
    zIndex: 999,
    width: Dimensions.get("window").width,
    height: "40%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
  },
  createMoneyBtn: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#897EF8",
    height: 50,
    lineHeight: 50,
    textAlign: "center",
    color: "#897EF8",
    borderRadius: 25,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 30,
  },
  Image: {
    width: "47%",
    height: 250 / 2,
  },
  imgBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#0F172C",
    fontSize: 20,
  },
  container: {
    height: Dimensions.get("window").height,
    padding: 70 / 2,
    paddingTop: 10,
    paddingBottom: 130,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
