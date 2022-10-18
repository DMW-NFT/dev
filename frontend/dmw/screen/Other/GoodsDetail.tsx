import { Text, Image, StyleSheet, View, SafeAreaView, ScrollView, TouchableWithoutFeedback, FlatList } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleRight, faHeart, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import List from '../../Components/List'
import { useDmwApi } from '../../../DmwApiProvider/DmwApiProvider'
import { Spinner } from '@ui-kitten/components';

const GoodsDetail = (props) => {
// state = {
//     id:props.route.params.id,
//     list: [{}, {}, {}],
//     showChain: true, //显示链上信息
//     showcollection: true, //显示合集
//     showoffer: true, //显示报价
//     showhistory:true, //显示交易历史
// }

const [id, setID] = useState(props.route.params.id)
const [list, setlist] = useState([{}, {}, {}])
const [showChain, setshowChain] = useState(true)
const [showcollection, setshowcollection] = useState(false)
const [showoffer, setshowoffer] = useState(false)
const [showhistory, setshowhistory] = useState(false)
const [loading, setLoding] = useState(true) //loading
const [detailsObj, setDetailsObj] = useState({})
const [typeID, setTypeID] = useState(1) //首页进入 1
const [imgurl, setImgurl] = useState('')
const [imgShow, setimgShow] = useState(true)
const [ownersArr, setOwnersArr] = useState([])
const [ownersArrCopy, setOwnersArrCopy] = useState([])
const [userInfo, setUserInfo] = useState({ userAvatar: '', creatorAddress: '', shortenAddress: '' })
const [listing, setlisting] = useState([])
const [history, sethistory] = useState([])
const [MorenNftList, setMorenNftList] = useState([])

// Context 方法
const { Toast, post, get, formData, shortenAddress } = useDmwApi()


useEffect(() => {
console.log(props.route.params, '详情传参');
let params = props.route.params;
let data = { ...params }
getList(data)
}, [])
const getList = (data) => {
setLoding(true)
let formdata = formData(data)
console.log(formdata, '参数');
post('/index/nft/get_nft_details', formdata).then(res => {
// console.log(res, '回调');
setLoding(false)
let nftObj = res.data.nft_data
nftObj.contract_address = shortenAddress(res.data.nft_data.contract_address)
setDetailsObj(res.data.nft_data)
setImgurl(res.data.nft_data.image_attachment)
// console.log('====================================');
console.log(res.data.nft_data);
// console.log('====================================');
let arr = res.data.nft_data['owners'].msg.avatar
let arrw = res.data.nft_data['owners'].msg.wallet_address
let arrO = []
let arrWo = []
arr.map((item, index) => {
arrO.push({ avatar: item, wallet_address: shortenAddress(arrw[index]) })
arrWo.push({ avatar: item, wallet_address: arrw[index] })
})
// console.log(arrO, '拥有者');
setOwnersArr(arrO)
setOwnersArrCopy(arrWo)
// console.log(res.data.nft_data.creator_address_avatar,'---');
let userAvatar = res.data.nft_data.creator_address_avatar;
let userAvatarArr = { userAvatar: '', creatorAddress: '', shortenAddress: '' }
userAvatarArr['userAvatar'] = res.data.nft_data.creator_address_avatar
userAvatarArr['creatorAddress'] = res.data.nft_data.creator_address
userAvatarArr['shortenAddress'] = shortenAddress(res.data.nft_data.creator_address)
setUserInfo(userAvatarArr)

console.log('====================================');
console.log(res.data.listing);
console.log('====================================');
setlisting(res.data.listing)
sethistory(res.data.history)
GetMorenNft(res.data.nft_data.collection.id)
}).catch(err => {
Toast(err.message)
})

}

const GetMorenNft = (id) => {
let data = formData({ id })
post('/index/nft/get_collection_nft', data).then(res => {
console.log(res.data.data, '更多nft');
setMorenNftList(res.data.data)
})
}

return (
<SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
{
loading ? <View style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
<Spinner />
</View> :

<ScrollView showsVerticalScrollIndicator={false}        >
    <View style={[styles.container]}>
        {
            imgShow ? <Image source={{ uri: imgurl }} onError={() => {
                console.log(123456);
                setImgurl('../../assets/img/index/any2.jpg')
                setimgShow(false)
            }} style={[styles.topImg]}></Image> :
                <Image source={require('../../assets/img/index/any3.jpg')} style={[styles.topImg]}></Image>
        }

        {/* 喜欢 */}
        <View style={[styles.likeBox, styles.flexJBC]}>
            <Text style={[styles.likeBoxName]}>{detailsObj['collection'] ? detailsObj['collection'].name : '--'}</Text>
            <View style={[styles.flex]}>
                <FontAwesomeIcon icon={faHeart} color='red' size={12} />
                <Text style={[styles.likenum]}>{detailsObj.likes}</Text>
            </View>
        </View>
        {/* 合集详情 */}
        <View style={[styles.coll]}>
            <Text style={[styles.collName]}>{detailsObj.name}</Text>
            <Text style={styles.collIntrDetail}>{detailsObj.abstract}</Text>
        </View>
    </View>

    {/* 发行数量 */}
    {
        typeID == 1 ? null :
            <View style={[styles.flex, { paddingHorizontal: 20, }]}>
                <View style={[styles.faxingNum, styles.flex, { marginRight: 35 / 2 }]}>
                    <Text style={[styles.faxingNumLeft]}>发行数量</Text>
                    <Text style={[styles.faxingNumRight]}>{detailsObj['total_num'] ? detailsObj['total_num'] : '--'}</Text>
                </View>
                <View style={[styles.faxingNum, styles.flex]}>
                    <Text style={[styles.faxingNumLeft]}>剩余数量</Text>
                    <Text style={[styles.faxingNumRight]}>500</Text>
                </View>
            </View>

    }

    {/* 创建者 拥有者 */}
    <View style={[styles.createAndByuer]}>
        <View style={[styles.flex]}>
            <Image source={{ uri: userInfo.userAvatar }} style={[styles.createAndByuerImage]}></Image>
            <Text style={[styles.createAndByuerName]}>{userInfo.shortenAddress}</Text>
            <Text style={[styles.FromOrByuer]}>From</Text>
        </View>
        {
            ownersArr.map((item, index) => (
                <View style={[styles.flex, { marginTop: 10 }]}>
                    <Image source={{ uri: item.avatar }} style={[styles.createAndByuerImage]}></Image>
                    <Text style={[styles.createAndByuerName]}>{item.wallet_address}</Text>
                    <Text style={[styles.FromOrByuer]}>Buyer</Text>
                </View>
            ))

        }

    </View>
    {/* 链上信息 */}
    <View style={[styles.linechainBoxOrther]}>
        <TouchableWithoutFeedback onPress={() => { setshowChain(!showChain) }}>
            <View style={[styles.flexJBC]} >
                <Text style={[styles.linechainBoxOrtherName]}>
                    链上信息
                </Text>
                <FontAwesomeIcon icon={showChain ? faAngleDown : faAngleRight} color='#707070' size={20} />
            </View>
        </TouchableWithoutFeedback>
        {
            showChain ?
                <View>
                    <View style={[styles.flexJBC, { marginBottom: 15, marginTop: 20 }]}>
                        <Text style={[styles.chainLeft]}>合约地址</Text>
                        <Text style={[styles.chainRight, { color: " #897EF8" }]}>{detailsObj.contract_address}</Text>
                    </View>
                    <View style={[styles.flexJBC, { marginBottom: 15 }]}>
                        <Text style={[styles.chainLeft]}>Token ID</Text>
                        <Text style={[styles.chainRight, { color: " #897EF8" }]}>{detailsObj.token_id}</Text>
                    </View>
                    <View style={[styles.flexJBC, { marginBottom: 15 }]}>
                        <Text style={[styles.chainLeft]}>代币标准</Text>
                        <Text style={[styles.chainRight, { color: " #897EF8" }]}>{detailsObj.contract_type}</Text>
                    </View>
                    <View style={[styles.flexJBC, { marginBottom: 20 }]} >
                        <Text style={[styles.chainLeft]}>区块链</Text>
                        <Text style={[styles.chainRight, { color: " #897EF8" }]}>{detailsObj.network}</Text>
                    </View>
                </View> : <Text></Text>
        }
    </View>

    <View style={[styles.linechainBoxOrther,]}>
        <TouchableWithoutFeedback onPress={() => { setshowoffer(!showoffer) }}>
            <View style={[styles.flexJBC]} >
                <Text style={[styles.linechainBoxOrtherName]}>
                    挂单列表
                </Text>
                <FontAwesomeIcon icon={showoffer ? faAngleDown : faAngleRight} color='#707070' size={20} />
            </View>
        </TouchableWithoutFeedback>
        {
            showoffer ?
                (
                    listing.map((item, index) => (
                        <View>
                                <TouchableWithoutFeedback onPress={()=>{props.navigation.navigate('QuotationDetails',{id:item.order_no,likes:detailsObj.likes,imgUrl:imgurl,userAvatar : userInfo.userAvatar ,shortenAddress : userInfo.shortenAddress});
                        }}>
                            <View style={[styles.offerBox,]}>
                                <View style={[styles.flexJBC]}>
                                    <View>
                                        <Text style={{ fontSize: 14, color: "#333", fontWeight: 'bold', marginBottom: 9 }}>{item.wallet_address.slice(2, 7)}</Text>
                                        <Text style={{ fontSize: 12, color: "#999" }}>-less</Text>
                                    </View>
                                    <View>
                                        <View style={[styles.flex, { marginBottom: 9 }]}>
                                            <Image style={{ width: 15, height: 15 }} source={require('../../assets/img/money/offer.png')}></Image>
                                            <Text style={{ fontSize: 14, color: "#333" }}>{item.buyout_price_per.number + item.buyout_price_per.currency_name}</Text>
                                        </View>
                                        {/* <Text style={{ fontSize: 12, color: "#999" }}>$455.32</Text> */}
                                    </View>
                                </View>
                            </View>
                            </TouchableWithoutFeedback>
                            <View style={[styles.offerBox, styles.flexJBC,]}>
                                <View >
                                    <Text style={[styles.moreTop]}>Quantity</Text>
                                    <Text style={[styles.moreBottom]}>{item.quantity}</Text>
                                </View>
                                <View >
                                    <Text style={[styles.moreTop]}>From</Text>
                                    <Text style={[styles.moreBottom]}>{item.wallet_address.slice(2, 7)}</Text>
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
    
    {/* 交易历史 */}
    <View style={[styles.linechainBoxOrther,]}>
        <TouchableWithoutFeedback onPress={() => { setshowhistory(!showhistory) }}>
            <View style={[styles.flexJBC]} >
                <Text style={[styles.linechainBoxOrtherName]}>
                    交易历史
                </Text>
                <FontAwesomeIcon icon={showhistory ? faAngleDown : faAngleRight} color='#707070' size={20} />
            </View>
        </TouchableWithoutFeedback>
        {
            showhistory ?

                (
                    history.map((item, index) => (
                        
                        <View>
                            <View style={[styles.offerBox,]}>
                                <View style={[styles.flexJBC]}>
                                    <View>
                                        <Text style={{ fontSize: 14, color: "#333", fontWeight: 'bold', marginBottom: 9 }}>Sale</Text>
                                        <Text style={{ fontSize: 12, color: "#999" }}>-less</Text>
                                    </View>
                                    <View>
                                        <View style={[styles.flex, { marginBottom: 9 }]}>
                                            <Image style={{ width: 15, height: 15 }} source={require('../../assets/img/money/offer.png')}></Image>
                                            <Text style={{ fontSize: 14, color: "#333" }}>{item.total_offer_amount.number + item.total_offer_amount}</Text>
                                        </View>
                                        {/* <Text style={{ fontSize: 12, color: "#999" }}>$455.32</Text> */}
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.offerBox, styles.flexJBC,]}>
                                <View >
                                    <Text style={[styles.moreTop]}>Quantity</Text>
                                    <Text style={[styles.moreBottom]}>{item.quantity_wanted}</Text>
                                </View>
                                <View >
                                    <Text style={[styles.moreTop]}>From</Text>
                                    <Text style={[styles.moreBottom]}>{item.address.slice(2, 7)}</Text>
                                </View>
                                <View>
                                    <Text style={[styles.moreTop]}>To</Text>
                                    <Text style={[styles.moreBottom]}>{item.offeror.slice(2, 7)}</Text>
                                </View>
                            </View>
                            
                        </View>
                        
                    ))

                )
                : <Text></Text>
        }
    </View>
    {/* 合集 */}
    {
        detailsObj.create_way == 1 ?
            <View style={[styles.linechainBoxOrther]}>
                <TouchableWithoutFeedback onPress={() => { setshowcollection(!showcollection) }}>
                    <View style={[styles.flexJBC]} >
                        <Text style={[styles.linechainBoxOrtherName]}>
                            Content of this collection
                        </Text>
                        <FontAwesomeIcon icon={showcollection ? faAngleDown : faAngleRight} color='#707070' size={20} />
                    </View>
                </TouchableWithoutFeedback>
                {
                    showcollection ?
                        <View style={[styles.flex, { marginVertical: 20 }]}>
                            <Image source={{ uri: detailsObj.collection.logo_url }} style={[styles.collectionImage]}></Image>
                            <Text style={[styles.createAndByuerName, { marginLeft: 15 }]}>{detailsObj.collection.name}</Text>
                        </View> : <Text></Text>
                }
            </View> : null
    }

    {/*底部列表 */}
    <View style={[styles.linechainBoxOrther, { borderBottomColor: "#fff" }]}>
        <View style={[styles.flexJBC]}>
            <Text style={[styles.linechainBoxOrtherName, { marginBottom: 20 }]}>
                More from this collection
            </Text>
        </View>
        {
            MorenNftList.length ? <View>
                {
                    MorenNftList.map((item, index) => (
                        <List list={item} type={1}
                            navigatetoDetail={(id, unique_id, contract_address, token_id, network) => { props.navigation.navigate('goodsDetail', { id: id, unique_id, contract_address, token_id, network }) }}
                        />
                    ))

                }
            </View> : 
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: '40%' }}>
                <Spinner />
            </View>

        }
    </View>
    {/* 底部按钮 */}
    {/* <View style={[styles.bottombtnBox, styles.flexJBC]}>
    <View style={[styles.flex, { alignItems: "flex-end" }]}>
        <Text style={[styles.bottomPrice]}> 4,218</Text>
        <Text style={[styles.bottomcoinType]}> Wfca</Text>
    </View>
    <Text style={[styles.bottomBtn]}>Buy now </Text>
</View> */}


</ScrollView>
}
</SafeAreaView>
)
}

export default GoodsDetail

const styles = StyleSheet.create({
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
flex: 1,
marginLeft: 20,
textAlign: 'center',
height: 50,
lineHeight: 50,
borderRadius: 25,
backgroundColor: "#897EF8",
color: "#fff",
fontWeight: "bold",
fontSize: 16,

},
bottombtnBox: {
paddingBottom: 28,
paddingHorizontal: 20,
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
paddingBottom: 0
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