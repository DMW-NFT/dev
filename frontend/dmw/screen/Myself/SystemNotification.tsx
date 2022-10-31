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
import { faListUl, faChevronRight, faCogs } from '@fortawesome/free-solid-svg-icons';
import { useDmwLogin } from '../../../loginProvider/constans/DmwLoginProvider';
import { useDmwApi } from '../../../DmwApiProvider/DmwApiProvider';
const screenWidth = Dimensions.get('window').width;
const scale = Dimensions.get('window').scale;
const screenHeight = Dimensions.get('window').height;
const SystemNotification = (props) => {
  const { post, formData, Toast } = useDmwApi()
  const [list, setlist] = useState([])
  useEffect(() => {
    getlist()
  }, [])

  const getlist = () => {
    post('/index/message/get_messages_list', formData({ type: props.route.params.type })).then(res => {
      console.log(res.data.data, '消息列表');
      setlist(res.data.data)
    })
  }

  const delnotice = (id) => {
    post('/index/message/del_message', formData({ id, type: props.route.params.type })).then(res => {
      console.log(res);
      Toast('删除成功')
      getlist()
    })
  }

  return (
    <SafeAreaView
      style={{
        paddingTop: 44,
        position: 'relative',
        height: Dimensions.get('window').height,
        backgroundColor: '#F5F5F5'
      }}>
      <View style={{ paddingLeft: 20, paddingRight: 20 }}>

        {
          list.map((item, index) => (
            <View style={styles.View}>
              <View style={styles.header}>
                <View style={styles.headerLeft}>
                  <FontAwesomeIcon icon={faCogs} color="#707070" size={16} />
                  <Text style={{ marginLeft: 10 }}>{item.type}</Text>
                </View>
                <FontAwesomeIcon icon={faListUl} color="#707070" size={16} />
              </View>

              <View style={styles.titleBox}>
                <View>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.time}>{item.create_time}</Text>
                </View>
                <Text style={styles.del} onPress={() => delnotice(item.id)}>删除</Text>
              </View>

              <View style={{ marginBottom: 15 }}>
                <Text style={styles.content} numberOfLines={3}>
                  {item.content}
                  {/* <Text style={{ fontSize: 12, color: '#999999' }}>全文</Text> */}
                </Text>
              </View>

              <TouchableWithoutFeedback
                onPress={() => {
                  props.navigation.navigate('NoticeDetails', { id: item.id });
                }}
              >
                <View
                  style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5, paddingBottom: 10 }}>
                  <Text>查看详情</Text>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    color="#707070"
                    size={16}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          ))
        }
      </View>
    </SafeAreaView>
  );
}

export default SystemNotification

const styles = StyleSheet.create({
  View: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20
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
    marginBottom: 20,
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
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    fontSize: 12,
    color: '#666666',
  },
  del: {
    color: '#666666',
    fontSize: 12,
    fontWeight: '500'
  }
});
