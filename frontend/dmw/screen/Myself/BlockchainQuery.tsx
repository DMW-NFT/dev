import React, {Component,useState} from 'react';
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
} from 'react-native';
import { useTranslation } from 'react-i18next'
const screenWidth = Dimensions.get('window').width;
const scale = Dimensions.get('window').scale;
const screenHeight = Dimensions.get('window').height;
const BlockchainQuery = () => {
  const { t, i18n } = useTranslation();
  // constructor(porps) {
  //   super(porps);
  //   state = {
  //       Blockchainval: '',
  //   };
  // }
  const [Blockchainval,setBlockchainval] = useState('')
    return (
      <SafeAreaView style={{paddingTop: 38, position: 'relative',height:Dimensions.get('window').height,backgroundColor:'#fff'}}>
       
<View style={{paddingLeft:20,paddingRight:20}}>
<TextInput
                    multiline={true}
                    textAlignVertical="top"
                    numberOfLines={5}
                    placeholder={t("请输入地址")} 
                    keyboardType="decimal"
                    style={[styles.textarea]}
                    onChangeText={e =>  setBlockchainval(e)}
                    value={Blockchainval}
                />

<Text style={{color:'#999999',fontSize:10}}>{t("支持藏品、账户相关区块链信息查询")}</Text>

</View>
   


       <Text style={styles.btn}>{t("查询")}</Text>
      </SafeAreaView>
    );
}

export default BlockchainQuery

const styles = StyleSheet.create({
  btn: {
    width:screenWidth - 40 ,
    backgroundColor:'#897EF8',
    color:'#fff',
    height:50,
    lineHeight:50,
    textAlign:'center',
    marginRight:20,
    marginLeft:20,
    borderRadius:50,
    position:'absolute',
    bottom:138

  },


  textarea:{ 
    paddingTop:10,
    // borderColor: 'gray', 
    borderWidth: 1,
    borderColor:"#ccc",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    paddingLeft:15,
    paddingRight:15, 
    marginBottom:9
}, 

 
});
