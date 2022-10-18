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
import React, { useState, useEffect } from 'react';
import Swiper from 'react-native-swiper';
import List from '../../Components/List';
import { useDmwApi } from '../../../DmwApiProvider/DmwApiProvider';
import { Spinner } from '@ui-kitten/components';




const screenWidth = Dimensions.get('window').width;
const scale = Dimensions.get('window').scale;
const Home = (props) => {
  const [typename, setTypename] = useState('nft')
  const [enableScrollViewScroll, setenableScrollViewScroll] = useState(false)
  const [list, setlist] = useState([{}, {}, {}, {}, {}, {}, {}, {}])
  const [refreshing, setrefreshing] = useState(false)
  const { post, get, formData, Toast } = useDmwApi();
  const [imgList, setImglist] = useState([])
  const [NftList, setNftList] = useState([])
  const [blindlist, setblindlist] = useState([])
  const [loading, setLoding] = useState(false)
  const [page, setpage] = useState(1)
  const [bpage, setbpage] = useState(1)
  const [last_page, setlast_page] = useState(null)
  const [lastbpage, setlastbpage] = useState(null)


  useEffect(() => {
    console.log('post请求');

    get('/index/banner/list').then(res => {
      console.log(res, 'banner');
      setImglist(res.data)
    }).catch(err => {
      console.log(err, 'err');
    })

    geNftList(typename == 'nft' ? 1 : 2, 1)

  }, [])

  useEffect(() => {
    setLoding(false)
  }, [NftList])

  const geNftList = (type, page) => {
    setLoding(true)
    let params = { type: type || 1, page: page || 1, limit: 4 }
    console.log(params,'传参');
    
    let nftDataObj = formData(params)
    post('/index/home/get_home_nft', nftDataObj).then(res => {
      console.log(res.data.data, 'nft数据');
      if(type == 1){
        setNftList([...NftList,...res.data.data])
        setlast_page(res.data.last_page)
        setLoding(false)
      }else{
        setblindlist([...blindlist,...res.data.data])
        setlastbpage(res.data.last_page)
        setLoding(false)
      }
      
     
      
    })
  }


  const paging = (typename) => {
    setTypename(typename)
    if (typename == 'nft' && !NftList.length) {
      setNftList([])
      geNftList(1, 1)
    } else if(!blindlist.length){
      setblindlist([])
      geNftList(2, 1)
    }
  }
  const getList = () => {
    console.log('触底');
    console.log(page);
    
    let pageNumber
    if(last_page){
      if(typename == 'nft'){
        pageNumber = page + 1
      }else{
        pageNumber = bpage + 1
      }
     
      
       if(pageNumber > last_page){
      }else{
        geNftList(typename == 'nft' ? 1 : 2,pageNumber)
      }
     if(typename == 'nft'){
      setpage(page + 1)
     }else{
      setbpage(bpage + 1)
     }
    }
    
    
  }

  const onEnableScroll = (value) => {
    setenableScrollViewScroll(value)
  };
  return (
    <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
      {/* scrollEnabled={enableScrollViewScroll} */}
      <View style={{ flexDirection: 'column' }} >
        <View>
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
                <TouchableWithoutFeedback onPress={() => { props.navigation.navigate('searchScreen', { visible: false }) }}>
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
            <Text style={styles.slidebutton} onPress={() => { props.navigation.navigate('categrayScreen', { categray: 'Muti collectionsv' }) }}> Muti collectionsv </Text>

            <Text style={styles.slidebutton} onPress={() => { props.navigation.navigate('categrayScreen', { categray: 'music' }) }}>music </Text>
            <Text style={styles.slidebutton}>art </Text>
            <Text style={styles.slidebutton}>测试 </Text>
          </ScrollView>

          {/* 水平滑动按钮 -- end */}
          {/* 轮播图 -- start*/}
          <View style={[styles.index_box, { marginBottom: 25, }]}>
            <View style={{ height: 140, }}>
              {
                imgList.length ? <Swiper
                  showsPagination={false}
                  autoplayTimeout={4}
                  autoplay={true}
                  horizontal={true}
                  loop={true}
                >
                  {
                    imgList.map((item, index) => (
                      // <View style={styles.slide1}>
                      <Image
                        style={styles.Swiperimg}
                        key={index}
                        source={{ uri: item.attachment_text }} />
                      // </View>
                    ))
                  }
                </Swiper> : null
              }
            </View>
          </View>
          {/* 轮播图 -- end */}

          {/* line -- start*/}
          <View style={styles.line}></View>
          {/* line -- end */}
          {/* tab栏 -- start */}
          <View style={[styles.index_box, styles.daohang]}>
            <Text style={[typename != 'nft' ? styles.daonghang_text : styles.daonghang_text_ative]} onPress={() => paging('nft')}>NFT</Text>
            <Text style={[typename != 'Blind' ? styles.daonghang_text : styles.daonghang_text_ative]} onPress={() => paging('Blind')}>Blind box</Text>
          </View>
          {/* tab栏 -- end */}
          {/* line -- start*/}
          <View style={styles.line}></View>
          {/* line -- end */}
        </View>
        <View style={[styles.listbox]}>
          {/* onTouchStart={() => {onEnableScroll(false);}}
                                onMomentumScrollEnd={() => {onEnableScroll(true);}} */}

          {
            !loading ? <FlatList
              refreshing={refreshing}
              style={{ height: '55%' }}
              ListEmptyComponent={() => {
                return <Text style={{ textAlign: 'center', marginTop: '50%' }}>空空如也</Text>
                // 列表为空展示改组件
              }}
              // 一屏幕展示几个
              number={4}
              //  2列显示
              numColumns={2}
              data={typename == 'nft' ? NftList : blindlist}
              renderItem={({ item }) => {
                return <List list={item} type={1} navigatetoDetail={(id,unique_id,contract_address,token_id,network) =>
                   { props.navigation.navigate('goodsDetail', { id: id,unique_id,contract_address,token_id,network }) }} 
                   />
              }}
              keyExtractor={(item, index) => item.id}
              ListFooterComponent={() => {
                // 声明尾部组件
                return NftList.length ? <Text style={{ textAlign: 'center' }}>没有更多了</Text> : null
              }}
              // 下刷新
              onEndReachedThreshold={0.1} //表示还有10% 的时候加载onRefresh 函数
              onEndReached={getList}
            >
            </FlatList> : <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: '40%' }}>
              <Spinner />
            </View>

          }


        </View>
      </View>
    </SafeAreaView>
  );
}

export default Home

const styles = StyleSheet.create({
  daohang: {
    flexDirection: 'row',
  },
  listbox: {
    marginVertical: 20,
    marginHorizontal: 20,
    paddingBottom: 100
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