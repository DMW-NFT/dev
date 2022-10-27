import { Text, StyleSheet, ScrollView, SafeAreaView, View, StatusBar, ImageBackground, Image, Dimensions, FlatList } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import Screen from '../../Components/screen';
import Search from '../../Components/Searchbox';
import List from '../../Components/List';
import { useDmwApi } from '../../../DmwApiProvider/DmwApiProvider';
import { useTranslation } from 'react-i18next'
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
const CollectionDetails = (props) => {
    const { t, i18n } = useTranslation();
    const { Toast, post, formData, get } = useDmwApi()
    const [refreshing, setrefreshing] = useState(false)
    const [list, setlist] = useState([])
    const [visible, setvisible] = useState(false)
    const [strText, setstrText] = useState('')
    const [lMvisible, setlMvisible] = useState(false)
    const [ID, setID] = useState(props.route.params.ID)
    const [typename, setTypename] = useState('Items')
    const [ActivityTotal, setActivityTotal] = useState(0) //活动列表总数量
    const [NftTotal, setNftTotal] = useState(0) //合集详情nft列表总数量
    const [ActivityList, setActivityList] = useState([{}])//合集详情 -- 活动列表
    const [DetailsInfo, setDetailsInfo] = useState({
        banner_url: '../../assets/img/index/default.png',
        logo_url: '../../assets/img/index/default.png',
        details: 'details',
        name: 'name',
        items: 0
    })
    useEffect(() => {
        getDetails()
    }, [props])


    const getDetails = () => {
        post('/index/collection/get_collection_details', formData({ id: ID })).then(res => {
            console.log(res.data, '合集详情');
            setDetailsInfo(res.data)
            getList(1)
        })
    }
    const visibleFn = () => {
        setvisible(true)
    }
    // 筛选关闭
    const close = () => {
        setvisible(false)
        setlMvisible(false)
    }
    // 活动列表
    const getActivityList = () => {
        post('/index/collection/get_collection_activity', formData({ collection_id: ID })).then(res => {
            console.log(res, '活动列表');
            setActivityList(res.data.data)
            setActivityTotal(res.data.total)
        })
    }
    // nft列表
    const getList = (page) => {
        post('/index/collection/get_collection_nft_by_search', formData({ collection_id: ID,limit:4,page:page?page:1, })).then(res => {
            console.log(res, '合集nft');
            let ar = [...list,...res.data.data]
            setlist(Array.from(new Set(ar)))
            setNftTotal(res.data.total)
        })
    }
    const Bottoming = () => {
        console.log('nft触底');
        if (typename == 'Items') {
            let a = Math.trunc(list.length / 2)
            if(NftTotal == list.length){
            }else{
                console.log(a+1,'page');
                getList(a + 1)
            }
        } else {

        }

    }
    const paging = (typename) => {
        setTypename(typename)
        if (typename == 'Activity') {//获取合集活动
            getActivityList()
        } else {

        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
            <View style={{ flex: 1 }}>
                {/* <StatusBar barStyle="dark-content" backgroundColor="#fff" /> */}
                <View>
                    <ImageBackground source={{ uri: DetailsInfo.banner_url }} style={{ width: "100%", height: 220, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={{ uri: DetailsInfo.logo_url }} style={[styles.topImagelogo]}></Image>
                    </ImageBackground>
                    <View style={[styles.collDetailBox]}>
                        <Text style={[styles.collName]}>{DetailsInfo.name}</Text>
                        <Text style={[styles.detail]}>{DetailsInfo.details}</Text>

                    </View>

                    <View style={[styles.index_box, styles.daohang]}>
                        <Text style={[typename != 'Items' ? styles.daonghang_text : styles.daonghang_text_ative]} onPress={() => paging('Items')}>Items({DetailsInfo.items})</Text>
                        <Text style={[typename != 'Activity' ? styles.daonghang_text : styles.daonghang_text_ative]} onPress={() => paging('Activity')}>Activity</Text>
                    </View>

                </View>
                <View style={[styles.bottomSearch]}>
                    {
                        typename == 'Items' ?
                            <Search onChange={(strText) => { setstrText(strText) }} visible={() => visibleFn()}></Search> : null
                    }
                    <FlatList
                        style={{ marginTop: 20, flex: 1 }}
                        refreshing={refreshing}
                        ListEmptyComponent={() => {
                            return typename == 'Activity' && !ActivityList.length ? <Text style={{ textAlign: 'center' }}>{t("空空如也")}</Text> :
                                typename == 'Items' && list && list.length ? null : <Text style={{ textAlign: 'center' }}>{t("空空如也")}</Text>
                            // 列表为空展示改组件
                        }}
                        // 一屏幕展示几个
                        number={10}
                        //  2列显示
                        numColumns={2}
                        data={typename == 'Activity' ? ActivityList : list}
                        renderItem={({ item }) => {
                            return typename == 'Activity' && ActivityList && ActivityList.length ?
                                <List list={item} type={1} navigatetoDetail={(id) => { props.navigation.navigate('goodsDetail', { id: id }) }} />
                                :
                                typename == 'Items' && list && list.length ?
                                    <List list={item} type={1} navigatetoDetail={(id) => { props.navigation.navigate('goodsDetail', { id: id }) }} />
                                   : null
                        }}
                        keyExtractor={(item, index) => index}
                        ListFooterComponent={() => {
                            // 声明尾部组件  
                            return typename == 'Activity' && ActivityList && ActivityList.length && ActivityList.length == ActivityTotal ?
                                <Text style={{ textAlign: 'center' }}>{t("没有更多了")}</Text> :
                                typename == 'Items' && list && list.length && list.length == NftTotal ?
                                    <Text style={{ textAlign: 'center' }}>{t("没有更多了")}</Text> : null
                        }}
                        // 下刷新
                        onEndReachedThreshold={0.2} //表示还有10% 的时候加载onRefresh 函数
                        onEndReached={Bottoming}
                    >
                    </FlatList>
                </View>
            </View>
            <Screen
                title="select filter"
                visible={visible}
                close={() => close()}
                datalist={data}>
            </Screen>
        </SafeAreaView>

    )
}


export default CollectionDetails

const styles = StyleSheet.create({
    daohang: {
        flexDirection: 'row',
    },
    index_box: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    bottomSearch: {
        padding: 20,
        flex: 1,
        paddingBottom: 0
    },
    ltemText: {
        fontSize: 10,
        color: "#666",
        textAlign: 'center',
    },
    itemNum: {
        fontSize: 16,
        color: "#333",
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    flexJBC: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginTop: 30,
    },
    detail: {
        fontSize: 12,
        color: "#999",
        lineHeight: 24,
    },
    collName: {
        marginTop: 30,
        color: '#333',
        fontSize: 16,
        marginBottom: 20,
    },
    collDetailBox: {
        padding: 20,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
    },
    topImagelogo: {
        width: 80,
        height: 80,
        borderRadius: 80,
        marginTop: 210,
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
})