import { Text, StyleSheet, View, SafeAreaView, ScrollView, Image, FlatList, TouchableWithoutFeedback } from 'react-native'
// import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSortDown } from '@fortawesome/free-solid-svg-icons'
import AllCategory from '../../Components/AllCategory'
import AllChain from '../../Components/AllChain'
import AllTime from '../../Components/AllTime'
import { useDmwApi } from "../../../DmwApiProvider/DmwApiProvider";
import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useDmwLogin } from '../../../loginProvider/constans/DmwLoginProvider';
const Data = (props) => {
  const { t, i18n } = useTranslation();
  const [category, changeVisible0] = useState({ id: 1, name: "All categories1" })
  const [chain, changeVisible1] = useState({ id: 1, name: "All chains" })
  const [time, changeVisible2] = useState({ id: 1, name: "All time" })
  const [visible, changeVisible3] = useState(false)
  const [visible1, changeVisible4] = useState(false)
  const [visible2, changeVisible5] = useState(false)
  const [list, changegetList] = useState([])
  const [shaiuanList, setshaiuanList] = useState([])
  const [page,setpage]=useState(0)
  const [total,settotal]=useState(null)
  const { post, formData } = useDmwApi()
  const { language } = useDmwLogin()



  // 分类
  const changecategory = (visible, val) => {
    changeVisible3(visible);
    if (val) {
      changeVisible0(val)
    }
  }
  //  区块链
  const changechain = (visible, val) => {
    changeVisible4(visible)
    if (val) {
      changeVisible1(val)
    }
  }

  //  时间
  const changetime = (visible, val) => {
    changeVisible5(visible)
    if (val) {
       changeVisible2(val)
    }
  } 
  useEffect(() => {

    if(page==1){
      getList()
    }else{
      setpage(1) 
    }
    return () => { };
  }, [category,chain,time]);
  useEffect(() => {
    let nftDataObj = formData({ type: 'stats' })
    // 筛选列表
    post("/index/common/get_filter", nftDataObj).then((res) => {
      if (res.code == 200) {
        setshaiuanList(res.data)
        changeVisible0(res.data[0].tabs[0])
        changeVisible1(res.data[1].tabs[0])
        changeVisible2(res.data[2].tabs[0])
      }
    });
    // setpage(1) 
    return () => { };
  }, [props,language]);

  useEffect(() => {
    // getList() 
    return () => {};
  }, [page]);

  const getList = () => { 
    let params = formData({ categories: category.value?category.value:'',network:chain.value?chain.value:'',day:time.value?time.value:'' ,page:page,limit:20})
    
      post("/index/stats/get_rankings",params).then((res) => {
        if (res.code == 200) {
          console.log(res.data.data,'数据');
          
          settotal(res.data.total) 
          if(page>1){
            // 触底
            changegetList( [...list,...res.data.data])
          }else{
            changegetList( res.data.data)
          }
        } 
      });  
  }
  const getList1=()=>{ 
    console.log('触底111111111111')
    if(total!==list.length){ 
      setpage(page=>page++) 
    }
  }


  return (
     <View>
        {
          shaiuanList[0]?<SafeAreaView style={{ backgroundColor: '#fff', minHeight: Dimensions.get("window").height,paddingBottom:100 }}>
          
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[styles.flexJBC, styles.topBOx]}>
              <TouchableWithoutFeedback onPress={() => { changecategory(true) }}>
                <View style={[styles.flex, { alignItems: 'flex-start' }]} >
                  <Text style={[styles.topName]}>{category.name}</Text>
                  <FontAwesomeIcon icon={faSortDown} color='#333' size={15} />
                </View>
              </TouchableWithoutFeedback>
    
              <TouchableWithoutFeedback onPress={() => { changechain(true) }}>
                <View style={[styles.flex, { alignItems: 'flex-start' }]}>
                  <Text style={[styles.topName]}>{chain.name}</Text>
                  <FontAwesomeIcon icon={faSortDown} color='#333' size={15} />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => { changetime(true) }}>
                <View style={[styles.flex, { alignItems: 'flex-start' }]}>
                  <Text style={[styles.topName]}>{time.name}</Text>
                  <FontAwesomeIcon icon={faSortDown} color='#333' size={15} />
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={[styles.container]}>
              {/* refreshing={refreshing} */}
              <FlatList
                // ListEmptyComponent={() => {
                //   return <Text>空空如也</Text>
                //   // 列表为空展示改组件
                // }}
                // 一屏幕展示几个
                number={10}
                data={list}
                renderItem={({ item }) => {
                  return (
                    <TouchableWithoutFeedback onPress={()=>{props.navigation.navigate('collectionDetails',{ID:item.collection_id})}}>
                    <View style={[styles.listbox, styles.flexJBC]}>
                      <View style={[styles.flex]}>
                        <Image source={{uri:item.logo_url}} style={[styles.listboxImg]}></Image>
                        <Text style={[styles.listboxName, { marginLeft: 20 }]}>{item.name}</Text>
                      </View>
                      <View>
                        <Text style={[styles.listboxName, { marginBottom: 9 }]}>{item.total_offer_amount.number}{item.total_offer_amount.currency_name}</Text>
                        <Text style={[styles.add, { color: true ? "#3FAA85" : "#D56262" }]}>{item.range}%</Text>
                      </View>
                    </View>
                    </TouchableWithoutFeedback>
                  )
                }}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={() => {
                  // 声明尾部组件
                  return <Text style={{ textAlign: 'center', marginTop: 30, }}>{t("没有更多了")}</Text>
                }}
                // 下刷新
                onEndReachedThreshold={0.1} //表示还有10% 的时候加载onRefresh 函数
                onEndReached={() => { getList1 }}
              > 
              </FlatList>
            </View>
          </ScrollView>
            <AllCategory visible={visible} changeVisible={changecategory} shaiuanList={shaiuanList[0].tabs} />
            <AllChain visible={visible1} changeVisible={changechain} shaiuanList={shaiuanList[1].tabs} />
            <AllTime visible={visible2} changeVisible={changetime} shaiuanList={shaiuanList[2].tabs} />
         
        </SafeAreaView>  : <View></View>
        }
     </View>
  )
}
export default Data
// export default class Data extends Component {
//   state = {
//     category:{id:1,name:"All categories1"},//当前显示的分类
//     chain:{id:1,name:"All chains"},//当前显示的区块链
//     time:{id:1,name:"All time"},//当前显示的时间
//     visible: false,
//     visible1: false,
//     visible2: false,
//     list: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
//   }
//   getList = () => {
//     if (this.state.list.length > 20) {
//       return
//     } else {
//       let list1 = [{}]
//       this.setState({
//         list: this.state.list.concat(list1)
//       })
//     }
//   }
//   // 分类
//   changeVisible = (visible,val) => {
//     this.setState({
//       visible: visible,
//       category:val?val:this.state.category
//     })
//   }
//   // 区块链
//   changeVisible1 = (visible,val) => {
//     this.setState({
//       visible1: visible,
//       chain:val?val:this.state.chain
//     })
//   }
//   // 时间
//   changeVisible2 = (visible,val) => {
//     this.setState({
//       visible2: visible,
//       time:val?val:this.state.time
//     })
//   }
//   render() {
//     return (
//       <SafeAreaView style={{backgroundColor:'#fff'}}>
//         <ScrollView showsVerticalScrollIndicator={false}>
//           <View style={[styles.flexJBC, styles.topBOx]}>
//             <TouchableWithoutFeedback onPress={() => { this.changeVisible(true) }}>
//               <View style={[styles.flex, { alignItems: 'flex-start' }]} >
//                 <Text style={[styles.topName]}>{this.state.category.name}</Text>
//                 <FontAwesomeIcon icon={faSortDown} color='#333' size={15} />
//               </View>
//             </TouchableWithoutFeedback>

