import { Text, StyleSheet, View,SafeAreaView ,ScrollView,FlatList} from 'react-native'
import React, { useState, useEffect , useRef } from 'react';
import List from '../../Components/List'
import { useDmwApi } from '../../../DmwApiProvider/DmwApiProvider';
const Jiaoyi = ()=> {
  // state={
  //   type:2, //2是寄售 3是拍卖
  //   list:[{},{}] 
  // }
  
  const [type, setType] = useState(2)
  const [List, setlist] = useState([])
  const [refreshing, setrefreshing] = useState(false)
  const { post, get, formData, Toast } = useDmwApi();
  const [page, setpage] = useState(1)

  const getList = () => { 
    console.log('触底');
  }
  const changetype=(val)=>{  
    console.log(val)
    setType(val)
  }
  // useEffect(() => {
  //   console.log(page,'ppppppppppppppppppppppppppppppp')
  //   if(page==1){
  //     getList()
  //   }else{
  //     setpage(1) 
  //   }
  //   return () => { };
  // }, [category,chain,time]);
  useEffect(() => {
    let nftDataObj = formData({ listing_type: type==2?0:1 ,page:page,limit:10})
      //  let nftDataObj = formData({ type: 1 ,page:page,limit:10})
    // 列表 /index/order/get_listings  /index/nft/get_home_nft_by_search
    post("/index/order/get_listings", nftDataObj).then((res) => {
      if (res.code == 200) { 
        console.log(res,nftDataObj,'ressssssssssssssss1111111111')
        // setlist(res.data)  
      }
    });
    // setpage(1) 
    return () => { };
  }, []);

  // useEffect(() => {
  //   getList() 
  //   console.log('222222222222222')
  //   return () => {};
  // }, [page]);

 const  navigatetoDetail=(id)=>{
    // this.props.navigation.navigate('goodsDetail',{id:id})
  } 

    return (
      <SafeAreaView  style={{backgroundColor:'#fff'}}> 
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* tab栏 -- start */}
        <View style={[styles.index_box, styles.daohang]}>
            <Text style={[type === 2 ? styles.daonghang_text_ative : styles.daonghang_text]} onPress={() => changetype(2)}>寄售</Text>
            <Text style={[type === 3 ? styles.daonghang_text_ative  : styles.daonghang_text]} onPress={() =>changetype(3)}>拍卖</Text>
          </View>
          {/* tab栏 -- end */}

          <View style={[styles.listbox, {marginVertical:List.length>0? 20:0,marginHorizontal:List.length>0? 20:0,}]}>
          <FlatList
              refreshing={refreshing}
              style={{ height: '55%',flex:1,}}
              ListEmptyComponent={() => {
                return <Text style={{ textAlign: 'center', marginTop: '50%' }}>空空如也</Text>
                // 列表为空展示改组件
              }}
              // 一屏幕展示几个
              number={4}
              //  2列显示
              numColumns={2}
              data={List}
              renderItem={({ item }) => {
                return <List list={item} type={type} navigatetoDetail={navigatetoDetail}  />
              }}
              // keyExtractor={(item, index) => item.id}
              ListFooterComponent={() => {
                // 声明尾部组件
                return List.length>0 ? <Text style={{ textAlign: 'center' }}>没有更多了</Text> : null
              }}
              // 下刷新
              onEndReachedThreshold={0.1} //表示还有10% 的时候加载onRefresh 函数
              onEndReached={getList}
            >
            </FlatList>
             
          </View>
      </ScrollView>
      </SafeAreaView>
    )
 
}
export default Jiaoyi

const styles = StyleSheet.create({
  listbox: {
    flex:1,
    backgroundColor:'#f1f1f1',
  },
  index_box: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  daohang: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth:1,
    borderBottomColor:'#ccc',


    // backgroundColor: 'pink',
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
    lineHeight:56,
    flex: 1,
    textAlign: 'center',
    borderBottomColor: '#897EF8',
    borderBottomWidth: 3,
    color: '#897EF8',
    borderRadius: 1,
  }

})