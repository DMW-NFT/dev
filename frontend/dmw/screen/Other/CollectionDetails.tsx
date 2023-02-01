import { Text, StyleSheet, ScrollView, SafeAreaView, View, StatusBar, ImageBackground, Image, Dimensions, FlatList } from 'react-native'
import React, { useState, useContext, useEffect, Suspense,useRef } from 'react'
import Screen from '../../Components/screen';
import Search from '../../Components/Searchbox';
import List from '../../Components/List';
import { useDmwApi } from '../../../DmwApiProvider/DmwApiProvider';
import { useTranslation } from 'react-i18next'
import { Modal } from 'react-native-paper'


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
        banner_url: '',
        logo_url: '',
        details: 'details',
        name: 'name',
        items: 0
    })

    const [status, setstatus] = useState('Buy now')
    const [sort, setsort] = useState('recently created')
    const [screenData, setscreenData] = useState([])
    const [selListParams, setselListParams] = useState({})
    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        getDetails()
        post("/index/common/get_filter", formData({ type: 'collection' })).then(res => {
            // console.log(JSON.stringify(res.data), '筛选条件');
            let a = {}
            setscreenData(res.data)
            res.data.map(item => {
                a[item.title.value] = ''
            })
            setselListParams(a)
        })
    }, [props])

    useEffect(() => {
        console.log(selListParams, 'selListParams监听');
    }, [selListParams])
    useEffect(() => {
        console.log(strText, 'strText');

        getList(1, 1)
    }, [strText])

    useEffect(() => {
        // console.log(list.length, 'list.length--', list);
    }, [list])



    const getDetails = () => {
        post('/index/collection/get_collection_details', formData({ id: ID })).then(res => {
            // console.log(res.data, '合集详情');
            setDetailsInfo(res.data)
            setrefreshing(true)
            getList(1)
            getActivityList(1)
        })
    }
    const visibleFn = () => {
        setvisible(true)
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
          }
    }
    // 筛选关闭
    const close = () => {
        setvisible(false)
        setlMvisible(false)
    }
    // 活动列表
    // type = 1 下拉刷新 
    // type = 2 上拉加载 
    const getActivityList = (page, type = 1) => {
        // console.log(ID, 'ID');
        post('/index/collection/get_collection_activity', formData({ page: page || 1, id: ID })).then(res => {
            console.log(res.data.data, '活动列表');
            setActivityList(res.data.data)
            setActivityTotal(res.data.total)
        })
    }
    // nft列表
    // type = 1 下拉刷新 
    // type = 2 上拉加载 
    const getList = (page, type = 1) => {
        setrefreshing(true)
        let params = formData({ collection_id: ID, limit: 4, page: page ? page : 1, ...selListParams, keyword: strText })
        console.log(params, 'params');

        post('/index/collection/get_collection_nft_by_search', params).then(res => {
            // console.log(res, '合集nft');
            // console.log(list.length, res.data.data.length);
            let ar = []
            if (type == 1) {
                ar = [...res.data.data]
            } else {
                ar = [...list, ...res.data.data]
            }
            // let list1 = Array.from(...new Set(ar))
            setlist([...ar])
            setNftTotal(res.data.total)
            setTimeout(() => {
                setrefreshing(false)
            }, 1000);
        })
    }
    const Bottoming = () => {
        // console.log('nft触底');
        if (typename == 'Items') {
            let a = Math.trunc(list.length / 4)
            if (NftTotal == list.length) {
            } else {
                console.log(a + 1, 'page');
                getList(a + 1, 2)
            }
        } else {
            let a = Math.trunc(ActivityList.length / 4)
            if (ActivityTotal == ActivityList.length) {
            } else {
                console.log(a + 1, 'page');
                getActivityList(a + 1, 2)
            }
        }

    }

    const Refresh = () => {
        setrefreshing(true)
        setTimeout(() => {
            getList(1)
        }, 1000);
    }
    const paging = (typename) => {
        setTypename(typename)
        if (typename == 'Activity') {//获取合集活动
            // getActivityList()
        } else {
            // getList(1)
        }
    }

    const hideModal = () => {
        setvisible(false)
    }

    const setParams = (a) => {
        setselListParams(a)

    }

    // 提交筛选
    const searchFn = () => {
        setvisible(false)
        getList(1, 1)
    }

    return (
        <ScrollView ref = {scrollViewRef}>
        <SafeAreaView style={{ backgroundColor: '#fff', flex: 1, position: 'relative' }}>
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
                        style={{ marginTop: 20, flex: 1, minHeight: "100%",maxHeight:500 }}
                        ListEmptyComponent={() => {
                            return typename == 'Activity' && !ActivityList.length ? <Text style={{ textAlign: 'center', height: 100 }}>{t("空空如也")}</Text> :
                                typename == 'Items' && list && list.length ? null : <Text style={{ textAlign: 'center', height: 100 }}>{t("空空如也")}</Text>
                            // 列表为空展示改组件
                        }}
                        // 一屏幕展示几个
                        //  2列显示
                        number={4}
                        numColumns={typename == 'Items' ? 2 : 1}
                        key={typename == 'Items' ? 'hh' : 'nn'}
                        data={typename == 'Activity' ? ActivityList : list}
                        nestedScrollEnabled={true}
                        renderItem={({ item }) => {
                            return typename == 'Activity' && ActivityList && ActivityList.length ?
                                <View style={{marginBottom:20, paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20, borderBottomWidth: 1, borderBottomColor: '#ccc', }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Image style={{ width: 80, height: 80 }} source={{ uri: item.image_attachment_url }}></Image>
                                        <View style={{ flex: 1, }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                                <Text style={{ fontSize: 14, color: "#333", marginLeft: 20 }}>{item.name}</Text>
                                                <Text style={{ fontSize: 12, color: '#999999' }}>{item.create_time}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginTop: 20 }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20 }}>
                                                    <Text style={{ fontSize: 12, color: "#333", }}>{t("状态") + ''}</Text>
                                                    <Text style={{ fontSize: 12, color: "#333", }}>{t("成交价") + ''}</Text>
                                                    <Text style={{ fontSize: 12, color: "#333", }}>to</Text>
                                                    {/* <Text style={{ fontSize: 12, color: "#333", }}>network</Text> */}
                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginTop: 4 }}>
                                                    <Text style={{ fontSize: 12, color: "#999999", }}>{item.listing_type == 0 ? t('寄售') + '' : t('拍卖') + ''}</Text>
                                                    <Text style={{ fontSize: 12, color: "#999999", }}>{item.total_offer_amount.number + item.total_offer_amount.currency_name}</Text>
                                                    <Text style={{ fontSize: 12, color: "#999999", }}>{item.currency.slice(0, 4)}</Text>
                                                    {/* <Text style={{ fontSize: 12, color: "#999999", }}>network</Text> */}
                                                </View>
                                                {/* <Text style={{ fontSize: 12, color: '#999999' }}>{item.create_time}</Text> */}
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                :
                                typename == 'Items' && list && list.length ?
                                    <List list={item} type={1} navigatetoDetail={(id, unique_id, contract_address, token_id, network) => { props.navigation.navigate('goodsDetail', { id: id, unique_id, contract_address, token_id, network }) }} />
                                    : null
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        ListFooterComponent={() => {

                            return null
                            // 声明尾部组件  
                            // return typename == 'Activity' && ActivityList && ActivityList.length && ActivityList.length == ActivityTotal ?
                            //     <Text style={{ textAlign: 'center' }}>{t("没有更多了")}</Text> :
                            //     typename == 'Items' && list && list.length && list.length == NftTotal ?
                            //         <Text style={{ textAlign: 'center' }}>{t("没有更多了")}</Text> : null
                        }}
                        // 下刷新
                        onEndReachedThreshold={0.2} //表示还有10% 的时候加载onRefresh 函数
                        onEndReached={Bottoming}
                        refreshing={refreshing}
                        onRefresh={Refresh}
                    >
                    </FlatList>
                </View>
            </View>
            {/* <Screen
                title="select filter"
                visible={visible}
                close={() => close()}
                datalist={data}>
            </Screen> */}
            {/* onDismiss={hideModal} contentContainerStyle={containerStyle} */}
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
                <View style={styles.ModalBOX}>
                    <View style={styles.HlineBox}><View style={styles.Hline}></View></View>
                    <Text style={styles.selectfilter}>Select Filter</Text>

                    {
                        screenData.map((item, idnex) => {
                            return <View>
                                <Text style={styles.selTitle}>{item.title.name}</Text>
                                <View style={styles.optionBox}>
                                    {
                                        item['tabs'].map((jitem, jindex) => {

                                            return <>
                                                <Text onPress={() => {
                                                    console.log(123);
                                                    let a = { ...selListParams }
                                                    if (a[item.title.value] == jitem.value) {
                                                        a[item.title.value] = ''
                                                    } else {
                                                        a[item.title.value] = jitem.value
                                                    }

                                                    setParams(a)
                                                }} style={selListParams[item.title.value] == jitem.value ? styles.btn_active : styles.btn_noactive}>{jitem.name}</Text>
                                            </>
                                        })
                                    }

                                </View>


                                {
                                    idnex == screenData.length - 1 ?
                                        null : <View style={styles.btnline}></View>
                                }




                            </View>
                        })

                    }


                    <View style={styles.btnlinelang}></View>
                    <View style={styles.sureBtn}>
                        <Text style={styles.sureBtnText} onPress={searchFn}>{t('确定')}</Text>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
        </ScrollView>


    )
}


