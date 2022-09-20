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
  ScrollView,
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
      <SafeAreaView
        style={{
          paddingTop: 20,
          paddingLeft: 20,
          paddingRight: 20,
          position: 'relative',
          height: Dimensions.get('window').height,
          paddingBottom:200,
          backgroundColor:'#fff'
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
            {/* <Text>dnfjhsbdhfbhsdb电脑上减肥不上班分别少部分黑死病封神榜风寒湿痹封神榜粉红色部分少部分火山爆发s是
                分三年级奋笔疾书不放是吧风寒湿痹红色不是基本上还不是吧
            </Text> */}
          <View style={styles.up}>
          <Image
                  style={{ width: 96 / 2, height: 96 / 2 }}
                  source={require('../../assets/img/my/3336.png')}></Image>
            <Text>上传图像、视频</Text>
          </View>
          <Text style={{fontSize: 10, color: '#999999', marginBottom: 27}}>
            支持的文件类型：JPG、SVG、png
          </Text>
          <View style={styles.lis}>
            <Text style={styles.text}>标题</Text>
            {/* <TouchableWithoutFeedback onPress={()=>{}} onStartShouldSetResponderCapture={()=>true} >
                       
                    </TouchableWithoutFeedback> */}
            <TextInput
              maxLength={6}
              placeholder="请输入藏品名"
              keyboardType="decimal-pad"
              style={[styles.input]}
              onChangeText={e => this.setState({address: e})}
              value={this.state.address}
            />
          </View>

          <View style={[styles.lis, {marginBottom: 20}]}>
            <Text style={styles.text}>简介</Text>
            {/* <TouchableWithoutFeedback onPress={()=>{}} onStartShouldSetResponderCapture={()=>true} >
                       
                    </TouchableWithoutFeedback> */}
            <TextInput
              placeholder="请输入简介"
              keyboardType="decimal-pad"
              style={[styles.input, {marginBottom: 20,height:151,}]}
              onChangeText={e => this.setState({address: e})}
              value={this.state.address}
              multiline={true}
              maxLength={200}
              numberOfLines={5}
            />
          </View>

          <View style={[styles.lis, {marginBottom: 20}]}>
            <Text style={styles.text}>选择合集</Text>
            {/* <TouchableWithoutFeedback onPress={()=>{}} onStartShouldSetResponderCapture={()=>true} >
                       
                    </TouchableWithoutFeedback> */}
            <TextInput
              maxLength={6}
              placeholder="请输入地址"
              keyboardType="decimal-pad"
              style={[styles.input, {marginBottom: 20}]}
              onChangeText={e => this.setState({address: e})}
              value={this.state.address}
            />
          </View>

          <View style={[styles.lis, {marginBottom: 20}]}>
            <Text style={styles.text}>选择区块链</Text>
            {/* <TouchableWithoutFeedback onPress={()=>{}} onStartShouldSetResponderCapture={()=>true} >
                       
                    </TouchableWithoutFeedback> */}
            <TextInput
              maxLength={6}
              placeholder="请输入地址"
              keyboardType="decimal-pad"
              style={[styles.input, {marginBottom: 20}]}
              onChangeText={e => this.setState({address: e})}
              value={this.state.address}
            />
          </View>
         <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:20}}>
         <Text style={{fontSize: 12, color: '#999999',}}>
            上链费：
          </Text>
          <Text style={{fontSize:16,color:'#897EF8'}}>0.027ETH</Text>
         </View>
        </ScrollView>

        <Text onPress={()=>this.props.navigation.navigate('CreatedSuccessfully')} style={styles.btn}>创建并支付</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  up: {
    height: 200,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginBottom: 14,
    borderRadius: 20,
    alignItems:'center',
    flexDirection:'column',
    justifyContent:'center'
  },
  btn: {
    width: screenWidth - 40,
    backgroundColor: '#897EF8',
    color: '#fff',
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 50,
    position: 'absolute',
    bottom: 138,
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
  },
});
