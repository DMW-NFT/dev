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
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faListUl,faChevronRight} from '@fortawesome/free-solid-svg-icons';
const screenWidth = Dimensions.get('window').width;
const scale = Dimensions.get('window').scale;
const screenHeight = Dimensions.get('window').height;
export default class SystemNotification extends Component {
  constructor(porps) {
    super(porps);
    this.state = {
      Blockchainval: '',
    };
  }
  render() {
    return (
      <SafeAreaView
        style={{
          paddingTop: 44,
          position: 'relative',
          height: Dimensions.get('window').height,
        }}>
        <View style={{paddingLeft: 20, paddingRight: 20}}>
          <View style={styles.View}>
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <View style={styles.circles}></View>
                <Text>版本更新</Text>
              </View>
              <FontAwesomeIcon icon={faListUl} color="#707070" size={16} />
            </View>

            <View style={styles.titleBox}>
             <View>
             <Text style={styles.title}>标题标题</Text>
              <Text style={styles.time}>2022/6/24 19:15:30</Text>
             </View>
             <Text style={styles.del}>删除</Text>
            </View>

            <View style={{marginBottom:15}}>
              <Text style={styles.content}>
                正文看了丰富的离开了看到了对方可收到了反馈咖啡店李开复；SDK弗兰克代理费考虑到付款看开了房
                凉快地方；看；开放老师都快疯了
                打开正文看了丰富的离开了看到了对方可收到了反馈咖啡店李开复；在那个兄弟...
                <Text style={{fontSize:12,color:'#999999'}}>全文</Text>
              </Text>
            </View>

            <TouchableWithoutFeedback
              onPress={() => {
                this.props.navigation.navigate('NoticeDetails');
              }}
              onStartShouldSetResponderCapture={() => true}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>查看详情</Text>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  color="#707070"
                  size={16}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

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
    marginBottom: 20,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
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
  content:{
    fontSize:12,
    color:'#666666',
  },
  del:{
    color:'#666666',
    fontSize:12,
    fontWeight:'500'
  }
});
