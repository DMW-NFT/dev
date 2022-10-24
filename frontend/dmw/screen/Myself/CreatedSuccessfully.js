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
export default class CreatedSuccessfully extends Component {
  constructor(porps) {
    super(porps);
    this.state = {
        address: '',
    };
  }
  render() {
    return (
      <SafeAreaView style={{ paddingLeft:20,paddingRight:20, position: 'relative',height:Dimensions.get('window').height,backgroundColor:'#fff'}}>
      
<Text style={{fontSize:16,color:'#0F172C',marginBottom:41}}>你成功上传了一个新的藏品！</Text>
        
<View style={{paddingLeft:20}}>
<Image
                  style={{ width: 590 / 2, height: 590 / 2 ,}}
                  source={{uri:this.props.route.params.imgurlUp1}}></Image>
                  <Text style={{fontSize:14,color:'#8197C4',marginTop:27,marginBottom:8}}>{this.props.route.params.title}</Text>
                  <Text style={{fontSize:16}}>海贼王-恶魔果实</Text>
</View>

<Text style={styles.Later}>Later</Text>

       <Text style={styles.btn}>Sell Now</Text>
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

  Later:{
    width:screenWidth,
    fontSize:16,color:'#897EF8',textAlign:'center',bottom:220,position:'absolute',
    fontWeight:'700',
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
