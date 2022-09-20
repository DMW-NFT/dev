import { Text, StyleSheet, ScrollView, SafeAreaView, View, StatusBar, ImageBackground, Image, Dimensions, FlatList } from 'react-native'
import React, { Component } from 'react'
import Screen from '../../Components/screen';
import Search from '../../Components/Searchbox';
import List from '../../Components/List';
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
export default class CollectionDetails extends Component {
    state = {
        list: [{}, {}, {}],
        visible: false,  //筛选
        strText: '',  //input 框的值
        lMvisible: false
    }
    visible() {
        this.setState({
            visible: true,
        });
    }
    // 筛选关闭
    close() {
        this.setState({
            visible: false,
            lMvisible: false
        });
    }
    getList = () => {
        let list1 = [{}]
        this.setState({
            list: this.state.list.concat(list1)
        })
        console.log(this.state.list, 2)
    }

    render() {
        return (
            <SafeAreaView style={{backgroundColor:'#fff'}}>
                <ScrollView showsHorizontalScrollIndicator={false}>
                    {/* <StatusBar barStyle="dark-content" backgroundColor="#fff" /> */}
                    <View>
                        <ImageBackground source={require('../../assets/img/index/any.jpeg')} style={{ width: "100%", height: 220, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/img/index/any.jpeg')} style={[styles.topImagelogo]}></Image>
                        </ImageBackground>
                        <View style={[styles.collDetailBox]}>
                            <Text style={[styles.collName]}>Naruto</Text>
                            <Text style={[styles.detail]}>Cream3D is a collection of random NFT generated and resides on the Ethereum Blockchain. We focus on…</Text>
                            <View style={[styles.flexJBC, { paddingHorizontal: 80 }]}>
                                <View>
                                    <Text style={[styles.itemNum]}>7</Text>
                                    <Text style={[styles.ltemText]}>items</Text>
                                </View>
                                <View >
                                    <Text style={[styles.itemNum]}>7</Text>
                                    <Text style={[styles.ltemText]}>items</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.bottomSearch]}>
                            <Search onChange={(strText) => { this.setState({ strText }) }} visible={() => this.visible()}></Search>
                            <FlatList
                            style={{marginTop:20}}
                            refreshing={this.state.refreshing}
                            ListEmptyComponent={() => {
                                return <Text>空空如也</Text>
                                // 列表为空展示改组件
                            }}
                            // 一屏幕展示几个
                            number={10}
                            //  2列显示
                            numColumns={2}
                            data={this.state.list}
                            renderItem={({ item }) => {
                                return <List list={item} type={1} navigatetoDetail={(id)=>{this.props.navigation.navigate('goodsDetail',{id:id})}} />
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
                    </View>
                </ScrollView>
                <Screen
                    title="select filter"
                    visible={this.state.visible}
                    close={() => this.close()}
                    datalist={data}>
                </Screen>
            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    bottomSearch: {
        padding: 20,
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
})