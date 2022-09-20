import { Text, Image, StyleSheet, View, SafeAreaView, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleRight, faHeart, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import List from '../../Components/List'

export default class GoodsDetail extends Component {
    state = {
        id:this.props.route.params.id,
        list: [{}, {}, {}],
        showChain: true, //显示链上信息
        showcollection: true, //显示合集
        showoffer: true, //显示报价
        showhistory:true, //显示交易历史
    }
    componentDidMount(){
        console.log(this.props.route.params.id,this.state.id) 
    }
    getList() {

    }
    render() { 
        return (
            <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}        >
                    <View style={[styles.container]}>
                        <Image source={require('../../assets/img/index/any.jpeg')} style={[styles.topImg]}></Image>
                        {/* 喜欢 */}
                        <View style={[styles.likeBox, styles.flexJBC]}>
                            <Text style={[styles.likeBoxName]}>Naruto</Text>
                            <View style={[styles.flex]}>
                                <FontAwesomeIcon icon={faHeart} color='red' size={12} />
                                <Text style={[styles.likenum]}>23</Text>
                            </View>
                        </View>
                        {/* 合集详情 */}
                        <View style={[styles.coll]}>
                            <Text style={[styles.collName]}>Uzumaki Naruto #0001</Text>
                            <Text style={styles.collIntrDetail}>Cream3D is a collection of random NFT generated and resides on the Ethereum Blockchain. We focus on making NFTs that are unique and rare and will continue to be updated regularly.</Text>
                        </View>
                    </View>

                    {/* 发行数量 */}
                    <View style={[styles.flex, { paddingHorizontal: 20, }]}>
                        <View style={[styles.faxingNum, styles.flex, { marginRight: 35 / 2 }]}>
                            <Text style={[styles.faxingNumLeft]}>发行数量</Text>
                            <Text style={[styles.faxingNumRight]}>1k</Text>
                        </View>
                        <View style={[styles.faxingNum, styles.flex]}>
                            <Text style={[styles.faxingNumLeft]}>剩余数量</Text>
                            <Text style={[styles.faxingNumRight]}>500</Text>
                        </View>
                    </View>
                    {/* 创建者 拥有者 */}
                    <View style={[styles.createAndByuer]}>
                        <View style={[styles.flex, styles.createAndByuerLis]}>
                            <Image source={require('../../assets/img/index/any1.jpg')} style={[styles.createAndByuerImage]}></Image>
                            <Text style={[styles.createAndByuerName]}>author</Text>
                            <Text style={[styles.FromOrByuer]}>From</Text>
                        </View>
                        <View style={[styles.flex, styles.createAndByuerLis]}>
                            <Image source={require('../../assets/img/index/any1.jpg')} style={[styles.createAndByuerImage]}></Image>
                            <Text style={[styles.createAndByuerName]}>author</Text>
                            <Text style={[styles.FromOrByuer]}>Buyer</Text>
                        </View>
                    </View>
                    {/* 链上信息 */}
                    <View style={[styles.linechainBoxOrther]}>
                        <TouchableWithoutFeedback onPress={() => { this.setState({ showChain: !this.state.showChain }) }}>
                            <View style={[styles.flexJBC]} >
                                <Text style={[styles.linechainBoxOrtherName]}>
                                    链上信息
                                </Text>
                                <FontAwesomeIcon icon={this.state.showChain ? faAngleDown : faAngleRight} color='#707070' size={20} />
                            </View>
                        </TouchableWithoutFeedback>
                        {
                            this.state.showChain ?
                                <View>
                                    <View style={[styles.flexJBC, { marginBottom: 15, marginTop: 20 }]}>
                                        <Text style={[styles.chainLeft]}>合约地址</Text>
                                        <Text style={[styles.chainRight, { color: " #897EF8" }]}>0x454sd...sd4z</Text>
                                    </View>
                                    <View style={[styles.flexJBC, { marginBottom: 15 }]}>
                                        <Text style={[styles.chainLeft]}>Token ID</Text>
                                        <Text style={[styles.chainRight, { color: " #897EF8" }]}>0x454sd...sd4z</Text>
                                    </View>
                                    <View style={[styles.flexJBC, { marginBottom: 15 }]}>
                                        <Text style={[styles.chainLeft]}>代币标准</Text>
                                        <Text style={[styles.chainRight, { color: " #897EF8" }]}>ERC-1155</Text>
                                    </View>
                                    <View style={[styles.flexJBC, { marginBottom: 20 }]} >
                                        <Text style={[styles.chainLeft]}>区块链</Text>
                                        <Text style={[styles.chainRight, { color: " #897EF8" }]}>以太坊</Text>
                                    </View>
                                </View> : <Text></Text>
                        }
                    </View>
                    {/* 报价详情 */}
                    <View style={[styles.linechainBoxOrther,]}>
                        <TouchableWithoutFeedback onPress={() => { this.setState({ showoffer: !this.state.showoffer }) }}>
                            <View style={[styles.flexJBC]} >
                                <Text style={[styles.linechainBoxOrtherName]}>
                                    报价详情
                                </Text>
                                <FontAwesomeIcon icon={this.state.showoffer ? faAngleDown : faAngleRight} color='#707070' size={20} />
                            </View>
                        </TouchableWithoutFeedback>
                        {
                            this.state.showoffer ?
                                <View>
                                    <View style={[styles.offerBox,]}>
                                        <View style={[styles.flexJBC]}>
                                            <View>
                                                <Text style={{ fontSize: 14, color: "#333", fontWeight: 'bold', marginBottom: 9 }}>sdssd</Text>
                                                <Text style={{ fontSize: 12, color: "#999" }}>-less</Text>
                                            </View>
                                            <View>
                                                <View style={[styles.flex, { marginBottom: 9 }]}>
                                                    <Image style={{ width: 15, height: 15 }} source={require('../../assets/img/money/offer.png')}></Image>
                                                    <Text style={{ fontSize: 14, color: "#333" }}>0.93</Text>
                                                    <Text style={[styles.offercolse]}>取消报价</Text>
                                                </View>
                                                <Text style={{ fontSize: 12, color: "#999" }}>$455.32</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={[styles.offerBox, styles.flexJBC, { borderBottomColor: '#fff' }]}>
                                        <View>
                                            <Text style={[styles.moreTop]}>Floor Diff</Text>
                                            <Text style={[styles.moreBottom, { color: "#897EF8" }]}>40.4% below</Text>
                                        </View>
                                        <View >
                                            <Text style={[styles.moreTop]}>Quantity</Text>
                                            <Text style={[styles.moreBottom]}>1</Text>
                                        </View>
                                        <View >
                                            <Text style={[styles.moreTop]}>From</Text>
                                            <Text style={[styles.moreBottom]}>Ssds</Text>
                                        </View>
                                        <View>
                                            <Text style={[styles.moreTop]}>Expires</Text>
                                            <Text style={[styles.moreBottom]}>in 22 minutes</Text>
                                        </View>
                                    </View>
                                </View> : <Text></Text>
                        }
                    </View>
                    {/* 交易历史 */}
                    <View style={[styles.linechainBoxOrther,]}>
                        <TouchableWithoutFeedback onPress={() => { this.setState({ showhistory: !this.state.showhistory }) }}>
                            <View style={[styles.flexJBC]} >
                                <Text style={[styles.linechainBoxOrtherName]}>
                                    交易历史
                                </Text>
                                <FontAwesomeIcon icon={this.state.showhistory ? faAngleDown : faAngleRight} color='#707070' size={20} />
                            </View>
                        </TouchableWithoutFeedback>
                        { 
                            this.state.showhistory ?
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
                                                    <Text style={{ fontSize: 14, color: "#333" }}>0.93</Text>
                                                </View>
                                                <Text style={{ fontSize: 12, color: "#999" }}>$455.32</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={[styles.offerBox, styles.flexJBC, { borderBottomColor: '#fff' }]}>
                                        <View>
                                            <Text style={[styles.moreTop]}>Floor Diff</Text>
                                            <Text style={[styles.moreBottom, { color: "#897EF8" }]}>40.4% below</Text>
                                        </View>
                                        <View >
                                            <Text style={[styles.moreTop]}>Quantity</Text>
                                            <Text style={[styles.moreBottom]}>1</Text>
                                        </View>
                                        <View >
                                            <Text style={[styles.moreTop]}>From</Text>
                                            <Text style={[styles.moreBottom]}>Ssds</Text>
                                        </View>
                                        <View>
                                            <Text style={[styles.moreTop]}>Expires</Text>
                                            <Text style={[styles.moreBottom]}>in 22 minutes</Text>
                                        </View>
                                    </View>
                                </View> : <Text></Text>
                        }
                    </View>
                    {/* 合集 */}
                    <View style={[styles.linechainBoxOrther]}>
                        <TouchableWithoutFeedback onPress={() => { this.setState({ showcollection: !this.state.showcollection }) }}>
                            <View style={[styles.flexJBC]} >
                                <Text style={[styles.linechainBoxOrtherName]}>
                                    Content of this collection
                                </Text>
                                <FontAwesomeIcon icon={this.state.showcollection ? faAngleDown : faAngleRight} color='#707070' size={20} />
                            </View>
                        </TouchableWithoutFeedback> 
                        {
                            this.state.showcollection ?
                                <View style={[styles.flex, { marginVertical: 20 }]}>
                                    <Image source={require('../../assets/img/index/any2.jpg')} style={[styles.collectionImage]}></Image>
                                    <Text style={[styles.createAndByuerName, { marginLeft: 15 }]}>Naruto</Text>
                                </View> : <Text></Text>
                        }
                    </View>
                    {/*底部列表 */}
                    <View style={[styles.linechainBoxOrther, { borderBottomColor: "#fff" }]}>
                        <View style={[styles.flexJBC]}>
                            <Text style={[styles.linechainBoxOrtherName, { marginBottom: 20 }]}>
                                More from this collection
                            </Text>
                        </View>
                        <List list={this.state.list} type={1} getList={this.getList} />
                    </View>
                    {/* 底部按钮 */}
                    <View style={[styles.bottombtnBox, styles.flexJBC]}>
                        <View style={[styles.flex, { alignItems: "flex-end" }]}>
                            <Text style={[styles.bottomPrice]}> 4,218</Text>
                            <Text style={[styles.bottomcoinType]}> Wfca</Text>
                        </View>
                        <Text style={[styles.bottomBtn]}>Buy now </Text>
                    </View>


                </ScrollView>

            </SafeAreaView>
        )
    }
}

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
        borderRadius: 10,
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
        height: 120,
        justifyContent: 'space-around',
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