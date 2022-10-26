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
  FlatList
} from "react-native";
import React, { useContext, useState, useEffect, createRef, useRef } from "react";
import Screen from "./BottomPopUpWindow";
import Lmodal from "./leftModal";
import { useDmwWallet } from "../../../DmwWallet/DmwWalletProvider";
import { Button, Card, Layout, Modal } from '@ui-kitten/components';
import { useDmwLogin } from "../../../loginProvider/constans/DmwLoginProvider";
import { useDmwWeb3 } from "../../../DmwWeb3/DmwWeb3Provider";
import { useDmwApi } from "../../../DmwApiProvider/DmwApiProvider";
import CryptoJS from 'crypto-js'

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const scale = Dimensions.get("window").scale;

const Money = (props) => {
  // inputRef = React.createRef();
  const inputRefX = useRef(null);
  const [type, setType] = useState(2);
  const [list, setList] = useState([{}, {}]);
  const [visible, setVisible] = useState(false);
  const [lMvisible, setLMvisible] = useState(false);
  const [Modalvisible, setModalvisible] = useState(false)
  const { dmwWalletList } = useDmwWallet();
  const [password, setpassword] = useState("");
  const [passwordlist, setpasswordlist] = useState([]);
  const { WalletInUse, setWalletInUse } = useDmwLogin()
  const { disconnectWallet, connected, currentWallet, lastConnected, connectWallet, getNativeBalance } = useDmwWeb3()
  const { MoneyRouteState, setMoneyRouteState, post, formData, Toast, shortenAddress , Copy } = useDmwApi()
  const [loading, setLoding] = useState(false)
  const [address, setaddress] = useState('--')
  const [address1, setaddress1] = useState('--')
  const [ThirdPartyBalance, setThirdPartyBalance] = useState([])
  const [NativeBalance, setNativeBalance] = useState('')
  const [NativeBalanceBenDi, setNativeBalanceBenDi] = useState('')
  const axios = () => {

  };
  useEffect(()=>{
console.log(123);

  },[WalletInUse])

  useEffect(() => {
    if (WalletInUse == 1 && dmwWalletList[0]) {
      getAddressBalance(dmwWalletList[0])
      getNativeBalance(dmwWalletList[0]).then(res => {
        setNativeBalanceBenDi(res)
      })
      setWalletInUse(1)
    } else if (currentWallet && WalletInUse == 2) {
      console.log(currentWallet,'钱包地址');
      setWalletInUse(2)
      getAddressBalance(currentWallet)
      getNativeBalance(currentWallet).then(res => {
        setNativeBalanceBenDi(res)
      })
    }
  }, [])

  const getAddressBalance = (address) => {
    fetch(`https://deep-index.moralis.io/api/v2/${address}/erc20?chain=goerli`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'X-API-Key': 'Lf0hom3miHg82XaKYaQg1Ej3LiyXmfO9kCSAsfws9XpUX1V9sh1isIsOorRf1xYf'
      }
    }).then((response) => {
      const res = response.json()
      res.then(data => {
        setThirdPartyBalance(data)
        console.log(data, '钱包余额')
      })
    });
  }

  const empty = () => {
    setpassword('')
  }
  useEffect(() => {
      // console.log('钱包变化',connected,currentWallet);
   if (currentWallet) {
    if(WalletInUse == 2){
      Switchwallet(2)
    }
      getNativeBalance(currentWallet).then(res => {
        setNativeBalance(res)
      })
      getAddressBalance(currentWallet)
      setaddress1(shortenAddress(currentWallet))
    }


    if (dmwWalletList[0] && WalletInUse == 1) {
      Switchwallet(1)
      setaddress(shortenAddress(dmwWalletList[0]))
      getNativeBalance(dmwWalletList[0]).then(res => {
        console.log("native balance navtive token:",res)
        setNativeBalanceBenDi(res)
      })
    }


    setMoneyRouteState(connected || dmwWalletList.length ? '12345' : 'createMoney')
  }, [connected, dmwWalletList, currentWallet])



  useEffect(() => {
    console.log("monney useeffect currentwallet", currentWallet)
  }, [currentWallet])

  useEffect(() => {
    let blackPointArry = [null, null, null, null, null, null]

    let arr = password.split('');
    arr.map((item, index) => {
      blackPointArry[index] = item;
    })
    setpasswordlist(blackPointArry)
    if (password.length == 6 && dmwWalletList[0]) {
      setModalvisible(false)
      props.navigation.navigate('ViewMnemonics', { password })
    }else if(password.length == 6 && !dmwWalletList[0]){
      Toast('密码错误或暂未创建DMW钱包')
    }
  }, [password])


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
  const changetype = (val) => {
    setType(val);
  };
  const Switchwallet = (type) => {
    console.log(dmwWalletList[0]);
    
    setWalletInUse(type)
    // var message = JSON.stringify()
    var iv = 'aaaaaaaaaaaaaaaa';//随机生成长度为32的16进制字符串。IV称为初始向量，不同的IV加密后的字符串是不同的，加密和解密需要相同的IV。
    // console.log(iv, 'iv')
    // var key = "u38rOBN6lYOKHenn2oYSGmDbbGpp88ao";//秘钥。长度32的16进制字符串。
    // var cryptkey = CryptoJS.enc.Hex.parse(key);//将16进制字符串转换为 WordArray对象
    // console.log(cryptkey);
    // var ciphertext = encrypt(message, key, iv);//加密
    // console.log(ciphertext.toString(), 'jiami');
    let wallet_address = ''
    if (type == 1) {
      if(dmwWalletList[0]){
        wallet_address = dmwWalletList[0]
      }else{
        Toast("请先创建DMW钱包")
        return
      }
      
    } else {
      wallet_address = currentWallet
    }
    let str = JSON.stringify({ wallet_address: wallet_address })
    let data = formData({ iv: iv, param: str })
    post('/index/login/login_by_wallet', data).then(res => {
      console.log(res,wallet_address,'qianbao denglu');
      if (res.code == 200) {
        Toast('登录成功！')
        if (type == 1 && dmwWalletList[0]) {
          console.log(1);
          getAddressBalance(dmwWalletList[0])
        } else if (currentWallet && type == 2) {
          console.log(2);
          getAddressBalance(currentWallet)
        }
      }
    }).catch(err => {
      Toast(err.message)
    })
  }

  const encrypt = (word, keyStr, ivStr) => {
    const key = CryptoJS.enc.Latin1.parse(keyStr);
    const iv = CryptoJS.enc.Latin1.parse(ivStr);
    const encoded = CryptoJS.AES.encrypt(word, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      adding: CryptoJS.pad.ZeroPadding
    }).toString()


    return encoded;
  }

  const randomString = (len) => {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#fff",
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        position: "relative",
      }}
    >



      <View style={styles.hearder}>
        <View>
          <Text style={styles.hello}>hello</Text>
          <Text style={styles.HTitle}>Account 1</Text>
        </View>
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
          style={[{
            marginBottom: 20,
            marginRight: -20,
            height: 336 / 2,
            marginLeft: -20,
          },{marginLeft:dmwWalletList && dmwWalletList[0] ? null :20 }]}
        >
          {
 dmwWalletList && dmwWalletList[0] ?
        
          <View style={styles.USDT} >
            {
              WalletInUse == 1 ?
                <Text style={styles.active}>当前登录</Text>
                :
                <TouchableWithoutFeedback onPress={() =>
                  Switchwallet(1)
                } >
                  <Image
                    style={{ width: 36, height: 36, position: 'absolute', top: 0, right: 0 }}
                    source={require('../../assets/img/money/SwitchwalletA.png')}></Image>
                </TouchableWithoutFeedback>
            }
            <Text style={styles.WName}>DMW</Text>
            <View
              style={{ flexDirection: "row", marginTop: 15, marginBottom: 14 }}
            >
              <ImageBackground
                source={require("../../assets/img/money/WFCA.png")}
                style={{ marginRight: 10, justifyContent: "center" }}
              >
                <Text style={styles.CurrencyName}>ETH</Text>
              </ImageBackground>

              <Text style={styles.balance}>{NativeBalanceBenDi ? NativeBalanceBenDi : '--'}</Text>
            </View>
            {/* <Text style={{ color: "#fff" }}>$10.000</Text> */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: "#fff" }}>{address}</Text>
              <TouchableWithoutFeedback onPress={()=>{Copy(dmwWalletList[0])}}>
              <Image
                style={{ width: 10, height: 10, marginLeft: 5 }}
                source={require("../../assets/img/money/copyW.png")}
              ></Image>
              </TouchableWithoutFeedback>
            
            </View>
          </View> : null
            }

          {
            connected ?

              <View style={styles.WFCA}>
                {
                  WalletInUse == 2 ?
                    <Text style={styles.active}>当前登录</Text>
                    :
                    <TouchableWithoutFeedback onPress={() => Switchwallet(2)} >
                      <Image
                        style={{ width: 36, height: 36, position: 'absolute', top: 0, right: 0 }}
                        source={require('../../assets/img/money/SwitchwalletA.png')}></Image>
                    </TouchableWithoutFeedback>
                }

                <Text style={[styles.WName, { color: "#897EF8" }]}>外部钱包</Text>
                <View
                  style={{ flexDirection: "row", marginTop: 15, marginBottom: 14 }}
                >
                  <ImageBackground
                    source={require("../../assets/img/money/USDT.png")}
                    style={{ marginRight: 10, justifyContent: "center" }}
                  >
                    <Text style={[styles.CurrencyName, { color: "#897EF8" }]}>
                      ETH
                    </Text>
                  </ImageBackground>

                  <Text style={[styles.balance, { color: "#897EF8" }]}>{NativeBalance}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20 }}>
                  {/* <Text style={{ color: "#897EF8" }}>$10.000</Text> */}
                  <Text></Text>
                  <Text style={{ color: "#897EF8" }} onPress={() => { disconnectWallet() }}>断开链接</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ color: "#897EF8" }}>{address1}</Text>
                  <TouchableWithoutFeedback onPress={()=>{Copy(currentWallet)}}>
                  <Image
                    style={{ width: 10, height: 10, marginLeft: 5 }}
                    source={require("../../assets/img/my/copy.png")}
                  ></Image>
                </TouchableWithoutFeedback>
                </View>
              </View> : null

          }
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
            <Text>接收</Text>
          </View>
        </TouchableWithoutFeedback>



        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.navigate("Exchange");
          }}
        >
          <View style={styles.ListService}>
            <Image
              style={styles.ListServiceImg}
              source={require("../../assets/img/money/list3.png")}
            ></Image>
            <Text>兑换</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.navigate("Gift", {
              USDT: ThirdPartyBalance ? Number(ThirdPartyBalance[0].balance) / 10 ** ThirdPartyBalance[0].decimals : 0,
              ETH: WalletInUse == 1 ? NativeBalanceBenDi : NativeBalance
            });
          }}
        >
          <View style={styles.ListService}>
            <Image
              style={styles.ListServiceImg}
              source={require("../../assets/img/money/list4.png")}
            ></Image>
            <Text>赠予</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback>
          <View style={styles.ListService}>
            <Image
              style={styles.ListServiceImg}
              source={require("../../assets/img/money/list2.png")}
            ></Image>
            <Text>记录</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      {/* tab栏 -- start */}
      <View style={[styles.daohang]}>
        <Text
          style={[
            type === 2 ? styles.daonghang_text_ative : styles.daonghang_text,
          ]}
          onPress={() => changetype(2)}
        >
          代币
        </Text>
        <Text
          style={[
            type === 3 ? styles.daonghang_text_ative : styles.daonghang_text,
          ]}
          onPress={() => changetype(3)}
        >
          藏品
        </Text>
      </View>
      {/* tab栏 -- end */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.listbox]}>
          {

            ThirdPartyBalance.map((item, index) => (
              <View style={styles.ListLi} >
                <Image
                  style={{ width: 40, height: 40 }}
                  source={require("../../assets/img/money/list4.png")}
                ></Image>
                <View style={styles.ListLeftText}>
                  <Text style={{ fontSize: 16, fontWeight: "700", lineHeight: 40 }}>
                    {Number(item.balance) / 10 ** item.decimals + ' ' + item.symbol}
                  </Text>
                  {/* <Text style={{ fontSize: 12 }}>$10.000</Text> */}
                </View>
              </View>

            ))

          }




        </View>
      </ScrollView>


      <Screen
        style={[styles.Screen]}
        visible={visible}
        close={() => close()}
      ></Screen>



      <Modal
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
              setpassword(e);
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
            <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '700', marginBottom: 30 }}>请输入支付密码</Text>
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
      </Modal>


      <Lmodal
        goto={(path) => {
          props.navigation.navigate(path);
        }}
        style={[styles.Screen]}
        close={() => close()}
        visible={lMvisible}
        openModal={() => {
          setModalvisible(true); setTimeout(() => {
            inputRefX.current.focus();
          }, 500);
          empty();
        }}
      ></Lmodal>

    </SafeAreaView>
  );
};

