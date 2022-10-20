import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Pressable,
  FlatList
} from "react-native";
import React, { Component, useEffect, useState, Context } from "react";
import Tabcolumn from "./Tabcolumn";
import Screen from "../../Components/screen";
import Search from "../../Components/Searchbox";
import Lmodal from "./leftModal";
import { useDmwLogin } from "../../../loginProvider/constans/DmwLoginProvider";
import { useDmwApi } from "../../../DmwApiProvider/DmwApiProvider";
import { useDmwWallet } from "../../../DmwWallet/DmwWalletProvider";
import { useDmwWeb3 } from "../../../DmwWeb3/DmwWeb3Provider";
import { Spinner } from '@ui-kitten/components';
import List from "../../Components/List";

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
const scale = Dimensions.get("window").scale;
const Myself = (props) => {
  const [typename, setTypename] = useState("我的藏品");
  const [visible, setVisible] = useState(false);
  const [strText, setStrText] = useState();
  const [lMvisible, setlMvisible] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const { username, setUsername } = useDmwLogin();
  const { avatarUrl, setAvatarUrl } = useDmwLogin();
  const [loading, setLoding] = useState(false)
  const [myNftList, setmyNftList] = useState([])

  // Context方法
  const { logOut } = useDmwLogin();
  const { post, formData } = useDmwApi();
  const { currentWallet } = useDmwWeb3()
  const { dmwWalletList } = useDmwWallet()

  const visibleFn = () => {
    setVisible(true);
  };

  const close = () => {
    setlMvisible(false);
    setVisible(false);
  };

  useEffect(() => {
    post("/index/user/get_user_msg").then((res) => {
      console.log(res, "用户信息");
      if (res.code == 200) {
        setUserInfo(res.data);
        console.log(userInfo, "用户信息打印");
        setUsername(res.data.nickname);
        setAvatarUrl(res.data.avatar_url);
        getMyNft('/index/nft/get_my_nft', { network: 'Goerli' })
      }
    });

   

  }, []);

  useEffect(() => {
    setmyNftList([])
    if(typename == '我创建的'){
      getMyNft('/index/nft/get_my_create_nft_by_search', { keyword: '', })
    }else if(typename == '事件'){
    }else if(typename=='我喜欢的'){
      getMyNft('/index/nft/get_my_likes_nft_by_search', { keyword: '', })
    }else if(typename=='我的藏品'){
      getMyNft('/index/nft/get_my_nft', { network: 'Goerli' })
    }
  }, [typename])


  useEffect(() => {
    setLoding(false)
  }, [myNftList])

  const getMyNft = (posturl:string, data) => {
    let params = {}
    if(data){
      params = formData(data)
    }
    
    setLoding(true)
    console.log(posturl,'url,yemian');
    
    post(posturl, params).then(res => {
      console.log(res, '回调----------');
      setmyNftList(res.data.result)
    }).catch(err=>{
      console.log(err,'----');

      
    })
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
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
          <Text style={styles.identification}>
            {/* 此处勿忘加空格 */}
            Byf3234ye89wcnc8ecbcvsc9dbcw{" "}
            <Image
              style={{ width: 12, height: 12 }}
              source={require("../../assets/img/my/copy.png")}
            ></Image>
          </Text>
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
        <View style={styles.line}></View>
        {/* line -- end */}
        <View style={styles.index_box}>
          <Search
            onChange={(strText) => {
              setStrText(strText);
            }}
            visible={() => visibleFn()}
          ></Search>
        </View>
        {/* <Text onPress={() => this.visible()}>123</Text> */}

        {
          visible ? 
          <Screen
          title="select filter"
          style={[styles.Screen]}
          visible={visible}
          close={() => close()}
          datalist={data}
        ></Screen> : null
        }




        <View style={{paddingRight:20,paddingLeft:20,paddingTop:20,zIndex:1}}>
          {/*  navigatetoDetail={(id, unique_id, contract_address, token_id, network)
                   =>
                  { props.navigation.navigate('goodsDetail', { id: id, unique_id, contract_address, token_id, network }) }} */}
          {
            !loading ? <FlatList
              refreshing={false}
              style={{ height: '55%',zIndex:1 }}
              ListEmptyComponent={() => {
                return <Text style={{ textAlign: 'center', marginTop: '50%' }}>空空如也</Text>
                // 列表为空展示改组件
              }}
              // 一屏幕展示几个
              number={4}
              //  2列显示
              numColumns={2}
              data={myNftList}
              renderItem={({ item }) => {
                return <List list={item} type={4} 
                navigatetoDetail={(id,unique_id,contract_address,token_id,network) =>
                  { props.navigation.navigate('goodsDetail', { id: id,unique_id,contract_address,token_id,network }) }}
                />
              }}
              keyExtractor={(item, index) => item.id}
              ListFooterComponent={() => {
                // 声明尾部组件
                return myNftList && myNftList.length ? <Text style={{ textAlign: 'center' }} >没有更多了</Text> : null
              }}
              // 下刷新
              onEndReachedThreshold={0.1} //表示还有10% 的时候加载onRefresh 函数

            >
            </FlatList> : <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: '40%' }}>
              <Spinner />
            </View>
//               onEndReached={}
          }
        </View>

      </View>
      <Lmodal
        goto={(path) => {
          props.navigation.navigate(path);
        }}
        style={[styles.Screen]}
        close={() => close()}
        visible={lMvisible}
      ></Lmodal>



      {/* <Image  style={{width:50,height:50}}
        source={{uri:imgurl}}></Image> */}
    </SafeAreaView>
  );
};

export default Myself;

const styles = StyleSheet.create({
  Screen: {
    width: screenWidth,
    position: "absolute",
    zIndex:100
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
