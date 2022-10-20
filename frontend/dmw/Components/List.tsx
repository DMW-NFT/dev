import { Text, Image, StyleSheet, View, FlatList, ImageBackground, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { Item } from 'react-native-paper/lib/typescript/components/List/List'


const List = (props) => {
    // type 
    // 1是首页进入
    // 2是交易里的寄售  
    // 3是交易里的拍卖
    const [refreshing, setrefreshing] = useState(false)
    const [imgs, setimgs] = useState(true)
    const [type, setype] = useState(props.type)
    const item = props.list
    const [imgurl, setImgurl] = useState(item.image_attachment_url)

    useEffect(() => {
        console.log(imgurl);

    }, [imgurl])

    return (
        <TouchableWithoutFeedback onPress={() => {
            console.log(1,item.unique_id,item.contract_address,item.token_id,item.network,'详情传参');
            props.navigatetoDetail(1,item.unique_id,item.contract_address,item.token_id,item.network)
        }}>
            <View style={[styles.lis]} >
                <View>
                    <View style={[styles.imgBox]} >
                        {
                            imgs ?
                                <ImageBackground onError={() => {
                                    console.log(123456);
                                    setImgurl('../assets/img/index/any2.jpg')
                                    setimgs(false)
                                }} style={[styles.imageBox]} resizeMode='cover' source={{ uri: imgurl }}>
                                    {
                                        type == 3 ?
                                            <Text style={[styles.time, styles.timeBox]} >4h 16m 27s</Text> : <Text></Text>
                                    }
                                </ImageBackground> :

                                <ImageBackground onError={() => {
                                }} style={[styles.imageBox]} resizeMode='cover' source={require('../assets/img/index/any2.jpg')}>


                                    {
                                        type == 3 ?
                                            <Text style={[styles.time, styles.timeBox]} >4h 16m 27s</Text> : <Text></Text>
                                    }

                                </ImageBackground>

                        }




                    </View>
                </View>
                <View style={[styles.lisBottom, { height: type == 3 ? 248 / 2 : 100 }]} >
                    <Text style={[styles.name]} numberOfLines={1}>{item.collection_name || '--'}</Text>
                    <Text numberOfLines={2} style={[styles.collName]}>
                        {item.nft_name || ''}
                    </Text>
                    <View>
                        {
                            type != 3 ?
                                <View style={[styles.priceBox]}>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                        <Text style={[styles.price]}>{item.reserve_price_per ? item.reserve_price_per.number : '--'}</Text>
                                        <Text style={[styles.coinType]}>{item.reserve_price_per ? item.reserve_price_per.currency_name : ''}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <FontAwesomeIcon icon={faHeart} color='red' size={11} />
                                        <Text style={[styles.like]} >{item.likes}</Text>
                                    </View>
                                </View> :
                                <View style={[styles.auction]}>
                                    {/* <Text style={[styles.name]} numberOfLines={1}>当前出价</Text> */}
                                    <Text style={[styles.name]} numberOfLines={1}>起拍价</Text>
                                    <View style={[styles.priceBox]}>
                                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                            <Text style={[styles.price]}>4,218</Text>
                                            <Text style={[styles.coinType]}>Wfca</Text>
                                        </View>
                                        {/* <Text style={[styles.button]}>
                                            查看
                                        </Text> */}
                                        <Text style={[styles.button, { backgroundColor: '#897EF8' }]}>
                                            出价
                                        </Text>
                                    </View>
                                </View>
                        }
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}


export default List
const styles = StyleSheet.create({
    button: {
        fontSize: 12,
        color: '#fff',
        height: 22,
        lineHeight: 22,
        width: 44,
        textAlign: 'center',
        borderRadius: 11,
        backgroundColor: '#ACA4FA'
    },
    imgBox: {
        position: 'relative',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: "hidden",
    },
    timeBox: {
        position: 'absolute',
        padding: 10,
        paddingLeft: 37 / 2,
        paddingRight: 37 / 2,
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.23)',

    },
    time: {
        color: '#fff',
        fontWeight: '800',
        fontSize: 12,
    },
    lis: {
        width: "47%",
        marginBottom: 20,
        marginRight: '6%',
    },
    imageBox: {
        // width:  Dimensions.get('window').width
        width: '100%',
        height: 315 / 2,
        justifyContent: 'center',
        alignItems: 'center',


    },
    lisBottom: {
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: "#F5F5F5",
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,


    },
    name: {
        fontSize: 10,
        color: "#666",
    },
    collName: {
        color: '#333',
        lineHeight: 18,
        fontWeight: "bold",
        fontSize: 12,
        // marginVertical: 10,
    },
    priceBox: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'flex-end'
    },
    price: {
        color: '#333333',
        fontWeight: "bold",
        fontSize: 12,
    },
    coinType: {
        fontWeight: null,
        fontSize: 10,
    },
    like: {
        color: '#ccc',
        fontSize: 10,
    }
})