export default Money;

const styles = StyleSheet.create({
  listbox: {
    marginVertical: 20,
    marginHorizontal: 20,
    paddingBottom: 100
  },
  passinputfirst: { textAlign: 'center', lineHeight: 48, borderColor: '#CCCCCC', borderWidth: 1, width: 46, height: 48, },
  passinput: { textAlign: 'center', lineHeight: 48, borderColor: '#CCCCCC', borderWidth: 1, width: 46, height: 48, borderLeftWidth: 0, },

  colose: {
    width: 22, height: 22, borderWidth: 1, borderRadius: 11, borderColor: '#ccc', justifyContent: 'center', alignItems: 'center',
    marginRight: -10,
  },
  CardBox: {
    width: 640 / 2,
    borderRadius: 20,
    position: 'relative',
    paddingBottom: 20,
    zIndex: 100
    // paddingTop: 10,
    // paddingRight: 10
  },
  active: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    position: 'absolute',
    top: 0,
    right: 0,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: '#F9C94E',
    color: "#fff"
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
    paddingLeft: 20, position: 'relative'
  },
  WName: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "Source Han Sans CN",
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
  },
  ListService: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
    fontFamily: "Source Han Sans CN",
    height: 56,
    lineHeight: 56,
    flex: 1,
    color: "#666666",
    textAlign: "center",
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
