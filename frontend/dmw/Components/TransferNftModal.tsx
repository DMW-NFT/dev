import {
  Card,
  Modal,
  Datepicker,
  Drawer,
  DrawerGroup,
  DrawerItem,
  Input,
} from "@ui-kitten/components";
import {
  Text,
  Image,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  InteractionManager,
  TouchableWithoutFeedback,
  FlatList,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import TxProccessingModal from "./TxProccessingModal";
import VerfiySecretModal from "./VerfiySecretModal";
import { Wallet } from "ethers";
import { useDmwLogin } from "../../loginProvider/constans/DmwLoginProvider";
import { useDmwWallet } from "../../DmwWallet/DmwWalletProvider";
import { useDmwWeb3 } from "../../DmwWeb3/DmwWeb3Provider";
import { useDmwApi } from "../../DmwApiProvider/DmwApiProvider";
import Web3 from "web3";
export default function TransferNftModal(props) {
  const { t, i18n } = useTranslation();
  const nftData = props.nftToTransfer;
  const [receiptAddress, setReceiptAddress] = useState(null);
  const [txNftAmount, setTxNftAmount] = useState(0);
  const [vfModalVisible, setVfModalVisible] = useState(false);
  const [txModalVisible, setTxModalVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [balanceOfNft, setBalanceOfNft] = useState(0);
  const {
    getBalanceOf1155,
    currentWallet,
    connector,
    currentChainId,
    transfer1155NFT,
    transfer721NFT
  } = useDmwWeb3();
  const { WalletInUse } = useDmwLogin();
  const { dmwWalletList, getWalletListFromAccountStorage, dmwTransfer721NFT, dmwTransfer1155NFT } = useDmwWallet();
  const { Toast, post, get, formData, shortenAddress } = useDmwApi();

  const cleanTempData = () => {
    setPassword('')
    setReceiptAddress('')
    setTxNftAmount(0)
  }

  const getBalanceOfNft = () => {
    const walletAddress = WalletInUse == 1 ? dmwWalletList[0] : currentWallet;

    if (nftData.contract_type == "ERC1155") {
      getBalanceOf1155(
        nftData.contract_address,
        walletAddress,
        nftData.token_id
      ).then((res) => {
        console.log("blancew of nft: ", res);
        setBalanceOfNft(res);
      });
    } else {
      setBalanceOfNft(1);
    }
  };

  const confirmTransferNft = () => {
    if (!(txNftAmount > 0)) {
      Toast(t("请输入数量"));
      return;
    }
    if (!Web3.utils.isAddress(receiptAddress)) {
      Toast(t("请输入正确的区块链地址"));
      return;
    }
    const fromAddress = WalletInUse == 1 ? dmwWalletList[0] : currentWallet;

    if (WalletInUse == 1) {
      setVfModalVisible(true);
      console.log("open vf");
    } else {
      setTxModalVisible(true);

      if (nftData.contract_type == "ERC1155") {
        transfer1155NFT(nftData.contract_address, nftData.token_id, receiptAddress, txNftAmount)
      } else {
        transfer721NFT(nftData.contract_address, nftData.token_id, receiptAddress)
      }
      cleanTempData()

    }
  };


  useEffect(() => {
    nftData && getBalanceOfNft();
  }, [nftData]);

  useEffect(() => {
    if (txNftAmount > balanceOfNft) {
      setTxNftAmount(balanceOfNft);
      Toast(t("数量不足"));
    }
    txNftAmount < 0 && setTxNftAmount(0);
  }, [txNftAmount]);

  useEffect(() => {
    WalletInUse == 1 &&
      Array.from(password).length == 6 &&
      getWalletListFromAccountStorage(password).then((res) => {
        if (res) {
          console.log(res.walletDict[dmwWalletList[0]].privateKey);
          if (nftData.contract_type == "ERC1155") {
            dmwTransfer1155NFT(res.walletDict[dmwWalletList[0]].privateKey, nftData.contract_address, nftData.token_id, receiptAddress, txNftAmount)
          } else {
            dmwTransfer721NFT(res.walletDict[dmwWalletList[0]].privateKey, nftData.contract_address, nftData.token_id, receiptAddress)
          }
          cleanTempData()
          setVfModalVisible(false);
          setTxModalVisible(true);
          setPassword("");
        } else {
          Toast(t("密码错误"));
        }
      })
  }, [password]);

  const ModalTitle = () => {
    return (
      <Text style={{ alignSelf: "center", paddingBottom: 10 }}>
        {t("转移/赠与")}
      </Text>
    );
  };

  const NftCard = () => {
    return (
      <View>
        <Image
          source={{ uri: nftData.image_attachment_url }}
          style={[styles.BuyNowImg, { alignSelf: "center" }]}
        ></Image>
        <View style={styles.nameBox}>
          <Text
            style={{ fontSize: 12, textAlign: "center", fontWeight: "500" }}
          >
            {nftData.nft_name} #{nftData.token_id}
          </Text>
        </View>
      </View>
    );
  };

  const ConfirmAndCancel = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 0,
          paddingTop: 20,
        }}
      >
        <TouchableOpacity style={styles.BuyBtnC} onPress={() => { props.setModalVisible(false) }}>
          <Text style={{
            textAlign: "center", lineHeight: 40,
            color: "#333",
            fontSize: 16,
            fontWeight: "700",
          }}>{t("取消")}</Text>
        </TouchableOpacity>

        <TouchableOpacity           style={styles.BuyBtnQ} onPress={() => {
            confirmTransferNft();
          }}>
       <Text style={{
            textAlign: "center", lineHeight: 40,
            color: "white",
            fontSize: 16,
            fontWeight: "700",
          }}>
          {t("确定")}
        </Text>
        </TouchableOpacity>

      </View>
    );
  };

  return (
    <>
      <Modal
        visible={props.modalVisible}
        backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onBackdropPress={() => {
          props.setModalVisible(false);
        }}
      >
        <Card disabled={false} style={styles.CardBox}   onPress={()=>{Keyboard.dismiss()}}>
          <ModalTitle />
          <NftCard />
          <View>
            <Input
              style={{ borderRadius: 12, paddingTop: 10 }}
              placeholder={t("接收地址")}
              value={receiptAddress}
              onChangeText={(nextValue) => setReceiptAddress(nextValue)}
            />

            <View>
              <Text>
                {t("剩余数量")}:{balanceOfNft}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {Number(txNftAmount) != 1 ? (
                <TouchableWithoutFeedback
                  onPress={() => {
                    setTxNftAmount(Number(txNftAmount) - 1);
                  }}
                >
                  <Image
                    style={styles.addImg}
                    source={require("../../dmw/assets/img/index/-.png")}
                  ></Image>
                </TouchableWithoutFeedback>
              ) : (
                <Image
                  style={styles.addImg}
                  source={require("../../dmw/assets/img/index/no-.png")}
                ></Image>
              )}
              <Input

                onKeyPress={() => { }}
                keyboardType="number-pad"
                style={styles.buyInput}
                onChangeText={(e) => {
                  setTxNftAmount(e.replace(/^(0+)|[^\d]+/g, ""));
                }}
                value={String(txNftAmount)}
              />
              <TouchableWithoutFeedback
                onPress={() => {
                  setTxNftAmount(Number(txNftAmount) + 1);
                }}
              >
                <Image
                  style={styles.addImg}
                  source={require("../../dmw/assets/img/index/+.png")}
                ></Image>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <ConfirmAndCancel />
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
    </>
  );
}

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
    borderRadius: 20,

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
