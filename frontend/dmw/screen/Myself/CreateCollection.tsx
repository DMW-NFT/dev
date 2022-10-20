import React, {useState,useEffect} from 'react';
import DocumentPicker from "react-native-document-picker";
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
import { useDmwApi } from '../../../DmwApiProvider/DmwApiProvider';

const screenWidth = Dimensions.get('window').width;
const scale = Dimensions.get('window').scale;
const screenHeight = Dimensions.get('window').height;
const TransferredIntoCollection = (props) => {
    const [address,setaddress] = useState('')
    const [title,setTitle] = useState('')//标题
    const [explain,setExplain] = useState('')//简介
    // const [explain,setExplain] = useState('')//简介

    const {post,formData,Toast} = useDmwApi()
    const up = async () => {
      console.log(123);
  
      try {
        const file = await DocumentPicker.pick({
          type: [DocumentPicker.types.images],
        });
        console.log(file, "文件");
  
        let formData = new FormData();
        formData.append("file", file[0]);
        formData.append("type", "1");

        fetch("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder", {
          method: "POST",
          body: formData,
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'X-API-Key': 'formData'
          },
        })
          .then((res) => res.json()).then(res=>{
            console.log(res,'上传');
          })



      //  post("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder", formData).then((res) => {
      //     console.log(res, "上传");
      //     if (res.code == 200) {
      //       Toast('图片上传成功！')
      //     }
      //   });
      } catch (err) {
        // 在文件上传过程中出现错误
        if (DocumentPicker.isCancel(err)) {
          // User cancelled the picker, exit any dialogs or menus and move on
        } else {
          throw err;
        }
      }
    };
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
            <TouchableWithoutFeedback onPress={()=>up()}>
          <View style={styles.up}>
          <Image
                  style={{ width: 96 / 2, height: 96 / 2 }}
                  source={require('../../assets/img/my/3336.png')}></Image>
            <Text>上传图像、视频</Text>
          </View>
          </TouchableWithoutFeedback>
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
              onChangeText={e => setState({address: e})}
              value={address}
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
              onChangeText={e => setState({address: e})}
              value={address}
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
              onChangeText={e => setState({address: e})}
              value={address}
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
              onChangeText={e => setState({address: e})}
              value={address}
            />
          </View>
         <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:20}}>
         <Text style={{fontSize: 12, color: '#999999',}}>
            上链费：
          </Text>
          <Text style={{fontSize:16,color:'#897EF8'}}>0.027ETH</Text>
         </View>
        </ScrollView>

        <Text onPress={()=>props.navigation.navigate('CreatedSuccessfully')} style={styles.btn}>创建并支付</Text>
      </SafeAreaView>
    );
}


export default TransferredIntoCollection

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
