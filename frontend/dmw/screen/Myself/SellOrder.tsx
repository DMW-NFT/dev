import { Text, StyleSheet, View, SafeAreaView, ScrollView, Dimensions, Image, FlatList, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Modal } from 'react-native-paper';
import { useDmwApi } from '../../../DmwApiProvider/DmwApiProvider';
import { useTranslation } from 'react-i18next'
import chainNameMap from '../../../constans/chainNameMap.json'

const SellOrder = (props) => {
    const { t, i18n } = useTranslation();
    const [visible, setvisible] = useState(false)
    const [typename, settypename] = useState(1)
    // const [list, setlist] = useState([])
    const { post, formData, Toast } = useDmwApi()
    const [ConList, setConList] = useState([])//寄售列表
    const [ConListTotal, setConListTotal] = useState(0)//寄售总数量
    const [auctionList, setAuctionList] = useState([])//拍卖列表
    const [auctionTotal, setauctionTotal] = useState(0)//拍卖总数量
    useEffect(() => {
        getListbuy(1)
    }, [])


    useEffect(() => {
        setAuctionList([])
        setConList([])
        if (typename == 1) {
            getListbuy(1)
        } else {
            getListsell(1)
        }
    }, [typename])

    const paging = (val) => {
        settypename(val)

    }
    // { "buyout_price_per": { "currency_name": "ETH", "number": 1 }, 
    // "collection_name": null, 
    // "currency": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", 
    // "end_time": "2122-10-08 11:15:39", 
    // "hash": "0xab8f8387ec583e890fa0dff03ae9c3dd8bdc0359a02f6503d6071ff0a2f1e694", 
    // "image_attachment_url": "https://ipfs.moralis.io:2053/ipfs/QmZ6YCgEA62jnZWqEhb4okKKPdjcvzxZ2FXo4g5f1aeXFC/0.png", 
    // "nft_name": "11", "offers": [], "order_no": "c2bb257c44bc7728feada607c683cf73", 
    // "start_time": "2022-11-01 11:15:39", 
    // "status": 1, 
    // "wallet_address": "0x00Dbe23e58ac538Cfdb3d1344c162a69C545c66d" }

    const Bottoming = () => {
        if (typename == 1) {
            let a = Math.trunc(ConList.length / 4)
            console.log(ConList.length, ConListTotal);
            if (ConList.length == ConListTotal) {
            } else {
                getListbuy(a + 1)
            }
        } else {
            let b = Math.trunc(auctionList.length / 4)
            console.log(auctionList.length, auctionTotal);
            if (auctionList.length == auctionTotal) {
            } else {
                getListsell(b + 1)
            }
        }
    }
    const getListbuy = (page) => {
        post('/index/order/get_my_buy_order', formData({ type: 0, page: page, limit: 4 })).then(res => {
            console.log(res.data, '售卖-购买列表');
            setConList(res.data.data)
            setConListTotal(res.data.total)
        })
    }

    const getListsell = (page) => {
        post('/index/order/get_my_sell_order', formData({ type: 0, page: page, limit: 4 })).then(res => {
            console.log(res.data.data, '售卖-售卖列表');
            setauctionTotal(res.data.total)
            setAuctionList([...auctionList, ...res.data.data])
        })
    }
    return (
        <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
            <View >
                <View style={[styles.container, { backgroundColor: "#f5f5f5" }]}>
                    <View style={[styles.index_box, styles.daohang]}>
                        <Text style={[typename != 1 ? styles.daonghang_text : styles.daonghang_text_ative]} onPress={() => paging(1)}>{t("购买")}</Text>
                        <Text style={[typename != 2 ? styles.daonghang_text : styles.daonghang_text_ative]} onPress={() => paging(2)}>{t("售卖")}</Text>
                    </View>

                </View>
            </View>
            <View style={[styles.listBox]}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ paddingBottom: 20, flex: 1, }}
                    refreshing={false}
                    ListEmptyComponent={() => {
                        return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                            <Text>{t("空空如也")}</Text>
                        </View>
                        // 列表为空展示改组件
                    }}
                    // 一屏幕展示几个
                    number={6}
                    data={typename == 1 ? ConList : auctionList}
                    renderItem={({ item }) => {
                        return (
                            <TouchableWithoutFeedback onPress={() => {
                                if (item.status == 1) {
                                    props.navigation.navigate("QuotationDetails", {
                                        id: item.order_no,
                                    });
                                }
                                if (item.status == 3) {
                                    let { nft_contract_address, nft_token_id, nft_network } = item
                                    console.log(item.id, item.unique_id, item.contract_address, item.token_id, item.network,'-----------');
                                    
                                    props.navigation.navigate('goodsDetail', {  contract_address:nft_contract_address, token_id:nft_token_id, network:nft_network })
                                }
                            }}>
                                <View style={[styles.lis]}>
                                    <View style={[styles.flexJBC]}>
                                        <View></View>
                                        {/* <Text style={styles.listTopLeft}>DMW（官方）</Text> */}
                                        <View>
                                            {
                                                typename != 1 ?
                                                    <Text style={[styles.finshingText]}>{item.status == 1 ? t('交易进行中') + '' : item.status == 2 ? t('交易取消') + '' : item.status == 3 ? t('交易完成') + '' : t('用户取消') + ''}</Text> :
                                                    // <Text style={[styles.finshingText, { color: "#F26377" }]}>4h 16m 27s后结束</Text>
                                                    <Text style={[styles.finshingText]}>{t('交易完成') + ''}</Text>
                                            }
                                        </View>
                                    </View>
                                    <View style={[styles.imageBox, styles.flexJBC]}>
                                        <View style={[styles.flex]}>
                                            <Image style={[styles.lisImg]} source={{ uri: item.image_attachment_url }}></Image>
                                            <View>
                                                <Text style={[styles.lisImgLeftName]}>{item.nft_name}</Text>
                                                <Text style={[styles.lisImgLeftColl]}>{item.collection_name ? item.collection_name : "--"}</Text>
                                            </View>
                                        </View>
                                        {
                                            typename != 1 ?
                                                <View style={{ alignItems: 'flex-end' }}>
                                                    <Text style={[styles.lisPriceText]}>{t("成交价")}</Text>
                                                    {/* <Text style={[styles.lisPrice]}>{item.total_offer_amount.number + item.total_offer_amount.currency_name}</Text> */}
                                                </View> :
                                                // <Text style={[styles.finshingText, { color: "#F26377" }]}>4h 16m 27s后结束</Text>
                                                <View style={{ alignItems: 'flex-end' }}>
                                                    <Text style={[styles.lisPriceText]}>{t("成交价")}</Text>
                                                    <Text style={[styles.lisPrice]}>{item.total_offer_amount.number} {item.buyout_price_per.currency_name!="ETH"?item.buyout_price_per.currency_name:chainNameMap[item.nft_network.toLowerCase()].nativeToken}</Text>
                                                </View>
                                        }
                                    </View>
                                    <View style={[styles.lisBottomBox, styles.flexJBC]}>
                                        <View>
                                            {/* <Text style={[styles.lisBottomleft]}>...</Text> */}
                                        </View>
                                        <View style={{ alignItems: "center" }}>
                                            <Text style={[styles.sellPriceText]}>{t('售卖价') + ''}</Text>
                                            <Text style={[styles.sellPrice]}>{item.buyout_price_per.number } {item.buyout_price_per.currency_name!="ETH"?item.buyout_price_per.currency_name:chainNameMap[item.nft_network.toLowerCase()].nativeToken}</Text>
                                        </View>
                                        <View>
                                            {
                                                typename != 1 ?
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        {/* <Text style={[styles.lisBottomLookBtn]} onPress={() => {  }}>{t('更多功能')}</Text> */}
                                                        {/* <Text style={[styles.lisBottomLookBtn]} onPress={() => { props.navigation.navigate('TradeSuccessfully') }}>查看</Text> */}
                                                    </View>
                                                    :
                                                    <Text style={[styles.lisBottomLookBtn, { backgroundColor: "#fff", color: "#897EF8" }]}
                                                        onPress={() => { props.navigation.navigate('TradeSuccessfully', { id: item.offer_id }) }}
                                                    >{t('查看') + ''}</Text>
                                            }


                                        </View>

                                    </View>
                                    {


                                        item.offers && item.offers.length ?

                                            (

                                                item.offers.map((items, index) => (
                                                    <View key={index}>
                                                        <TouchableWithoutFeedback onPress={() => {
                                                            // console.log(items, '垃圾啊你');

                                                            // props.navigation.navigate('QuotationDetails', { id: item.order_no, likes: detailsObj.likes, imgUrl: imgurl, userAvatar: userInfo.userAvatar, shortenAddress: userInfo.shortenAddress });
                                                        }}>
                                                            {/* <Text>123456</Text> */}

                                                            <View style={[styles.offerBox,]}>
                                                                <View style={[styles.flexJBC]}>
                                                                    {/* <View>
                                                                    <Text style={{ fontSize: 14, color: "#333", fontWeight: 'bold', marginBottom: 9 }}>{items.offeror.slice(2, 7)}</Text>
                                                                </View> */}
                                                                    <View>
                                                                        <Text style={[styles.moreTop]}>Buyer</Text>
                                                                        <Text style={[styles.moreBottom]}>{items.offeror.slice(2, 7)}</Text>
                                                                    </View>
                                                                    <View>
                                                                        <Text style={[styles.moreTop]}>offer</Text>
                                                                        <View style={[styles.flex, styles.moreBottom]}>
                                                                            <Image style={{ width: 15, height: 15 }} source={require('../../assets/img/money/offer.png')}></Image>
                                                                            <Text style={{ fontSize: 14, color: "#333" }}>{items.total_offer_amount.number } {item.buyout_price_per.currency_name!="ETH"?item.buyout_price_per.currency_name:chainNameMap[item.nft_network.toLowerCase()].nativeToken}</Text>
                                                                        </View>
                                                                    </View>
                                                                    <View >
                                                                        <Text style={[styles.moreTop]}>Quantity</Text>
                                                                        <Text style={[styles.moreBottom]}>{items.quantity_wanted}</Text>
                                                                    </View>

                                                                    <Text style={[styles.lisBottomLookBtn]} onPress={() => { props.navigation.navigate('TradeSuccessfully', { id: items.offer_id }) }}>{t('查看') + ''}</Text>
                                                                </View>
                                                            </View>
                                                        </TouchableWithoutFeedback>
                                                    </View>
                                                ))) : null
                                    }

                                </View>
                            </TouchableWithoutFeedback>
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={() => {
                        // 声明尾部组件
                        return (typename == 1 && ConList.length == ConListTotal) || (typename == 2 && auctionList.length == auctionTotal) ? <Text style={{ textAlign: 'center' }}>{t("没有更多了")}</Text> : null
                    }}
                    //下刷新
                    onEndReachedThreshold={0.1} //表示还有10% 的时候加载onEndReached 函数
                    onEndReached={Bottoming}
                >
                </FlatList>
            </View>

            {/* 下架 */}
            <Modal visible={visible} onDismiss={() => { setvisible(false) }} contentContainerStyle={[styles.footer]}>
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
    moreTop: {
        fontSize: 12, color: "#999", textAlign: 'center'
    },
    moreBottom: {
        fontSize: 12, color: "#333", marginTop: 9, textAlign: 'center'
    },

    offerBox: {
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        paddingVertical: 20
    },
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
        borderColor: '#ccc',
        // borderWidth:1
    },
    listBox: {
        padding: 20,
        backgroundColor: "#f5f5f5",
        flex: 1,
        paddingBottom: 0,
        justifyContent: 'center',
        paddingTop: 10

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