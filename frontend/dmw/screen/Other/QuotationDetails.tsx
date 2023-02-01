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

import { useDmwApi } from "../../../DmwApiProvider/DmwApiProvider";
import { Spinner } from "@ui-kitten/components";
import {
  Button,
  Card,
  Layout,
  Modal,
  IndexPath,
  Select,
  SelectItem,
} from "@ui-kitten/components";
import { useDmwWeb3 } from "../../../DmwWeb3/DmwWeb3Provider";
import { useDmwWallet } from "../../../DmwWallet/DmwWalletProvider";
import { useDmwLogin } from "../../../loginProvider/constans/DmwLoginProvider";
import { useTranslation } from "react-i18next";
import { ListItem, Avatar, Icon, Overlay } from "@rneui/themed";
import VerfiySecretModal from "../../Components/VerfiySecretModal";
import TxProccessingModal from "../../Components/TxProccessingModal";
import chainNameMap from "../../../constans/chainNameMap.json";
// import supportErc20Token from "../../../constans/supportErc20Token.json";
import { State } from "react-native-gesture-handler";

const QuotationDetails = (props) => {
  const { t, i18n } = useTranslation();
  const [showoffer, setshowoffer] = useState(false);
  const [loading, setLoding] = useState(true); //loading

  const [imgurl, setImgurl] = useState(null);
  const [likes, setlikes] = useState(0);
  const [imgShow, setimgShow] = useState(true);
  const [userInfo, setUserInfo] = useState({
    userAvatar: "",
    shortenAddress: "",
  });
  const [orderList, setOrderList] = useState({ quantity: 1 });
  const [Price, setPrice] = useState(null);
  const [orderCurrency, setrderCurrency] = useState(null);
  const [UnitPrice, setUnitPrice] = useState({ UnitPrice: null, Company: "" });
  const [NftInfo, setNftInfo] = useState(null);
  const [collection, setcollection] = useState(null);
  const [offersList, setOffersList] = useState([]);
  const [password, setPassword] = useState("");
  const [buyNowVisible, setBuyNowVisible] = useState(false);
  const [offerNowVisible, setOfferNowVisible] = useState(false);
  const [BuyNumber, setBuyNumber] = useState("1");

  const [isOffer, setIsOffer] = useState(false);
  const [QuotationAmount, setQuotationAmount] = useState(""); //报价金额
  const [selectedTokenIndex, setSelectTokenIndex] = useState(new IndexPath(0));
  const [AvailableBalance, setAvailableBalance] = useState(0);
  const [allowanceAmount, setAllowanceAmount] = useState(0);
  const [isLister, setIsLister] = useState(false);
  const [offerState, setOfferState] = useState(0);
  const [vfModalVisible, setVfModalVisible] = useState(false);
  const [txModalVisible, setTxModalVisible] = useState(false);
  const [erc20TokenList, setErc20TokenList] = useState(null);
  const [needApprovalAmount, setNeedApprovalAmount] = useState(null);
  const [readyToApprove, setReadyToApprove] = useState(false);
  const [readyToTakeOffer, setReadyToTakeOffer] = useState(false);
  const [offerToTake, setOfferToTake] = useState(null);
  const clearAllowance = false;
  // Context 方法
  const { Toast, post, get, formData, shortenAddress } = useDmwApi();
  const {
    buyNFT,
    currentWallet,
    transactionMap,
    transactionList,
    connectWallet,
    getErc20Allowance,
    erc20Approve,
    makeOffer,
    createListing,
    nativeToken,
    connector,
    cancelDirectListing,
    getErc20Balance,
    acceptOffer,
    currentChainId,
    updateNetwork,
    supportErc20Token
  } = useDmwWeb3();
  const {
    dmwBuyNFT,
    dmwWalletList,
    getWalletListFromAccountStorage,
    currentDmwWallet,
    dmwCancelDirectListing,
    dmwErc20Approve,
    dmwMakeOffer,
    dmwAcceptOffer,
  } = useDmwWallet();
  const { WalletInUse } = useDmwLogin();

  //取消挂单
  const cancelListing = () => {
    if (WalletInUse == 1) {
      setVfModalVisible(true);
    } else {
      cancelDirectListing(orderList.listing_id);
      setTxModalVisible(true);
    }
  };

  const likeNft = () => {
    post(
      "/index/nft/enshrine_update",
      formData({ unique_id: orderList.nft.unique_id })
    ).then((res) => {
      if (res.code == 200) {
        Toast(t(res.message));
        let newOrderList = { ...orderList };
        newOrderList.nft.is_like = !orderList.nft.is_like;
        newOrderList.nft.is_like
          ? (newOrderList.nft.likes += 1)
          : (newOrderList.nft.likes -= 1);
        console.log("likes:", newOrderList.nft.likes);
        setOrderList(newOrderList);
      }
      console.log("like nft result:", res);
    });
  };

  //获取订单详情
  const getList = () => {
    setLoding(true);
    let data = { order_no: props.route.params.id };
    let formdata = formData(data);
    post("/index/order/get_order_details", formdata).then((res) => {
      // console.log(res, "订单详情");

      setOrderList(res.data);
      setUserInfo({
        userAvatar: res.data.wallet_address_avatar,
        shortenAddress: shortenAddress(res.data.wallet_address),
      });
      setlikes(res.data.nft.likes);
      setImgurl(res.data.nft.image_attachment_url);
      setNftInfo(res.data.nft);
      setPrice(res.data.reserve_price_per.number);
      setrderCurrency(res.data.reserve_price_per.currency_name);
      setUnitPrice({
        UnitPrice: res.data.reserve_price_per.number,
        Company: res.data.reserve_price_per.currency_name,
      });
      setcollection(res.data.nft.collection);
      setOffersList(res.data.offers);
      setErc20TokenList(supportErc20Token[res.data.nft.network.toLowerCase()]);
    });
  };
  // 确认购买
  const confirmPurchase = () => {
    setBuyNowVisible(false);
    // console.log(orderList.currency,erc20TokenList);
    if (WalletInUse == 1) {
      setVfModalVisible(true);
    } else {
      buyNFT(
        String(orderList.listing_id),
        Number(BuyNumber),
        orderList.currency,
        orderList.currency=="0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"?18:erc20TokenList[orderList.currency.toLowerCase()].decimals,
        String(UnitPrice.UnitPrice)
      );
      setTxModalVisible(true);
    }
  };

  // 批准额度
  const approveAllowance = () => {
    if (WalletInUse == 2) {
      const tokenAddress = Object.keys(erc20TokenList)[selectedTokenIndex.row];
      erc20Approve(
        tokenAddress,
        String(Number(allowanceAmount) + Number(needApprovalAmount))
      );
      setTxModalVisible(true);
    } else {
      setReadyToApprove(true);
      setVfModalVisible(true);
    }
  };

  // make offer
  const confrimMakerOffer = () => {
    if (WalletInUse == 2) {
      const tokenAddress = Object.keys(erc20TokenList)[selectedTokenIndex.row];
      const decimals =
        erc20TokenList[Object.keys(erc20TokenList)[selectedTokenIndex.row]]
          .decimals;
      makeOffer(
        orderList.listing_id,
        BuyNumber,
        tokenAddress,
        decimals,
        QuotationAmount,
        "3153600000"
      );
      setTxModalVisible(true);
    } else {
      setVfModalVisible(true);
    }
  };

  //take offer
  const confirmTakeOffer = (
    offeror: string,
    currency: string,
    pricePerToken: string
  ) => {
    setOfferToTake({
      listingId: orderList.listing_id,
      offeror: offeror,
      currency: currency,
      pricePerToken: pricePerToken,
    });
    setReadyToTakeOffer(true);
    if (WalletInUse == 2) {
      // setTxModalVisible(true);
      // console.log(orderList.listing_id, offeror, currency, pricePerToken)
      acceptOffer(orderList.listing_id, offeror, currency, pricePerToken);
      setTxModalVisible(true);
    } else {
      setVfModalVisible(true);
    }
  };

  // 打开直接购买弹窗
  const openBuyNowModal = () => {
    if (WalletInUse == 2) {
      if (
        connector.chainId != chainNameMap[NftInfo.network.toLowerCase()].chainId
      ) {
        Toast(
          t(
            "该NFT与外部钱包连接网络不一致，请切换外部钱包网络后再进行购买操作！"
          )
        );
        return null;
      }
    }
    if (WalletInUse == 1 && NftInfo.network) {
      if (
        currentChainId != chainNameMap[NftInfo.network.toLowerCase()].chainId
      ) {
        updateNetwork(chainNameMap[NftInfo.network.toLowerCase()].chainId);
        Toast(`Switch to network: ${NftInfo.network.toLowerCase()}`);
      }
    }
    setBuyNowVisible(true);
    setIsOffer(false);
    setBuyNumber("1");
  };
  // 打开报价弹窗
  const openOfferNowModal = () => {
    if (WalletInUse == 2) {
      if (
        connector.chainId != chainNameMap[NftInfo.network.toLowerCase()].chainId
      ) {
        Toast(
          t(
            "该NFT与外部钱包连接网络不一致，请切换外部钱包网络后再进行购买操作！"
          )
        );
        return null;
      }
    }

    setOfferNowVisible(true);
    setIsOffer(true);
    setBuyNumber("1");
  };
  //返回直接购买价格页面
  const buyNowPrice = () => {
    return (
      <>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text style={{ fontSize: 16, color: "#999999", fontWeight: "700" }}>
              {t("价格")}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#333333",
                fontWeight: "700",
                marginRight: 5,
              }}
            >{`${Price}  ${
              orderCurrency == "ETH"
                ? chainNameMap[NftInfo.network.toLowerCase()].nativeToken
                : orderCurrency
            } `}</Text>
            {/* <Text style={{ fontSize: 10, lineHeight: 22 }}>Wfca</Text> */}
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text style={{ fontSize: 16, color: "#999999", fontWeight: "700" }}>
              {t("总价")}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#333333",
                fontWeight: "700",
                marginRight: 5,
              }}
            >{`${Price * BuyNumber}  ${
              NftInfo && orderCurrency == "ETH"
                ? chainNameMap[NftInfo.network.toLowerCase()].nativeToken
                : orderCurrency
            } `}</Text>
            {/* <Text style={{ fontSize: 10, lineHeight: 22 }}>Wfca</Text> */}
          </View>
        </View>
      </>
    );
  };

  // 购买nft的组件
  const isBuyNFTNumber = () => {
    //购买数量
    return (
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        {Number(BuyNumber) != 1 ? (
          <TouchableWithoutFeedback
            onPress={() => {
              setBuyNumber(String(Number(BuyNumber) - 1));
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
          onKeyPress={() => {}}
          keyboardType="number-pad"
          style={styles.buyInput}
          onChangeText={(e) => {
            if (Number(e) > orderList.quantity) {
              Toast("剩余数量不足");
              setBuyNumber(String(orderList.quantity));
            } else {
              setBuyNumber(e);
            }
          }}
          value={BuyNumber}
        />
        <TouchableWithoutFeedback
          onPress={() => {
            setBuyNumber(String(Number(BuyNumber) + 1));
          }}
        >
          <Image
            style={styles.addImg}
            source={require("../../assets/img/index/+.png")}
          ></Image>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  // 报价弹窗的组件
  const offerPriceInput = () => {
    const tokenSlect = erc20TokenList && (
      <Select
        style={{ width: 125 }}
        placeholder={erc20TokenList[Object.keys(erc20TokenList)[0]].symbol}
        value={
          erc20TokenList[Object.keys(erc20TokenList)[selectedTokenIndex.row]]
            .symbol
        }
        selectedIndex={selectedTokenIndex}
        onSelect={(index) => {
          setSelectTokenIndex(index);
          console.log("selected", index);
          setAllowanceAmount(0);
          setAvailableBalance(0);
          setNeedApprovalAmount(null);
        }}
      >
        {Object.keys(erc20TokenList).map((key) => (
          <SelectItem title={erc20TokenList[key].symbol} />
        ))}
      </Select>
    );
    //购买数量
    return (
      <View style={{ flexDirection: "column", marginBottom: 20 }}>
        <Text>{t("价格/NFT")}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            // marginBottom: 20,
          }}
        >
          <TextInput
            onKeyPress={() => {}}
            keyboardType="decimal-pad"
            style={[styles.buyInput, { marginRight: 10, marginLeft: 0 }]}
            value={String(QuotationAmount)}
            onChangeText={(input) => {
              const newValue =
                input
                  .replace(/[^\d^\.?]+/g, "")
                  .replace(/^0+(\d)/, "$1")
                  .replace(/^\./, "0.")
                  .match(/^\d*(\.?\d{0,18})/g)[0] || "";
              setQuotationAmount(newValue);
            }}
          />
          {tokenSlect}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "column" }}>
            <Text>{t("余额")}:</Text>
            <Text>
              {erc20TokenList &&
                AvailableBalance /
                  10 **
                    erc20TokenList[
                      Object.keys(erc20TokenList)[selectedTokenIndex.row]
                    ].decimals}{" "}
            </Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text>{t("已批准额度")}:</Text>
            <Text>
              {erc20TokenList &&
                allowanceAmount /
                  10 **
                    erc20TokenList[
                      Object.keys(erc20TokenList)[selectedTokenIndex.row]
                    ].decimals}{" "}
            </Text>
          </View>
        </View>
        <View>
          {needApprovalAmount > 0 && (
            <Text>
              {t("仍需批准额度")}:
              {needApprovalAmount /
                10 **
                  erc20TokenList[
                    Object.keys(erc20TokenList)[selectedTokenIndex.row]
                  ].decimals}{" "}
            </Text>
          )}
        </View>
      </View>
    );
  };

  // 弹窗界面的确定和取消，搞不懂为啥要单独拆出来
  const OKCancel = () => {
    //弹窗确定取消按钮

    return (
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
            setBuyNowVisible(false);
          }}
        >
          {t("取消")}
        </Text>

        <Text style={[styles.BuyBtnQ, {}]} onPress={() => confirmPurchase()}>
          {t("确定")}
        </Text>
      </View>
    );
  };

  //弹窗头部
  const modalTitle = () => {
    return (
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
          {isOffer ? t("报价") : t("购买")}
        </Text>
        {!isOffer && (
          <>
            <Image source={{ uri: imgurl }} style={styles.BuyNowImg}></Image>
            <View style={styles.nameBox}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "700",
                  textAlign: "center",
                  marginBottom: 5,
                }}
              >
                {collection ? collection.name : "--"}
              </Text>
              <Text
                style={{ fontSize: 12, textAlign: "center", fontWeight: "500" }}
              >
                {NftInfo ? NftInfo.name : "--"}
              </Text>
            </View>
          </>
        )}
      </View>
    );
  };

  //购买或报价的nft数量检查
  useEffect(() => {
    let newBuyNumber = null;
    if (Number(BuyNumber) > orderList.quantity && orderList) {
      Toast(t("剩余数量不足"));
      newBuyNumber = String(orderList.quantity);
    } else if (Number(BuyNumber) < 0) {
      newBuyNumber = String(1);
    } else if (BuyNumber == "NaN") {
      newBuyNumber = String(1);
    }
    setBuyNumber(newBuyNumber ? newBuyNumber : String(Number(BuyNumber)));
  }, [BuyNumber]);

  //获取订单详情
  useEffect(() => {
    getList();
  }, []);

  //检查offer的代币是否approve足够数额
  useEffect(() => {
    isOffer &&
      selectedTokenIndex &&
      getErc20Balance(
        Object.keys(erc20TokenList)[selectedTokenIndex.row],
        WalletInUse == 1 ? dmwWalletList[0] : currentWallet,
        chainNameMap[NftInfo.network.toLowerCase()].chainId
      ).then((res) => {
        setAvailableBalance(res);
        console.log("erc20 token available:", res);
      });
    isOffer &&
      selectedTokenIndex &&
      getErc20Allowance(
        Object.keys(erc20TokenList)[selectedTokenIndex.row],
        WalletInUse == 1 ? dmwWalletList[0] : currentWallet,
        chainNameMap[NftInfo.network.toLowerCase()].chainId
      ).then((res) => {
        setAllowanceAmount(res);
        console.log("erc20 token allowance:", res);
      });
  }, [isOffer, QuotationAmount, BuyNumber, selectedTokenIndex, WalletInUse]);

  //计算待批准额度
  useEffect(() => {
    isOffer &&
      QuotationAmount &&
      BuyNumber &&
      AvailableBalance &&
      setNeedApprovalAmount(
        Number(BuyNumber) *
          Number(QuotationAmount) *
          10 **
            erc20TokenList[Object.keys(erc20TokenList)[selectedTokenIndex.row]]
              .decimals -
          allowanceAmount
      );
  }, [
    QuotationAmount,
    BuyNumber,
    AvailableBalance,
    QuotationAmount,
    allowanceAmount,
  ]);

  //根据余额和批准额度修改offer操作状态
  useEffect(() => {
    console.log("need approve allowance: ", needApprovalAmount);
    if (needApprovalAmount != null) {
      if (
        needApprovalAmount <= 0 &&
        AvailableBalance >=
          Number(BuyNumber) *
            Number(QuotationAmount) *
            10 **
              erc20TokenList[
                Object.keys(erc20TokenList)[selectedTokenIndex.row]
              ].decimals
      ) {
        setOfferState(2);
      }

      if (
        needApprovalAmount > 0 &&
        AvailableBalance >
          Number(BuyNumber) *
            Number(QuotationAmount) *
            10 **
              erc20TokenList[
                Object.keys(erc20TokenList)[selectedTokenIndex.row]
              ].decimals
      ) {
        setOfferState(1);
      }
    } else {
      setOfferState(0);
    }
  }, [needApprovalAmount, allowanceAmount]);

  //页面加载动画控制
  useEffect(() => {
    orderList &&
      setTimeout(() => {
        setLoding(false);
      }, 500);
  }, [orderList]);

  //判断当前用户是否为订单卖家
  useEffect(() => {
    if (orderList) {
      if (
        orderList.wallet_address ==
        (WalletInUse == 1 ? dmwWalletList[0] : currentWallet)
      ) {
        setIsLister(true);
      }
    }
  }, [orderList, WalletInUse]);

  //输入密码后的逻辑，撤销订单，购买，报价
  useEffect(() => {
    WalletInUse == 1 &&
      Array.from(password).length == 6 &&
      getWalletListFromAccountStorage(password).then((res) => {
        if (res) {
          console.log(res.walletDict[currentDmwWallet].privateKey);

          setVfModalVisible(false);
          setTxModalVisible(true);
          setPassword("");
          if (!isLister) {
            if (readyToApprove) {
              const tokenAddress = Object.keys(erc20TokenList)[
                selectedTokenIndex.row
              ];

              setReadyToApprove(false);
              console.log(
                "approving -allowanced:",
                allowanceAmount,
                " needapprove:",
                needApprovalAmount
              );
              dmwErc20Approve(
                res.walletDict[currentDmwWallet].privateKey,
                tokenAddress,
                !clearAllowance
                  ? String(Number(allowanceAmount) + Number(needApprovalAmount))
                  : 0
              ).then(
                (res) =>
                  res &&
                  getErc20Allowance(
                    Object.keys(erc20TokenList)[selectedTokenIndex.row],
                    WalletInUse == 1 ? dmwWalletList[0] : currentWallet,
                    chainNameMap[NftInfo.network.toLowerCase()].chainId
                  ).then((allowance) => {
                    setAllowanceAmount(allowance);
                    console.log("erc20 token allowance:", res);
                  })
              );
            } else {
              if (offerState == 2) {
                const tokenAddress = Object.keys(erc20TokenList)[
                  selectedTokenIndex.row
                ];
                const decimals =
                  erc20TokenList[
                    Object.keys(erc20TokenList)[selectedTokenIndex.row]
                  ].decimals;

                dmwMakeOffer(
                  res.walletDict[currentDmwWallet].privateKey,
                  orderList.listing_id,
                  BuyNumber,
                  tokenAddress,
                  decimals,
                  QuotationAmount,
                  "3153600000"
                );
                setOfferState(0);
              } else {
                dmwBuyNFT(
                  res.walletDict[currentDmwWallet].privateKey,
                  String(orderList.listing_id),
                  Number(BuyNumber),
                  orderList.currency,
                  orderList.currency=="0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"?18:erc20TokenList[orderList.currency.toLowerCase()].decimals,
                  String(UnitPrice.UnitPrice)
                );
              }
            }
          } else {
            if (readyToTakeOffer) {
              console.log("take Offer: ", offerToTake);
              dmwAcceptOffer(
                res.walletDict[currentDmwWallet].privateKey,
                offerToTake.listingId,
                offerToTake.offeror,
                offerToTake.currency,
                offerToTake.pricePerToken
              );
              setReadyToTakeOffer(false);
              setOfferToTake(null);
            } else {
              dmwCancelDirectListing(
                res.walletDict[currentDmwWallet].privateKey,
                orderList.listing_id
              );
            }
          }
        } else {
          Toast(t("密码错误"));
        }
      });
  }, [password]);

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
                source={require("../../assets/img/index/any3.jpg")}
                style={[styles.topImg]}
              ></Image>
            )}

            {/* 喜欢 */}
            <TouchableWithoutFeedback
              onPress={() => {
                likeNft();
              }}
            >
              <View style={[styles.likeBox, styles.flexJBC]}>
                <Text style={[styles.likeBoxName]}>
                  {collection ? collection.name : "--"}
                </Text>
                <View style={[styles.flex]}>
                  {orderList.nft && orderList.nft.is_like ? (
                    <FontAwesomeIcon icon={faHeart} color="red" size={30} />
                  ) : (
                    <FontAwesomeIcon icon={faHeart} color="gray" size={30} />
                  )}
                  <Text style={[styles.likenum]}>
                    {orderList.nft && orderList.nft.likes}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>

            {/* 卖家详情 */}
            <View style={[styles.coll]}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={[styles.collName]}>
                  {NftInfo ? NftInfo.name : "--"}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    style={{ width: 15, height: 15 }}
                    source={require("../../assets/img/money/offer.png")}
                  ></Image>
                  <Text style={{ fontSize: 14, color: "#333" }}>
                    {Price}{" "}
                    {orderCurrency == "ETH"
                      ? chainNameMap[NftInfo.network.toLowerCase()].nativeToken
                      : orderCurrency}
                  </Text>
                </View>
              </View>
              <View style={styles.flexJBC}>
                <Text style={styles.collIntrDetail}>
                  {NftInfo ? NftInfo.abstract : "--"}
                </Text>
              </View>
            </View>
          </View>

          {/* 发行数量 */}
          <View style={[styles.flex, { paddingHorizontal: 20 }]}>
            {/* <View style={[styles.faxingNum, styles.flex, { marginRight: 35 / 2 }]}>
                                        <Text style={[styles.faxingNumLeft]}>发行数量</Text>
                                        <Text style={[styles.faxingNumRight]}>{detailsObj['total_num'] ? detailsObj['total_num'] : '--'}</Text>
                                    </View> */}
            <View style={[styles.faxingNum, styles.flex]}>
              <Text style={[styles.faxingNumLeft]}>{t("剩余数量")}</Text>
              <Text style={[styles.faxingNumRight]}>
                {orderList ? orderList.quantity : "--"}
              </Text>
            </View>
          </View>

          {/* 创建者 拥有者 */}
          <View style={[styles.createAndByuer]}>
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
          </View>

          {/* 报价详情 */}

          <ListItem.Accordion
            content={
              <ListItem.Content>
                <ListItem.Title>{t("报价详情")}</ListItem.Title>
              </ListItem.Content>
            }
            isExpanded={showoffer}
            onPress={() => {
              setshowoffer(!showoffer);
            }}
          >
            <View style={[styles.linechainBoxOrther]}>
              {offersList.map((item, index) => (
                <View>
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
                          {item.address.slice(2, 7)}
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
                            {item.total_offer_amount.number +
                              item.total_offer_amount.currency_name}
                          </Text>
                          {/* <Text style={[styles.offercolse]}>取消报价</Text> */}
                          {isLister && (
                            <Text
                              style={[styles.offercolse]}
                              onPress={() => {
                                confirmTakeOffer(
                                  item.offeror,
                                  item.currency,
                                  item.price_per_token
                                );
                              }}
                            >
                              {t("接受报价")}
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.offerBox,
                      styles.flexJBC,
                      { borderBottomColor: "#fff" },
                    ]}
                  >
                    <View>
                      <Text style={[styles.moreTop]}>Floor Diff</Text>
                      <Text style={[styles.moreBottom, { color: "#897EF8" }]}>
                        {item.floor_diff}% below
                      </Text>
                    </View>
                    <View>
                      <Text style={[styles.moreTop]}>Quantity</Text>
                      <Text style={[styles.moreBottom]}>
                        {item.quantity_wanted}
                      </Text>
                    </View>
                    <View>
                      <Text style={[styles.moreTop]}>From</Text>
                      <Text style={[styles.moreBottom]}>
                        {item.offeror.slice(2, 7)}
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

          {/* 底部按钮 */}
          <View style={[styles.bottombtnBox]}>
            <View style={[styles.flex, { alignItems: "flex-end" }]}>
              <Text style={[styles.bottomPrice]}>
                {" "}
                {Price}{" "}
                {orderCurrency == "ETH"
                  ? chainNameMap[NftInfo.network.toLowerCase()].nativeToken
                  : orderCurrency}
              </Text>
              {/* <Text style={[styles.bottomcoinType]}> Wfca</Text> */}
            </View>
            {!isLister ? (
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "pink",
                  borderRadius: 25,
                  flex: 1,
                  marginLeft: 25,
                  height: 50,
                  alignItems: "center",
                }}
              >
                <Text
                  onPress={() => openBuyNowModal()}
                  style={[
                    styles.bottomBtn,
                    {
                      flex: 1,
                      borderTopLeftRadius: 25,
                      borderBottomLeftRadius: 25,
                    },
                  ]}
                >
                  Buy now
                </Text>
                <Text
                  onPress={() => openOfferNowModal()}
                  style={[
                    styles.bottomBtn,
                    {
                      flex: 1,
                      backgroundColor: "#fff",
                      color: "#333",
                      borderColor: "#897EF8",
                      borderWidth: 1,
                      borderTopRightRadius: 25,
                      borderBottomRightRadius: 25,
                    },
                  ]}
                >
                  Offer
                </Text>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "pink",
                  borderRadius: 25,
                  flex: 1,
                  marginLeft: 25,
                  height: 50,
                  alignItems: "center",
                }}
              >
                <Text
                  onPress={() => cancelListing()}
                  style={[
                    styles.bottomBtn,
                    {
                      flex: 1,
                      borderRadius: 25,
                    },
                  ]}
                >
                  Cancel Listing
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}

      {/* buy now 弹窗 */}
      <Modal
        visible={buyNowVisible}
        backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onBackdropPress={() => {
          setBuyNowVisible(false);
        }}
      >
        <Card disabled={true} style={styles.CardBox}>
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
                setBuyNowVisible(false);
              }}
            >
              <Image
                style={styles.colose}
                source={require("../../assets/img/money/6a1315ae8e67c7c50114cbb39e1cf17.png")}
              ></Image>
            </TouchableWithoutFeedback>
          </View>
          {modalTitle()}

          {/* 购买数量 */}
          {isBuyNFTNumber()}
          {buyNowPrice()}
          {/* {
                        false ?
                            LocalPurchase() : null
                    } */}
          {OKCancel()}
        </Card>
      </Modal>

      {/* offer 弹窗 */}
      <Modal
        visible={offerNowVisible}
        backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onBackdropPress={() => {
          setOfferNowVisible(false);
          setIsOffer(false);
          setAllowanceAmount(0);
          setAvailableBalance(0);
          setNeedApprovalAmount(null);
        }}
      >
        <Card disabled={true} style={styles.CardBox}>
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
                setOfferNowVisible(false);
                setAllowanceAmount(0);
                setAvailableBalance(0);
                setNeedApprovalAmount(null);
              }}
            >
              <Image
                style={styles.colose}
                source={require("../../assets/img/money/6a1315ae8e67c7c50114cbb39e1cf17.png")}
              ></Image>
            </TouchableWithoutFeedback>
          </View>
          {modalTitle()}

          {/* 购买数量 */}
          {isBuyNFTNumber()}
          {offerPriceInput()}
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
                setOfferNowVisible(false);
              }}
            >
              {t("取消")}
            </Text>
            {offerState == 2 && (
              <Text
                style={[styles.BuyBtnQ, {}]}
                onPress={() => confrimMakerOffer()}
              >
                {t("确定")}
              </Text>
            )}
            {offerState == 0 && (
              <Text
                style={[styles.BuyBtnQ, { backgroundColor: "gray" }]}
                onPress={() => {
                  Toast(t("已批准额度不足"));
                }}
              >
                {t("确定")}
              </Text>
            )}
            {offerState == 1 && (
              <Text
                onPress={() => {
                  approveAllowance();
                }}
                style={[styles.BuyBtnQ]}
              >
                {t("批准额度")}
              </Text>
            )}
          </View>
        </Card>
      </Modal>

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

export default QuotationDetails;

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    paddingLeft: 15,
    paddingRight: 15,
  },
  lis: {
    marginBottom: 52 / 2,
  },
  addImg: {
    width: 30,
    height: 30,
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
  nameBox: {
    backgroundColor: "#F0EFFE",
    borderRadius: 10,
    paddingTop: 15,
    paddingBottom: 15,
    width: "100%",
  },
  BuyNowImg: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginBottom: 15,
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
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    paddingVertical: 20,
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
    paddingHorizontal: 12,
  },
  bottomBtn: {
    // width:'70%',
    // flex: 1,
    // marginLeft: 20,
    textAlign: "center",
    height: 50,
    lineHeight: 50,
    // borderRadius: 25,
    backgroundColor: "#897EF8",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  bottombtnBox: {
    paddingBottom: 28,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 20,
  },
  linechainBoxOrtherName: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 16,
  },
  linechainBoxOrther: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    padding: 20,
    paddingBottom: 0,
    marginBottom: 40,
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
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginTop: 20,
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
    padding: 20,
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
