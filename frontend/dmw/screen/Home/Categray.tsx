import { Text, StyleSheet, View, SafeAreaView, ScrollView, TouchableWithoutFeedback, ImageBackground, FlatList } from 'react-native'
import React, { Component, useState, useContext, useEffect } from 'react'
import List from '../../Components/List'
import Screen from '../../Components/screen'
import { useDmwApi } from '../../../DmwApiProvider/DmwApiProvider'
import { Spinner } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next'
const Categray = (props) => {
  const { t, i18n } = useTranslation();
  const [list, setlist] = useState([])
  const [visible, setvisible] = useState(false)
  const [loading, setLoding] = useState(false)
  const [refreshing, setrefreshing] = useState(false)
  const [data, setdata] = useState([{
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
  },])

  const { post, formData, Toast } = useDmwApi()
  useEffect(() => {
    componentDidMount()
    getList()
  }, [props])


  const componentDidMount = () => {
    console.log(props.route.params,'动态修改标题');
    
    // 动态修改标题
    props.navigation.setOptions({
      title: props.route.params.categray,
      headerRight: () => {
        return (
          // 修改标题栏
          <View style={{ flexDirection: 'row' }}>
            <TouchableWithoutFeedback onPress={() => { props.navigation.navigate('searchScreen', { visible: true }) }}>
              <ImageBackground source={require('../../assets/img/allIconAndlImage/3571.png')} style={{ width: 40, height: 40, marginRight: 15 }}></ImageBackground>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => { setvisible(true) }}>
              <ImageBackground source={require('../../assets/img/allIconAndlImage/3574.png')} style={{ width: 40, height: 40, marginRight: 15 }}></ImageBackground>
            </TouchableWithoutFeedback>
          </View>
        )
      }
    })

    // props.navigation.createStackNavigator({
    //   categray:{
    //      Option:{ title: props.route.params.categray,}
    //   }
    // })
    console.log(props, '123')
  }

  const getList = () => {
    post('/index/collection/get_collection_categories_nft_by_search', formData({ type_id: props.route.params.id })).then(res => {
      console.log(res, '获取合集类别下的nft');
      setlist(res.data.data)
    })
  }


  return (
    <SafeAreaView style={{ backgroundColor: '#fff',flex:1 }}>
      {/* <View style={[styles.container]}>
        
      </View> */}


      <View style={[styles.listbox, { padding: 20, paddingBottom: 0, backgroundColor: '#fff', alignItems: loading ? 'center' : null, justifyContent: loading ? 'center' : null }]}>
        {
          loading ? <Spinner /> :

            <FlatList
              refreshing={refreshing}
              style={{ height: 50, paddingTop: 20 }}
              ListEmptyComponent={() => {
                return <Text style={{ textAlign: 'center', marginTop: '50%' }}>{t("空空如也")}</Text>
                // 列表为空展示改组件
              }}
              // 一屏幕展示几个
              //  2列显示
              numColumns={2}
              data={list}
              renderItem={({ item }) => {
                return <List list={item} type={1} navigatetoDetail={(id, unique_id, contract_address, token_id, network) => { props.navigation.navigate('goodsDetail', { id: id, unique_id, contract_address, token_id, network }) }} /> 
              }}
              // keyExtractor={(item, index) => item.id}
              ListFooterComponent={() => {
                // 声明尾部组件
                return <Text style={{ textAlign: 'center', marginBottom: 20 }}>{t("没有更多了")}</Text> 
              }}
              // 下刷新
              onEndReachedThreshold={0.1} //表示还有10% 的时候加载onRefresh 函数
              onEndReached={getList}
            >
            </FlatList>
        }
      </View>



      <Screen
        title="select filter"
        style={{ width: '100%', position: 'absolute', }}
        visible={visible}
        close={() => { setvisible(false) }}
        datalist={list}>
      </Screen>
    </SafeAreaView>
  )
}

export default Categray

const styles = StyleSheet.create({
  listbox: {
    flex: 1,
    // height: 300,
    backgroundColor: '#f5f5f5',
  },
  container: {
    padding: 20,
  }
})