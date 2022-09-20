import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
  FlatList
} from 'react-native';
import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import List from '../../Components/List';
const screenWidth = Dimensions.get('window').width;
const scale = Dimensions.get('window').scale; 
export default class Home extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      enableScrollViewScroll:false,
      typename: 'nft',
      list: [{},{},{},{},{},{},{},{}],
      refreshing:false,  
    }
    this.paging = this.paging.bind(this)
  } 
  paging(typename) { 
    this.setState({
      typename: typename
    }) 
  }
   getList=()=>{
        let list1=[{}]
        this.setState({
          list:this.state.list.concat(list1) 
        })  
        console.log(this.state.list,2)
    } 
 


 onEnableScroll = value => {
  this.setState({
    enableScrollViewScroll: value,
  });
};
  render() {
    return (
      <SafeAreaView  style={{backgroundColor:'#fff'}}> 
        {/* scrollEnabled={this.state.enableScrollViewScroll} */}
        <ScrollView  showsVerticalScrollIndicator={false}  >
          <View style={styles.index_box}>
            {/* title -- start*/}
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginBottom: 13,
              }}>
              <Text style={styles.title}>
                <Text>DMW </Text>
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 52,
                }}>
                  <TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate('searchScreen')}}>
                    <Image
                      style={styles.top_img}
                      source={require('../../assets/img/allIconAndlImage/3571.png')}></Image>
                  </TouchableWithoutFeedback>
                <Image
                  style={[styles.top_img, { marginLeft: 30 }]}
                  source={require('../../assets/img/allIconAndlImage/3572.png')}></Image>
              </View>
            </View>
            {/* title -- end */}
          </View>
          {/* 水平滑动按钮 -- start */}
          <ScrollView
            style={styles.shuipin}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <Text style={styles.slidebutton} onPress={()=>{this.props.navigation.navigate('categrayScreen',{categray:'Muti collectionsv'})}}> Muti collectionsv </Text>

            <Text style={styles.slidebutton} onPress={()=>{this.props.navigation.navigate('categrayScreen',{categray:'music'})}}>music </Text>
            <Text style={styles.slidebutton}>art </Text>
            <Text style={styles.slidebutton}>测试 </Text>
          </ScrollView> 

          {/* 水平滑动按钮 -- end */}
          {/* 轮播图 -- start*/}
          <View style={[styles.index_box, { marginBottom: 25, }]}>
            <View style={{ height: 140, }}>
              <Swiper
                style={styles.wrapper}
                showsPagination={false}
                autoplayTimeout={4}
                autoplay={true}
                loop={true}>
                <View style={styles.slide1}>
                  <Image
                    style={styles.Swiperimg}
                    source={require('../../assets/img/index/any1.jpg')}></Image>
                </View>
                <View style={styles.slide2}>
                  <Image
                    style={styles.Swiperimg}
                    source={require('../../assets/img/index/any2.jpg')}></Image>
                </View>
                <View style={styles.slide3}>
                  <Image
                    style={styles.Swiperimg}
                    source={require('../../assets/img/index/any3.jpg')}></Image>
                </View>
                <View style={styles.slide1}>
                  <Image
                    style={styles.Swiperimg}
                    source={require('../../assets/img/index/any1.jpg')}></Image>
                </View>
                <View style={styles.slide2}>
                  <Image
                    style={styles.Swiperimg}
                    source={require('../../assets/img/index/any2.jpg')}></Image>
                </View>
                <View style={styles.slide3}>
                  <Image
                    style={styles.Swiperimg}
                    source={require('../../assets/img/index/any3.jpg')}></Image>
                </View>
                <View style={styles.slide1}>
                  <Image
                    style={styles.Swiperimg}
                    source={require('../../assets/img/index/any1.jpg')}></Image>
                </View>
                <View style={styles.slide2}>
                  <Image
                    style={styles.Swiperimg}
                    source={require('../../assets/img/index/any2.jpg')}></Image>
                </View>
                <View style={styles.slide3}>
                  <Image
                    style={styles.Swiperimg}
                    source={require('../../assets/img/index/any3.jpg')}></Image>
                </View>
              </Swiper>
            </View>
          </View>
          {/* 轮播图 -- end */}

          {/* line -- start*/}
          <View style={styles.line}></View>
          {/* line -- end */}
          {/* tab栏 -- start */}
          <View style={[styles.index_box, styles.daohang]}>
            <Text style={[this.state.typename != 'nft' ? styles.daonghang_text : styles.daonghang_text_ative]} onPress={() => this.paging('nft')}>NFT</Text>
            <Text style={[this.state.typename != 'Blind' ? styles.daonghang_text : styles.daonghang_text_ative]} onPress={() => this.paging('Blind')}>Blind box</Text>
          </View>
          {/* tab栏 -- end */}
          {/* line -- start*/}
          <View style={styles.line}></View>
          {/* line -- end */}
          <View style={[styles.listbox]}>
          {/* onTouchStart={() => {this.onEnableScroll(false);}}
                onMomentumScrollEnd={() => {this.onEnableScroll(true);}} */}
          <FlatList
                refreshing={this.state.refreshing}
                ListEmptyComponent={() => {
                    return <Text>空空如也</Text>
                    // 列表为空展示改组件
                }}
                // 一屏幕展示几个
                number={10}
                //  2列显示
                numColumns={2}
                data={this.state.list}
                renderItem={({item})=>{
                  return <List list={item} type={1} navigatetoDetail={(id)=>{this.props.navigation.navigate('goodsDetail',{id:id})}} />
                }} 
                keyExtractor={(item, index) => index}
                ListFooterComponent={() => { 
                    // 声明尾部组件
                    return <Text style={{ textAlign: 'center' }}>没有更多了</Text>
                }}
                // 下刷新
                onEndReachedThreshold={0.1} //表示还有10% 的时候加载onRefresh 函数
                onEndReached={this.getList} 
            >
            </FlatList>
              
          </View>
        </ScrollView> 
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  daohang:{
    flexDirection:'row',
  }, 
  listbox: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  index_box: {
    paddingLeft: 20,
    paddingRight: 20,
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
  slidebutton: {
    fontFamily: 'Source Han Sans CN',
    fontSize: 14,
    fontWeight: '700',
    borderColor: '#877EF0',
    borderWidth: 1,
    borderRadius: 50,
    marginRight: 15,
    paddingLeft: 20,
    paddingRight: 20,
    lineHeight: 40,
    color: '#666666',
  },
  shuipin: {
    marginLeft: 20,
    height: 40,
    marginBottom: 20,
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  Swiperimg: {
    width: screenWidth - 40,
    height: 140,
    resizeMode: 'stretch',
  },
  line: {
    borderColor: '#CCCCCC',
    width: screenWidth,
    height: 1,
    borderWidth: 1 / scale,
  },
  daonghang_text: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Source Han Sans CN',
    height: 56,
    lineHeight: 56,
    flex: 1,
    color: '#666666',
    textAlign: 'center',
    // borderBottomColor:'#897EF8',
    // borderBottomWidth:3
  },
  daonghang_text_ative: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Source Han Sans CN',
    height: 56,
    lineHeight: 56,
    flex: 1,
    textAlign: 'center',
    borderBottomColor: '#897EF8',
    borderBottomWidth: 3,
    color: '#897EF8',
    borderRadius: 1,
  }
});  
 