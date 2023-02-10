import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  TextInput,
  FlatList,
  Animated,
} from "react-native";
import React, {
  useContext,
  useState,
  useEffect,
  createRef,
  useRef,
} from "react";
import Screen from "./BottomPopUpWindow";
import Lmodal from "./leftModal";
import { useDmwWallet } from "../../../DmwWallet/DmwWalletProvider";
import { SocialIcon, SocialIconProps, Icon } from "@rneui/themed";
import {
  Button,
  Card,
  Layout,
  Modal,
  OverflowMenu,
  MenuItem,
} from "@ui-kitten/components";
import { useDmwLogin } from "../../../loginProvider/constans/DmwLoginProvider";
import { useDmwWeb3 } from "../../../DmwWeb3/DmwWeb3Provider";
import { useDmwApi } from "../../../DmwApiProvider/DmwApiProvider";
import CryptoJS from "crypto-js";
import { useTranslation } from "react-i18next";
import chainIdMap from "../../../constans/chainIdMap.json";
import Web3 from "web3";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const scale = Dimensions.get("window").scale;

const Money = (props) => {
  const {
    disconnectWallet,
    connected,
    currentWallet,
    lastConnected,
    connectWallet,
    getNativeBalance,
    memConnectStatus,
    setCurrenChainId,
    nativeToken,
    currentChainId,
    dmwConfig,
  } = useDmwWeb3();
  const {
    MoneyRouteState,
    setMoneyRouteState,
    post,
    formData,
    Toast,
    shortenAddress,
    Copy,
  } = useDmwApi();
  const { dmwWalletList, setDmwChainId } = useDmwWallet();
  const { t, i18n } = useTranslation();
  // inputRef = React.createRef();
  const inputRefX = useRef(null);
  const [contenType, setContenType] = useState("token");
  const [visible, setVisible] = useState(false);
  const [chainMenuVisible, setChainMenuVisible] = useState(false);

  const [selectedChain, setSelectedChain] = useState(
    chainIdMap[currentChainId].network
  );
  const [lMvisible, setLMvisible] = useState(false);
  const [Modalvisible, setModalvisible] = useState(false);

  const [password, setpassword] = useState("");
  const [passwordlist, setpasswordlist] = useState([]);
  const { WalletInUse, setWalletInUse, avatarUrl } = useDmwLogin();

  const [lwNativeBalance, setLwNativeBalance] = useState("");
  const [tpwNativeBalance, setTpwNativeBalance] = useState("");
  const [erc20Balance, setErc20Balance] = useState([]);
  const [txHistory, setTxHistory] = useState([]);

  const scrollX = new Animated.Value(-500);
  const opacity = new Animated.Value(0);

  const getAddressBalance = () => {
    console.log("getting ", chainIdMap[currentChainId].network, "erc20");
    setErc20Balance([]);
    post(
      "/index/wallet/get_erc20_token_balance_by_wallet",
      formData({ network: selectedChain.toLowerCase() })
    )
      .then((res) => {
        res.data && setErc20Balance(res.data);
        console.log("erc20:", res.data);
      })
      .catch((err) => {
        // console.log("err",err)
        Toast(err.message);
        // setTxHistory([])
      });
  };

  const empty = () => {
    setpassword("");
  };

  const close = () => {
    setVisible(false);
    setLMvisible(false);
  };
  const lMvisibleopen = () => {
    setLMvisible(true);
  };
  const open = () => {
    setVisible(true);
  };

  const Switchwallet = (walletType) => {
    console.log(dmwWalletList[0]);

    setWalletInUse(walletType);

    var iv = "aaaaaaaaaaaaaaaa"; //随机生成长度为32的16进制字符串。IV称为初始向量，不同的IV加密后的字符串是不同的，加密和解密需要相同的IV。
    let wallet_address = "";
    if (walletType == 1) {
      if (dmwWalletList[0]) {
        wallet_address = dmwWalletList[0];
      } else {
        Toast("请先创建DMW钱包");
        return;
      }
    } else {
      wallet_address = currentWallet;
    }
    let str = JSON.stringify({ wallet_address: wallet_address });
    let data = formData({ iv: iv, param: str });
    post("/index/login/login_by_wallet", data)
      .then((res) => {
        console.log(res, wallet_address, "qianbao denglu");
        if (res.code == 200) {
          Toast(t("登录成功"));
        }
      })
      .catch((err) => {
        Toast(err.message);
      });
  };

  const renderChainMenu = () => (
    <TouchableWithoutFeedback onPress={() => setChainMenuVisible(true)}>
      <View
        style={{
          width: 100,
          height: 35,
          backgroundColor: "#F0EFFE",
          justifyContent: "center",
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "#897EF8", alignSelf: "center" }}>
          {selectedChain}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );

  const getAccuontTxHistory = () => {
    setTxHistory([]);
    post(
      "/index/wallet/get_native_transactions_by_wallet",
      formData({ network: selectedChain })
    )
      .then((res) => {
        if (res.code == 200) {
          setTxHistory(res.data.result);
          // console.log(res.data.result);
        } else {
          setTxHistory([]);
        }
      })
      .catch((err) => {
        // console.log("err",err)
        Toast(err.message);
        // setTxHistory([])
      });
  };

  useEffect(() => {
    if (lMvisible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      Animated.timing(scrollX, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(); // 开始执行动画
      // 开始执行动画
    }
  }, [lMvisible]);

  useEffect(() => {
    if (memConnectStatus.connected) {
      connectWallet();
    }
  }, [memConnectStatus]);

  useEffect(() => {
    if (currentChainId != 0) {
      setDmwChainId(currentChainId);
      setSelectedChain(chainIdMap[currentChainId].network.toLowerCase());
    }
  }, [currentChainId]);

  useEffect(() => {
    // console.log('钱包变化',connected,currentWallet);
    if (currentWallet && WalletInUse == 2) {
      getNativeBalance(currentWallet).then((res) => {
        setTpwNativeBalance(res);
      });
    }
    if (dmwWalletList && dmwWalletList[0] && WalletInUse == 1) {
      getNativeBalance(dmwWalletList[0]).then((res) => {
        setLwNativeBalance(res);
      });
    }

    setMoneyRouteState(
      connected || dmwWalletList.length ? "12345" : "createMoney"
    );
  }, [currentChainId, WalletInUse]);

  useEffect(() => {
    setTimeout(() => {
      getAddressBalance();
      getAccuontTxHistory();
    }, 1000);
  }, [WalletInUse, currentChainId]);

  useEffect(() => {
    let blackPointArry = [null, null, null, null, null, null];

    let arr = password.split("");
    arr.map((item, index) => {
      blackPointArry[index] = item;
    });
    setpasswordlist(blackPointArry);
    if (password.length == 6 && dmwWalletList[0]) {
      setModalvisible(false);
      props.navigation.navigate("ViewMnemonics", { password });
    } else if (password.length == 6 && !dmwWalletList[0]) {
      Toast(t("密码错误或暂未创建DMW钱包"));
    }
  }, [password]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#fff",
        flex: 1,
        position: "relative",
      }}
    >
      <ScrollView
        style={{
          maxHeight: screenHeight * 1,
          // minHeight: screenHeight,
          // backgroundColor: "green",
        }}
      >
        <View style={styles.hearder}>
          <OverflowMenu
            anchor={renderChainMenu}
            visible={chainMenuVisible}
            placement={"bottom"}
            onBackdropPress={() => setChainMenuVisible(false)}
          >
            {dmwConfig&&dmwConfig ? (
               Object.entries(dmwConfig).map(([key, value]) => (
                <MenuItem
                  onPress={() => {
                    setSelectedChain(value.name.toLowerCase())
                    setCurrenChainId(value.chainId)
                    setDmwChainId(value.chainId)
                  }}
                  title={value.name}
                />
              ))
            ) : (
              <MenuItem
                onPress={() => {
                  setSelectedChain("polygon");
                  setCurrenChainId("137"), setDmwChainId("137");
                }}
                title="polygon"
              />
            )}

            {/* <MenuItem
              onPress={() => {
                setSelectedChain("mumbai");
                setCurrenChainId("80001"), setDmwChainId("80001");
              }}
              title="mumbai"
            /> */}
          </OverflowMenu>

          <TouchableWithoutFeedback onPress={() => lMvisibleopen()}>
            <Image
              style={styles.top_img}
              source={require("../../assets/img/my/top_left_list.png")}
            ></Image>
          </TouchableWithoutFeedback>
        </View>

        <View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
            style={[
              {
                marginBottom: 20,
                height: 336 / 2,
              },
              { marginLeft: dmwWalletList && dmwWalletList[0] ? null : 20 },
            ]}
          >
            {dmwWalletList && dmwWalletList[0] ? (
              <View style={styles.USDT}>
                {WalletInUse == 1 ? (
                  <Text style={styles.active}>{t("当前登录")}</Text>
                ) : (
                  <TouchableWithoutFeedback onPress={() => Switchwallet(1)}>
                    <Image
                      style={{
                        width: 36,
                        height: 36,
                        position: "absolute",
                        top: 0,
                        right: 0,
                      }}
                      source={require("../../assets/img/money/SwitchwalletA.png")}
                    ></Image>
                  </TouchableWithoutFeedback>
                )}
                <Text style={styles.WName}>DMW</Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 15,
                    marginBottom: 14,
                  }}
                >
                  <ImageBackground
                    source={require("../../assets/img/money/WFCA.png")}
                    style={{ marginRight: 10, justifyContent: "center" }}
                  >
                    <Text style={styles.CurrencyName}>{nativeToken}</Text>
                  </ImageBackground>

                  <Text style={styles.balance}>
                    {lwNativeBalance
                      ? Number(lwNativeBalance).toFixed(4)
                      : "--"}
                  </Text>
                </View>
                {/* <Text style={{ color: "#fff" }}>$10.000</Text> */}
                <TouchableWithoutFeedback
                  onPress={() => {
                    Copy(dmwWalletList[0]);
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ color: "#fff" }}>
                      {shortenAddress(dmwWalletList[0])}
                    </Text>

                    <Image
                      style={{ width: 10, height: 10, marginLeft: 5 }}
                      source={require("../../assets/img/money/copyW.png")}
                    ></Image>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            ) : null}

            {connected && currentWallet ? (
              <View style={styles.WFCA}>
                {WalletInUse == 2 ? (
                  <Text style={styles.active}>{t("当前登录")}</Text>
                ) : (
                  <TouchableWithoutFeedback onPress={() => Switchwallet(2)}>
                    <Image
                      style={{
                        width: 36,
                        height: 36,
                        position: "absolute",
                        top: 0,
                        right: 0,
                      }}
                      source={require("../../assets/img/money/SwitchwalletA.png")}
                    ></Image>
                  </TouchableWithoutFeedback>
                )}

                <Text style={[styles.WName, { color: "#897EF8" }]}>
                  {t("外部钱包")}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 15,
                    marginBottom: 14,
                  }}
                >
                  <ImageBackground
                    source={require("../../assets/img/money/USDT.png")}
                    style={{ marginRight: 10, justifyContent: "center" }}
                  >
                    <Text style={[styles.CurrencyName, { color: "#897EF8" }]}>
                      {nativeToken}
                    </Text>
                  </ImageBackground>

                  <Text style={[styles.balance, { color: "#897EF8" }]}>
                    {Number(tpwNativeBalance).toFixed(4)}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingRight: 20,
                  }}
                >
                  {/* <Text style={{ color: "#897EF8" }}>$10.000</Text> */}
                  <Text></Text>
                  <Text
                    style={{ color: "#897EF8" }}
                    onPress={() => {
                      disconnectWallet();
                    }}
                  >
                    {t("断开链接")}
                  </Text>
                </View>
                <TouchableWithoutFeedback
                  onPress={() => {
                    Copy(currentWallet);
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ color: "#897EF8" }}>
                      {shortenAddress(currentWallet)}
                    </Text>

                    <Image
                      style={{ width: 10, height: 10, marginLeft: 5 }}
                      source={require("../../assets/img/my/copy.png")}
                    ></Image>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            ) : null}
          </ScrollView>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={styles.service}>service</Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableWithoutFeedback onPress={() => open()}>
            <View style={styles.ListService}>
              <Image
                style={styles.ListServiceImg}
                source={require("../../assets/img/money/list1.png")}
              ></Image>
              <Text>{t("接收")}</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              // props.navigation.navigate("Exchange");
              Toast("coming soon...");
            }}
          >
            <View style={[styles.ListService]}>
              <Image
                style={[styles.ListServiceImg]}
                source={require("../../assets/img/money/list3.png")}
              ></Image>
              <Text>{t("兑换")}</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              props.navigation.navigate("Gift", {
                WalletInuse: WalletInUse,
                ERC20Token: erc20Balance,
                NativToken:
                  WalletInUse == 1 ? lwNativeBalance : tpwNativeBalance,
              });
            }}
          >
            <View style={styles.ListService}>
              <Image
                style={styles.ListServiceImg}
                source={require("../../assets/img/money/list4.png")}
              ></Image>
              <Text>{t("赠予")}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        {/* tab栏 -- start */}
        <View style={[styles.daohang]}>
          <Text
            style={[
              contenType == "token"
                ? styles.daonghang_text_ative
                : styles.daonghang_text,
            ]}
            onPress={() => setContenType("token")}
          >
            {t("代币")}
          </Text>
          <Text
            style={[
              contenType == "nft"
                ? styles.daonghang_text_ative
                : styles.daonghang_text,
            ]}
            onPress={() => setContenType("nft")}
          >
            Tx {t("记录") + ""}
          </Text>
        </View>
        {/* tab栏 -- end */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ maxHeight: screenHeight * 0.5, minHeight: "100%" ,marginBottom:50}}
          nestedScrollEnabled={true}
        >
          <View style={[styles.listbox]}>
            {contenType == "token"
              ? erc20Balance[0] &&
                erc20Balance.map((item, index) => (
                  <View style={styles.ListLi}>
                    <Image
                      style={{ width: 40, height: 40 }}
                      source={require("../../assets/img/money/list4.png")}
                    ></Image>
                    <View style={styles.ListLeftText}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "700",
                          lineHeight: 40,
                        }}
                      >
                        {Number(item.balance) / 10 ** item.decimals +
                          " " +
                          item.symbol}
                      </Text>
                      {/* <Text style={{ fontSize: 12 }}>$10.000</Text> */}
                    </View>
                  </View>
                ))
              : txHistory &&
                txHistory[0] &&
                txHistory.map((item) => (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      props.navigation.navigate("TransactionDetail", {
                        detail: item,
                        token: chainIdMap[currentChainId].nativeToken,
                      });
                    }}
                  >
                    <SafeAreaView
                      style={{
                        marginBottom: 10,
                        justifyContent: "space-around",
                        borderColor: "#cfcde18c",
                        borderWidth: 1,
                        borderRadius: 15,
                        // alignContent:"center",
                        // height:50
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          // backgroundColor: "pink",
                        }}
                      >
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Icon
                            reverse
                            name="retweet"
                            type="antdesign"
                            color="#8a7ef6"
                            size={15}
                          />
                          <View style={{ flexDirection: "column" }}>
                            <Text>
                              {item.hash.slice(0, 7)}...{item.hash.slice(-7)}
                            </Text>
                            <Text style={{ fontSize: 10, color: "gray" }}>
                              {item.block_timestamp
                                .replace("T", " ")
                                .replace(".000Z", "")}
                            </Text>
                          </View>
                        </View>

                        <Text
                          style={{
                            paddingEnd: 20,
                            color:
                              item.to_address ==
                              (WalletInUse == 1
                                ? dmwWalletList[0].toLowerCase()
                                : currentWallet.toLowerCase())
                                ? "gray"
                                : "#4ccb79",
                          }}
                        >
                          {item.to_address ==
                          (WalletInUse == 1 ? dmwWalletList[0].toLowerCase() : currentWallet.toLowerCase())
                            ? "+"
                            : "-"}
                          {Web3.utils.fromWei(item.value, "ether")}{" "}
                          {chainIdMap[currentChainId].nativeToken}
                        </Text>
                      </View>
                    </SafeAreaView>
                  </TouchableWithoutFeedback>
                ))}
          </View>
        </ScrollView>
      </ScrollView>

      {Modalvisible && (
        <Modal
          visible={Modalvisible}
          backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onBackdropPress={() => {
            setModalvisible(false);
          }}
        >
          <Card disabled={true} style={styles.CardBox}>
            <TextInput
              ref={inputRefX}
              maxLength={6}
              caretHidden={true}
              secureTextEntry={true}
              onKeyPress={() => {}}
              placeholder="123456"
              keyboardType="number-pad"
              style={{ position: "absolute", zIndex: 1, top: -40 }}
              onChangeText={(e) => {
                setpassword(e);
              }}
              value={password}
            />
            <View
              style={{
                justifyContent: "flex-end",
                flexDirection: "row",
                position: "absolute",
                top: 10,
                right: 20,
                width: 22,
                height: 22,
              }}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  setModalvisible(false);
                }}
              >
                <Image
                  style={styles.colose}
                  source={require("../../assets/img/money/6a1315ae8e67c7c50114cbb39e1cf17.png")}
                ></Image>
              </TouchableWithoutFeedback>
            </View>
            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "700",
                  marginBottom: 30,
                }}
              >
                请输入支付密码
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              ></View>
              <View
                style={{
                  height: 48,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {passwordlist.map((item, index) => (
                  <Text
                    style={[
                      index == 0 ? styles.passinputfirst : styles.passinput,
                    ]}
                  >
                    {item ? "●" : ""}
                  </Text>
                ))}
              </View>
            </View>
          </Card>
        </Modal>
      )}
      {visible && (
        <Screen
          // style={[styles.Screen]}
          visible={visible}
          close={close}
        ></Screen>
      )}

      <Animated.View
        style={{ position: "absolute", translateX: scrollX, opacity: opacity }}
      >
        <Lmodal
          goto={(path) => {
            props.navigation.navigate(path);
          }}
          close={() => close()}
          visible={lMvisible}
          openModal={() => {
            setModalvisible(true);
            setTimeout(() => {
              inputRefX.current.focus();
            }, 500);
            empty();
          }}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

