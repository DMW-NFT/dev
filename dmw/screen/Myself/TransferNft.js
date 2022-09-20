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
        address: '',
    };
  }
  render() {
    return (
      <SafeAreaView style={{paddingTop: 38, position: 'relative',height:Dimensions.get('window').height}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom:32,
            paddingLeft:20,
            paddingRight:20
          }}>
          <View >
            <Image
              style={{width:screenWidth - 40 , height: 200, borderRadius: 20}}
              source={require('../../assets/img/my/any2.jpg')}></Image>
          </View>
        </View>


        <View style={styles.lis}>
          <Text style={styles.text}>地址</Text>
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
          <Text style={{color:'#999999',fontSize:10}}>您的藏品“圣斗士星矢#0012”将转移到此地址</Text>
        </View>
       <Text style={styles.btn}>转移</Text>
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
  input: {
    height: 48,
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
