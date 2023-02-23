import { Text, StyleSheet, View, TouchableOpacity,TextInput, FlatList, SafeAreaView, ScrollView, Image, Dimensions, TouchableWithoutFeedback, TouchableOpacityComponent } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Modal } from "react-native-paper"
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
    const [refreshing, setrefreshing] = useState(false)
    const [selListParams, setselListParams] = useState({})
    const [screenData, setscreenData] = useState([])
    useEffect(() => {
        getList(1)
        post("/index/common/get_filter", formData({ type: 'home' })).then(res => {
            // console.log(JSON.stringify(res.data), '筛选条件');
            let a = {}
            setscreenData(res.data)
            res.data.map(item => {
                a[item.title.value] = ''
            })
            setselListParams(a)
        })
    }, [props])


    useEffect(() => {
        getList(1, 1)
    }, [strText])

    const visibleFn = () => {
        setvisible(true);
        // console.log(456789);

    };


    const changeVisible = (val) => {
        setvisible(val)
    }


    const getList = (page, type = 1) => {
        setLoding(true)
        let params = formData({ page: page, limit: 6, type: 1, keyword: strText, ...selListParams })
        console.log(params, '=selListParams');

        post("/index/nft/get_home_nft_by_search", params).then((res) => {
            if (res.code == 200) {
                if (type == 1) {
                    setlist([...res.data.data])
                } else {
                    setlist([...list, ...res.data.data])
                }

                // console.log(list,'list');

                settotal(res.data.total)
                setLoding(false)
                setrefreshing(false)
            }
        });
    }



    const getListchudi = () => {
        setrefreshing(true)
        let a = Math.trunc(list.length / 6)
        console.log(list.length, total);
        if (list.length == total) {
            setrefreshing(false)
        } else {
            getList(a + 1, 2)
        }
    }

    const hideModal = () => {
        setvisible(false)
    }


    const setParams = (a) => {
        setselListParams(a)
    }
    const searchFn = () => {
        setvisible(false)
        getList(1, 1)
    }

    const Refresh = () => {
        setrefreshing(true)
        setTimeout(() => {
            getList(1)
        }, 1000);
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
                <View style={{ alignItems: loading ? 'center' : null, justifyContent: loading ? 'center' : null, flex: 1, paddingHorizontal: 20 }}>
                    {

                        <FlatList
                            showsVerticalScrollIndicator={false}
                            refreshing={refreshing}
                            style={{ height: '55%', width:"100%",paddingBottom:30}}
                            
                            ListEmptyComponent={() => {
                                return <Text style={{ textAlign: 'center', marginTop: '50%' }}>{t("空空如也")}</Text>
                                // 列表为空展示改组件
                            }}
                            // 一屏幕展示几个
                            number={6}
                            keyExtractor={(item, index) => index.toString()}
                            //  2列显示
                            numColumns={2}
                            data={list}
                            renderItem={({ item, index }) => {
                                return <List key={index} list={item} type={1} navigatetoDetail={(id, unique_id, contract_address, token_id, network) => { props.navigation.navigate('goodsDetail', { id: item.id, unique_id, contract_address, token_id, network }) }} />
                            }}
                            // keyExtractor={(item, index) => item.id}
                            ListFooterComponent={() => {
                                // 声明尾部组件
                                return list.length == total ? <Text style={{ textAlign: 'center',paddingBottom:30 }}>{t("没有更多了")}</Text> : null
                            }}
                            // 下刷新
                            onEndReachedThreshold={0.1} //表示还有10% 的时候加载onRefresh 函数
                            onEndReached={getListchudi}
                            onRefresh={Refresh}
                        >
                        </FlatList>

                    }
                </View>
            </View>
            {/*  */}
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
                <View style={styles.ModalBOX}>
                    <View style={styles.HlineBox}><View style={styles.Hline}></View></View>
                    <Text style={styles.selectfilter}>Select Filter</Text>

                    {
                        screenData.map((item, idnex) => {
                            return <View>
                                <Text style={styles.selTitle}>{item.title.name}</Text>
                                <View style={styles.optionBox}>
                                    {
                                        item['tabs'].map((jitem, jindex) => {

                                            return <>

                                                <TouchableOpacity
                                                    onPress={() => {
                                                        // console.log(123);
                                                        let a = { ...selListParams }
                                                        if (a[item.title.value] == jitem.value) {
                                                            a[item.title.value] = ''
                                                        } else {
                                                            a[item.title.value] = jitem.value
                                                        }

                                                        setParams(a)
                                                    }} style={selListParams[item.title.value] == jitem.value ? styles.btn_active : styles.btn_noactive}
                                                >
                                                    <Text style={[styles.btn_text,selListParams[item.title.value] == jitem.value&&styles.btn_text_active]}>{jitem.name}</Text>
                                                </TouchableOpacity>

                                            </>
                                        })
                                    }

                                </View>


                                {
                                    idnex == screenData.length - 1 ?
                                        null : <View style={styles.btnline}></View>
                                }




                            </View>
                        })

                    }


                    <View style={styles.btnlinelang}></View>
                    <TouchableOpacity style={styles.sureBtn} onPress={searchFn}>
                        <Text style={styles.sureBtnText} >{t('确定')}</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

        </SafeAreaView>
    )
}

export default Searchsc

const styles = StyleSheet.create({
    sureBtn: {
        height: 50,
        backgroundColor: '#897EF8',
        borderRadius: 50,
        // marginBottom:49
    },
    sureBtnText: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 50,
        color: '#FFFFFF',
        textAlign: 'center'
    },
    btnline: {
        // border: 1px solid #CCCCCC;
        borderWidth: 1 / 3,
        borderColor: '#ccc',
        marginBottom: 20
    },
    btnlinelang: {
        borderWidth: 1 / 3,
        borderColor: '#ccc',
        marginBottom: 20,
        marginRight: -20,
        marginLeft: -20
    },
    btn_text: {
        lineHeight: 34,
        color: '#333',
    },
    btn_text_active: {

        color: '#fff',
    },
    btn_active: {

        backgroundColor: '#ACA4FA',
        height: 34,
        paddingRight: 15,
        paddingLeft: 15,
        borderColor: '#877EF0',
        borderWidth: 1,
        borderRadius: 20,
        marginBottom: 15,
        marginRight: 15,
        justifyContent:"center",
        // alignContent:"center"
    },
    btn_noactive: {
        height: 34,
        paddingRight: 15,
        paddingLeft: 15,
        borderColor: '#877EF0',
        borderWidth: 1,
        borderRadius: 20,
        marginBottom: 15,
        marginRight: 15,
        justifyContent:"center",
        // alignContent:"center"
    },
    optionBox: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        marginBottom: 20,
        flexWrap: 'wrap'

    },

    selTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#333',

        marginBottom: 20
    },
    ModalBOX: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',

        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 49,
    },
    selectfilter: {
        fontSize: 16,

        fontWeight: '700',
        color: '#333',
        marginTop: 20,
        textAlign: 'center',
        marginBottom: 30
    },
    HlineBox: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    Hline: {
        width: 40,
        height: 6,
        backgroundColor: '#E0E0E0',
        borderRadius: 50,
        marginTop: 6
    },
    containerStyle: {
        width: '100%',
        minheight: 885 / 2,
        backgroundColor: '#fff',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        position: 'absolute',
        bottom: -50,
        overflow: 'hidden'

    },
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
        paddingBottom: 0
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