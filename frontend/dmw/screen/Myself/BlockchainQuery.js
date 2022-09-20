import React, {Component} from 'react';
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
const screenWidth = Dimensions.get('window').width;
const scale = Dimensions.get('window').scale;
const screenHeight = Dimensions.get('window').height;
export default class BlockchainQuery extends Component {
  constructor(porps) {
    super(porps);
    this.state = {
        Blockchainval: '',
    };
  }
  render() {
    return (
      <SafeAreaView style={{paddingTop: 38, position: 'relative',height:Dimensions.get('window').height,backgroundColor:'#fff'}}>
       
<View style={{paddingLeft:20,paddingRight:20}}>
<TextInput
                    multiline={true}
                    textAlignVertical="top"
                    numberOfLines={5}
                    placeholder='请输入' 
                    keyboardType="decimal"
                    style={[styles.textarea]}
                    onChangeText={e =>  this.setState({ Blockchainval:e })}
                    value={this.state.Blockchainval}
                />

<Text style={{color:'#999999',fontSize:10}}>支持藏品、账户相关区块链信息查询</Text>

</View>
   


       <Text style={styles.btn}>查询</Text>
      </SafeAreaView>
    );
  }
}

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
