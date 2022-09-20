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
export default class ModifyInfo extends Component {
  constructor(porps) {
    super(porps);
    this.state = {
      username: 'Simon',
    };
  }
  render() {
    return (
      <SafeAreaView style={{paddingTop: 20, position: 'relative',height:Dimensions.get('window').height}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            position: 'relative',
          }}>
          <View style={{width: 90, height: 90, borderRadius: 90 / 2}}>
            <Image
              style={{width: 90, height: 90, borderRadius: 90 / 2}}
              source={require('../../assets/img/my/any2.jpg')}></Image>
            <Image
              style={{
                position: 'absolute',
                width: 20,
                height: 20,
                bottom: 0,
                right: 0,
              }}
              source={require('../../assets/img/my/3588.png')}></Image>
          </View>
        </View>
        <View style={styles.line}></View>

        <View style={styles.lis}>
          <Text style={styles.text}>昵称</Text>
          {/* <TouchableWithoutFeedback onPress={()=>{}} onStartShouldSetResponderCapture={()=>true} >
                       
                    </TouchableWithoutFeedback> */}
          <TextInput
            maxLength={6}
            placeholder="请输入昵称"
            keyboardType="decimal-pad"
            style={[styles.input]}
            onChangeText={e => this.setState({username: e})}
            value={this.state.username}
          />
        </View>
       <Text style={styles.btn}>保存更改</Text>
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
