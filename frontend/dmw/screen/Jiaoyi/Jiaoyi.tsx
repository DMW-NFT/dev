import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import List from "../../Components/List";
import { useDmwApi } from "../../../DmwApiProvider/DmwApiProvider";
import { Spinner } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import { useDmwWeb3 } from "../../../DmwWeb3/DmwWeb3Provider";
import { useDmwWallet } from "../../../DmwWallet/DmwWalletProvider";
import { useDmwLogin } from "../../../loginProvider/constans/DmwLoginProvider";

const Jiaoyi = (props) => {
  const { t, i18n } = useTranslation();

  const [type, setType] = useState(2); //2是寄售 3是拍卖
  const [ConList, setConList] = useState([]); //寄售列表
  const [ConListTotal, setConListTotal] = useState(0); //寄售总数量
  const [auctionList, setAuctionList] = useState([]); //拍卖列表
  const [auctionTotal, setauctionTotal] = useState(0); //拍卖总数量
  const [refreshing, setrefreshing] = useState(false);
  const { post, get, formData, Toast } = useDmwApi();
  const [page, setpage] = useState(1);
  const { currentWallet } = useDmwWeb3();
  const { dmwWalletList } = useDmwWallet();
  const { WalletInUse } = useDmwLogin();

  useEffect(() => {

    setConList([]);
    setAuctionList([]);
    getNftList(1);
  }, [type]);

  const reload = () => {
    setConList(null);
    setAuctionList(null)
    getNftList(2);
  };

  const getList = () => {
    if (type == 2) {
      let a = Math.trunc(ConList.length / 6);
      console.log(ConList.length, ConListTotal);
      if (ConList.length == ConListTotal) {
      } else {
        getNftList(a + 1);
      }
    } else {
      let b = Math.trunc(auctionList.length / 6);
      console.log(auctionList.length, auctionTotal);
      if (auctionList.length == auctionTotal) {
      } else {
        getNftList(b + 1);
      }
    }
    console.log("触底", type);
  };
  const changetype = (val) => {
    setType(val);
  };

  useEffect(() => {
    getNftList(1);
    return () => { };
  }, []);

  const getNftList = (page = 1) => {
    let nftDataObj = formData({
      listing_type: type == 2 ? 0 : 1,
      page,
      limit: 6,
    });

    post("/index/order/get_listings", nftDataObj).then((res) => {
      if (res.code == 200) {
        // console.log(res.data, '寄售拍卖数据')
        if (type == 2) {
          if (page == 1) {
            setConList(res.data.data)
            setConListTotal(res.data.total);
          } else {
            setConList([...ConList, ...res.data.data]);
            setConListTotal(res.data.total);
          }

        } else {
          setAuctionList([...auctionList, ...res.data.data]);
          setauctionTotal(res.data.total);
        }
      }
    });
  };

  const navigatetoDetail = (id) => {
    // this.props.navigation.navigate('goodsDetail',{id:id})
  };

  const onRefresh = () => {
    getNftList(1)
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      {/* tab栏 -- start */}
      <View style={[styles.index_box, styles.daohang]}>
        <Text
          style={[
            type === 2 ? styles.daonghang_text_ative : styles.daonghang_text,
          ]}
          onPress={() => {
            changetype(2) 
          }}
        >
          {t("寄售")}
        </Text>
        {/* <Text style={[type === 3 ? styles.daonghang_text_ative : styles.daonghang_text]} onPress={() => changetype(3)}>{t("拍卖")}</Text> */}
      </View>
      {/* tab栏 -- end */}

      <View
        style={[
          styles.listbox,
          {
            padding: 20,
            paddingBottom: 0,
            backgroundColor: "#fff",
          },
        ]}
      >
        {(
          <FlatList
            refreshing={refreshing}
            style={{ height: 50, paddingBottom: 20 }}
            ListEmptyComponent={() => {
              return (
                <Text style={{ textAlign: "center", marginTop: "50%" }}>
                  {t("空空如也")}
                </Text>
              );
              // 列表为空展示改组件
            }}
            // 一屏幕展示几个
            //  2列显示
            numColumns={2}
            data={type == 2 ? ConList : auctionList}
            renderItem={({ item }) => {
              return type == 2 ? (
                <List
                  list={item}
                  type={2}
                  navigatetoDetail={(
                    id,
                    unique_id,
                    contract_address,
                    token_id,
                    network
                  ) => {
                    if (!(currentWallet || dmwWalletList[0])) {
                      Toast(t("请先登录钱包"));
                      return;
                    }


                    props.navigation.navigate("QuotationDetails", {
                      id: item.order_no,
                    });
                  }}
                />
              ) : (
                <List
                  list={item}
                  type={3}
                  navigatetoDetail={navigatetoDetail}
                />
              );
            }}
            // keyExtractor={(item, index) => item.id}
            ListFooterComponent={() => {
              // 声明尾部组件
              return (type == 2 && ConList.length == ConListTotal) ||
                (type == 3 && auctionList.length == auctionTotal) ? (
                <Text style={{ textAlign: "center", marginBottom: 20 }}>
                  {t("没有更多了")}
                </Text>
              ) : null;
            }}
            // 下刷新
            onEndReachedThreshold={0.1} //表示还有10% 的时候加载onRefresh 函数
            onEndReached={getList}
            onRefresh={onRefresh}

          ></FlatList>
        )}
      </View>
    </SafeAreaView>
  );
};
export default Jiaoyi;

const styles = StyleSheet.create({
  listbox: {
    flex: 1,
    // height: 300,
    backgroundColor: "#f5f5f5",
  },
  index_box: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  daohang: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",

    // backgroundColor: 'pink',
  },
  daonghang_text: {
    fontSize: 16,
    fontWeight: "700",
    
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