export default CollectionDetails

const styles = StyleSheet.create({
    sureBtn: {
        height: 50,
        backgroundColor: '#897EF8',
        borderRadius: 50,
        // marginBottom:49
    },
    sureBtnText: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 50,
        color: '#FFFFFF',
        textAlign: 'center'
    },
    btnline: {
        // border: 1px solid #CCCCCC;
        borderWidth: 1 / 3,
        borderColor: '#ccc',
        marginBottom: 20
    },
    btnlinelang: {
        borderWidth: 1 / 3,
        borderColor: '#ccc',
        marginBottom: 20,
        marginRight: -20,
        marginLeft: -20
    },
    btn_active: {
        color: '#fff',
        backgroundColor: '#ACA4FA',
        height: 34,
        paddingRight: 15,
        paddingLeft: 15,
        borderColor: '#877EF0',
        borderWidth: 1,
        lineHeight: 34,
        borderRadius: 20,
        marginBottom: 15,
        marginRight: 15,
    },
    btn_noactive: {
        height: 34,
        paddingRight: 15,
        paddingLeft: 15,
        borderColor: '#877EF0',
        borderWidth: 1,
        lineHeight: 34,
        borderRadius: 20,
        marginBottom: 15,
        marginRight: 15,
        color: '#333',
    },
    optionBox: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        marginBottom: 20,
        flexWrap: 'wrap'

    },

    selTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#333',
        fontFamily: 'Source Han Sans CN',
        marginBottom: 20
    },
    ModalBOX: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        fontFamily: 'Source Han Sans CN',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 49,
    },
    selectfilter: {
        fontSize: 16,
        fontFamily: 'Source Han Sans CN',
        fontWeight: '700',
        color: '#333',
        marginTop: 20,
        textAlign: 'center',
        marginBottom: 30
    },
    HlineBox: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    Hline: {
        width: 40,
        height: 6,
        backgroundColor: '#E0E0E0',
        borderRadius: 50,
        marginTop: 6
    },
    containerStyle: {
        width: '100%',
        minheight: 885 / 2,
        backgroundColor: '#fff',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        position: 'absolute',
        bottom: 0,
        overflow: 'hidden'

    },
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