import { Text, Image, StyleSheet, View, SafeAreaView, ScrollView, TouchableWithoutFeedback, FlatList, TextInput } from 'react-native'
import React, { useState, useContext, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleRight, faHeart, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import List from '../../Components/List'
import { useDmwApi } from '../../../DmwApiProvider/DmwApiProvider'
import { Spinner } from '@ui-kitten/components';
import { Button, Card, Layout, Modal } from '@ui-kitten/components';
import { useDmwWeb3 } from '../../../DmwWeb3/DmwWeb3Provider'
import { useDmwWallet } from '../../../DmwWallet/DmwWalletProvider'
import { useDmwLogin } from '../../../loginProvider/constans/DmwLoginProvider'
import { read } from 'fs/promises'

const QuotationDetails = (props) => {

    const inputRefX = useRef(null);
    const [id, setID] = useState(props.route.params.id)
    const [showoffer, setshowoffer] = useState(false)
    const [loading, setLoding] = useState(true) //loading
    const [detailsObj, setDetailsObj] = useState({})
    const [imgurl, setImgurl] = useState(null)
    const [likes, setlikes] = useState(0)
    const [imgShow, setimgShow] = useState(true)
    const [userInfo, setUserInfo] = useState({ userAvatar: '', shortenAddress: '' })
    const [orderList, setOrderList] = useState({ quantity: 1 })
    const [Price, setPrice] = useState(null)
    const [UnitPrice, setUnitPrice] = useState({ UnitPrice: null, Company: '' })
    const [NftInfo, setNftInfo] = useState(null)
    const [collection, setcollection] = useState(null)
    const [offersList, setOffersList] = useState([])
    const [passwordlist, setpasswordlist] = useState([]);
    const [password, setpassword] = useState("");
    const [Modalvisible, setModalvisible] = useState(false)
    const [BuyNowVisible, setBuyNowVisible] = useState(false)
    const [BuyNumber, setBuyNumber] = useState('1')
    const [listE, setlistE] = useState([{ value: 'USDT', name: 'USDT' }])
    const [isShowE, setisShowE] = useState(false)//是否展开区块链选择框
    const [activeEm, setactiveEm] = useState({ value: 'USDT', name: 'USDT' })
    // Context 方法
    const { Toast, post, get, formData, shortenAddress, } = useDmwApi()
    const { buyNFT, currentWallet, transactionMap, transactionList, connectWallet } = useDmwWeb3()
    const { dmwBuyNFT } = useDmwWallet()
    const { WalletInUse } = useDmwLogin

    const [latestHash, setLatestHash] = useState()
    const empty = () => {
        setpassword('')
    }

    useEffect(() => {
        transactionList && setLatestHash(transactionList[transactionList.length - 1])
    }, [transactionList])

    useEffect(() => {
    }, [currentWallet])
    useEffect(() => {
        if (transactionMap && transactionMap[latestHash]) {
            if (transactionMap[latestHash].state == "comfirmed") {
                Toast('购买成功')
            }
        }
    }, [transactionMap])

    useEffect(() => {
        let blackPointArry = [null, null, null, null, null, null]
        let arr = password.split('');
        arr.map((item, index) => {
            blackPointArry[index] = item;
        })
        setpasswordlist(blackPointArry)
        if (password.length == 6) {
            if (WalletInUse == 1) {
                // 本地钱包购买
                try {
                    dmwBuyNFT('123456', String(orderList.listing_id), Number(BuyNumber), orderList.currency, String(UnitPrice.UnitPrice * Number(BuyNumber)))
                } catch (err) {
                }
            } else {
                // 第三方钱包购买
                try {
                    new buyNFT(
                        String(orderList.listing_id), Number(BuyNumber), orderList.currency, String(UnitPrice.UnitPrice * Number(BuyNumber))
                    )
                } catch (error) {
                }
            }
        }
    }, [password])

    useEffect(() => {
        let newBuyNumber = null;
        if (Number(BuyNumber) > orderList.quantity && orderList) {
            Toast('剩余数量不足！')
            newBuyNumber = String(orderList.quantity)
        } else if (Number(BuyNumber) < 0) {
            newBuyNumber = String(1)
        } else if (BuyNumber == 'NaN') {
            newBuyNumber = String(1)
        }
        setBuyNumber(newBuyNumber ? newBuyNumber : String(Number(BuyNumber)))
    }, [BuyNumber])

    useEffect(() => {
        getList()
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setLoding(false)
        }, 1000);
    }, [offersList])

    const getList = () => {
        setLoding(true)
        let data = { order_no: props.route.params.id }
        let formdata = formData(data)
        post('/index/order/get_order_details', formdata).then(res => {
            console.log(res.data.nft.likes, '订单详情');

            setOrderList(res.data)
            setUserInfo({ userAvatar: res.data.wallet_address_avatar, shortenAddress: shortenAddress(res.data.wallet_address) })
            setlikes(res.data.nft.likes)
            setImgurl(res.data.nft.image_attachment_url)
            setNftInfo(res.data.nft)
            setPrice(`${res.data.reserve_price_per.number} ${res.data.reserve_price_per.currency_name}`)
            setUnitPrice({ UnitPrice: res.data.reserve_price_per.number, Company: res.data.reserve_price_per.currency_name })
            setcollection(res.data.nft.collection)
            setOffersList(res.data.offers)
        })
    }
    // 打开支付密码弹窗
    const openPassWordModal = () => {
        setModalvisible(true); setTimeout(() => {
            inputRefX.current.focus();
        }, 500);
        empty();
    }
    // 打开直接购买弹窗
    const openBuyNowModal = () => {
        setBuyNowVisible(true)
        setBuyNumber('1')
    }
    // 确认购买
    const ConfirmPurchase = () => {
        openPassWordModal()
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
            {
                loading ? <View style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner />
                </View> :
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={[styles.container]}>
                            {
                                imgShow ? <Image source={{ uri: imgurl }} onError={() => {
                                    setImgurl('../../assets/img/index/any2.jpg')
                                    setimgShow(false)
                                }} style={[styles.topImg]}></Image> :
                                    <Image source={require('../../assets/img/index/any3.jpg')} style={[styles.topImg]}></Image>
                            }

                            {/* 喜欢 */}
                            <View style={[styles.likeBox, styles.flexJBC]}>
                                <Text style={[styles.likeBoxName]}>{collection ? collection.name : '--'}</Text>
                                <View style={[styles.flex]}>
                                    <FontAwesomeIcon icon={faHeart} color='red' size={12} />
                                    <Text style={[styles.likenum]}>{likes}</Text>
                                </View>
                            </View>
                            {/* 卖家详情 */}
                            <View style={[styles.coll]}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={[styles.collName]}>{NftInfo ? NftInfo.name : '--'}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                        <Image style={{ width: 15, height: 15 }} source={require('../../assets/img/money/offer.png')}></Image>
                                        <Text style={{ fontSize: 14, color: "#333" }}>{Price}</Text>
                                    </View>
                                </View>
                                <View style={styles.flexJBC}>
                                    <Text style={styles.collIntrDetail}>{NftInfo ? NftInfo.abstract : '--'}</Text>

                                </View>
                            </View>
                        </View>

                        {/* 发行数量 */}
                        <View style={[styles.flex, { paddingHorizontal: 20, }]}>
                            {/* <View style={[styles.faxingNum, styles.flex, { marginRight: 35 / 2 }]}>
                                        <Text style={[styles.faxingNumLeft]}>发行数量</Text>
                                        <Text style={[styles.faxingNumRight]}>{detailsObj['total_num'] ? detailsObj['total_num'] : '--'}</Text>
                                    </View> */}
                            <View style={[styles.faxingNum, styles.flex]}>
                                <Text style={[styles.faxingNumLeft]}>剩余数量</Text>
                                <Text style={[styles.faxingNumRight]}>{orderList ? orderList.quantity : '--'}</Text>
                            </View>
                        </View>

                        {/* 创建者 拥有者 */}
                        <View style={[styles.createAndByuer]}>
                            <View style={[styles.flex]}>
                                <Image source={{ uri: userInfo.userAvatar }} style={[styles.createAndByuerImage]}></Image>
                                <Text style={[styles.createAndByuerName]}>{userInfo.shortenAddress}</Text>
                                <Text style={[styles.FromOrByuer]}>From</Text>
                            </View>
                        </View>





                        {/* 报价详情 */}
                        <View style={[styles.linechainBoxOrther,]}>
                            <TouchableWithoutFeedback onPress={() => { setshowoffer(!showoffer) }}>
                                <View style={[styles.flexJBC]} >
                                    <Text style={[styles.linechainBoxOrtherName]}>
                                        报价详情
                                    </Text>
                                    <FontAwesomeIcon icon={showoffer ? faAngleDown : faAngleRight} color='#707070' size={20} />
                                </View>
                            </TouchableWithoutFeedback>
                            {
                                showoffer ?
                                    (
                                        offersList.map((item, index) => (
                                            <View>
                                                <View style={[styles.offerBox,]}>
                                                    <View style={[styles.flexJBC]}>
                                                        <View>
                                                            <Text style={{ fontSize: 14, color: "#333", fontWeight: 'bold', marginBottom: 9 }}>{item.address.slice(2, 7)}</Text>
                                                            <Text style={{ fontSize: 12, color: "#999" }}>-less</Text>
                                                        </View>
                                                        <View>
                                                            <View style={[styles.flex, { marginBottom: 9 }]}>
                                                                <Image style={{ width: 15, height: 15 }} source={require('../../assets/img/money/offer.png')}></Image>
                                                                <Text style={{ fontSize: 14, color: "#333" }}>{item.total_offer_amount.number + item.total_offer_amount.currency_name}</Text>
                                                                <Text style={[styles.offercolse]}>取消报价</Text>
                                                            </View>
                                                            {/* <Text style={{ fontSize: 12, color: "#999" }}>$455.32</Text> */}
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={[styles.offerBox, styles.flexJBC, { borderBottomColor: '#fff' }]}>
                                                    <View>
                                                        <Text style={[styles.moreTop]}>Floor Diff</Text>
                                                        <Text style={[styles.moreBottom, { color: "#897EF8" }]}>{item.floor_diff}% below</Text>
                                                    </View>
                                                    <View >
                                                        <Text style={[styles.moreTop]}>Quantity</Text>
                                                        <Text style={[styles.moreBottom]}>{item.quantity_wanted}</Text>
                                                    </View>
                                                    <View >
                                                        <Text style={[styles.moreTop]}>From</Text>
                                                        <Text style={[styles.moreBottom]}>{item.address.slice(2, 7)}</Text>
                                                    </View>
                                                    <View>
                                                        <Text style={[styles.moreTop]}>Expires</Text>
                                                        <Text style={[styles.moreBottom]}>{item.end_time}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        ))

                                    ) : <Text></Text>
                            }
                        </View>





                        {/* 底部按钮 */}
                        <View style={[styles.bottombtnBox,]}>
                            <View style={[styles.flex, { alignItems: "flex-end" }]}>
                                <Text style={[styles.bottomPrice]}> {Price}</Text>
                                {/* <Text style={[styles.bottomcoinType]}> Wfca</Text> */}
                            </View>
                            <View style={{ flexDirection: 'row', backgroundColor: 'pink', borderRadius: 25, flex: 1, marginLeft: 25, height: 50, alignItems: 'center' }}>
                                <Text
                                    onPress={() => openBuyNowModal()}
                                    style={[styles.bottomBtn,
                                    { flex: 1, borderTopLeftRadius: 25, borderBottomLeftRadius: 25 }]}
                                >Buy now </Text>
                                <Text
                                    onPress={() => openPassWordModal()}
                                    style={[styles.bottomBtn,
                                    { flex: 1, backgroundColor: '#fff', color: '#333', borderColor: '#897EF8', borderWidth: 1, borderTopRightRadius: 25, borderBottomRightRadius: 25 }]}
                                >Offer </Text>
                            </View>
                        </View>


                    </ScrollView>
            }
            {/* 确定直接购买弹窗 */}
            {/* Buy now 弹窗 */}
            <Modal
                visible={BuyNowVisible}
                backdropStyle={{ "backgroundColor": 'rgba(0, 0, 0, 0.5)' }}
                onBackdropPress={() => { setBuyNowVisible(false) }}>
                <Card disabled={true} style={styles.CardBox}>
                    <View style={{ justifyContent: 'flex-end', flexDirection: 'row', position: 'absolute', top: 10, right: 20, width: 22, height: 22 }}>
                        <TouchableWithoutFeedback onPress={() => { setBuyNowVisible(false) }}>
                            <Image style={styles.colose} source={require('../../assets/img/money/6a1315ae8e67c7c50114cbb39e1cf17.png')}></Image>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '700', marginBottom: 30 }}>购买</Text>
                        <Image source={{ uri: imgurl }} style={styles.BuyNowImg}></Image>
                        <View style={styles.nameBox}>
                            <Text style={{ fontSize: 14, fontWeight: '700', textAlign: 'center', marginBottom: 5 }}>{collection ? collection.name : '--'}</Text>
                            <Text style={{ fontSize: 12, textAlign: 'center', fontWeight: '500' }}>{NftInfo ? NftInfo.name : '--'}</Text>
                        </View>
                    </View>


                    {/* 购买数量 */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                        {
                            Number(BuyNumber) != 1 ?
                                <TouchableWithoutFeedback onPress={() => { setBuyNumber(String(Number(BuyNumber) - 1)) }}>
                                    <Image style={styles.addImg} source={require('../../assets/img/index/-.png')}></Image>
                                </TouchableWithoutFeedback>

                                :
                                <Image style={styles.addImg} source={require('../../assets/img/index/no-.png')}></Image>
                        }
                        <TextInput
                            caretHidden={true}
                            secureTextEntry={true}
                            onKeyPress={() => { }}
                            keyboardType="phone-pad"
                            style={styles.buyInput}
                            onChangeText={(e) => {
                                if (Number(e) > orderList.quantity) {
                                    Toast('剩余数量不足！')
                                    setBuyNumber(String(orderList.quantity))
                                } else {
                                    setBuyNumber(e);
                                }
                            }
                            }
                            value={BuyNumber}
                        />
                        <TouchableWithoutFeedback onPress={() => { setBuyNumber(String(Number(BuyNumber) + 1)) }}>
                            <Image style={styles.addImg} source={require('../../assets/img/index/+.png')}></Image>
                        </TouchableWithoutFeedback>

                    </View>



                    <View style={[styles.lis, { marginBottom: 20 }]}>
                        {/* <Text style={{ fontSize: 16, marginBottom: 17 }}>
                            选择区块链
                        </Text> */}

                        <TouchableWithoutFeedback onPress={() => {
                            if (!listE) {
                                Toast('未加载到其他')
                                return
                            } setisShowE(!isShowE)
                        }}>
                            <View style={[styles.input, {
                                flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                            }]}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require('../../assets/img/index/any2.jpg')} style={{ width: 24, height: 24, borderRadius: 12 }}></Image>
                                    <Text style={{ marginLeft: 10 }}>
                                        {activeEm.name}
                                    </Text></View>
                                <FontAwesomeIcon
                                    icon={faAngleDown}
                                    color="#707070"
                                    size={16}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        {
                            isShowE ?
                                <View style={{
                                    paddingTop: 20, backgroundColor: '#fff', marginBottom: 20, marginTop: 2, borderRadius: 12, borderWidth: 1, borderColor: '#ccc', paddingBottom: 20
                                }}>

                                    {
                                        listE && listE.length ?
                                            listE.map((item, index) => (
                                                <Text onPress={() => { setactiveEm({ value: item.value, name: item.name }); setisShowE(false) }}
                                                    style={{
                                                        color: activeEm.value == item.value ? 'blue' : '#333',
                                                        paddingTop: 10, paddingBottom: 10,
                                                        backgroundColor: activeEm.value == item.value ? 'rgba(40, 120, 255,0.1)' : '#fff',
                                                        paddingLeft: 20
                                                    }}>{item.name}</Text>

                                            )) : null
                                    }


                                </View> : null
                        }

                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <View>
                            <Text style={{ fontSize: 16, color: '#999999', fontWeight: '700' }}>价格</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 16, color: '#333333', fontWeight: '700', marginRight: 5 }}>{`${Price} X ${BuyNumber}`}</Text>
                            {/* <Text style={{ fontSize: 10, lineHeight: 22 }}>Wfca</Text> */}
                        </View>
                    </View>





                    {
                        false ?
                            <View style={{ marginTop: 40 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                    <Text></Text>
                                    <Text style={{ fontSize: 10, color: '#897EF8' }}>编辑</Text>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                    <Text style={{ fontSize: 16, color: '#999999', fontWeight: '700' }}>预估GAS费</Text>
                                    <Text style={{ fontSize: 10, }}>0.001Wfca</Text>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 10, color: '#3FAA85' }}>有可能在30秒内</Text>
                                    <Text style={{ fontSize: 10, color: '#999999' }}>最高收费：0.0002ETH</Text>
                                </View></View> : null
                    }



                    <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-between' }}>
                        <Text style={[styles.BuyBtnC, {}]} onPress={() => { setBuyNowVisible(false) }}>取消</Text>
                        <Text style={[styles.BuyBtnQ, {}]} onPress={() => ConfirmPurchase()}>确定</Text>
                    </View>
                </Card>
            </Modal>

            {/* 支付弹窗 */}
            <Modal
                visible={Modalvisible}
                backdropStyle={{ "backgroundColor": 'rgba(0, 0, 0, 0.5)' }}
                onBackdropPress={() => { setModalvisible(false) }}>
                <Card disabled={true} style={styles.CardBox}>

                    <TextInput
                        ref={inputRefX}
                        maxLength={6}
                        caretHidden={true}
                        secureTextEntry={true}
                        onKeyPress={() => { }}
                        placeholder='123456'
                        keyboardType="numeric"
                        style={{ position: 'absolute', zIndex: 1, top: -40 }}
                        onChangeText={(e) => {
                            setpassword(e);
                        }
                        }
                        value={password}
                    />
                    <View style={{ justifyContent: 'flex-end', flexDirection: 'row', position: 'absolute', top: 10, right: 20, width: 22, height: 22 }}>
                        <TouchableWithoutFeedback onPress={() => { setModalvisible(false) }}>
                            <Image style={styles.colose} source={require('../../assets/img/money/6a1315ae8e67c7c50114cbb39e1cf17.png')}></Image>
                        </TouchableWithoutFeedback>

                    </View>
                    <View>
                        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '700', marginBottom: 30 }}>请输入支付密码</Text>
                        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '700', marginBottom: 30 }}>{NftInfo ? NftInfo.name : '--'}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                            <Text style={{ color: '#999999', fontSize: 16, fontWeight: '700' }}>价格</Text>
                            <Text style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 16, fontWeight: '700' }}>{UnitPrice.UnitPrice * Number(BuyNumber)}</Text>
                                <Text>&nbsp;</Text>
                                <Text style={{ fontSize: 10 }}>{UnitPrice.Company ? UnitPrice.Company : 'USDT'}</Text>
                            </Text>
                        </View>



                        <View style={{ height: 48, flexDirection: 'row', justifyContent: 'space-between', }}>
                            {
                                passwordlist.map((item, index) => (
                                    <Text style={[index == 0 ? styles.passinputfirst : styles.passinput]}>{item ? "●" : ''}</Text>
                                ))
                            }
                        </View>



                    </View>
                </Card>
            </Modal>




        </SafeAreaView>
    )
}

