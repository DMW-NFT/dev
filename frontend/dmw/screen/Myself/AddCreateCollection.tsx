import React, { useState, useEffect, useRef } from 'react';
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
import { Card, Layout, Modal } from '@ui-kitten/components';
import { Surface } from 'react-native-paper';

const screenWidth = Dimensions.get('window').width;
const scale = Dimensions.get('window').scale;
const screenHeight = Dimensions.get('window').height;
const AddCreateCollection = (props) => {
  const [address, setaddress] = useState('')
  const [title, setTitle] = useState('')//标题
  const [explain, setExplain] = useState('')//简介
  const [loading, setLoding] = useState(false)
  const [loading1, setLoding1] = useState(false)
  const [loading3, setLoding3] = useState(false)
  const [listType,setListTtpe] = useState([])
  const [BlockchainList,setBlockchainList] = useState([])
  const { post, formData, Toast } = useDmwApi()



  useEffect(()=>{
    getCoType()
    getBlockchain()
  },[])

  useEffect(() => {
    console.log(123);

  }, [loading])

  // 获取区块链
  const getBlockchain = () => {
    post('/index/common/get_network').then(res => {
      console.log(res, '区块链类型');
      setListTtpe(res.data)
    })
  }
  // 获取type类型
  const getCoType = () => {
    post('/index/common/get_categories').then(res => {
      console.log(res, '合集类型');
      setListTtpe(res.data)
    })
  }

  const Sure = () => {
    // let data = {
    //   name,
    //   logo,
    //   cover,
    //   banner,
    //   details,
    //   type_id,
    //   network
    // }
    // let params = formData(data)
    // post('/index/collection/add',)
  }

  // b本地
  const uuup = (type) => {
    launchImageLibrary({
      mediaType: 'photo',
      maxWidth: 1000,// 设置选择照片的大小，设置小的话会相应的进行压缩
      maxHeight: 1000,
      quality: 0.8,
      // videoQuality: 'low',
      // includeBase64: true
    }, res => {
      if (res.assets) {
        if (type == 1) {
          setLoding1(true)
        } else if (type == 2) {
          setLoding(true)
        } else if (type == 3) {
          setLoding3(true)
        }

        console.log(formData({ content: res.assets[0], path: '123' }));
        console.log(res.assets[0]);
        
        post('/index/interface/upload_folder', formData({ content: JSON.stringify(res.assets[0]), path: '123' })).then(resp => {
          console.log(resp);
          if (resp.code == 200) {
            Toast('上传成功！')
          }
          if (type == 1) {
            setLoding1(false)
          } else if (type == 2) {
            setLoding(false)
          } else if (type == 3) {
            setLoding3(false)
          }
        }).catch(err => {
          if (type == 1) {
            setLoding1(false)
          } else if (type == 2) {
            setLoding(false)
          } else if (type == 3) {
            setLoding3(false)
          }
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

        <Text style={{ fontSize: 16, marginBottom: 17 }}>
          形象标识
        </Text>
        {
          loading1 ? <View style={styles.up1}><Spinner /></View> : <TouchableWithoutFeedback onPress={() => uuup(1)}>
            <View style={styles.up1}>
              <Image
                style={{ width: 96 / 2, height: 96 / 2 }}
                source={require('../../assets/img/my/3336.png')}></Image>
              <Text>上传图像</Text>
            </View>
          </TouchableWithoutFeedback>
        }


        <Text style={{ fontSize: 16, marginBottom: 17 }}>
          特色图片
        </Text>
        {
          loading ? <View style={styles.up}><Spinner /></View> : <TouchableWithoutFeedback onPress={() => uuup(2)}>
            <View style={styles.up}>
              <Image
                style={{ width: 96 / 2, height: 96 / 2 }}
                source={require('../../assets/img/my/3336.png')}></Image>
              <Text>上传图像、视频</Text>
            </View>
          </TouchableWithoutFeedback>
        }
        <Text style={{ fontSize: 16, marginBottom: 17 }}>
          横幅banner
        </Text>

        {
          loading3 ? <View style={styles.up3}><Spinner /></View> : <TouchableWithoutFeedback onPress={() => uuup(3)}>
            <View style={styles.up3}>
              <Image
                style={{ width: 96 / 2, height: 96 / 2 }}
                source={require('../../assets/img/my/3336.png')}></Image>
              <Text>上传图像、视频</Text>
            </View>
          </TouchableWithoutFeedback>
        }

        <View style={styles.lis}>
          <Text style={{ fontSize: 16, marginBottom: 17 }}>
            集合名称
          </Text>

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
          <Text style={{ fontSize: 16, marginBottom: 17 }}>
            简介
          </Text>
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
          <Text style={{ fontSize: 16, marginBottom: 17 }}>
            添加类别
          </Text>
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
          <Text style={{ fontSize: 16, marginBottom: 17 }}>
            选择区块链
          </Text>
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
      </ScrollView>

      <Text onPress={() => Sure()} style={styles.btn}>创建</Text>



    </SafeAreaView>
  );
}


export default AddCreateCollection

const styles = StyleSheet.create({
  up3: {
    height: 120,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginBottom: 14,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  up1: {
    height: 100,
    width: 100,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginBottom: 14,
    borderRadius: 50,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
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
