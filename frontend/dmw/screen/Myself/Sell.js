import { Text, StyleSheet, View, SafeAreaView, ScrollView, Image, TextInput } from 'react-native'
import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
export default class Sell extends Component {
    state = {
        type: 1, // 1是定价出售  2是拍卖
        price: "",
        time:"",
    }
    paging(type) {
        this.setState({
            type
        })
    }
    onChangeText=(val,num)=>{
        if(num==1){
            this.setState({
                price:val,
            })
        }else if(num==2){
            this.setState({
                time:val,
            })
        }
        
    }
    render() {
        return (
            <SafeAreaView style={{backgroundColor:'#fff'}}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 20 }}>
                    {/* tab栏 -- start */}
                    <View style={[styles.index_box, styles.daohang]}>
                        <Text style={[this.state.type != 1 ? styles.daonghang_text : styles.daonghang_text_ative]} onPress={() => this.paging('1')}>定价出售</Text>
                        <Text style={[this.state.type != 2 ? styles.daonghang_text : styles.daonghang_text_ative]} onPress={() => this.paging('2')}>拍卖</Text>
                    </View>
                    {/* tab栏 -- end */}
                    <View style={[styles.bottomBox]} >
                        <View style={{ alignItems: 'center' }}>
                            <Image source={require('../../assets/img/index/default.png')} style={[styles.imgBox]}></Image>
                        </View>
                        <View style={{ marginTop: 65 / 2 }}>
                            <Text>价格</Text>
                            <View style={[styles.flexJBC,{marginTop:17}]}>
                                <TextInput
                                   onChangeText={val=>this.onChangeText(val,1)}
                                   style={[styles.border,{flex:1,marginRight:16,height:73/2}]}
                                    placeholder='请输入售卖价格'
                                    value={this.state.price}
                                />
                                <View style={[styles.flexJBC,styles.border]}>
                                    <Image source={require('../../assets/img/index/any.jpeg')} style={{width:20,height:20,borderRadius:10}}></Image>
                                    <Text>ETH</Text>
                                    <FontAwesomeIcon icon={faAngleDown} color='#707070' size={20} />
                                </View> 
                            </View>

                        </View>
                        <View style={{ marginTop: 65 / 2 }}>
                            <Text>售卖周期</Text>
                            <View style={[styles.flexJBC,styles.border,{marginTop:17,width:"100%"}]}>
                                <TextInput
                                   onChangeText={val=>this.onChangeText(val,2)}
                                   style={[{flex:1,marginRight:16,height:73/2}]}
                                    placeholder='请输入售卖周期'
                                    value={this.state.time}
                                />
                                <View style={[styles.flexJBC,{width:80}]}>
                                    <Text style={{fontSize:10,color:"#999"}}> 2022/7/17</Text>
                                    <FontAwesomeIcon icon={faAngleDown} color='#999' size={20} />
                                </View> 
                            </View>

                        </View>
                        <View style={[styles.flexJBC,{marginTop:60,fontSize:14}]}>
                            <Text style={{color:"#999"}}>GAS费</Text>
                            <Text style={{color:"#999"}}>2%</Text> 
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    border:{
        width:218/2,
        height:73/2,
        // lineHeight:73/2,
        // lineHeight:73/2,
        borderWidth:1,
        borderColor:"#f5f5f5",
        paddingHorizontal:10, 
        borderRadius:10,
    },
    imgBox: {
        width: 100,
        height: 100,
        borderRadius: 20,
        textAlign: 'center',
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flexJBC: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
    },
    bottomBox: {
        height: 855 / 2,
        borderWidth: 1,
        borderColor: "#f5f5f5",
        borderRadius: 20,
        marginTop: 20,
        padding: 20,
    },
    // 顶部切换结束
    daohang: {
        flexDirection: 'row',
    },
    index_box: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    daonghang_text: {
        fontSize: 16,
        fontWeight: '700',
        
        height: 56,
        lineHeight: 56,
        flex: 1,
        color: '#666666',
        textAlign: 'center',

    },
    daonghang_text_ative: {
        fontSize: 16,
        fontWeight: '700',
        
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