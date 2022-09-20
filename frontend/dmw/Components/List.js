import { Text, Image, StyleSheet, View, FlatList, ImageBackground, TouchableWithoutFeedback } from 'react-native'
import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'


export default class List extends Component {
    // type 
    // 1是首页进入
    // 2是交易里的寄售  
    // 3是交易里的拍卖
    state = {
        refreshing: false,
        type: this.props.type,
    }
    componentDidMount() {
       console.log(this.props.type)
    }
    render() {
        let { type } = this.state
        return ( 
            <TouchableWithoutFeedback onPress={() => {
                this.props.navigatetoDetail(1)
            }}>
                <View style={[styles.lis]} >
                    <View>
                        <View style={[styles.imgBox]} >
                            <ImageBackground style={[styles.imageBox]} resizeMode='cover' source={require('../assets/img/index/any.jpeg')}>


                                {
                                    type == 3 ?
                                        <Text style={[styles.time, styles.timeBox]} >4h 16m 27s</Text> : <Text></Text>
                                }

                            </ImageBackground>
                        </View>
                    </View>
                    <View style={[styles.lisBottom, { height: type == 3 ? 248 / 2 : 100 }]} >
                        <Text style={[styles.name]} numberOfLines={1}>Naruto</Text>
                        <Text numberOfLines={2} style={[styles.collName]}>
                            Uzumaki Naruto #0001
                        </Text>
                        <View>
                            {
                                type != 3 ?
                                    <View style={[styles.priceBox]}>
                                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                            <Text style={[styles.price]}>4,218</Text>
                                            <Text style={[styles.coinType]}>USDT</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <FontAwesomeIcon icon={faHeart} color='red' size={11} />
                                            <Text style={[styles.like]} >23</Text>
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
}

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
        borderTopRightRadius:10,
        overflow:"hidden",
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