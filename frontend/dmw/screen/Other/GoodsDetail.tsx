import {
  Text,
  Image,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  FlatList,
  TextInput,
} from "react-native";
import React, { useState, useContext, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faAngleRight,
  faHeart,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import List from "../../Components/List";
import { useDmwApi } from "../../../DmwApiProvider/DmwApiProvider";
import { Spinner } from "@ui-kitten/components";
import { useDmwWeb3 } from "../../../DmwWeb3/DmwWeb3Provider";
import {
  Card,
  Modal,
  Datepicker,
  Drawer,
  DrawerGroup,
  DrawerItem,
} from "@ui-kitten/components";
import { useDmwLogin } from "../../../loginProvider/constans/DmwLoginProvider";
import { useDmwWallet } from "../../../DmwWallet/DmwWalletProvider";
import { useTranslation } from "react-i18next";
import { ListItem, Avatar, Icon, Overlay, Button } from "@rneui/themed";
import VerfiySecretModal from "../../Components/VerfiySecretModal";
import TxProccessingModal from "../../Components/TxProccessingModal";
import chainNameMap from "../../../constans/chainNameMap.json";
import chainIdMap from "../../../constans/chainIdMap.json";

const GoodsDetail = (props) => {
  const { t, i18n } = useTranslation();
  const inputRefX = useRef(null);
  const [showChain, setshowChain] = useState(true);
  const [showcollection, setshowcollection] = useState(false);
  const [showoffer, setshowoffer] = useState(false);
  const [showhistory, setshowhistory] = useState(false);
  const [loading, setLoding] = useState(true); //loading
  const [detailsObj, setDetailsObj] = useState({});
  const [imgurl, setImgurl] = useState("");
  const [imgShow, setimgShow] = useState(true);
  const [ownersArr, setOwnersArr] = useState([]);
  const [ownersArrCopy, setOwnersArrCopy] = useState([]);
  const [userInfo, setUserInfo] = useState({
    userAvatar: "",
    creatorAddress: "",
    shortenAddress: "",
  });
  const [listing, setlisting] = useState([]);
  const [history, sethistory] = useState([]);
  const [MorenNftList, setMorenNftList] = useState([]);
  const [isApproved, setIsApproved] = useState(false);

  const [nftNumber, setNftNumber] = useState(0);
  const [sellOptionVisible, setSellOptionVisible] = useState(false);
  const [sellNumber, setSellNumber] = useState("1");
  const [sellPrice, setSellPrice] = useState("1");

  const [showOwnerList, setShowOwnerlist] = useState(false);
  const [approvalVisible, setApprovalVsity] = useState(false);
  const [sellBtnVisible, setSellBtnVsity] = useState(false);
  const [auctionBtnVisible, setAuctionBtnVsity] = useState(false);

  const [password, setPassword] = useState("");
  const [vfModalVisible, setVfModalVisible] = useState(false);
  const [txModalVisible, setTxModalVisible] = useState(false);

  // Context 方法
  const { Toast, post, get, formData, shortenAddress } = useDmwApi();
  const { WalletInUse } = useDmwLogin();
  const {
    dmwWalletList,
    dmwApprovalForAll,
    dmwCreateListing,
    dmwTransactionList,
    dmwTransactionMap,
    getWalletListFromAccountStorage,
    currentDmwWallet,
  } = useDmwWallet();
  const {
    getBalanceOf1155,
    currentWallet,
    checkIsApproveForAll,
    ApprovalForAll,
    transactionMap,
    transactionList,
    setTransactionList,
    createListing,
    nativeToken,
    connector,
  } = useDmwWeb3();

  // 获取nft详细数据
  useEffect(() => {
    let params = props.route.params;
    let data = { ...params };

    // data.network = 'goerli'
    console.log(data, "我的页面nft 传参");
    getList(data);
  }, []);

  // 出售数量限制
  useEffect(() => {
    Number(sellNumber) > nftNumber && setSellNumber(String(nftNumber));
  }, [sellNumber, nftNumber]);

  // 外部网络检测
  useEffect(() => {
    if (WalletInUse == 2 && detailsObj.network) {
      if (
        connector.chainId !=
        chainNameMap[detailsObj.network.toLowerCase()].chainId
      ) {
        console.log(
          connector.chainId,
          chainNameMap[detailsObj.network.toLowerCase()].chainId
        );
        Toast(
          "该NFT与外部钱包连接网络不一致，请切换外部钱包网络后再进行购买操作！"
        );
      }
    }
  }, [detailsObj, WalletInUse]);

  const approvalNFT = () => {
    if (WalletInUse == 1) {
      console.log("dmw approval nft");
      setVfModalVisible(true);
    } else {
      ApprovalForAll(detailsObj.contract_address, detailsObj.token_id);
      setTxModalVisible(true);
    }
  };
  const sellNFT = () => {
    if (WalletInUse == 1) {
      setVfModalVisible(true);
    } else {
      let sTime = Math.round(new Date().getTime() / 1000 + 60).toString();
      createListing(
        detailsObj.contract_address,
        detailsObj.token_id,
        sTime,
        "3153600000",
        sellNumber,
        sellPrice,
        sellPrice,
        "0"
      );
      setTxModalVisible(true);
      setSellOptionVisible(false);
    }
  };

  useEffect(() => {
    if (detailsObj && detailsObj.contract_address) {
      if (WalletInUse == 1 && dmwWalletList[0]) {
        getBalanceOf1155(
          detailsObj.contract_address,
          dmwWalletList[0],
          detailsObj.token_id
        ).then((res) => {
          console.log(res, "shulaing");

          if (res > 0) {
            checkIsApproveForAll(
              detailsObj.contract_address,
              dmwWalletList[0]
            ).then((isApproved) => {
              // console.log("isApproved:", isApproved)
              if (isApproved) {
                setApprovalVsity(false);
                setSellBtnVsity(true);
              } else {
                setApprovalVsity(true);
              }
              setNftNumber(res);
              setIsApproved(isApproved);
            });
          } else {
          }
        });
      }
      if (WalletInUse == 2 && currentWallet) {
        getBalanceOf1155(
          detailsObj.contract_address,
          currentWallet,
          detailsObj.token_id
        ).then((res) => {
          console.log(res, "shulaing");

          if (res > 0) {
            checkIsApproveForAll(
              detailsObj.contract_address,
              currentWallet
            ).then((isApproved) => {
              // console.log("isApproved:", isApproved)
              if (isApproved) {
                setApprovalVsity(false);
                setSellBtnVsity(true);
              } else {
                setApprovalVsity(true);
              }
              setNftNumber(res);
              setIsApproved(isApproved);
            });
          } else {
          }
        });
      }
    }
  }, [WalletInUse, detailsObj]);

  useEffect(() => {
    nftNumber > 0
      ? checkIsApproveForAll(
          detailsObj.contract_address,
          WalletInUse == 1 ? dmwWalletList[0] : currentWallet
        ).then((isApproved) => {
          // console.log("isApproved:", isApproved)
          if (isApproved) {
            setApprovalVsity(false);
            setIsApproved(isApproved);
          } else {
            setApprovalVsity(true);
          }
        })
      : () => {
          setApprovalVsity(false);
          setIsApproved(false);
        };
  }, [nftNumber, txModalVisible]);

  useEffect(() => {
    WalletInUse == 1 &&
      Array.from(password).length == 6 &&
      getWalletListFromAccountStorage(password).then((res) => {
        if (res) {
          console.log(res.walletDict[currentDmwWallet].privateKey);
          // console.log(selectedToken)
          setVfModalVisible(false);
          setTxModalVisible(true);
          setPassword("");

          if (!isApproved) {
            dmwApprovalForAll(
              res.walletDict[currentDmwWallet].privateKey,
              detailsObj.contract_address,
              detailsObj.token_id
            );
            setTxModalVisible(true);
          } else {
            let sTime = Math.round(new Date().getTime() / 1000 + 60).toString();
            dmwCreateListing(
              res.walletDict[currentDmwWallet].privateKey,
              detailsObj.contract_address,
              detailsObj.token_id,
              sTime,
              "3153600000",
              sellNumber,
              sellPrice,
              sellPrice,
              "0"
            );
          }
        } else {
          Toast(t("密码错误"));
        }
      });
  }, [password]);

  const getList = (data) => {
    setLoding(true);
    let formdata = formData(data);
    post("/index/nft/get_nft_details", formdata)
      .then((res) => {
        console.log("调用详情接口");
        console.log(res);

        setLoding(false);
        setDetailsObj(res.data.nft_data);
        setImgurl(
          res.data.nft_data.image_attachment_url
            ? res.data.nft_data.image_attachment_url
            : res.data.nft_data.image_attachment
        );
        let arr = res.data.nft_data["owners"].msg.avatar;
        let arrw = res.data.nft_data["owners"].msg.wallet_address;
        let arrO = [];
        let arrWo = [];
        arr.map((item, index) => {
          arrO.push({
            avatar: item,
            wallet_address: shortenAddress(arrw[index]),
          });
          arrWo.push({ avatar: item, wallet_address: arrw[index] });
        });
        setOwnersArr(arrO);
        setOwnersArrCopy(arrWo);
        let userAvatarArr = {
          userAvatar: "",
          creatorAddress: "",
          shortenAddress: "",
        };
        userAvatarArr["userAvatar"] = res.data.nft_data.creator_address_avatar;
        userAvatarArr["creatorAddress"] = res.data.nft_data.creator_address;
        userAvatarArr["shortenAddress"] = res.data.nft_data.creator_address
          ? shortenAddress(res.data.nft_data.creator_address)
          : "--";
        setUserInfo(userAvatarArr);
        setlisting(res.data.listing);
        sethistory(res.data.history);
        console.log(res.data.history)
      })
      .catch((err) => {
        Toast(err.message);
      });
  };

  const GetMorenNft = (id) => {
    if (detailsObj.create_way == 1) {
      let data = formData({ id });
      post("/index/nft/get_collection_nft", data).then((res) => {
        setMorenNftList(res.data.data);
      });
    } else {
      let data = formData({
        contract_address: detailsObj.contract_address,
        network: detailsObj.network,
      });
      post("/index/nft/get_contract_nft", data).then((res) => {
        setMorenNftList(res.data.result);
      });
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      {loading ? (
        <View
          style={{
            width: "100%",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.container]}>
            {imgShow ? (
              <Image
                source={{ uri: imgurl }}
                onError={() => {
                  setImgurl("../../assets/img/index/default.png");
                  setimgShow(false);
                }}
                style={[styles.topImg]}
              ></Image>
            ) : (
              <Image
                source={require("../../assets/img/index/default.png")}
                style={[styles.topImg]}
              ></Image>
            )}

            {/* 喜欢 */}
            <View style={[styles.likeBox, styles.flexJBC]}>
              <Text style={[styles.likeBoxName]}>
                {detailsObj["collection"]
                  ? detailsObj["collection"].name
                  : "--"}
              </Text>
              <View style={[styles.flex]}>
                <FontAwesomeIcon icon={faHeart} color="red" size={12} />
                <Text style={[styles.likenum]}>{detailsObj.likes}</Text>
              </View>
            </View>
            {/* 合集详情 */}
            <View
              style={
                ([styles.coll],
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                })
              }
            >
              <View>
                <Text style={[styles.collName]}>{detailsObj.name}</Text>
                <Text style={styles.collIntrDetail}>{detailsObj.abstract}</Text>
              </View>
            </View>
            <View></View>
          </View>

          {/* 发行数量 */}

          <View
            style={[
              styles.flex,
              { paddingHorizontal: 20, justifyContent: "space-between" },
            ]}
          >
            <View style={[styles.faxingNum, styles.flex]}>
              <Text style={[styles.faxingNumLeft]}>{t("剩余数量")}</Text>
              <Text style={[styles.faxingNumRight]}>{nftNumber}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              {auctionBtnVisible && (
                <Text
                  style={[styles.buyBtn, { marginRight: 10, marginBottom: 40 }]}
                >
                  {t("拍卖")}
                </Text>
              )}

              {sellBtnVisible && (
                <Text
                  onPress={() => {
                    setSellOptionVisible(true);
                  }}
                  style={[styles.buyBtn, { marginRight: 10, marginBottom: 40 }]}
                >
                  {t("定价出售")}
                </Text>
              )}

              {approvalVisible && (
                <Text
                  onPress={() => {
                    approvalNFT();
                  }}
                  style={[
                    styles.buyBtn,
                    { backgroundColor: "#897EF8", marginBottom: 40 },
                  ]}
                >
                  {t("Approval")}
                </Text>
              )}
            </View>
          </View>

          {/* 创建者 拥有者 */}

          <View style={[styles.createAndByuer, { paddingBottom: 0 }]}>
            <View style={[styles.flex]}>
              <Image
                source={{ uri: userInfo.userAvatar }}
                style={[styles.createAndByuerImage]}
              ></Image>
              <Text style={[styles.createAndByuerName]}>
                {userInfo.shortenAddress}
              </Text>
              <Text style={[styles.FromOrByuer]}>From</Text>
            </View>
            <View
              style={[
                styles.flex,
                {
                  justifyContent: "space-between",
                  paddingTop: 10,
                  paddingLeft: 30,
                  paddingRight: 0,
                },
              ]}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.createAndByuerName]}>Owners:</Text>
                <Text>{ownersArr.length}</Text>
              </View>
              <Text
                style={[
                  styles.FromOrByuer,
                  { paddingHorizontal: 10, paddingVertical: 0 },
                ]}
                onPress={() => {
                  setShowOwnerlist(true);
                }}
              >
                All
              </Text>
            </View>
          </View>

          <View>
            <ListItem.Accordion
              content={
                <>
                  <ListItem.Content>
                    <ListItem.Title>{t("链上信息")}</ListItem.Title>
                  </ListItem.Content>
                </>
              }
              isExpanded={showChain}
              onPress={() => {
                setshowChain(!showChain);
              }}
            >
              <View style={[styles.linechainBoxOrther]}>
                <View>
                  <View style={[styles.flexJBC, { marginBottom: 15 }]}>
                    <Text style={[styles.chainLeft]}>{t("合约地址")}</Text>
                    <Text style={[styles.chainRight, { color: " #897EF8" }]}>
                      {detailsObj.contract_address}
                    </Text>
                  </View>
                  <View style={[styles.flexJBC, { marginBottom: 15 }]}>
                    <Text style={[styles.chainLeft]}>Token ID</Text>
                    <Text style={[styles.chainRight, { color: " #897EF8" }]}>
                      {detailsObj.token_id}
                    </Text>
                  </View>
                  <View style={[styles.flexJBC, { marginBottom: 15 }]}>
                    <Text style={[styles.chainLeft]}>{t("代币标准")}</Text>
                    <Text style={[styles.chainRight, { color: " #897EF8" }]}>
                      {detailsObj.contract_type}
                    </Text>
                  </View>
                  <View style={[styles.flexJBC, { marginBottom: 20 }]}>
                    <Text style={[styles.chainLeft]}>{t("区块链")}</Text>
                    <Text style={[styles.chainRight, { color: " #897EF8" }]}>
                      {detailsObj.network}
                    </Text>
                  </View>
                </View>
              </View>
            </ListItem.Accordion>

            <ListItem.Accordion
              content={
                <ListItem.Content>
                  <ListItem.Title>{t("挂单列表")}</ListItem.Title>
                </ListItem.Content>
              }
              isExpanded={showoffer}
              onPress={() => {
                setshowoffer(!showoffer);
              }}
            >
              <View style={[styles.linechainBoxOrther]}>
                {listing.map((item, index) => (
                  <View
                    key={index}
                    style={
                      index != listing.length - 1
                        ? { borderBottomWidth: 1, borderColor: "#ccc" }
                        : null
                    }
                  >
                    <TouchableWithoutFeedback
                      onPress={() => {
                        if (WalletInUse == 1 && !dmwWalletList[0]) {
                          Toast(t("请先登录钱包"));
                          return;
                        } else if (WalletInUse == 2 && !currentWallet) {
                          Toast(t("请先登录钱包"));
                          return;
                        }
                        props.navigation.navigate("QuotationDetails", {
                          id: item.order_no,
                          likes: detailsObj.likes,
                          imgUrl: imgurl,
                          userAvatar: userInfo.userAvatar,
                          shortenAddress: userInfo.shortenAddress,
                        });
                      }}
                    >
                      <View style={[styles.offerBox]}>
                        <View
                          style={[
                            styles.flexJBC,
                            index != 0 ? { paddingTop: 20 } : null,
                          ]}
                        >
                          <View>
                            <Text
                              style={{
                                fontSize: 14,
                                color: "#333",
                                fontWeight: "bold",
                                marginBottom: 9,
                              }}
                            >
                              {item.wallet_address.slice(2, 7)}
                            </Text>
                            {/* <Text style={{ fontSize: 12, color: "#999" }}>-less</Text> */}
                          </View>
                          <View>
                            <View style={[styles.flex, { marginBottom: 9 }]}>
                              <Image
                                style={{ width: 15, height: 15 }}
                                source={require("../../assets/img/money/offer.png")}
                              ></Image>
                              {detailsObj.network && (
                                <Text style={{ fontSize: 14, color: "#333" }}>
                                  {item.buyout_price_per.number +
                                    " " +
                                    chainNameMap[
                                      detailsObj.network.toLowerCase()
                                    ].nativeToken}
                                </Text>
                              )}
                            </View>
                            {/* <Text style={{ fontSize: 12, color: "#999" }}>$455.32</Text> */}
                          </View>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                    <View style={[styles.offerBox, styles.flexJBC]}>
                      <View>
                        <Text style={[styles.moreTop]}>Quantity</Text>
                        <Text style={[styles.moreBottom]}>{item.quantity}</Text>
                      </View>
                      <View>
                        <Text style={[styles.moreTop]}>From</Text>
                        <Text style={[styles.moreBottom]}>
                          {item.wallet_address.slice(2, 7)}
                        </Text>
                      </View>
                      <View>
                        <Text style={[styles.moreTop]}>Expires</Text>
                        <Text style={[styles.moreBottom]}>{item.end_time}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </ListItem.Accordion>

            <ListItem.Accordion
              content={
                <ListItem.Content>
                  <ListItem.Title>{t("交易历史")}</ListItem.Title>
                </ListItem.Content>
              }
              isExpanded={showhistory}
              onPress={() => {
                setshowhistory(!showhistory);
              }}
            >
              {showhistory ? (
                history.map((item, index) => (
                  <View key={index}>
                    <View style={[styles.offerBox]}>
                      <View style={[styles.flexJBC]}>
                        <View>
                          <Text
                            style={{
                              fontSize: 14,
                              color: "#333",
                              fontWeight: "bold",
                              marginBottom: 9,
                            }}
                          >
                            Sale
                          </Text>
                          <Text style={{ fontSize: 12, color: "#999" }}>
                            -less
                          </Text>
                        </View>
                        <View>
                          <View style={[styles.flex, { marginBottom: 9 }]}>
                            <Image
                              style={{ width: 15, height: 15 }}
                              source={require("../../assets/img/money/offer.png")}
                            ></Image>
                            <Text style={{ fontSize: 14, color: "#333" }}>
                              {item.total_offer_amount.number + " "}
                              {item.total_offer_amount.currency_name == "ETH"
                                ? chainNameMap[detailsObj.network.toLowerCase()]
                                    .nativeToken
                                : item.total_offer_amount.currency_name}
                            </Text>
                          </View>
                          {/* <Text style={{ fontSize: 12, color: "#999" }}>$455.32</Text> */}
                        </View>
                      </View>
                    </View>
                    <View style={[styles.offerBox, styles.flexJBC]}>
                      <View>
                        <Text style={[styles.moreTop]}>Quantity</Text>
                        <Text style={[styles.moreBottom]}>
                          {item.quantity_wanted}
                        </Text>
                      </View>
                      <View>
                        <Text style={[styles.moreTop]}>From</Text>
                        <Text style={[styles.moreBottom]}>
                          {item.wallet_address.slice(2, 7)}
                        </Text>
                      </View>
                      <View>
                        <Text style={[styles.moreTop]}>To</Text>
                        <Text style={[styles.moreBottom]}>
                          {item.offeror.slice(2, 7)}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))
              ) : (
                <Text></Text>
              )}
            </ListItem.Accordion>
            <ListItem.Accordion
              content={
                <ListItem.Content>
                  <ListItem.Title>{t("本合集内容")}</ListItem.Title>
                </ListItem.Content>
              }
              isExpanded={showcollection}
              onPress={() => {
                setshowcollection(!showcollection);
              }}
            >
              {showcollection && detailsObj.collection ? (
                <View style={[styles.flex, { marginVertical: 20 }]}>
                  <Image
                    source={{ uri: detailsObj.collection.logo_url }}
                    style={[styles.collectionImage]}
                  ></Image>
                  <Text style={[styles.createAndByuerName, { marginLeft: 15 }]}>
                    {detailsObj.collection.name}
                  </Text>
                </View>
              ) : (
                <Text></Text>
              )}
            </ListItem.Accordion>
          </View>

          {/*底部列表 */}
          {/* <View style={[styles.linechainBoxOrther, { borderBottomColor: "#fff" }]}>
                            <View style={[styles.flexJBC]}>
                                <Text style={[styles.linechainBoxOrtherName, { marginBottom: 20 }]}>

                                </Text>
                            </View>
                            {
                                MorenNftList.length ? <ScrollView showsVerticalScrollIndicator={false} style={{ flexWrap: 'nowrap' }}>



                                    {
                                        MorenNftList.map((item, index) => (
                                            <List key={index} list={item} type={1}
                                                navigatetoDetail={(id, unique_id, contract_address, token_id, network) => { props.navigation.navigate('jiaoyi', { id: id, unique_id, contract_address, token_id, network }) }}
                                            />
                                        ))

                                    }

                                </ScrollView> :
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: '40%' }}>
                                        <Spinner />
                                    </View>

                            }
                        </View> */}
        </ScrollView>
      )}

      <Modal
        visible={sellOptionVisible}
        backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onBackdropPress={() => {
          setSellOptionVisible(false);
        }}
      >
        <Card disabled={true} style={styles.CardBox}>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                fontWeight: "700",
                marginBottom: 30,
              }}
            >
              {t("售卖")}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text>{t("价格")}：</Text>
            <TextInput
              caretHidden={true}
              secureTextEntry={true}
              onKeyPress={() => {}}
              keyboardType="phone-pad"
              style={styles.buyInput}
              onChangeText={(text) => {
                const newText =
                  text
                    .replace(/[^\d^\.?]+/g, "")
                    .replace(/^0+(\d)/, "$1")
                    .replace(/^\./, "0.")
                    .match(/^\d*(\.?\d{0,18})/g)[0] || "";
                setSellPrice(newText);
              }}
              value={sellPrice}
            />
            {detailsObj.network && (
              <Text>
                {chainNameMap[detailsObj.network.toLowerCase()].nativeToken}
              </Text>
            )}
          </View>

          {/* 购买数量 */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            {Number(sellNumber) != 1 ? (
              <TouchableWithoutFeedback
                onPress={() => {
                  setSellNumber(String(Number(sellNumber) - 1));
                }}
              >
                <Image
                  style={styles.addImg}
                  source={require("../../assets/img/index/-.png")}
                ></Image>
              </TouchableWithoutFeedback>
            ) : (
              <Image
                style={styles.addImg}
                source={require("../../assets/img/index/no-.png")}
              ></Image>
            )}

            <TextInput
              caretHidden={true}
              secureTextEntry={true}
              onKeyPress={() => {}}
              keyboardType="phone-pad"
              style={styles.buyInput}
              onChangeText={(e) => {
                if (Number(e) > nftNumber) {
                  Toast(t("剩余数量不足！"));
                  setSellNumber(nftNumber);
                } else {
                  const newText = e.replace(/^(0+)|[^\d]+/g, "");
                  setSellNumber(newText);
                }
              }}
              value={sellNumber}
            />
            <TouchableWithoutFeedback
              onPress={() => {
                setSellNumber(String(Number(sellNumber) + 1));
              }}
            >
              <Image
                style={styles.addImg}
                source={require("../../assets/img/index/+.png")}
              ></Image>
            </TouchableWithoutFeedback>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 30,
              justifyContent: "space-between",
            }}
          >
            <Text
              style={[styles.BuyBtnC, {}]}
              onPress={() => {
                setSellOptionVisible(false);
              }}
            >
              {t("取消")}
            </Text>
            <Text style={[styles.BuyBtnQ, {}]} onPress={() => sellNFT()}>
              {t("确定")}
            </Text>
          </View>
        </Card>
      </Modal>

      <Overlay
        isVisible={showOwnerList}
        onBackdropPress={() => {
          setShowOwnerlist(!showOwnerList);
        }}
      >
        <View>
          {ownersArrCopy.map((item, index) => (
            <View
              key={index}
              style={[
                styles.flex,
                { marginTop: 10, justifyContent: "space-around" },
              ]}
            >
              <Image
                source={{ uri: item.avatar }}
                style={[styles.createAndByuerImage]}
              ></Image>
              <Text style={[styles.createAndByuerName]}>
                {item.wallet_address}
              </Text>
            </View>
          ))}
        </View>
      </Overlay>
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

export default GoodsDetail;

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
  buyInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#ffffff",
    borderColor: "#C2C2C2",
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    lineHeight: 40,
    textAlign: "center",
  },
  BuyBtnQ: {
    width: 120,
    height: 40,
    backgroundColor: "#897EF8",
    borderRadius: 50,
    lineHeight: 40,
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  BuyBtnC: {
    width: 120,
    height: 40,
    backgroundColor: "#F5F5F5",
    borderRadius: 50,
    lineHeight: 40,
    textAlign: "center",
    color: "#333",
    fontSize: 16,
    fontWeight: "700",
  },
  BuyNowImg: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginBottom: 15,
  },
  addImg: {
    width: 30,
    height: 30,
  },
  nameBox: {
    backgroundColor: "#F0EFFE",
    borderRadius: 10,
    paddingTop: 15,
    paddingBottom: 15,
    width: "100%",
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
  buyBtn: {
    // position: 'absolute', bottom: 0,
    // right: 20,
    // height: 40,
    backgroundColor: "#897EF8",
    paddingLeft: 20,
    paddingRight: 20,
    lineHeight: 40,
    color: "#fff",
    borderRadius: 10,
  },
  // offer 列表结束
  offercolse: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    color: "#fff",
    fontSize: 10,
    marginLeft: 22,
    backgroundColor: "#897EF8",
    borderRadius: 5,
  },
  moreTop: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
  },
  moreBottom: {
    fontSize: 12,
    color: "#333",
    marginTop: 9,
    textAlign: "center",
  },
  offerBox: {
    // borderBottomColor: '#eee',
    // borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  // offer列表 开始

  faxingNum: {
    width: 175 / 2,
    borderWidth: 1,
    borderColor: "#897EF8",
    borderRadius: 5,
  },
  faxingNumLeft: {
    height: 20,
    lineHeight: 20,
    width: "50%",
    color: "#897EF8",
    backgroundColor: "rgb(211,221,255)",
    textAlign: "center",
    fontSize: 10,
  },
  faxingNumRight: {
    height: 20,
    lineHeight: 20,
    width: "50%",
    color: "#333333",
    textAlign: "center",
    fontSize: 10,
  },
  collectionImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  chainLeft: {
    color: "#333",
    fontSize: 12,
  },
  chainRight: {
    color: "#666",
    fontSize: 12,
  },
  bottomcoinType: {
    color: "#333333",
    fontSize: 10,
  },
  bottomPrice: {
    color: "#333",
    fontWeight: "700",
    fontSize: 16,
  },
  bottomBtn: {
    // width:'70%',
    flex: 1,
    marginLeft: 20,
    textAlign: "center",
    height: 50,
    lineHeight: 50,
    borderRadius: 25,
    backgroundColor: "#897EF8",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  bottombtnBox: {
    paddingBottom: 28,
    paddingHorizontal: 20,
  },
  linechainBoxOrtherName: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 16,
  },
  linechainBoxOrther: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingBottom: 0,
  },

  FromOrByuer: {
    fontSize: 10,
    lineHeight: 18,
    color: "#897EF8",
    backgroundColor: "rgb(211,221,255)",
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  createAndByuerName: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
    marginLeft: 15,
    marginRight: 10,
  },
  createAndByuerImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  createAndByuer: {
    paddingHorizontal: 20,
    width: "100%",
    // borderTopColor: "#ccc",
    // borderTopWidth: 1,
    // borderBottomColor: "#ccc",
    // borderBottomWidth: 1,
    marginTop: 10,
    justifyContent: "space-around",
    paddingTop: 10,
    paddingBottom: 10,
  },
  collIntrDetail: {
    color: "#999",
    lineHeight: 24,
    fontSize: 12,
    marginTop: 20,
  },
  collName: {
    color: "#333",
    fontWeight: "800",
    fontSize: 16,
  },
  coll: {
    marginTop: 20,
  },
  likenum: {
    color: "#ccc",
    marginLeft: 3,
    fontSize: 10,
  },
  likeBoxName: {
    color: "#666",
    fontSize: 12,
    fontWeight: "bold",
  },
  likeBox: {
    marginTop: 23,
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
  topImg: {
    width: "100%",
    height: 670 / 2,
    borderRadius: 20,
  },
  container: {
    padding: 20,
  },
});