export default QuotationDetails

const styles = StyleSheet.create({
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: '#ccc',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        borderBottomRightRadius: 24,
        borderBottomLeftRadius: 24,
        paddingLeft: 15,
        paddingRight: 15,
    },
    lis: {
        marginBottom: 52 / 2,
    },
    addImg: {
        width: 30, height: 30
    },
    buyInput: {
        flex: 1,
        height: 40,
        backgroundColor: '#ffffff',
        borderColor: '#C2C2C2',
        borderWidth: 1,
        borderRadius: 10,
        marginLeft: 20,
        marginRight: 20,
        lineHeight: 40,
        textAlign: 'center'
    },
    BuyBtnQ: {
        width: 120,
        height: 40,
        backgroundColor: '#897EF8',
        borderRadius: 50,
        lineHeight: 40,
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700'
    },
    BuyBtnC: {
        width: 120,
        height: 40,
        backgroundColor: '#F5F5F5',
        borderRadius: 50,
        lineHeight: 40,
        textAlign: 'center',
        color: '#333',
        fontSize: 16,
        fontWeight: '700'
    },
    nameBox: {
        backgroundColor: '#F0EFFE',
        borderRadius: 10,
        paddingTop: 15,
        paddingBottom: 15,
        width: '100%'
    },
    BuyNowImg: {
        width: 100,
        height: 100,
        borderRadius: 5,
        marginBottom: 15
    },
    colose: {
        width: 22, height: 22, borderWidth: 1, borderRadius: 11, borderColor: '#ccc', justifyContent: 'center', alignItems: 'center',
        marginRight: -10,
    },
    CardBox: {
        width: 640 / 2,
        borderRadius: 20,
        position: 'relative',
        paddingBottom: 20,
        zIndex: 100
        // paddingTop: 10,
        // paddingRight: 10
    },
    passinputfirst: { textAlign: 'center', lineHeight: 48, borderColor: '#CCCCCC', borderWidth: 1, width: 46, height: 48, },
    passinput: { textAlign: 'center', lineHeight: 48, borderColor: '#CCCCCC', borderWidth: 1, width: 46, height: 48, borderLeftWidth: 0, },
    // offer 列表结束
    offercolse: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        color: "#fff",
        fontSize: 10,
        marginLeft: 22,
        backgroundColor: "#897EF8",
        borderRadius: 5,
    },
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
    // offer列表 开始

    faxingNum: {
        width: 175 / 2,
        borderWidth: 1,
        borderColor: "#897EF8",
        borderRadius: 5,

    },
    faxingNumLeft: {
        height: 20,
        lineHeight: 20,
        width: '50%',
        color: "#897EF8",
        backgroundColor: "rgb(211,221,255)",
        textAlign: 'center',
        fontSize: 10,
    },
    faxingNumRight: {
        height: 20,
        lineHeight: 20,
        width: '50%',
        color: "#333333",
        textAlign: 'center',
        fontSize: 10,
    },
    collectionImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    chainLeft: {
        color: "#333",
        fontSize: 12,
    },
    chainRight: {
        color: "#666",
        fontSize: 12,
    },
    bottomcoinType: {
        color: '#333333',
        fontSize: 10,
    },
    bottomPrice: {
        color: '#333',
        fontWeight: "700",
        fontSize: 16,
    },
    bottomBtn: {
        // width:'70%',
        // flex: 1,
        // marginLeft: 20,
        textAlign: 'center',
        height: 50,
        lineHeight: 50,
        // borderRadius: 25,
        backgroundColor: "#897EF8",
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,

    },
    bottombtnBox: {
        paddingBottom: 28,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 20
    },
    linechainBoxOrtherName: {
        color: "#333",
        fontWeight: "bold",
        fontSize: 16,
    },
    linechainBoxOrther: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        padding: 20,
        paddingBottom: 0,
        marginBottom: 40
    },


    FromOrByuer: {
        fontSize: 10,
        lineHeight: 18,
        color: '#897EF8',
        backgroundColor: "rgb(211,221,255)",
        paddingHorizontal: 5,
        borderRadius: 10,
    },
    createAndByuerName: {
        fontSize: 14,
        color: "#333",
        fontWeight: "bold",
        marginLeft: 15,
        marginRight: 10,
    },
    createAndByuerImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    createAndByuer: {
        paddingHorizontal: 20,
        width: "100%",
        borderTopColor: "#ccc",
        borderTopWidth: 1,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        marginTop: 20,
        justifyContent: 'space-around',
        paddingTop: 10,
        paddingBottom: 10
    },
    collIntrDetail: {
        color: "#999",
        lineHeight: 24,
        fontSize: 12,
        marginTop: 20,
    },
    collName: {
        color: '#333',
        fontWeight: "800",
        fontSize: 16,
    },
    coll: {
        marginTop: 20,
        padding: 20
    },
    likenum: {
        color: "#ccc",
        marginLeft: 3,
        fontSize: 10,
    },
    likeBoxName: {
        color: "#666",
        fontSize: 12,
        fontWeight: "bold"
    },
    likeBox: {
        marginTop: 23,
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
    topImg: {
        width: '100%',
        height: 670 / 2,
        borderRadius: 20,

    },
    container: {
        padding: 20,
    }
})