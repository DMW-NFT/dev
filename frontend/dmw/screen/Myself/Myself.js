import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Pressable
} from 'react-native';
import React, { Component } from 'react';
import Tabcolumn from './Tabcolumn';
import Screen from '../../Components/screen';
import Search from '../../Components/Searchbox';
import Lmodal from './leftModal';  
const data = [
  {  
    typename: 'Status',  
    list: [
      { name: 'Buy now', id: 1, active: false },
      { name: 'On auction', id: 2, active: false },
      { name: 'Has offers', id: 3, active: false },
      { name: 'most viewed', id: 4, active: false },
    ],
  },
  {
    typename: 'sort by',
    list: [
      { name: 'recently created', id: 5, active: false },
      { name: 'most viewed', id: 6, active: false },
      { name: 'oldest', id: 7, active: false },
      { name: 'Low to High', id: 8, active: false },
      { name: 'High to Low', id: 9, active: false },
    ],
  },
];
const screenWidth = Dimensions.get('window').width;
const scale = Dimensions.get('window').scale;
export default class Myself extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typename: '我的藏品',
      visible: false,
      strText:'',
      lMvisible:false
    };
    this.paging = this.paging.bind(this);
  }
  navigateto=(val)=>{
    console.log(val)
     this.props.navigation.navigate(val)
  }
  close() {
    this.setState({
      visible: false,
      lMvisible:false
    });
  }
  visible() {
    this.setState({
      visible: true,
    });
  }
  paging(typename) {
    this.setState({
      typename: typename,
    });
  }
  render() {
    return (
      <SafeAreaView style={{backgroundColor:'#fff',flex: 1}}>
        <View style={{backgroundColor:'#fff'}}>
          <View style={styles.index_box}>
            {/* title -- start*/}
            <View
              style={{
                marginBottom: 28,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: 52,
                }}>
                  <Pressable onPress={()=>{this.setState({lMvisible : true})}}>
                  <Image
                  style={styles.top_img}
                  source={require('../../assets/img/my/top_left_list.png')}></Image>
                  </Pressable>
                <Pressable onPress={()=>{this.props.navigation.navigate('SetUp')}}>
                <Image
                  style={styles.top_img}
                  source={require('../../assets/img/my/top_right_set.png')}></Image>
                </Pressable>
              </View>
            </View>
            {/* title -- end */}

            {/* 头像 -- start */}
            <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
              <Image
                style={styles.headportrait}
                source={require('../../assets/img/my/any2.jpg')}></Image>
            </View>
            <Text style={styles.nickname}>Simon</Text>
            <Text style={styles.identification}>
              {/* 此处勿忘加空格 */}
              Byf3234ye89wcnc8ecbcvsc9dbcw{' '}
              <Image
                style={{ width: 12, height: 12 }}
                source={require('../../assets/img/my/copy.png')}></Image>
            </Text>
            {/* 头像 -- end */}
          </View>

          {/* tab栏 -- start */}
          <View style={[styles.index_box, { paddingLeft: 40 }]}>
            <Tabcolumn
              typename={this.state.typename}
              paging={typename => {
                this.paging(typename);
              }}></Tabcolumn>
          </View>
          {/* tab栏 -- end */}
          {/* line -- start*/}
          <View style={styles.line}></View>
          {/* line -- end */}
          <View style={styles.index_box}>
            <Search onChange={(strText) => { this.setState({ strText }) }} visible={() => this.visible()}></Search>
          </View>
          {/* <Text onPress={() => this.visible()}>123</Text> */}

          <Screen
            title="select filter"
            style={[styles.Screen]}
            visible={this.state.visible}
            close={() => this.close()}
            datalist={data}></Screen>
          </View>
        <Lmodal goto={(path)=>{this.props.navigation.navigate(path)}} style={[styles.Screen]}  close={() => this.close()} visible={this.state.lMvisible}></Lmodal>
        
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  Screen: {
    width: screenWidth,
    position: 'absolute',
  },
  index_box: {
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor:'#fff'
  },
  title: {
    height: 52,
    fontSize: 26,
    lineHeight: 52,
    fontWeight: '700',
    fontFamily: '',
    display: 'flex',
    justifyContent: 'space-around',
    includeFontPadding: false,
    textAlignVertical: 'center',
    color: '#666666',
  },
  top_img: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
  },
  line: {
    borderColor: '#CCCCCC',
    width: screenWidth,
    height: 1,
    borderWidth: 1 / scale,
    marginBottom: 20,
  },
  headportrait: {
    width: 160 / 2,
    height: 160 / 2,
    borderRadius: 80 / 2,
    marginBottom: 10,
  },
  nickname: {
    fontSize: 32 / 2,
    fontFamily: 'Source Han Sans CN',
    fontWeight: '700',
    lineHeight: 24,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 10,
  },
  identification: {
    fontWeight: '700',
    lineHeight: 24,
    color: '#999999',
    fontSize: 12,
    fontFamily: 'Source Han Sans CN',
    textAlign: 'center',
  },
  TextInput_s: {
    borderColor: 'red',
    backgroundColor: '#FFF',

    borderRadius: 20,
    width: 225,
    height: 50,
    justifyContent: 'center',
    lineHeight: 50,
  },
});
