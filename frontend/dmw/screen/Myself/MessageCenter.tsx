import React, { Component, useState, useEffect } from 'react';
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
import { useDmwApi } from '../../../DmwApiProvider/DmwApiProvider';
import { useTranslation } from 'react-i18next'
const screenWidth = Dimensions.get('window').width;
const scale = Dimensions.get('window').scale;
const screenHeight = Dimensions.get('window').height;
const MessageCenter = (props) => {
  const { t, i18n } = useTranslation();
  const { post } = useDmwApi()
  const [type, settype] = useState('zh')
  const [messageList, setMessageList] = useState({ auction: t("暂无新消息"), like: t("暂无新消息"), sell: t("暂无新消息"), system: t("暂无新消息") })
  useEffect(() => {
    post('/index/message/get_messages').then(res => {
      console.log(res, '消息');
      setMessageList(res.data)
    })
  }, [])

  return (
    <SafeAreaView
      style={{
        paddingTop: 40,
        position: 'relative',
        height: Dimensions.get('window').height,
        backgroundColor: '#fff'
      }}>
      <View style={{ paddingLeft: 20, paddingRight: 20 }}>
        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.navigate('SystemNotification',{type:1})
          }}>
          {
            <View style={styles.box}>
              <View>
                <Image
                  style={styles.img}
                  source={require('../../assets/img/my/MessageCenter1.png')}></Image>
              </View>
              <View style={{}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.title}>{t("系统通知")}</Text>
                  <Text style={styles.time}>15:28</Text>
                </View>
                <Text style={styles.test} numberOfLines={1}>
                  {t(messageList.system)}
                </Text>
              </View>
            </View>
          }
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.navigate('ILikeIt',{type:2})
          }}
        >
          {
            <View style={styles.box}>
              <View>
                <Image
                  style={styles.img}
                  source={require('../../assets/img/my/MessageCenter2.png')}></Image>
              </View>
              <View style={{}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.title}>{t("喜欢")}</Text>
                  <Text style={styles.time}>15:28</Text>
                </View>
                <Text style={styles.test}>
                  {t(messageList.like)}
                  {/* <Text style={{ color: '#897EF8' }}>Sdd、122</Text><Text>等3人 收藏</Text> */}
                </Text>
              </View>
            </View>
          }
        </TouchableWithoutFeedback>



        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.navigate('SystemNotification',{type:3})
          }}
        >
          {
            <View style={styles.box}>
              <View>
                <Image
                  style={styles.img}
                  source={require('../../assets/img/my/MessageCenter3.png')}></Image>
              </View>
              <View style={{}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.title}>{t("拍卖")}</Text>
                  <Text style={styles.time}>15:28</Text>
                </View>
                <Text style={styles.test}>
                    {t(messageList.auction)}
                  {/* 藏品《<Text style={{ color: '#897EF8' }}>sdssd</Text>》拍卖结束用户<Text style={{ color: '#897EF8' }}>123</Text>以100USDT的价... */}
                </Text>
              </View>
            </View>
          }
        </TouchableWithoutFeedback>





        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.navigate('SystemNotification',{type:4})
          }}
        >
          {
            <View style={styles.box}>
              <View>
                <Image
                  style={styles.img}
                  source={require('../../assets/img/my/MessageCenter4.png')}></Image>
              </View>
              <View style={{}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.title}>{t("售卖")}</Text>
                  <Text style={styles.time}>15:28</Text>
                </View>
                <Text style={styles.test}>
                {t(messageList.sell)}
                  {/* 藏品《<Text style={{ color: '#897EF8' }}>sdssd</Text>》售卖给用户<Text style={{ color: '#897EF8' }}>123</Text>，成交价100USDT... */}
                </Text>
              </View>
            </View>
          }
        </TouchableWithoutFeedback>

      </View>
    </SafeAreaView>
  );
}

export default MessageCenter

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 5
  },
  img: {
    width: 50,
    height: 60,
    marginRight: 10,
    marginTop: 12
  },
  box: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'pink',
    alignItems: 'center',
    marginBottom: 60
  },
  test: {
    color: '#999999',
    fontSize: 12,
    width: screenWidth - 40 - 50,
  },
  time: {
    color: '#999999',
    fontSize: 10,
  },
});