export default Money;

const styles = StyleSheet.create({
  listbox: {
    marginVertical: 20,
    marginHorizontal: 20,
    paddingBottom: 100,
  },
  passinputfirst: {
    textAlign: "center",
    lineHeight: 48,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    width: 46,
    height: 48,
  },
  passinput: {
    textAlign: "center",
    lineHeight: 48,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    width: 46,
    height: 48,
    borderLeftWidth: 0,
  },

  colose: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderRadius: 11,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: -10,
  },
  CardBox: {
    width: 640 / 2,
    borderRadius: 20,
    position: "relative",
    paddingBottom: 20,
    zIndex: 100,
    // paddingTop: 10,
    // paddingRight: 10
  },
  active: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    position: "absolute",
    top: 0,
    right: 0,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: "#F9C94E",
    color: "#fff",
  },
  Screen: {
    width: screenWidth,
    position: "absolute",
  },
  ListLi: {
    flexDirection: "row",
    borderBottomWidth: 1 / scale,
    borderBottomColor: "#CCCCCC",
    paddingBottom: 16,
    marginBottom: 20,
  },
  ListLeftText: {
    marginLeft: 10,
    flex: 1,
  },
  hearder: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  HTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333333",
  },
  hello: {
    fontSize: 12,
    color: "#666666",
  },
  top_img: {
    width: 40,
    height: 40,
  },
  WFCA: {
    width: 610 / 2,
    height: 336 / 2,
    backgroundColor: "#F0EFFE",
    borderRadius: 10,
    marginRight: 15,
    paddingTop: 24,
    paddingLeft: 20,
  },
  USDT: {
    marginLeft: 20,
    width: 610 / 2,
    height: 336 / 2,
    backgroundColor: "#897EF8",
    borderRadius: 10,
    marginRight: 15,
    paddingTop: 24,
    paddingLeft: 20,
    position: "relative",
  },
  WName: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
    
    lineHeight: 24,
  },
  CurrencyName: {
    color: "#fff",
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  balance: {
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 24,
    color: "#fff",
  },
  service: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333333",
    paddingHorizontal: 20,
  },
  ListService: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  ListServiceImg: {
    marginBottom: 5,
    width: 60,
    height: 60,
  },
  listbox: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  daohang: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  daonghang_text: {
    fontSize: 16,
    fontWeight: "700",
    
    height: 56,
    lineHeight: 56,
    flex: 1,
    color: "#666666",
    textAlign: "center",
  },
  daonghang_text_ative: {
    fontSize: 16,
    fontWeight: "700",
    
    height: 56,
    lineHeight: 56,
    flex: 1,
    textAlign: "center",
    borderBottomColor: "#897EF8",
    borderBottomWidth: 3,
    color: "#897EF8",
    borderRadius: 1,
  },
});
