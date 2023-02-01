import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Pressable,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import React, { Component, useEffect, useState, Context, useRef } from "react";
import Tabcolumn from "./Tabcolumn";
import Screen from "../../Components/screen";
import Search from "../../Components/Searchbox";
import Lmodal from "./leftModal";
import { useDmwLogin } from "../../../loginProvider/constans/DmwLoginProvider";
import { useDmwApi } from "../../../DmwApiProvider/DmwApiProvider";
import { useDmwWallet } from "../../../DmwWallet/DmwWalletProvider";
import { useDmwWeb3 } from "../../../DmwWeb3/DmwWeb3Provider";
import { Spinner } from "@ui-kitten/components";
import List from "../../Components/List";
import { useTranslation } from "react-i18next";
import ChainIdMap from "../../../constans/chainIdMap.json";
import TransferNftModal from "../../Components/TransferNftModal";
const data = [
  {
    typename: "Status",
    list: [
      { name: "Buy now", id: 1, active: false },
      { name: "On auction", id: 2, active: false },
      { name: "Has offers", id: 3, active: false },
      { name: "most viewed", id: 4, active: false },
    ],
  },
  {
    typename: "sort by",
    list: [
      { name: "recently created", id: 5, active: false },
      { name: "most viewed", id: 6, active: false },
      { name: "oldest", id: 7, active: false },
      { name: "Low to High", id: 8, active: false },
      { name: "High to Low", id: 9, active: false },
    ],
  },
];
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const scale = Dimensions.get("window").scale;
const Myself = (props) => {
  const { t, i18n } = useTranslation();
  const [typename, setTypename] = useState("我的藏品");
  const [visible, setVisible] = useState(false);
  const [strText, setStrText] = useState("");
  const [lMvisible, setlMvisible] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const { username, setUsername, WalletInUse, language } = useDmwLogin();
  const { avatarUrl, setAvatarUrl } = useDmwLogin();
  const [loading, setLoding] = useState(false);
  const [myNftList, setMyNftList] = useState([]);
  const [screenData, setScreenData] = useState([]);
  const [determinelist, setdetermine] = useState({});
  const [nftToTransfer, setNftToTransfer] = useState(null);
  const [txNftModalVisible, setTxNftModalVisible] = useState(false);

  const [showTransferNft, setShowTransferNft] = useState(false);
  const [isActivity, setIsActivity] = useState(false);
  // Context方法
  const { logOut } = useDmwLogin();
  const { post, formData, Toast, Copy } = useDmwApi();
  const { currentWallet, currentChainId } = useDmwWeb3();
  const { dmwWalletList } = useDmwWallet();

  // 我创建的和我喜欢的分页
  const [currentPage, setCurrentPage] = useState(1);
  // 我的nft的分页光标
  const [currentCursor, setCurrentCursor] = useState("");

  const scrollViewRef = useRef<ScrollView>(null);

  const typeRequestMap = {
    我的藏品: "/index/nft/get_my_nft",
    我创建的: "/index/nft/get_my_create_nft_by_search",
    我喜欢的: "/index/nft/get_my_likes_nft_by_search",
  };

  const visibleFn = () => {
    setVisible(true);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const close = () => {
    setlMvisible(false);
    setVisible(false);
  };
  const Fndetermine = (determine) => {
    console.log(determine);
    close();
    setdetermine(determine);
    setTypename(typename);
  };

  const getNftList = (typeName, data, isNextPage = false) => {
    const postUrl = typeRequestMap[typeName];
    console.log(postUrl, data, "请求参数");
    if (isNextPage && typeName == "我的藏品" && !currentCursor) {
      return null;
    }
    let nftList = !isNextPage ? [] : [...myNftList];
    let rdata = data;
    rdata.page = isNextPage ? currentPage : 1;
    rdata.limit = 5;
    rdata.cursor = isNextPage ? currentCursor : "";
    console.log(rdata, "rdata");

    let params = {};
    if (rdata) {
      params = formData(rdata);
    }

    post(postUrl, params)
      .then((res) => {
        if (res.code == 200) {
          let arr = res.data.result ? res.data.result : res.data.data;
          let strarr = [];
          arr.map((item, index) => {
            if (item.nft_name.indexOf(strText) > -1 && strText) {
              // console.log(item.nft_name.indexOf(strText));
              strarr.push(item);
            } else if (!strText) {
              strarr = res.data.result ? res.data.result : res.data.data;
            }
          });

          setMyNftList([...nftList, ...strarr]);
          setLoding(false);
          setCurrentCursor(res.data.cursor);
          res.data.page && setCurrentPage(res.data.page + 1);
          res.data.current_page && setCurrentPage(res.data.current_page + 1);
        } else {
          Toast(res.message);
          setLoding(false);
        }
      })
      .catch((err) => {
        console.log(err, "----");
      });
  };

  useEffect(() => {
    post("/index/user/get_user_msg").then((res) => {
      // console.log(res, "用户信息");
      if (res.code == 200) {
        setUserInfo(res.data);
        // console.log(userInfo, "用户信息打印");
        setUsername(res.data.nickname);
        setAvatarUrl(res.data.avatar_url);
      }
    });

    post("/index/common/get_filter", formData({ type: "nft" })).then((res) => {
      // console.log(res.data,'筛选');
      setScreenData(res.data);
    });
  }, [currentChainId, language]);

  useEffect(() => {
    setMyNftList([]);
    setCurrentCursor("");
    setCurrentPage(1);
    getNftList(
      typename,
      typename == "我的藏品"
        ? {
            network: ChainIdMap[currentChainId].network,
          }
        : { keyword: strText, ...determinelist }
    );
    typename == "我的藏品"
      ? setShowTransferNft(true)
      : setShowTransferNft(false);
  }, [typename, determinelist, strText, currentChainId, WalletInUse]);

  // const getMyNft = (posturl: string, data, nextPage = false) => {
  //   console.log(posturl, data, "请求参数");
  //   let nftList = !nextPage ? [] : [...myNftList];
  //   let rdata = data;
  //   rdata.page = currentPage;
  //   rdata.limit = 5;
  //   console.log(rdata, "rdata");

  //   let params = {};
  //   if (rdata) {
  //     params = formData(rdata);
  //   }

  //   post(posturl, params)
  //     .then((res) => {
  //       if (res.code == 200) {
  //         let arr = res.data.result ? res.data.result : res.data.data;
  //         let strarr = [];
  //         arr.map((item, index) => {
  //           if (item.nft_name.indexOf(strText) > -1 && strText) {
  //             // console.log(item.nft_name.indexOf(strText));
  //             strarr.push(item);
  //           } else if (!strText) {
  //             strarr = res.data.result ? res.data.result : res.data.data;
  //           }
  //         });
  //         // console.log(strarr);

  //         setMyNftList([...nftList, ...strarr]);
  //         // console.log(strarr)

  //         setLoding(false);
  //       } else {
  //         Toast(res.message);
  //         setLoding(false);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err, "----");
  //     });
  // };

  useEffect(() => {
    nftToTransfer && console.log("get nft to transfer");
  }, [nftToTransfer]);

  const MyNftList = (
    <FlatList
      refreshing={false}
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}
      style={{
        maxHeight: screenHeight * 0.75,
        minHeight: "100%",
        zIndex: 1,
        marginBottom: 0,
      }}
      ListEmptyComponent={() => {
        return (
          <Text style={{ textAlign: "center", marginTop: "50%" }}>
            {t("空空如也")}
          </Text>
        );
        // 列表为空展示改组件
      }}
      // 一屏幕展示几个
      number={4}
      //  2列显示
      numColumns={2}
      data={myNftList}
      renderItem={({ item, index }) => {
        return (
          <List
            key={index}
            list={item}
            type={4}
            setNftToTransfer={setNftToTransfer}
            setTxNftModalVisible={setTxNftModalVisible}
            showTransferNft={showTransferNft}
            navigatetoDetail={(
              id,
              unique_id,
              contract_address,
              token_id,
              network
            ) => {
              if (WalletInUse == 1 && !dmwWalletList[0]) {
                Toast(t("请先登录钱包"));
                return;
              } else if (WalletInUse == 2 && !currentWallet) {
                Toast(t("请先登录钱包"));
                return;
              }
              props.navigation.navigate("goodsDetail", {
                id: id,
                unique_id,
                contract_address,
                token_id,
                network,
              });
            }}
          />
        );
      }}
      keyExtractor={(item, index) => index}
      ListFooterComponent={() => {
        // 声明尾部组件
        return myNftList && myNftList.length ? (
          <Text style={{ textAlign: "center" }}>{t("没有更多了")}</Text>
        ) : null;
      }}
      // 下刷新
      onEndReached={() =>
        getNftList(
          typename,
          typename == "我的藏品"
            ? {
                network: ChainIdMap[currentChainId].network,
              }
            : { keyword: strText, ...determinelist },
          true
        )
      }
      onRefresh={() => {
        setCurrentCursor("");
        setCurrentPage(1);
        getNftList(
          typename,
          typename == "我的藏品"
            ? {
                network: ChainIdMap[currentChainId].network,
              }
            : { keyword: strText, ...determinelist },
          false
        );
      }}
      onEndReachedThreshold={0.1} //表示还有10% 的时候加载onRefresh 函数
    ></FlatList>
  );

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
        <View style={{ backgroundColor: "#fff" }}>
          <View style={styles.index_box}>
            {/* title -- start*/}
            <View
              style={{
                marginBottom: 28,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: 52,
                }}
              >
                <Pressable
                  onPress={() => {
                    setlMvisible(true);
                  }}
                >
                  <Image
                    style={styles.top_img}
                    source={require("../../assets/img/my/top_left_list.png")}
                  ></Image>
                </Pressable>
                <Pressable
                  onPress={() => {
                    props.navigation.navigate("SetUp");
                  }}
                >
                  <Image
                    style={styles.top_img}
                    source={require("../../assets/img/my/top_right_set.png")}
                  ></Image>
                </Pressable>
              </View>
            </View>
            {/* title -- end */}

            {/* 头像 -- start */}
            <View style={{ justifyContent: "center", flexDirection: "row" }}>
              <Image
                style={styles.headportrait}
                source={{ uri: avatarUrl }}
              ></Image>
            </View>
            <Text style={styles.nickname}>{username}</Text>
            <TouchableWithoutFeedback
              onPress={() => {
                Copy(WalletInUse == 1 ? dmwWalletList[0] : currentWallet);
              }}
            >
              <Text style={styles.identification}>
                {/* 此处勿忘加空格 */}
                {WalletInUse == 1 ? dmwWalletList[0] : currentWallet}{" "}
                <Image
                  style={{ width: 12, height: 12 }}
                  source={require("../../assets/img/my/copy.png")}
                ></Image>
              </Text>
            </TouchableWithoutFeedback>
            {/* 头像 -- end */}
          </View>

          {/* tab栏 -- start */}
          <View style={[styles.index_box, { paddingLeft: 40 }]}>
            <Tabcolumn
              typename={typename}
              paging={(typename) => {
                setTypename(typename);
              }}
            ></Tabcolumn>
          </View>
          {/* tab栏 -- end */}
          {/* line -- start*/}
          {/* <View style={styles.line}></View> */}
          {/* line -- end */}
          {typename != "我的藏品" && (
            <View style={styles.index_box}>
              <Search
                onChange={(strText) => {
                  setStrText(strText);
                }}
                visible={() => visibleFn()}
              ></Search>
            </View>
          )}
          {/* <Text onPress={() => this.visible()}>123</Text> */}

          <View
            style={{
              paddingRight: 20,
              paddingLeft: 20,
              paddingTop: 20,
              // marginBottom:100,
              zIndex: 1,
            }}
          >
            {/*  navigatetoDetail={(id, unique_id, contract_address, token_id, network)
                   =>
                  { props.navigation.navigate('goodsDetail', { id: id, unique_id, contract_address, token_id, network }) }} */}
            {MyNftList}
          </View>
        </View>
      </ScrollView>

      {visible ? (
        <Screen
          title="select filter"
          style={[styles.Screen]}
          visible={visible}
          close={() => close()}
          datalist={screenData}
          determineFn={(determine) => Fndetermine(determine)}
          Fndetermine={determinelist}
        ></Screen>
      ) : null}

      <Lmodal
        goto={(path) => {
          props.navigation.navigate(path);
        }}
        style={[styles.Screen]}
        close={() => close()}
        visible={lMvisible}
      ></Lmodal>
      <TransferNftModal
        nftToTransfer={nftToTransfer}
        modalVisible={txNftModalVisible}
        setModalVisible={setTxNftModalVisible}
      />
    </SafeAreaView>
  );
};

