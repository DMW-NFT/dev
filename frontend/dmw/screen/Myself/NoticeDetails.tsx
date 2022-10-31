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

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faListUl, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useDmwApi } from '../../../DmwApiProvider/DmwApiProvider';
const screenWidth = Dimensions.get('window').width;
const scale = Dimensions.get('window').scale;
const screenHeight = Dimensions.get('window').height;
const NoticeDetails = (props) => {
  const { post, formData } = useDmwApi()
  const [data, setdata] = useState({
    "conf_id": 2,
    "content": "",
    "create_time": "2022-10-19 14:29:10",
    "id": 3, "status": 1,
    "title": "1.2万圣节版本",
    "type": "版本更新"
  })
  useEffect(() => {
    post("/index/message/get_message_system_details", formData({ id: props.route.params.id })).then(res => {
      console.log(res, '系统通知详情');
      setdata(res.data)
    })
  }, [])
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fff',
        position: 'relative',
        height: Dimensions.get('window').height,
      }}>
      <View style={{ paddingLeft: 20, paddingRight: 20 }}>
        <View style={styles.View}>

          <View style={styles.titleBox}>
            <View>
              <Text style={styles.title}>{data.title}</Text>
              <Text style={styles.time}>{data.create_time}</Text>
            </View>
          </View>

          <View style={{ marginBottom: 15 }}>
            <Text style={styles.content}>
              {data.content}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );

}

export default NoticeDetails

const styles = StyleSheet.create({
  View: {
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circles: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    marginRight: 10,
  },
  titleBox: {
    marginBottom: 39,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  time: {
    fontSize: 10,
    color: '#999999',
    marginTop: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  content: {
    fontSize: 12,
    color: '#666666',
  },
  del: {
    color: '#666666',
    fontSize: 12,
    fontWeight: '500',
  },
});
