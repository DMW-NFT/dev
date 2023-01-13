import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
  TextInput,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Swiper from "react-native-swiper";
import List from "../../Components/List";
import { useDmwApi } from "../../../DmwApiProvider/DmwApiProvider";
import { Spinner } from "@ui-kitten/components";
import { Card, Modal } from "@ui-kitten/components";
import { useDmwWeb3 } from "../../../DmwWeb3/DmwWeb3Provider";
import { useTranslation } from "react-i18next";
import { useDmwLogin } from "../../../loginProvider/constans/DmwLoginProvider";

const screenWidth = Dimensions.get("window").width;
const scale = Dimensions.get("window").scale;
const Home = (props) => {
  const { t, i18n } = useTranslation();
  const inputRefX = useRef(null);
  const [Modalvisible, setModalvisible] = useState(false);
  const [typename, setTypename] = useState("nft");
  const [enableScrollViewScroll, setenableScrollViewScroll] = useState(false);
  const [list, setlist] = useState([{}, {}, {}, {}, {}, {}, {}, {}]);
  const [refreshing, setrefreshing] = useState(false);
  const { post, get, formData, Toast } = useDmwApi();
  const { language } = useDmwLogin();
  const [imgList, setImglist] = useState([]);
  const [NftList, setNftList] = useState([]);
  const [blindlist, setblindlist] = useState([]);
  const [loading, setLoding] = useState(false);
  const [page, setpage] = useState(1);
  const [bpage, setbpage] = useState(1);
  const [total, setTotal] = useState(null);
  const [lastbpage, setlastbpage] = useState(null);
  const [password, setpassword] = useState("");
  const [passwordlist, setpasswordlist] = useState([]);
  const [listType, setListTtpe] = useState([]);
  const {
    buyNFT,
    currentWallet,
    transactionMap,
    transactionList,
    connectWallet,
    connected,
  } = useDmwWeb3();
  const [nftIdList, setNftIdList] = useState([]);
  // 获取type类型
  const getCoType = () => {
    post("/index/common/get_categories").then((res) => {
      // console.log(res, '合集类型');
      setListTtpe(res.data);
    });
  };

  useEffect(() => {
    console.log("Home useEffe currentWallet,connected", currentWallet);
  }, [currentWallet, connected]);

  useEffect(() => {
    let blackPointArry = [null, null, null, null, null, null];
    let arr = password.split("");
    arr.map((item, index) => {
      blackPointArry[index] = item;
    });
    setpasswordlist(blackPointArry);
  }, [password]);

  useEffect(() => {
    console.log("切换语言+init");
    get("/index/banner/list")
      .then((res) => {
        setImglist(res.data);
      })
      .catch((err) => {
        console.log(err, "err");
      });
    geNftList(1, 1);
    geNftList(2, 1);
    getCoType();
  }, [language]);

  useEffect(() => {
    console.log(NftList.length, "NftList.length");

    setTimeout(() => {
      setrefreshing(false);
    }, 2000);
  }, [NftList, blindlist]);

  const geNftList = (type, page) => {
    let params = { type: type || 1, page: page || 1, limit: 4 };

    let nftDataObj = formData(params);
    post("/index/nft/get_home_nft_by_search", nftDataObj).then((res) => {
      // console.log(res.data);

      if (type == 1) {
        if (page == 1) {
          setNftList(res.data.data);
          res.data.data.map((item) => {
            nftIdList
              ? setNftIdList([])
              : setNftIdList([...nftIdList, item.unique_id]);
          });
        } else {
          let idTmep = [...nftIdList];
          let nftTmep = [...NftList];
          res.data.data.map((item) => {
            if (!idTmep.includes(item.unique_id)) {
              idTmep = [...idTmep, item.unique_id];
              nftTmep = [...nftTmep, item];
            }
          });
          setNftIdList(idTmep);
          setNftList(nftTmep);
          // setNftList(prevItems => [...new Set([...prevItems, res.data.data])]);
          // setNftList([...NftList, ...res.data.data])
        }
        setrefreshing(false);
      } else {
        if (page == 1) {
          setblindlist([...res.data.data]);
        } else {
          setblindlist([...blindlist, ...res.data.data]);
        }
        setrefreshing(false);
      }

      setTotal(res.data.total);
      // console.log(last_page, 'last_page');
    });
  };

  const paging = (typename) => {
    // setpage(1)
    setTypename(typename);
    // if (typename == 'nft' && !NftList.length) {
    //   setNftList([])
    //   geNftList(1, 1)
    // } else if (typename != 'nft' && !blindlist.length) {
    //   setblindlist([])
    //   geNftList(2, 1)
    // }
  };
  const getList = () => {
    console.log("触底");

    setrefreshing(true);
    let a = Math.trunc(NftList.length / 4);
    if (total == NftList.length) {
      setrefreshing(false);
    } else {
      console.log(a + 1, "page");
      geNftList(typename == "nft" ? 1 : 2, a + 1);
    }
  };
  // 下拉刷新
  const Refresh = () => {
    // setpage(1)
    setrefreshing(true);
    if (typename == "nft") {
      geNftList(1, 1);
    } else if (typename != "nft") {
      geNftList(2, 1);
    }
  };

  useEffect(() => {
    console.log("监听banner");
  }, [imgList]);

  const onEnableScroll = (value) => {
    setenableScrollViewScroll(value);
  };
  return (
    <ScrollView>
      <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
        {/* scrollEnabled={enableScrollViewScroll} */}
        <View style={{ flexDirection: "column" }}>
          <View>
            <View style={styles.index_box}>
              {/* title -- start*/}
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  marginBottom: 13,
                }}
              >
                <Text style={styles.title}>
                  <Text>DMW </Text>
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 52,
                  }}
                >
                  <TouchableWithoutFeedback
                    onPress={() => {
                      props.navigation.navigate("searchScreen", {
                        visible: false,
                      });
                    }}
                  >
                    <Image
                      style={styles.top_img}
                      source={require("../../assets/img/allIconAndlImage/3571.png")}
                    ></Image>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      props.navigation.navigate("MessageCenter");
                    }}
                  >
                    <Image
                      style={[styles.top_img, { marginLeft: 30 }]}
                      source={require("../../assets/img/allIconAndlImage/3572.png")}
                    ></Image>
                  </TouchableWithoutFeedback>
                </View>
              </View>
              {/* title -- end */}
            </View>
            {/* 水平滑动按钮 -- start */}
            <ScrollView
              style={styles.shuipin}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {listType.map((item, index) => (
                <Text
                  style={styles.slidebutton}
                  onPress={() => {
                    props.navigation.navigate("categrayScreen", {
                      categray: item.name,
                      id: item.id,
                    });
                  }}
                >
                  {item.name}
                </Text>
              ))}
            </ScrollView>

            {/* 水平滑动按钮 -- end */}
            {/* 轮播图 -- start*/}
            <View style={[styles.index_box, { marginBottom: 25 }]}>
              <View style={{ height: 140 }}>
                {imgList && imgList.length ? (
                  <Swiper
                    showsPagination={false}
                    autoplayTimeout={4}
                    autoplay={true}
                    horizontal={true}
                    loop={true}
                  >
                    {imgList.map((item, index) => {
                      return (
                        <>
                          <Image
                            style={styles.Swiperimg}
                            key={index}
                            onError={() => {
                              console.log("图片加载错误");
                              item.attachment_text =
                                "../../assets/img/index/default.png";
                            }}
                            source={
                              item.attachment_text ==
                              "../../assets/img/index/default.png"
                                ? require("../../assets/img/index/default.png")
                                : { uri: item.attachment_text }
                            }
                          />
                        </>
                      );
                    })}
                  </Swiper>
                ) : null}
              </View>
            </View>
            {/* 轮播图 -- end */}

            {/* line -- start*/}
            <View style={styles.line}></View>
            {/* line -- end */}
            {/* tab栏 -- start */}
            <View style={[styles.index_box, styles.daohang]}>
              <Text
                style={[
                  typename != "nft"
                    ? styles.daonghang_text
                    : styles.daonghang_text_ative,
                ]}
                onPress={() => paging("nft")}
              >
                NFT
              </Text>
              <Text
                style={[
                  typename != "Blind"
                    ? styles.daonghang_text
                    : styles.daonghang_text_ative,
                ]}
                onPress={() => paging("Blind")}
              >
                Blind box
              </Text>
            </View>
            {/* tab栏 -- end */}
            {/* line -- start*/}
            <View style={styles.line}></View>
            {/* line -- end */}
          </View>
        </View>
        <View style={[styles.listbox]}>
          {/* onTouchStart={() => {onEnableScroll(false);}}
                                    onMomentumScrollEnd={() => {onEnableScroll(true);}} */}

          {
            <FlatList
              refreshing={refreshing}
              style={{ flex: 1 }}
              ListEmptyComponent={() => {
                return (
                  <Text style={{ textAlign: "center", flex: 1 }}>
                    {t("空空如也")}
                  </Text>
                );
                // 列表为空展示改组件
              }}
              // 一屏幕展示几个
              number={4}
              //  2列显示
              numColumns={2}
              data={typename == "nft" ? NftList : blindlist}
              renderItem={({ item }) => {
                return (
                  <List
                    list={item}
                    type={1}
                    navigatetoDetail={(
                      id,
                      unique_id,
                      contract_address,
                      token_id,
                      network
                    ) => {
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
              keyExtractor={(item, index) => index.toString()}
              ListFooterComponent={() => {
                // 声明尾部组件
                return NftList.length ? (
                  <Text style={{ textAlign: "center", marginVertical: 20 }}>
                    {t("没有更多了")}
                  </Text>
                ) : null;
              }}
              // 下刷新
              onEndReachedThreshold={0.1} //表示还有10% 的时候加载onRefresh 函数
              onEndReached={getList}
              onRefresh={Refresh}
            ></FlatList>
          }
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  daohang: {
    flexDirection: "row",
  },
  listbox: {
    paddingHorizontal: 20,
    paddingBottom: 0,
    // marginVertical: 20,
    // marginHorizontal: 20,
    // paddingBottom: 100,
    flex: 1,
  },
  index_box: {
    paddingLeft: 20,
    paddingRight: 20,
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
  slidebutton: {
    fontFamily: "Source Han Sans CN",
    fontSize: 14,
    fontWeight: "700",
    borderColor: "#877EF0",
    borderWidth: 1,
    borderRadius: 50,
    marginLeft: 20,
    paddingLeft: 20,
    paddingRight: 20,
    lineHeight: 40,
    color: "#666666",
  },
  shuipin: {
    marginLeft: 0,
    height: 40,
    marginBottom: 20,
  },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  Swiperimg: {
    width: screenWidth - 40,
    height: 140,
    resizeMode: "stretch",
    borderRadius: 10,
  },
  line: {
    borderColor: "#CCCCCC",
    width: screenWidth,
    height: 1,
    borderWidth: 1 / scale,
  },
  daonghang_text: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Source Han Sans CN",
    height: 56,
    lineHeight: 56,
    flex: 1,
    color: "#666666",
    textAlign: "center",
    // borderBottomColor:'#897EF8',
    // borderBottomWidth:3
  },
  daonghang_text_ative: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Source Han Sans CN",
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
