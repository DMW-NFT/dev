import React, { useState, useEffect, useRef } from "react";
import DocumentPicker from "react-native-document-picker";
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
import { useDmwApi } from "../../../DmwApiProvider/DmwApiProvider";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Spinner } from "@ui-kitten/components";
import { Card, Layout, Modal } from "@ui-kitten/components";
import { Surface } from "react-native-paper";
import { useDmwWallet } from "../../../DmwWallet/DmwWalletProvider";
import { useDmwLogin } from "../../../loginProvider/constans/DmwLoginProvider";
import { useDmwWeb3 } from "../../../DmwWeb3/DmwWeb3Provider";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import Web3 from "web3";
import chainIdmap from "../../../constans/chainIdMap.json";
import VerfiySecretModal from "../../Components/VerfiySecretModal";
import TxProccessingModal from "../../Components/TxProccessingModal";

const screenWidth = Dimensions.get("window").width;
const scale = Dimensions.get("window").scale;
const screenHeight = Dimensions.get("window").height;
const TransferredIntoCollection = (props) => {
  const { t, i18n } = useTranslation();

  const [title, setTitle] = useState(""); //标题
  const [explain, setExplain] = useState(""); //简介
  const [password, setPassword] = useState("");
  const [loading, setLoding] = useState(false);
  const [screenloading, setscreenLoding] = useState(false);
  const [imgurlUp1, setimgurlUp1] = useState("");
  const [ipfsImgUrl, setIpfsImgUrl] = useState("");
  const { post, formData, Toast } = useDmwApi();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [nativeBalance, setNativeBalance] = useState(0);
  const {
    currentWallet,
    currentChainId,
    mintNftWithSignature,
    transactionMap,
    transactionList,
    GasMap,
    currentGasPrice,
    getNativeBalance,
  } = useDmwWeb3();
  const { WalletInUse } = useDmwLogin();
  const {
    dmwWalletList,
    currentDmwWallet,
    dmwMintWithSignature,
    dmwTransactionList,
    dmwTransactionMap,
    getWalletListFromAccountStorage,
  } = useDmwWallet();
  const [activeType, setactiveType] = useState({
    id: "",
    name: t("选择合集"),
    logo: "",
  });
  const [isShowType, setisShowType] = useState(false); //是否展开类型选择框
  const [listType, setListTtpe] = useState([]);
  const [vfModalVisible, setVfModalVisible] = useState(false);
  const [txModalVisible, setTxModalVisible] = useState(false);

  useEffect(() => {
    // getBlockchain()
    getCoType();
  }, []);

  useEffect(() => {
    if (!dmwWalletList[0] && !currentWallet) {
      Toast(t("请先登录钱包"));
      setTimeout(() => {
        props.navigation.goBack();
      }, 1500);
    } else {
      const walletAddress = WalletInUse == 1 ? dmwWalletList[0] : currentWallet;
      console.log("curren wallet address:", walletAddress);
      walletAddress &&
        getNativeBalance(walletAddress).then((res) => {
          console.log("native balance:", res);
          setNativeBalance(res);
        });
    }
  }, [WalletInUse, dmwWalletList, currentWallet]);

  // 获取区块链
  // const getBlockchain = () => {
  //   post('/index/common/get_network').then(res => {
  //     setlistE(res.data)
  //   })
  // }

  // 获取type类型
  const getCoType = () => {
    post("/index/collection/get_user_collection").then((res) => {
      console.log(res.data.data, "合集类型");
      setactiveType({
        id: res.data.data[0].id,
        name: res.data.data[0].name,
        logo: res.data.data[0].logo_url,
      });
      setListTtpe(res.data.data);
    });
  };

  const confirmToMint = () => {
    if (!checkNftDataFilled()) {
      Toast(t("未上传图片或NFT信息未填写完整"));
      return null;
    }

    if (
      !nativeBalance ||
      nativeBalance == 0 ||
      nativeBalance <
        Number(Web3.utils.fromWei(
          String(Number(GasMap["mintWithSignature"]) * Number(currentGasPrice)),
          "ether"
        ))
    ) {
      Toast(t("余额不足"));
      return null;
    }

    if (WalletInUse == 1) {
      setVfModalVisible(true);
    } else {
      let data = {
        description: explain,
        image: ipfsImgUrl,
        name: title,
      };
      setUploadLoading(true);
      fetch("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder", {
        method: "POST",
        body: JSON.stringify([{ content: data, path: `${title}.json` }]),
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "X-API-Key":
            "XRjc1mIurthZ3xNGZtAp9Mk2Rv7f991jvqfMwdZBAJPETdwks4afavF6gfkP8515",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res[0].path, "上传");

          fetch("http://13.214.32.151:6666/getSignature", {
            method: "POST",
            body: JSON.stringify({
              metadataUri: res[0].path,
              mintTo: WalletInUse == 1 ? dmwWalletList[0] : currentWallet,
              mintAmount: 1,
              network: chainIdmap[currentChainId].network.toLowerCase(),
            }),
            headers: {
              accept: "application/json",
              "content-type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((resp) => {
              setUploadLoading(false);
              console.log(resp, "zoubianjiekou");
              if (WalletInUse == 2) {
                mintNftWithSignature(
                  resp.result.SignedPayload[0],
                  resp.result.SignedPayload[
                    resp.result.SignedPayload.length - 1
                  ]
                );
                setTxModalVisible(true);
              }
            })
            .catch((err) => {
              console.log(err, "左边报错");
            });
        })
        .catch((err) => {
          console.log(err, "上传报错");
          setUploadLoading(false);
          Toast(t("上传失败，请重试"));
        });
    }
  };
  const checkNftDataFilled = () => {
    return explain && ipfsImgUrl && title;
  };

  useEffect(() => {
    WalletInUse == 1 &&
      Array.from(password).length == 6 &&
      getWalletListFromAccountStorage(password).then((walletRes) => {
        if (walletRes) {
          console.log(walletRes.walletDict[currentDmwWallet].privateKey);
          setVfModalVisible(false);

          setPassword("");

          let data = {
            description: explain,
            image: ipfsImgUrl,
            name: title,
          };
          setUploadLoading(true);
          fetch("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder", {
            method: "POST",
            body: JSON.stringify([{ content: data, path: `${title}.json` }]),
            headers: {
              accept: "application/json",
              "content-type": "application/json",
              "X-API-Key":
                "XRjc1mIurthZ3xNGZtAp9Mk2Rv7f991jvqfMwdZBAJPETdwks4afavF6gfkP8515",
            },
          })
            .then((res) => res.json())
            .then((res) => {
              console.log(res[0].path, "上传");

              fetch("http://13.214.32.151:6666/getSignature", {
                method: "POST",
                body: JSON.stringify({
                  metadataUri: res[0].path,
                  mintTo: WalletInUse == 1 ? dmwWalletList[0] : currentWallet,
                  mintAmount: 1,
                  network: chainIdmap[currentChainId].network.toLowerCase(),
                }),
                headers: {
                  accept: "application/json",
                  "content-type": "application/json",
                },
              })
                .then((res) => res.json())
                .then((resp) => {
                  console.log(resp, "zoubianjiekou");
                  setUploadLoading(false);
                  if (WalletInUse == 1) {
                    dmwMintWithSignature(
                      walletRes.walletDict[currentDmwWallet].privateKey,
                      resp.result.SignedPayload[0],
                      resp.result.SignedPayload[
                        resp.result.SignedPayload.length - 1
                      ]
                    );
                    setTxModalVisible(true);
                  }
                  //  else {
                  //   mintNftWithSignature(resp.result.SignedPayload[0], resp.result.SignedPayload[resp.result.SignedPayload.length - 1])
                  // }
                })
                .catch((err) => {
                  console.log(err, "左边报错");
                  setUploadLoading(false);
                });
            })
            .catch((err) => {
              console.log(err, "上传报错");
              setUploadLoading(false);
            });
        } else {
          Toast("密码错误");
        }
      });
  }, [password]);

  // useEffect(() => {
  //   let blackPointArry = [null, null, null, null, null, null]

  //   let arr = password.split('');
  //   arr.map((item, index) => {
  //     blackPointArry[index] = item;
  //   })
  //   setPasswordlist(blackPointArry)
  //   if (password.length == 6) {
  //     setModalvisible(false)

  //     let data = {
  //       description: explain,
  //       image: ipfsImgUrl,
  //       name: title
  //     }
  //     fetch('https://deep-index.moralis.io/api/v2/ipfs/uploadFolder', {
  //       method: "POST",
  //       body: JSON.stringify([{ content: data, path: `${title}.json` }]),
  //       headers: {
  //         accept: 'application/json',
  //         'content-type': 'application/json',
  //         'X-API-Key': 'XRjc1mIurthZ3xNGZtAp9Mk2Rv7f991jvqfMwdZBAJPETdwks4afavF6gfkP8515'
  //       },
  //     })
  //       .then((res) => res.json()).then(res => {
  //         console.log(res[0].path, '上传');

  //         fetch('http://13.214.32.151:6666/getSignature', {
  //           method: "POST",
  //           body: JSON.stringify({
  //             metadataUri: res[0].path,
  //             mintTo: WalletInUse == 1 ? dmwWalletList[0] : currentWallet,
  //             mintAmount: 1,
  //             network: chainIdmap[currentChainId].network.toLowerCase()
  //           }),
  //           headers: {
  //             accept: 'application/json',
  //             'content-type': 'application/json',
  //           },
  //         })
  //           .then((res) => res.json()).then(resp => {
  //             console.log(resp, 'zoubianjiekou');
  //             if (WalletInUse == 1) {
  //               dmwMintWithSignature(password, resp.result.SignedPayload[0], resp.result.SignedPayload[resp.result.SignedPayload.length - 1])
  //             } else {
  //               mintNftWithSignature(resp.result.SignedPayload[0], resp.result.SignedPayload[resp.result.SignedPayload.length - 1])
  //             }
  //           }).catch(err => {
  //             console.log(err, '左边报错');
  //           })
  //       }).catch(err => {
  //         console.log(err, '上传报错');
  //       })
  //   } else if (password.length == 6) {
  //     Toast(t('密码错误或暂未创建DMW钱包'))
  //   }
  // }, [password])

  // b本地
  const uuup = () => {
    setLoding(true);
    let options = {
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      mediaType: "photo",
      includeBase64: true,
    };
    // You can also use as a promise without 'callback':
    launchImageLibrary(options, (response) => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        setscreenLoding(false);
        return;
      } else if (response.errorCode == "camera_unavailable") {
        setscreenLoding(false);
        return;
      } else if (response.errorCode == "permission") {
        setscreenLoding(false);
        return;
      } else if (response.errorCode == "others") {
        setscreenLoding(false);
        return;
      }
      // console.log('base64 => ', response.assets[0].base64)
      setimgurlUp1(response.assets[0].base64);
      // let data =formData({content:response.assets[0].base64,path:'123'})
      // console.log(response.assets[0],'上传数据');
      console.log("pandaun");

      fetch("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder", {
        method: "POST",
        body: JSON.stringify([
          {
            content: response.assets[0].base64,
            path: response.assets[0].fileName,
          },
        ]),
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "X-API-Key":
            "Lf0hom3miHg82XaKYaQg1Ej3LiyXmfO9kCSAsfws9XpUX1V9sh1isIsOorRf1xYf",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          Toast(t("上传成功"));
          setLoding(false);
          console.log(res[0].path, "上传");
          setIpfsImgUrl(res[0].path);
        })
        .catch((err) => {
          console.log(err, "上传报错");
        });
    });
  };

  return (
    <SafeAreaView
      style={{
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        position: "relative",
        height: Dimensions.get("window").height,
        paddingBottom: 200,
        backgroundColor: "#fff",
      }}
    >
      {screenloading ? (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner />
          <Text style={{ marginTop: 10 }}>{t("正在上链中")}...</Text>
        </View>
      ) : (
        <>
          {/* <Image source={{ uri: imgurlUp1 }} style={{ width: 100, height: 100 }}></Image> */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* <Text>dnfjhsbdhfbhsdb电脑上减肥不上班分别少部分黑死病封神榜风寒湿痹封神榜粉红色部分少部分火山爆发s是
                分三年级奋笔疾书不放是吧风寒湿痹红色不是基本上还不是吧
            </Text> */}
            {loading ? (
              <View style={styles.up}>
                <Spinner />
              </View>
            ) : (
              <TouchableWithoutFeedback onPress={() => uuup()}>
                <View style={styles.up}>
                  {imgurlUp1 && imgurlUp1 ? (
                    <Image
                      style={{ width: "100%", height: "100%" }}
                      source={{ uri: `data:image/jpeg;base64,${imgurlUp1}` }}
                    ></Image>
                  ) : (
                    <>
                      <Image
                        style={{ width: 96 / 2, height: 96 / 2 }}
                        source={require("../../assets/img/my/3336.png")}
                      ></Image>
                      <Text>{t("上传图像、视频")}</Text>
                    </>
                  )}
                </View>
              </TouchableWithoutFeedback>
            )}

            <Text style={{ fontSize: 10, color: "#999999", marginBottom: 27 }}>
              {t("支持的文件类型：")}JPG、SVG、PNG
            </Text>
            <View style={styles.lis}>
              <Text style={styles.text}>{t("标题")}</Text>
              {/* <TouchableWithoutFeedback onPress={()=>{}} onStartShouldSetResponderCapture={()=>true} >
                       
                    </TouchableWithoutFeedback> */}
              <TextInput
                maxLength={20}
                placeholder={t("请输入藏品名")}
                keyboardType="default"
                style={[styles.input]}
                onChangeText={(e) => setTitle(e)}
                value={title}
              />
            </View>

            <View style={[styles.lis, { marginBottom: 20 }]}>
              <Text style={styles.text}>{t("简介")}</Text>
              {/* <TouchableWithoutFeedback onPress={()=>{}} onStartShouldSetResponderCapture={()=>true} >
                       
                    </TouchableWithoutFeedback> */}
              <TextInput
                placeholder={t("请输入简介")}
                keyboardType="default"
                style={[styles.input, { marginBottom: 20, height: 151 }]}
                onChangeText={(e) => setExplain(e)}
                value={explain}
                multiline={true}
                maxLength={200}
                numberOfLines={5}
              />
            </View>
            <View style={[styles.lis, { marginBottom: 20 }]}>
              <Text style={{ fontSize: 16, marginBottom: 17 }}>
                {t("选择合集")}
              </Text>

              <TouchableWithoutFeedback
                onPress={() => {
                  setisShowType(!isShowType);
                }}
              >
                <View
                  style={[
                    styles.input,
                    {
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    },
                  ]}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={{ uri: activeType.logo }}
                      style={{ width: 24, height: 24, borderRadius: 12 }}
                    ></Image>
                    <Text style={{ marginLeft: 10 }}>{activeType.name}</Text>
                  </View>
                  <FontAwesomeIcon
                    icon={faAngleDown}
                    color="#707070"
                    size={16}
                  />
                </View>
              </TouchableWithoutFeedback>
              {isShowType ? (
                <View
                  style={{
                    paddingTop: 20,
                    backgroundColor: "#fff",
                    marginBottom: 20,
                    marginTop: 2,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: "#ccc",
                    paddingBottom: 20,
                  }}
                >
                  {listType && listType.length
                    ? listType.map((item, index) => (
                        <Text
                          onPress={() => {
                            setactiveType({
                              id: item.value,
                              name: item.name,
                              logo: item.logo_url,
                            });
                            setisShowType(false);
                          }}
                          style={{
                            color: activeType.id == item.id ? "blue" : "#333",
                            paddingTop: 10,
                            paddingBottom: 10,
                            backgroundColor:
                              activeType.id == item.id
                                ? "rgba(40, 120, 255,0.1)"
                                : "#fff",
                            paddingLeft: 20,
                          }}
                        >
                          {item.name}
                        </Text>
                      ))
                    : null}
                </View>
              ) : null}
            </View>
            <View style={[styles.lis, { marginBottom: 20 }]}>
              <Text style={{ fontSize: 16, marginBottom: 17 }}>
                {t("区块链")}:{chainIdmap[currentChainId].network}
              </Text>

              {/* <TouchableWithoutFeedback onPress={() => {
                  if (!listE) {
                    Toast('未加载到其他')
                    return
                  } setisShowE(!isShowE)
                }}>
                  <View style={[styles.input, {
                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                  }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image source={require('../../assets/img/index/default.png')} style={{ width: 24, height: 24, borderRadius: 12 }}></Image>
                      <Text style={{ marginLeft: 10 }}>
                        {activeEm.name}
                      </Text></View>
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      color="#707070"
                      size={16}
                    />
                  </View>
                </TouchableWithoutFeedback>
                {
                  isShowE ?
                    <View style={{
                      paddingTop: 20, backgroundColor: '#fff', marginBottom: 20, marginTop: 2, borderRadius: 12, borderWidth: 1, borderColor: '#ccc', paddingBottom: 20
                    }}>

                      {
                        listE && listE.length ?
                          listE.map((item, index) => (
                            <Text onPress={() => { setactiveEm({ value: item.value, name: item.name }); setisShowE(false) }}
                              style={{
                                color: activeEm.value == item.value ? 'blue' : '#333',
                                paddingTop: 10, paddingBottom: 10,
                                backgroundColor: activeEm.value == item.value ? 'rgba(40, 120, 255,0.1)' : '#fff',
                                paddingLeft: 20
                              }}>{item.name}</Text>

                          )) : null
                      }


                    </View> : null
                } */}
            </View>
            {WalletInUse == 1 ? (
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  <Text style={{ fontSize: 12, color: "#999999" }}>
                    {t("上链费")}：
                  </Text>
                  {currentGasPrice ? (
                    <Text style={{ fontSize: 16, color: "#897EF8" }}>
                      {Web3.utils
                        .fromWei(
                          String(
                            Number(GasMap["mintWithSignature"]) *
                              Number(currentGasPrice)
                          ),
                          "ether"
                        )
                        .slice(0, 8)}{" "}
                      {chainIdmap[currentChainId].nativeToken}
                    </Text>
                  ) : (
                    <Text style={{ fontSize: 16, color: "#897EF8" }}>---</Text>
                  )}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  <Text style={{ fontSize: 12, color: "#999999" }}>
                    {t("余额")}
                  </Text>
                  {nativeBalance ? (
                    <Text style={{ fontSize: 16, color: "#897EF8" }}>
                      {String(nativeBalance).slice(0, 8)}{" "}
                      {chainIdmap[currentChainId].nativeToken}
                    </Text>
                  ) : (
                    <Text style={{ fontSize: 16, color: "#897EF8" }}>---</Text>
                  )}
                </View>
              </View>
            ) : null}
          </ScrollView>

          {!uploadLoading ? (
            <Text onPress={() => confirmToMint()} style={styles.btn}>
              {t("创建并支付")}
            </Text>
          ) : (
            <Text style={styles.btn}>{t("上传中")}...</Text>
          )}

          {/* <Modal
              visible={Modalvisible}
              backdropStyle={{ "backgroundColor": 'rgba(0, 0, 0, 0.5)' }}
              onBackdropPress={() => { setModalvisible(false) }}>
              <Card disabled={true} style={styles.CardBox}>

                <TextInput
                  ref={inputRefX}
                  maxLength={6}
                  caretHidden={true}
                  secureTextEntry={true}
                  onKeyPress={() => { }}
                  placeholder='123456'
                  keyboardType="numeric"
                  style={{ position: 'absolute', zIndex: 1, top: -40 }}
                  onChangeText={(e) => {
                    setPassword(e);
                  }
                  }
                  value={password}
                />
                <View style={{ justifyContent: 'flex-end', flexDirection: 'row', position: 'absolute', top: 10, right: 20, width: 22, height: 22 }}>
                  <TouchableWithoutFeedback onPress={() => { setModalvisible(false) }}>
                    <Image style={styles.colose} source={require('../../assets/img/money/6a1315ae8e67c7c50114cbb39e1cf17.png')}></Image>
                  </TouchableWithoutFeedback>

                </View>
                <View>
                  <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '700', marginBottom: 30 }}>{t("请输入支付密码")}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                  </View>
                  <View style={{ height: 48, flexDirection: 'row', justifyContent: 'space-between', }}>
                    {
                      passwordlist.map((item, index) => (
                        <Text style={[index == 0 ? styles.passinputfirst : styles.passinput]}>{item ? "●" : ''}</Text>
                      ))
                    }
                  </View>
                </View>
              </Card>
            </Modal> */}
        </>
      )}
      {vfModalVisible && (
        <VerfiySecretModal
          setModalVisible={setVfModalVisible}
          modalVisible={vfModalVisible}
          setPassword={setPassword}
        />
      )}
      {txModalVisible && (
        <TxProccessingModal
          setModalVisible={setTxModalVisible}
          modalVisible={txModalVisible}
        />
      )}
    </SafeAreaView>
  );
};

export default TransferredIntoCollection;

const styles = StyleSheet.create({
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
  up: {
    height: 200,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    marginBottom: 14,
    borderRadius: 20,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    overflow: "hidden",
  },
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
  },
});