//             <TouchableWithoutFeedback onPress={() => { this.changeVisible1(true) }}>
//               <View style={[styles.flex, { alignItems: 'flex-start' }]}>
//                 <Text style={[styles.topName]}>{this.state.chain.name}</Text>
//                 <FontAwesomeIcon icon={faSortDown} color='#333' size={15} />
//               </View>
//             </TouchableWithoutFeedback>
//             <TouchableWithoutFeedback onPress={() => { this.changeVisible2(true) }}>
//               <View style={[styles.flex, { alignItems: 'flex-start' }]}>
//                 <Text style={[styles.topName]}>{this.state.time.name}</Text>
//                 <FontAwesomeIcon icon={faSortDown} color='#333' size={15} />
//               </View>
//             </TouchableWithoutFeedback> 


//           </View>
//           <View style={[styles.container]}>
//             <FlatList
//               refreshing={this.state.refreshing}
//               ListEmptyComponent={() => {
//                 return <Text>空空如也</Text>
//                 // 列表为空展示改组件
//               }}
//               // 一屏幕展示几个
//               number={10}
//               data={this.state.list}
//               renderItem={() => {
//                 return (
//                   <View style={[styles.listbox, styles.flexJBC]}>
//                     <View style={[styles.flex]}>
//                       <Image source={require('../../assets/img/index/any4.jpg')} style={[styles.listboxImg]}></Image>
//                       <Text style={[styles.listboxName, { marginLeft: 20 }]}>Series name</Text>
//                     </View>
//                     <View>
//                       <Text style={[styles.listboxName, { marginBottom: 9 }]}>4,218</Text>
//                       <Text style={[styles.add, { color: true ? "#3FAA85" : "#D56262" }]}>+23,00%</Text>
//                     </View>
//                   </View>
//                 )
//               }}
//               keyExtractor={(item, index) => index}
//               ListFooterComponent={() => {
//                 // 声明尾部组件
//                 return <Text style={{ textAlign: 'center', marginTop: 30, }}>没有更多了</Text>
//               }}
//               // 下刷新
//               onEndReachedThreshold={0.1} //表示还有10% 的时候加载onRefresh 函数
//               onEndReached={this.getList}
//             >
//             </FlatList>

//           </View>
//         </ScrollView>
//         <AllCategory visible={this.state.visible} changeVisible={this.changeVisible} />
//         <AllChain visible={this.state.visible1} changeVisible={this.changeVisible1} />
//         <AllTime visible={this.state.visible2} changeVisible={this.changeVisible2} />

//       </SafeAreaView>
//     )
//   }
// }

const styles = StyleSheet.create({
  topName: {
    color: "#666",
    fontSize: 14,
  },
  add: {
    fontSize: 12,
  }, 
  listboxName: {
    fontSize: 14,
    fontWeight: '700',
    color: "#333"
  },

  listboxImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  listbox: {
    paddingVertical: 20,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  topBOx: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 22,
    paddingHorizontal: 20
  },
  container: {
    padding: 20,
    paddingTop: 0
  },
  flex: {
    flexDirection: "row",
    alignItems: 'center',
  },
  flexJBC: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})