export default Myself;

const styles = StyleSheet.create({
  Screen: {
    width: screenWidth,
    position: "absolute",
    zIndex: 100,
  },
  index_box: {
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#fff",
  },
  title: {
    height: 52,
    fontSize: 26,
    lineHeight: 52,
    fontWeight: "700",
    fontFamily: "",
    display: "flex",
    justifyContent: "space-around",
    includeFontPadding: false,
    textAlignVertical: "center",
    color: "#666666",
  },
  top_img: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
  },
  line: {
    borderColor: "#CCCCCC",
    width: screenWidth,
    height: 1,
    borderWidth: 1 / scale,
    marginBottom: 20,
  },
  headportrait: {
    width: 160 / 2,
    height: 160 / 2,
    borderRadius: 80 / 2,
    marginBottom: 10,
  },
  nickname: {
    fontSize: 32 / 2,
    fontFamily: "Source Han Sans CN",
    fontWeight: "700",
    lineHeight: 24,
    color: "#333333",
    textAlign: "center",
    marginBottom: 10,
  },
  identification: {
    fontWeight: "700",
    lineHeight: 24,
    color: "#999999",
    fontSize: 12,
    fontFamily: "Source Han Sans CN",
    textAlign: "center",
  },
  TextInput_s: {
    borderColor: "red",
    backgroundColor: "#FFF",

    borderRadius: 20,
    width: 225,
    height: 50,
    justifyContent: "center",
    lineHeight: 50,
  },
});
