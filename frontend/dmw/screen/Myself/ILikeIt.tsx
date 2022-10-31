import React, { useState, useEffect } from 'react';
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

const screenWidth = Dimensions.get('window').width;
const scale = Dimensions.get('window').scale;
const screenHeight = Dimensions.get('window').height;
const ILikeIt = () => {
  const [list, setlist] = useState([])
  const { post, formData } = useDmwApi()
  useEffect(() => {
    post('/index/message/get_messages_list', formData({ type: 2 })).then(res => {
      console.log(res.data.data, '喜欢列表');
      setlist(res.data.data)
    })
  }, [])
  return (
    <SafeAreaView
      style={{
        paddingTop: 30,
        position: 'relative',
        height: Dimensions.get('window').height,
        backgroundColor: '#fff'
      }}>
      <View style={{ paddingLeft: 20, paddingRight: 20 }}>
        {
          list.map((item, index) => (
            <View style={styles.box}>
              <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={{uri:item.avatar_url}}></Image>
              <View style={styles.info}>
                <Text style={{ fontSize: 14, color: '#666666' }}>{item.nickname}</Text>
                <View style={styles.time}>
                  <Text style={{ fontSize: 12, color: '#666666' }}>赞了这个合集</Text>
                  <Text style={{ marginLeft: 10, fontSize: 10, color: '#999999' }}>{item.create_time}</Text>
                </View>
              </View>
              <Image style={{ width: 60, height: 60 }} source={{uri:item.image_attachment_id}}></Image>
            </View>
          ))
        }

      </View>

    </SafeAreaView>
  );
}

export default ILikeIt

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    marginBottom: 30
  },
  info: {
    marginLeft: 12,
    flex: 1,
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
