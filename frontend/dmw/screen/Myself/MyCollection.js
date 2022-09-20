import { Text, StyleSheet, View, SafeAreaView, ScrollView, Image, TextInput, FlatList } from 'react-native'
import React, { Component } from 'react'

export default class MyCollection extends Component {
    state = {
        strText: "",
        list: [{}, {}, {}]
    }
    onChange(strText) {
        this.setState({
            strText
        })
    }
    getList=()=>{
        // let list1=[{}]
        // this.setState({
        //   list:this.state.list.concat(list1) 
        // }) 
        // console.log(this.state.list,2)
    } 
    render() {
        return (
            <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={{ padding: 20 }}> 
                        <View style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
                            <View style={[styles.topIputBOx]}>
                                <Image
                                    style={{ width: 20, height: 20, marginRight: 6 }}
                                    source={require('../../assets/img/my/2876.png')}></Image>
                                <TextInput
                                    value={this.state.strText}
                                    placeholderTextColor="#ccc"
                                    placeholder="Search items…"
                                    cursorColor='#897EF8'
                                    style={{ flex: 1, borderRadius: 10, height: 50 }}
                                    onChangeText={(strText) => this.onChange(strText)}
                                />
                            </View>
                            <Text style={[styles.TopAdd]}>+</Text>
                        </View>
                        <FlatList
                            refreshing={true}
                            ListEmptyComponent={() => {
                                return <Text>空空如也</Text>
                                // 列表为空展示改组件
                            }}
                            // 一屏幕展示几个
                            number={10}
                            data={this.state.list}
                            renderItem={({ item }) => {
                                return   (
                                    <View style={[styles.lisBox]}>
                                    <Image source={require('../../assets/img/index/any.jpeg')} style={{ width: '100%', height: 254 / 2, borderRadius: 16 }}></Image>
                                    <Image source={require('../../assets/img/index/any.jpeg')} style={[styles.logo]}></Image>
                                    <View>
                                        <Text style={[styles.collname]}>海贼王-恶魔果实</Text>
                                        <Text style={[styles.name]}>d_xrxr</Text>
                                    </View>
                                </View> 
                                ) 
                            }}
                            keyExtractor={(item, index) => index}
                            ListFooterComponent={() => {
                                // 声明尾部组件
                                return <Text style={{ textAlign: 'center' }}>没有更多了</Text>
                            }}
                            // 下刷新
                            onEndReachedThreshold={0.1} //表示还有10% 的时候加载onRefresh 函数
                            onEndReached={this.getList}
                        >
                        </FlatList>


                    </View>


                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    name: {
        textAlign: 'center',
        color: '#897EF8',
        fontSize: 12,
    },
    collname: {
        color: "#333",
        fontSize: 16,
        textAlign: 'center',
    },
    logo: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        bottom: 60,
        // marginTop:-60,
    },
    lisBox: {
        width: '100%',
        height: 472 / 2,
        borderColor: "#f5f5f5",
        borderWidth: 1,
        marginTop: 20,
        borderRadius: 20,
        padding: 13,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    TopAdd: {
        marginLeft: 20,
        backgroundColor: "#F0EFFE",
        fontSize: 30,
        color: "#897EF8",
        width: 40,
        height: 40,
        borderRadius: 50,
        textAlign: 'center',
        lineHeight: 40,

    },
    topIputBOx: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 15,
        paddingLeft: 15
    }
})