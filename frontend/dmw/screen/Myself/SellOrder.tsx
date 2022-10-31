import { Text, StyleSheet, View, SafeAreaView, ScrollView, Dimensions, Image, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Modal } from 'react-native-paper';
import { useDmwApi } from '../../../DmwApiProvider/DmwApiProvider';

const SellOrder = () => {
    // state = {
    //     visible:false,
    //     typename: 1,
    //     list:[]
    // }
    const [visible, setvisible] = useState(false)
    const [typename, settypename] = useState(1)
    const [list, setlist] = useState([])
    const {post,formData,Toast} = useDmwApi()
    useEffect(()=>{
        getListbuy(1)
    },[])

    
    const paging = (val) => {
        settypename(val)
        if(val == 1){
            getListbuy(1)
        }else{
            getListsell(1)
        }
    }
    const getListbuy = (page) => {
        post('/index/order/get_my_buy_order',formData({type:0,page:page,limit:4})).then(res=>{
            console.log(res,'售卖-购买列表');
        })
    }

    const getListsell = (page) => {
        post('/index/order/get_my_sell_order',formData({type:0,page:page,limit:4})).then(res=>{
            console.log(res,'售卖-售卖列表');
        })
    }
    return (
        <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
            <View >
                <View style={[styles.container, { backgroundColor: "#f5f5f5" }]}>
                    <View style={[styles.index_box, styles.daohang]}>
                        <Text style={[typename != 1 ? styles.daonghang_text : styles.daonghang_text_ative]} onPress={() => paging(1)}>购买</Text>
                        <Text style={[typename != 2 ? styles.daonghang_text : styles.daonghang_text_ative]} onPress={() => paging(2)}>出售</Text>
                    </View>

                </View>
            </View>
            <View style={[styles.listBox]}>
                <FlatList
                style={{paddingBottom:20,flex:1}}
                    refreshing={false}
                    ListEmptyComponent={() => {
                        return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                            <Text>空空如也</Text>
                        </View>
                        // 列表为空展示改组件
                    }}
                    // 一屏幕展示几个
                    number={6}
                    data={list}
                    renderItem={() => {
                        return (
                            <View style={[styles.lis]}>
                                <View style={[styles.flexJBC]}>
                                    <Text style={styles.listTopLeft}>DMW（官方）</Text>
                                    <View>
                                        {
                                            typename != 1 ?
                                                <Text style={[styles.finshingText]}>交易完成</Text> :
                                                // <Text style={[styles.finshingText, { color: "#F26377" }]}>4h 16m 27s后结束</Text>
                                                <Text style={[styles.finshingText, { color: "#3FAA85" }]}>4h 16m 27后开始</Text>
                                        }
                                    </View>
                                </View>
                                <View style={[styles.imageBox, styles.flexJBC]}>
                                    <View style={[styles.flex]}>
                                        <Image style={[styles.lisImg]} source={require('../../assets/img/index/any4.jpg')}></Image>
                                        <View>
                                            <Text style={[styles.lisImgLeftName]}>恶魔果实#0215</Text>
                                            <Text style={[styles.lisImgLeftColl]}>海贼王</Text>
                                        </View>
                                    </View>
                                    <View style={{ alignItems: 'flex-end' }}>
                                        <Text style={[styles.lisPriceText]}>成交价</Text>
                                        <Text style={[styles.lisPrice]}>12USDT</Text>
                                    </View>
                                </View>
                                <View style={[styles.lisBottomBox, styles.flexJBC]}>
                                    <View>
                                        <Text style={[styles.lisBottomleft]}>...</Text>
                                    </View>
                                    <View style={{ alignItems: "center" }}>
                                        <Text style={[styles.sellPriceText]}>售卖价</Text>
                                        <Text style={[styles.sellPrice]}>12uSDT</Text>
                                    </View>
                                    <View>
                                        {
                                            typename != 1 ?
                                                <Text style={[styles.lisBottomLookBtn]} onPress={() => { props.navigation.navigate('tradeSuccessfully') }}>查看</Text> :
                                                <Text style={[styles.lisBottomLookBtn, { backgroundColor: "#897EF8", color: "#fff" }]}>出价</Text>
                                        }


                                    </View>

                                </View>
                                <View style={[styles.infoFunctionBox]}>
                                    <View style={[styles.squire]}></View>
                                </View>
                            </View>
                        )
                    }}
                    keyExtractor={(item, index) => index}
                    ListFooterComponent={() => {
                        // 声明尾部组件
                        return list.length ? <Text style={{ textAlign: 'center' }}>没有更多了</Text> : null
                    }}
                    //下刷新
                    onEndReachedThreshold={0.1} //表示还有10% 的时候加载onEndReached 函数
                    onEndReached={getListbuy}
                >
                </FlatList>
            </View>

            {/* 下架 */}
            <Modal visible={visible} onDismiss={() => { setState({ visible: false }) }} contentContainerStyle={[styles.footer]}>
                <Text style={[styles.modelName]}>
                    确认下架藏品
                </Text>
                <View style={{ alignItems: 'center' }}>
                    <Image style={[styles.modelImage]} source={require('../../assets/img/index/any4.jpg')}></Image>
                    <Text style={[styles.lisImgLeftColl, { marginTop: 10 }]}>恶魔果实#0215</Text>
                </View>
                <View style={[styles.flexJBC]}>
                    <Text style={[styles.modelQuxiao]}>取消</Text>
                    <Text style={[styles.modelCurse]}>确认</Text>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default SellOrder

const styles = StyleSheet.create({
    modelQuxiao: {
        backgroundColor: "#F5F5F5",
        color: '#666',
        height: 40,
        lineHeight: 40,
        paddingHorizontal: 44,
        borderRadius: 22,
    },
    modelCurse: {
        backgroundColor: "#897EF8",
        color: '#fff',
        height: 40,
        lineHeight: 40,
        paddingHorizontal: 44,
        borderRadius: 22,
        marginLeft: 40,
    },
    modelImage: {
        width: 50,
        height: 50,
        borderRadius: 10,
    },
    modelName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333"
    },
    footer: {
        zIndex: 999,
        width: '86%',
        left: "7%",
        height: 468 / 2,
        position: 'absolute',
        top: '25%',
        zIndex: 10,
        backgroundColor: "#fff",
        borderRadius: 20,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    // 功能框
    // squire:{
    //     width:19,
    //     height:24,
    //     backgroundColor:"red",
    //     position:'absolute',
    //     top:0,
    //     left:10,
    //     transform:[{skewX:'180deg'}],
    //     // rotate
    // },
    infoFunctionBox: {
        position: 'absolute',
        width: 100,
        height: 228,
        backgroundColor: "#000",
        zIndex: 99,
        top: 160,
        borderRadius: 10,

    },
    // 结束
    lisBottomLookBtn: {
        color: '#897EF8',
        fontSize: 14,
        borderWidth: 1,
        borderColor: "#897EF8",
        height: 24,
        lineHeight: 24,
        paddingHorizontal: 10,
        borderRadius: 12,

    },

    sellPrice: {
        color: "#333",
        fontSize: 14,
    },
    sellPriceText: {
        color: "#999",
        fontSize: 10,
    },
    lisBottomleft: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#707070"
    },
    lisBottomBox: {

    },

    lisPrice: {
        fontSize: 16,
        color: "#333",
        fontWeight: "bold",
    },
    lisPriceText: {
        fontSize: 10,
        color: "#666",
        marginBottom: 5,
    },
    lisImgLeftName: {
        fontSize: 14,
        color: "#333",
        fontWeight: "bold",
        marginBottom: 5,
    },
    lisImgLeftColl: {
        fontSize: 12,
        color: "#999"
    },
    lisImg: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginRight: 15,
    },
    imageBox: {
        marginTop: 12,
        marginBottom: 30,
    },
    finshingText: {
        color: "#897EF8",
        fontSize: 10,
    },
    listTopLeft: {
        color: "#333",
        fontSize: 14,
    },
    lis: {
        padding: 15,
        backgroundColor: "#fff",
        // height: 355 / 2,
        borderRadius: 10,
        marginBottom: 15,
    },
    listBox: {
        padding: 20,
        backgroundColor: "#f5f5f5",
        flex:1,
        paddingBottom:0,
        justifyContent:'center'
    },
    daohang: {
        flexDirection: 'row',
    },
    index_box: {
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#fff',
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
    },
    container: {
        backgroundColor: "#f5f5f5"
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