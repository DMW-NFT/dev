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
import { Card, Layout } from '@ui-kitten/components';
import { Surface } from 'react-native-paper';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native-gesture-handler';
const screenWidth = Dimensions.get('window').width;
const scale = Dimensions.get('window').scale;
const screenHeight = Dimensions.get('window').height;


const AddCreateCollection = (props) => {
  const { t, i18n } = useTranslation();
  const [address, setaddress] = useState('')
  const [title, setTitle] = useState('')//标题
  const [explain, setExplain] = useState('')//简介
  const [loading, setLoding] = useState(false)
  const [loading1, setLoding1] = useState(false)
  const [loading3, setLoding3] = useState(false)
  const [Creating, setCreating] = useState(false)
  const [listType, setListTtpe] = useState([])
  const [listE, setlistE] = useState([])
  const { post, formData, Toast } = useDmwApi()
  const [upUrl, setUpUrl] = useState('')
  const [upUrl2, setUpUrl2] = useState('')
  const [upUrl3, setUpUrl3] = useState('')
  const [upUrlid, setUpUrlid] = useState(null)
  const [upUrl2id, setUpUrl2id] = useState(null)
  const [upUrl3id, setUpUrl3id] = useState(null)
  const [activeType, setactiveType] = useState({ value: '' })
  const [activeEm, setactiveEm] = useState({ value: '', })
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
      setactiveEm(res.data[0])
    })
  }
  // 获取type类型
  const getCoType = () => {
    post('/index/common/get_categories').then(res => {
      // console.log(res, '合集类型');
      setListTtpe(res.data)
      setactiveType(res.data[0])
    })
  }

  const Sure = () => {
    // if()
    setCreating(true)
    let data = {
      name: title,
      logo: upUrlid,
      cover: upUrl2id,
      banner: upUrl3id,
      details: explain,
      type_id: activeType.value,
      network: activeEm.value
    }
    let params = formData(data)
    post('/index/collection/add', params).then(res => {
      console.log(res, '创建各级');
      if (res.code == 200) {
        Toast(t('创建成功'))
        setCreating(false)
        props.navigation.navigate('myCollection', { isReload: true })
      }
    })
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
          if (res.code != 200) {
            Toast(res.message)
            setLoding1(false)
            return
          }
          setUpUrlid(res.data.id)
          setUpUrl(res.data.url)
          console.log(res, '标识');
          Toast(t('上传成功'))
          setLoding1(false)
        })
      } else if (type == 2) {
        setLoding(true)
        // setIpfsImgUrl1({ base64: response.assets[0].base64, url: '' })
        post('/index/collection/upload_cover', formData).then(res => {
          if (res.code != 200) {
            Toast(res.message)
            setLoding(false)
            return
          }
          setUpUrl2id(res.data.id)
          setUpUrl2(res.data.url)
          console.log(res.data.url, '标识');
          Toast(t('上传成功'))
          setLoding(false)
        })
      } else if (type == 3) {
        setLoding3(true)
        // setIpfsImgUrl1({ base64: response.assets[0].base64, url: '' })
        post('/index/collection/upload_banner', formData).then(res => {
          if (res.code != 200) {
            Toast(res.message)
            setLoding3(false)
            return
          }
          setUpUrl3id(res.data.id)
          setUpUrl3(res.data.url)
          console.log(res.data.url, '标识');
          Toast(t('上传成功'))
          setLoding3(false)
        })
      }



    }))
  }


  return (
    <SafeAreaView
      style={{

      }}>
      <View style={{
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        position: 'relative',
        // height: Dimensions.get('window').height,
        // paddingBottom: 200,
        backgroundColor: '#fff'
      }}>
        {
          Creating ? <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Spinner />
            <Text style={{ marginTop: 10 }}>{t("正在创建中")}...</Text>
          </View> :

            <ScrollView showsVerticalScrollIndicator={false}>

              <Text style={{ fontSize: 16, marginBottom: 17 }}>
                {t("形象标识")}
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
                          <Text>{t("上传图像")}</Text>
                        </>
                    }

                  </View>
                </TouchableWithoutFeedback>
              }


              <Text style={{ fontSize: 16, marginBottom: 17 }}>
                {t("特色图片")}
              </Text>
              {
                loading ? <View style={styles.up}><Spinner /></View> : <TouchableWithoutFeedback onPress={() => uuup(2)}>
                  <View style={styles.up}>
                    {
                      upUrl2 ?
                        <Image
                          style={{ width: '100%', height: '100%' }}
                          source={{ uri: upUrl2 }}></Image>
                        :
                        <>
                          <Image
                            style={{ width: 96 / 2, height: 96 / 2 }}
                            source={require('../../assets/img/my/3336.png')}></Image>
                          <Text>{t("上传图像、视频")}</Text>
                        </>
                    }


                  </View>
                </TouchableWithoutFeedback>
              }
              <Text style={{ fontSize: 16, marginBottom: 17 }}>
                {t("横幅")}
              </Text>

              {
                loading3 ? <View style={styles.up3}><Spinner /></View> : <TouchableWithoutFeedback onPress={() => uuup(3)}>
                  <View style={styles.up3}>
                    {
                      upUrl3 ?
                        <Image
                          style={{ width: '100%', height: '100%' }}
                          source={{ uri: upUrl3 }}></Image> :
                        <>
                          <Image
                            style={{ width: 96 / 2, height: 96 / 2 }}
                            source={require('../../assets/img/my/3336.png')}></Image>
                          <Text>{t("上传图像、视频")}</Text></>
                    }

                  </View>
                </TouchableWithoutFeedback>
              }

              <View style={styles.lis}>
                <Text style={{ fontSize: 16, marginBottom: 17 }}>
                  {t("集合名称")}
                </Text>

                <TextInput
                  maxLength={12}
                  placeholder={t("请输入藏品名")}
                  keyboardType="default"
                  style={[styles.input]}
                  onChangeText={e => setTitle(e)}
                  value={title}
                />
              </View>

              <View style={[styles.lis, { marginBottom: 20 }]}>
                <Text style={{ fontSize: 16, marginBottom: 17 }}>
                  {t("简介")}
                </Text>
                {/* <TouchableWithoutFeedback onPress={()=>{}} onStartShouldSetResponderCapture={()=>true} >
                       
                    </TouchableWithoutFeedback> */}
                <TextInput
                  placeholder={t("请输入简介")}
                  keyboardType="default"
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
                  {t("选择合集")}
                </Text>

                <TouchableWithoutFeedback onPress={() => { setisShowType(!isShowType) }}>
                  <View style={[styles.input, {
                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                  }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image source={require('../../assets/img/index/default.png')} style={{ width: 24, height: 24, borderRadius: 12 }}></Image>
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
                            <Text onPress={() => { setactiveType({ value: item.value, name: item.name }); setisShowType(false) }}
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
                  {t("选择区块链")}
                </Text>

                <TouchableWithoutFeedback onPress={() => {
                  if (!listE) {
                    Toast('未加载到其他')
                    return
                  } setisShowE(!isShowE)
                }}>
                  <View style={[styles.input, {
                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                  }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image source={require('../../assets/img/index/default.png')} style={{ width: 24, height: 24, borderRadius: 12 }}></Image>
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
                            <Text onPress={() => { setactiveEm({ value: item.value, name: item.name }); setisShowE(false) }}
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
              <TouchableOpacity onPress={() => Sure()} style={styles.btn}>
                <Text style={{
                  color: '#fff',
                  height: 50,
                  lineHeight: 50,
                  textAlign: 'center',
                  fontSize:20
                }}>{t("创建")}</Text>
              </TouchableOpacity>

            </ScrollView>

        }
      </View>






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

    // marginRight: 20,
    // marginLeft: 20,
    borderRadius: 50,
    marginBottom: 20,
    // position: 'absolute',
    // bottom: 138,
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
