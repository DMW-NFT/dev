import { Text, StyleSheet, View, SafeAreaView, ScrollView, Image, TextInput, FlatList, Dimensions, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDmwApi } from '../../../DmwApiProvider/DmwApiProvider';
import { useDmwLogin } from '../../../loginProvider/constans/DmwLoginProvider';
import { useTranslation } from 'react-i18next'
const screenHeight = Dimensions.get("window").height;

const MyCollection = (props) => {
    const { t, i18n } = useTranslation();
    const [strText, setStrText] = useState('')
    const [list, setList] = useState([])
    const { post, formData } = useDmwApi()
    const {username} = useDmwLogin()

    useEffect(() => {
        getCollection()
    }, [])
    useEffect(() => {
        getCollection()
    }, [props,strText])


    const getCollection = () => {
        post('/index/collection/get_user_collection',formData({keyword:strText})).then(res => {
            console.log(res.data.data, '合集列表');
            setList(res.data.data)
        })
    }

    const onChange = (strText) => {
        setStrText(strText)
    }
    const getList = () => {
    }
    return (
        <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
            <View style={{ flexDirection: 'column' }}>
                <View style={{ padding: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
                        <View style={[styles.topIputBOx]}>
                            <Image
                                style={{ width: 20, height: 20, marginRight: 6 }}
                                source={require('../../assets/img/my/2876.png')}></Image>
                            <TextInput
                                value={strText}
                                placeholderTextColor="#ccc"
                                placeholder="Search items…"
                                cursorColor='#897EF8'
                                style={{ flex: 1, borderRadius: 10, height: 50 }}
                                onChangeText={(strText) => onChange(strText)}
                            />
                        </View>
                        <Text onPress={() => { props.navigation.navigate('AddCreateCollection') }} style={[styles.TopAdd]}>+</Text>
                    </View>
                </View>


            </View>
            <FlatList
                style={{ flex: 1, width: '100%', paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
                refreshing={true}
                ListEmptyComponent={() => {
                    return <Text style={{ textAlign: 'center', marginTop: '70%' }}>空空如也</Text>
                    // 列表为空展示改组件
                }}
                // 一屏幕展示几个
                number={10}
                data={list}
                renderItem={({ item }) => {
                    return (
                        <TouchableWithoutFeedback onPress={()=>{props.navigation.navigate('collectionDetails',{ID:item.id})}}>
                        <View style={[styles.lisBox]}>
                            <Image source={{uri:item.banner_url}} style={{ width: '100%', height: 254 / 2, borderRadius: 16 }}></Image>
                            <Image source={{uri:item.logo_url}} style={[styles.logo]}></Image>
                            <View>
                                <Text style={[styles.collname]}>{item.name}</Text>
                                <Text style={[styles.name]}>{username}</Text>
                            </View>
                        </View>
                        </TouchableWithoutFeedback>
                    )
                }}
                keyExtractor={(item, index) => index}
                ListFooterComponent={() => {
                    // 声明尾部组件
                    return list && list.length ? <Text style={{ textAlign: 'center' }}>{setList.length}</Text> : null
                }}
                // 下刷新
                onEndReachedThreshold={0.1} //表示还有10% 的时候加载onRefresh 函数
                onEndReached={getList}
            >
            </FlatList>
        </SafeAreaView>
    )
}

export default MyCollection

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
        borderRadius: 20,
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