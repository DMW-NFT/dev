import { Text, StyleSheet, View, TextInput, FlatList, SafeAreaView, ScrollView, Image, Dimensions, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearchMinus } from '@fortawesome/free-solid-svg-icons'
import Screen from "../../Components/screen";
import Search from "../../Components/Searchbox";
import List from '../../Components/List'
import Model from '../../Components/Model'
import { useDmwApi } from '../../../DmwApiProvider/DmwApiProvider';
import { faChevronRight, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next'
const scale = Dimensions.get('window').scale;
const Searchsc = (props) => {
    const { t, i18n } = useTranslation();
    const [list, setlist] = useState([])
    const [visible, setvisible] = useState(false)
    const [strText, setStrText] = useState('');
    const [show, setshow] = useState(false)
    const [imgshow, setimg] = useState(false)
    const { post, get, formData, Toast } = useDmwApi()
    const [total, settotal] = useState(null)
    const [loading, setLoding] = useState(false)

    useEffect(() => {
        getList(1)
    }, [strText])

    const visibleFn = () => {
        setvisible(true);
        console.log(456789);
        
    };


    const changeVisible = (val) => {
        setvisible(val)
    }


    const getList = (page) => {
        setLoding(true)
        let params = formData({ page: page, limit: 6, type: 1, keyword: strText })

        post("/index/nft/get_home_nft_by_search", params).then((res) => {
            if (res.code == 200) {
                console.log(res, 'ressssssssssssssssssss11111111ssssssss')
                setlist([...list, ...res.data.data])
                settotal(res.data.total)
                setLoding(false)
            }
        });
    }



    const getListchudi = () => {
        console.log('触底');
        
        let a = Math.trunc(list.length / 6)
        console.log(list.length, total);
        if (list.length == total) {
        } else {
            getList(a + 1)
        }
    }
    return (
        <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={[styles.container]}>
                    <View style={[styles.inputBox]} >
                        <Search
                            onChange={(strText) => {
                                setStrText(strText);
                                setlist([])
                            }}
                            visible={() => visibleFn()}
                        ></Search>
                    </View>

                </View>
                <View style={{alignItems: loading ?'center' : null,justifyContent: loading ? 'center' : null,flex:1,padding:20,paddingTop:0}}>
                {

                    loading ? <View>
                        <Spinner />
                    </View> :
                        <FlatList
                            refreshing={false}
                            style={{ height: '55%', flex: 1, }}
                            ListEmptyComponent={() => {
                                return <Text style={{ textAlign: 'center', marginTop: '50%' }}>{t("空空如也")}</Text>
                                // 列表为空展示改组件
                            }}
                            // 一屏幕展示几个
                            number={4}
                            //  2列显示
                            numColumns={2}
                            data={list}
                            renderItem={({ item, index }) => {
                                return <List key={index} list={item} type={1} navigatetoDetail={(id, unique_id, contract_address, token_id, network) => { props.navigation.navigate('goodsDetail', { id: item.id, unique_id, contract_address, token_id, network }) }} />
                            }}
                            // keyExtractor={(item, index) => item.id}
                            ListFooterComponent={() => {
                                // 声明尾部组件
                                return list.length == total ? <Text style={{ textAlign: 'center' }}>{t("没有更多了")}</Text> : null
                            }}
                            // 下刷新
                            onEndReachedThreshold={0.1} //表示还有10% 的时候加载onRefresh 函数
                            onEndReached={getListchudi}
                        >
                        </FlatList>

                }
                </View>
            </View>
            <Model visible={visible} changeVisible={(val) => changeVisible(val)} colose={()=>{setvisible(false)}}>

                <View style={styles.listBox}>
                    <TouchableWithoutFeedback onPress={() => { setshow(!show) }}>
                        <View style={styles.listTitle}>
                            <Text style={{ fontSize: 14, fontWeight: '700' }}>{t("状态")}</Text>
                            <FontAwesomeIcon
                                icon={!show ? faChevronRight : faAngleDown}
                                color="#707070"
                                size={14}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    {
                        show ? <View style={{ flexDirection: 'row', marginTop: 20 }}>
                            <Text style={{ paddingTop: 7, paddingBottom: 7, paddingLeft: 15, paddingRight: 15, borderColor: '#877EF0', borderWidth: 1, borderRadius: 20 }}>New</Text>
                            <Text style={{ paddingTop: 7, paddingBottom: 7, paddingLeft: 15, paddingRight: 15, borderColor: '#877EF0', borderWidth: 1, borderRadius: 20, backgroundColor: '#877EF0', color: '#fff', marginLeft: 15 }}>On Sale</Text>
                        </View> : null
                    }
                </View>



                <View style={styles.listBox}>
                    <TouchableWithoutFeedback onPress={() => { setshow(!show) }}>
                        <View style={styles.listTitle}>
                            <Text style={{ fontSize: 14, fontWeight: '700' }}>{t("区块链")}</Text>
                            <FontAwesomeIcon
                                icon={!show ? faChevronRight : faAngleDown}
                                color="#707070"
                                size={14}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    {
                        show ?
                            <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image style={{ width: 30, height: 30, borderRadius: 15 }} source={require('../../assets/img/index/default.png')}></Image>
                                    <Text style={{ marginLeft: 10 }}>Ethereum</Text>
                                </View>
                                <TouchableWithoutFeedback onPress={() => { setimg(!imgshow) }}>
                                    {
                                        imgshow ?
                                            <Image style={{ width: 24, height: 24 }}
                                                source={require('../../assets/img/index/8a5f2ccbf5abd27e75e353c41d98b7c.png')}></Image>
                                            :
                                            <Image style={{ width: 24, height: 24 }}
                                                source={require('../../assets/img/index/9e5e7d3f9f1048cf348c55d4286daff.png')}></Image>

                                    }

                                </TouchableWithoutFeedback>
                            </View> : null
                    }
                </View>


                <Text style={styles.modelBtn}>{t("确定")}</Text>
            </Model>
        </SafeAreaView>
    )
}

export default Searchsc

const styles = StyleSheet.create({
    listTitle: {
        flexDirection: 'row', justifyContent: 'space-between'
    },

    listBox: {
        borderBottomColor: '#ccc', borderBottomWidth: 1 / scale, paddingBottom: 20, marginBottom: 20
    },

    modelBtn: {
        height: 50,
        fontSize: 16,
        fontWeight: '700',
        backgroundColor: '#897EF8',
        textAlign: 'center',
        lineHeight: 50,
        color: '#fff',
        borderRadius: 50,
        marginTop: 20
    },
    container: {
        padding: 20,
        paddingBottom:0
        // marginTop:headerHeight,
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        // borderColor: "#ccc",
        borderRadius: 10,
        paddingLeft: 46,
        paddingRight: 30,
        color: "#333",
    },

    inputBox: {
        position: 'relative',
        marginBottom: 20,
    },
    imageInput: {
        width: 20,
        height: 17,
        position: "absolute",
        top: 23,
        left: 15,
        marginTop: -17 / 2,

    },
    imageshow: {
        fontSize: 24,
        position: "absolute",
        right: 15,
        top: 5,
        color: '#333333',
    },
})