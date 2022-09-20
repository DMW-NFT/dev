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
export default class TransferredIntoCollection extends Component {
  constructor(porps) {
    super(porps);
    this.state = {
        address: '',
    };
  }
  render() {
    return (
      <SafeAreaView style={{paddingTop: 20, position: 'relative',height:Dimensions.get('window').height}}>
      

        <View style={styles.lis}>
          <Text style={styles.text}>区块链</Text>
          {/* <TouchableWithoutFeedback onPress={()=>{}} onStartShouldSetResponderCapture={()=>true} >
                       
                    </TouchableWithoutFeedback> */}
          <TextInput
            maxLength={6}
            placeholder="请输入地址"
            keyboardType="decimal-pad"
            style={[styles.input]}
            onChangeText={e => this.setState({address: e})}
            value={this.state.address}
          />
        </View>

        <View style={[styles.lis,{marginBottom:20}]}>
          <Text style={styles.text}>地址</Text>
          {/* <TouchableWithoutFeedback onPress={()=>{}} onStartShouldSetResponderCapture={()=>true} >
                       
                    </TouchableWithoutFeedback> */}
          <TextInput
            maxLength={6}
            placeholder="请输入地址"
            keyboardType="decimal-pad"
            style={[styles.input,{marginBottom:20}]}
            onChangeText={e => this.setState({address: e})}
            value={this.state.address}
          />
          <Text style={{fontSize:10,color:'#999999'}}>您的ERC721或ERC1155合同在mainnet网络上的地址是什么？</Text>
        </View>



       <Text style={styles.btn}>确定</Text>
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
  line: {
    borderColor: '#CCCCCC',
    width: screenWidth - 40,
    height: 1,
    borderWidth: 1 / scale,
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 20,
  },
  input: {
    height: 48,
    borderColor: 'gray',
    borderWidth: 1,
    borderColor: '#ccc',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    paddingLeft: 15,
    paddingRight: 15,
  },
  text: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 10,
  },
  lis: {
    marginBottom: 52 / 2,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
