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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
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
  const [listType, setListTtpe] = useState([])
  const [listE, setlistE] = useState([])
  const [BlockchainList, setBlockchainList] = useState([])
  const { post, formData, Toast } = useDmwApi()
  const [IpfsImgUrl1, setIpfsImgUrl1] = useState({ base64: '', url: '' })
  const [IpfsImgUrl2, setIpfsImgUrl2] = useState({ base64: '', url: '' })
  const [IpfsImgUrl3, setIpfsImgUrl3] = useState({ base64: '', url: '' })
  const [upUrl, setUpUrl] = useState('')
  const [upUrl2, setUpUrl2] = useState('')
  const [upUrl3, setUpUrl3] = useState('')
  const [activeType, setactiveType] = useState({ value: '1', name: '收藏品' })
  const [activeEm, setactiveEm] = useState({ value: 'Ethereum', name: 'Ethereum' })
  const [isShowType, setisShowType] = useState(false)//是否展开类型选择框
  const [isShowE, setisShowE] = useState(false)//是否展开区块链选择框




  useEffect(() => {
    getCoType()
    getBlockchain()
  }, [])

  useEffect(() => {
    console.log(123);

  }, [loading, upUrl])

  // 获取区块链
  const getBlockchain = () => {
    post('/index/common/get_network').then(res => {
      // console.log(res, '区块链类型');
      setlistE(res.data)
    })
  }
  // 获取type类型
  const getCoType = () => {
    post('/index/common/get_categories').then(res => {
      // console.log(res, '合集类型');
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
  const typeTf = (type, boll) => {
    if (type == 1) {
      setLoding1(boll)
    } else if (type == 2) {
      setLoding(boll)
    } else if (type == 3) {
      setLoding3(boll)
    }
  }

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
      post("/index/collection/upload_logo", formData).then((res) => {
        console.log(res, "上传");
        let jex = {
          "code": 200, "data":
          {
            "att_dir": "/storage/20221024/aa7074129064a7d83ba06e15c2636769.jpg", "att_size": 62301,
            "att_type": "jpg", "id": "SQLSTATE[HY000]: General error: 1205 Lock wait timeout exceeded; try restarting transaction",
            "module_type": 2, "name": "20221024/aa7074129064a7d83ba06e15c2636769.jpg",
            "real_name": "rn_image_picker_lib_temp_0745d4c1-c474-4f53-8e8e-c0eaf3f77d03.jpg",
            "upload_type": 1, "url": "https://dmw.cougogo.com//storage/20221024/aa7074129064a7d83ba06e15c2636769.jpg"
          }, "message": "ok"
        }
        if (res.code == 200) {
          setUpUrl(res.data.url)
        }
      });
    } catch (err) {
      // 在文件上传过程中出现错误
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };


  const uuup = (type) => {
    // typeTf(type, true)
    let options = {
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      mediaType: 'photo',
    };
    launchImageLibrary(options, ((response) => {
      if (response.didCancel) {
        typeTf(type, false)
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        typeTf(type, false)
        return;
      } else if (response.errorCode == 'permission') {
        typeTf(type, false)
        return;
      } else if (response.errorCode == 'others') {
        typeTf(type, false)
        return;
      }

      console.log(response.assets[0], '4578');
      let formData = new FormData();
      let data = {
        "fileCopyUri": null,
        "name": response.assets[0].fileName,
        "size": response.assets[0].fileSize,
        "type": "image/jpeg",
        "uri": response.assets[0].uri
      }


      formData.append("file", data);

      if (type == 1) {
        setLoding1(true)
        // setIpfsImgUrl1({ base64: response.assets[0].base64, url: '' })
        post('/index/collection/upload_logo', formData).then(res => {
          console.log(res, '标识');
          Toast('上传成功!')
          setLoding1(false)
        })
      } else if (type == 2) {
        setIpfsImgUrl2({ base64: response.assets[0].base64, url: '' })
      } else if (type == 3) {
        setIpfsImgUrl3({ base64: response.assets[0].base64, url: '' })
      }



    }))
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
              {
                upUrl ?
                  <Image
                    style={{ width: '100%', height: '100%' }}
                    source={{ uri: upUrl }}></Image>
                  :
                  <>
                    <Image
                      style={{ width: 96 / 2, height: 96 / 2 }}
                      source={require('../../assets/img/my/3336.png')}></Image>
                    <Text>上传图像</Text>
                  </>
              }

            </View>
          </TouchableWithoutFeedback>
        }


        <Text style={{ fontSize: 16, marginBottom: 17 }}>
          特色图片
        </Text>
        {
          loading ? <View style={styles.up}><Spinner /></View> : <TouchableWithoutFeedback onPress={() => uuup(2)}>
            <View style={styles.up}>
              {
                IpfsImgUrl2.base64 ?
                  <Image
                    style={{ width: '100%', height: '100%' }}
                    source={{ uri: `data:image/jpeg;base64,${IpfsImgUrl2.base64}` }}></Image>
                  :
                  <>
                    <Image
                      style={{ width: 96 / 2, height: 96 / 2 }}
                      source={require('../../assets/img/my/3336.png')}></Image>
                    <Text>上传图像、视频</Text>
                  </>
              }


            </View>
          </TouchableWithoutFeedback>
        }
        <Text style={{ fontSize: 16, marginBottom: 17 }}>
          横幅banner
        </Text>

        {
          loading3 ? <View style={styles.up3}><Spinner /></View> : <TouchableWithoutFeedback onPress={() => uuup(3)}>
            <View style={styles.up3}>
              {
                IpfsImgUrl3.base64 ?
                  <Image
                    style={{ width: '100%', height: '100%' }}
                    source={{ uri: `data:image/jpeg;base64,${IpfsImgUrl3.base64}` }}></Image> :
                  <>
                    <Image
                      style={{ width: 96 / 2, height: 96 / 2 }}
                      source={require('../../assets/img/my/3336.png')}></Image>
                    <Text>上传图像、视频</Text></>
              }

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
            选择合集
          </Text>

          <TouchableWithoutFeedback onPress={() => { setisShowType(!isShowType) }}>
            <View style={[styles.input, {
              flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
            }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../assets/img/index/any2.jpg')} style={{ width: 24, height: 24, borderRadius: 12 }}></Image>
                <Text style={{ marginLeft: 10 }}>
                  {activeType.name}
                </Text></View>
              <FontAwesomeIcon
                icon={faAngleDown}
                color="#707070"
                size={16}
              />
            </View>
          </TouchableWithoutFeedback>
          {
            isShowType ?
              <View style={{
                paddingTop: 20, backgroundColor: '#fff', marginBottom: 20, marginTop: 2, borderRadius: 12, borderWidth: 1, borderColor: '#ccc', paddingBottom: 20
              }}>

                {
                  listType && listType.length ?
                    listType.map((item, index) => (
                      <Text onPress={() => { setactiveType({ value: item.value, name: item.name }) }}
                        style={{
                          color: activeType.value == item.value ? 'blue' : '#333',
                          paddingTop: 10, paddingBottom: 10,
                          backgroundColor: activeType.value == item.value ? 'rgba(40, 120, 255,0.1)' : '#fff',
                          paddingLeft: 20
                        }}>{item.name}</Text>

                    )) : null
                }


              </View> : null
          }

        </View>

        <View style={[styles.lis, { marginBottom: 20 }]}>
          <Text style={{ fontSize: 16, marginBottom: 17 }}>
            选择区块链
          </Text>

          <TouchableWithoutFeedback onPress={() => { setisShowE(!isShowE) }}>
            <View style={[styles.input, {
              flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
            }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../assets/img/index/any2.jpg')} style={{ width: 24, height: 24, borderRadius: 12 }}></Image>
                <Text style={{ marginLeft: 10 }}>
                  {activeEm.name}
                </Text></View>
              <FontAwesomeIcon
                icon={faAngleDown}
                color="#707070"
                size={16}
              />
            </View>
          </TouchableWithoutFeedback>
          {
            isShowE ?
              <View style={{
                paddingTop: 20, backgroundColor: '#fff', marginBottom: 20, marginTop: 2, borderRadius: 12, borderWidth: 1, borderColor: '#ccc', paddingBottom: 20
              }}>

                {
                  listE && listE.length ?
                    listE.map((item, index) => (
                      <Text onPress={() => { if (!listE) return setactiveEm({ value: item.value, name: item.name }) }}
                        style={{
                          color: activeEm.value == item.value ? 'blue' : '#333',
                          paddingTop: 10, paddingBottom: 10,
                          backgroundColor: activeEm.value == item.value ? 'rgba(40, 120, 255,0.1)' : '#fff',
                          paddingLeft: 20
                        }}>{item.name}</Text>

                    )) : null
                }


              </View> : null
          }

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
    overflow: 'hidden'
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
    overflow: 'hidden'
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
    justifyContent: 'center',
    overflow: 'hidden'
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