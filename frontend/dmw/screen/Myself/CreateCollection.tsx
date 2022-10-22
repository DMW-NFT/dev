import React, { useState, useEffect,useRef } from 'react';
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
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Spinner } from '@ui-kitten/components';
import {  Card, Layout, Modal } from '@ui-kitten/components';
import { Surface } from 'react-native-paper';

const screenWidth = Dimensions.get('window').width;
const scale = Dimensions.get('window').scale;
const screenHeight = Dimensions.get('window').height;
const TransferredIntoCollection = (props) => {
  const [address, setaddress] = useState('')
  const [title, setTitle] = useState('')//标题
  const [explain, setExplain] = useState('')//简介
  const [password, setpassword] = useState("");
  const [passwordlist, setpasswordlist] = useState([]);
  const [Modalvisible, setModalvisible] = useState(false)
  const inputRefX = useRef(null);
  const [loading, setLoding] = useState(false)

  const { post, formData, Toast } = useDmwApi()

  useEffect(() => {
    console.log(123);

  }, [loading])
  useEffect(() => {
    let blackPointArry = [null, null, null, null, null, null]

    let arr = password.split('');
    arr.map((item, index) => {
      blackPointArry[index] = item;
    })
    setpasswordlist(blackPointArry)
    if (password.length == 6) {
      setModalvisible(false)
      props.navigation.navigate('CreatedSuccessfully')
    }else if(password.length == 6){
      Toast('密码错误或暂未创建DMW钱包')
    }
  }, [password])

  const empty = () => {
    setpassword('')
  }
  const Sure = () => {
    empty()
    setModalvisible(true); setTimeout(() => {
      inputRefX.current.focus();
    }, 500);
  }

  // b本地
  const uuup = () => {

    launchImageLibrary({
      mediaType: 'photo',
      maxWidth: 1000,// 设置选择照片的大小，设置小的话会相应的进行压缩
      maxHeight: 1000,
      quality: 0.8,
      // videoQuality: 'low',
      // includeBase64: true
    }, res => {
      if (res.assets) {
        setLoding(true)
        console.log(formData({ content: res.assets[0], path: '123' }));
        post('/index/interface/upload_folder', formData({ content: res.assets[0], path: '123' })).then(resp => {
          console.log(resp);
          if (resp.code == 200) {
            Toast('上传成功！')
          }
          setLoding(false)
        }).catch(err => {
          setLoding(false)
          Toast('因未知原因上传失败')
          console.log(err, 789);
        })

      } else {
        console.log('根本没进去');

        return
      }


      if (res.didCancel) {
        return false;
      }
      // 对获取的图片进行处理
    })

  }
  return (
    <SafeAreaView
      style={{
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        position: 'relative',
        height: Dimensions.get('window').height,
        paddingBottom: 200,
        backgroundColor: '#fff'
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Text>dnfjhsbdhfbhsdb电脑上减肥不上班分别少部分黑死病封神榜风寒湿痹封神榜粉红色部分少部分火山爆发s是
                分三年级奋笔疾书不放是吧风寒湿痹红色不是基本上还不是吧
            </Text> */}
        {
          loading ? <View style={styles.up}><Spinner /></View> : <TouchableWithoutFeedback onPress={() => uuup()}>
            <View style={styles.up}>
              <Image
                style={{ width: 96 / 2, height: 96 / 2 }}
                source={require('../../assets/img/my/3336.png')}></Image>
              <Text>上传图像、视频</Text>
            </View>
          </TouchableWithoutFeedback>
        }

        <Text style={{ fontSize: 10, color: '#999999', marginBottom: 27 }}>
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
            onChangeText={e => setTitle(e)}
            value={title}
          />
        </View>

        <View style={[styles.lis, { marginBottom: 20 }]}>
          <Text style={styles.text}>简介</Text>
          {/* <TouchableWithoutFeedback onPress={()=>{}} onStartShouldSetResponderCapture={()=>true} >
                       
                    </TouchableWithoutFeedback> */}
          <TextInput
            placeholder="请输入简介"
            keyboardType="decimal-pad"
            style={[styles.input, { marginBottom: 20, height: 151, }]}
            onChangeText={e => setExplain(e)}
            value={explain}
            multiline={true}
            maxLength={200}
            numberOfLines={5}
          />
        </View>

        <View style={[styles.lis, { marginBottom: 20 }]}>
          <Text style={styles.text}>选择合集</Text>
          {/* <TouchableWithoutFeedback onPress={()=>{}} onStartShouldSetResponderCapture={()=>true} >
                       
                    </TouchableWithoutFeedback> */}
          <TextInput
            maxLength={6}
            placeholder="请输入地址"
            keyboardType="decimal-pad"
            style={[styles.input, { marginBottom: 20 }]}
            onChangeText={e => setaddress(e)}
            value={address}
          />
        </View>

        <View style={[styles.lis, { marginBottom: 20 }]}>
          <Text style={styles.text}>选择区块链</Text>
          {/* <TouchableWithoutFeedback onPress={()=>{}} onStartShouldSetResponderCapture={()=>true} >
                       
                    </TouchableWithoutFeedback> */}
          <TextInput
            maxLength={6}
            placeholder="请输入地址"
            keyboardType="decimal-pad"
            style={[styles.input, { marginBottom: 20 }]}
            onChangeText={e => setaddress(e)}
            value={address}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
          <Text style={{ fontSize: 12, color: '#999999', }}>
            上链费：
          </Text>
          <Text style={{ fontSize: 16, color: '#897EF8' }}>0.027ETH</Text>
        </View>
      </ScrollView>

      <Text onPress={() => Sure()} style={styles.btn}>创建并支付</Text>


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
    </SafeAreaView>
  );
}


export default TransferredIntoCollection

const styles = StyleSheet.create({
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
  up: {
    height: 200,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginBottom: 14,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
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
