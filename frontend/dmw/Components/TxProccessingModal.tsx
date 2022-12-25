import { Card, Modal, Datepicker, Drawer, DrawerGroup, DrawerItem } from '@ui-kitten/components';
import { Text, Image, StyleSheet, View, SafeAreaView, ScrollView, InteractionManager, TouchableWithoutFeedback, FlatList, TextInput, Keyboard } from 'react-native'
import React, { useState, useContext, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Layout, Spinner } from '@ui-kitten/components';
import { Slider } from '@rneui/themed';
import { useDmwWeb3 } from '../../DmwWeb3/DmwWeb3Provider';
import { useDmwWallet } from '../../DmwWallet/DmwWalletProvider';
export default function TxProccessingModal(props) {
    const isTpwTx = props.isTpwTx
    // console.log(props.mo)
    const { transactionMap, transactionList, globalError } = useDmwWeb3()
    const { dmwTransactionList, dmwTransactionMap } = useDmwWallet()
    const [modalVisible, setModalVisible] = useState(props.modalVisible)
    const { t, i18n } = useTranslation();
    const [dmwlatestHash, setDmwLatestHash] = useState('')
    const [latestHash, setLatestHash] = useState('')
    const [screenLoading, setScreenLoding] = useState(true)
    const [globalErrorTmep, setGlobalErrorTemp] = useState([...globalError])
    const [currentState, setCurrentState] = useState('sending transation')
    useEffect(() => {
        props.setModalVisible(modalVisible)
    }, [modalVisible])

    useEffect(() => {
        setModalVisible(modalVisible)
    }, [props.modalVisible])

    useEffect(() => {
        setGlobalErrorTemp([...globalError])
    }, [])

    useEffect(() => {
        console.log(globalError, globalErrorTmep);
        globalErrorTmep && ((globalErrorTmep.length != globalError.length) ? setModalVisible(false) : null)
    }, [globalError])

    useEffect(() => {

        console.log("asdasasd", dmwTransactionList)
        if (dmwTransactionList && dmwTransactionList.length) {
            console.log("get latest hash1")
            setDmwLatestHash(dmwTransactionList[dmwTransactionList.length - 1])
            console.log("get latest hash!", dmwTransactionList[dmwTransactionList.length - 1])
        }
    }, [dmwTransactionList])

    useEffect(() => {
        if (dmwTransactionMap && dmwTransactionMap[dmwlatestHash]) {
            console.log(dmwTransactionMap[dmwlatestHash], 'latest hash!')
            if (dmwTransactionMap[dmwlatestHash].state == "confirmed") {
                console.log("got you !", dmwTransactionMap[dmwlatestHash])
                setDmwLatestHash(null)
                // Toast(t('创建成功！'))
                setScreenLoding(false)
                setCurrentState("confirmed")
                setTimeout(() => {
                    setModalVisible(false)
                }, 5000)

            } else if (dmwTransactionMap[dmwlatestHash].state == "reversed") {
                console.log("got you !", dmwTransactionMap[dmwlatestHash])
                setDmwLatestHash(null)
                // Toast(t('创建成功！'))
                setScreenLoding(false)
                setCurrentState("reversed")
                setTimeout(() => {
                    setModalVisible(false)
                }, 5000)

            } else {
                setScreenLoding(true)
            }


        }
    }, [dmwTransactionMap])



    useEffect(() => {

        console.log("asdasasd", transactionList)
        if (transactionList && transactionList.length) {
            console.log("get latest hash1")
            setLatestHash(transactionList[transactionList.length - 1])
            console.log("get latest hash!", transactionList[transactionList.length - 1])
        }
    }, [transactionList])

    useEffect(() => {
        if (transactionMap && transactionMap[latestHash]) {
            console.log(transactionMap[latestHash], 'latest hash!')
            if (transactionMap[latestHash].state == "comfirmed") {
                console.log("got you !", transactionMap[latestHash])
                setLatestHash(null)
                // Toast(t('创建成功！'))
                setScreenLoding(false)
                setTimeout(() => {
                    setModalVisible(false)
                }, 5000)
                setCurrentState("confirmed")

            } else if (transactionMap[latestHash].state == "reversed") {
                setScreenLoding(false)

                setCurrentState("reversed")

                setTimeout(() => {
                    setModalVisible(false)
                }, 5000)
            } else {
                setScreenLoding(true)
            }
        }
    }, [transactionMap])


    return (
        <Modal
            visible={modalVisible}
            backdropStyle={{ "backgroundColor": 'rgba(0, 0, 0, 0.5)' }}
            onBackdropPress={() => { setModalVisible(false) }}>

            <Card disabled={true} style={[styles.CardBox]}>
                <TouchableWithoutFeedback onPress={() => { setModalVisible(false) }}>
                    <Image style={styles.colose} source={require('../assets/img/money/6a1315ae8e67c7c50114cbb39e1cf17.png')}></Image>
                </TouchableWithoutFeedback>

                <View style={{ paddingTop: 120 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 40 }}>
                        {<Spinner size='giant' />}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text>
                            {currentState}
                        </Text>
                    </View>
                </View>


            </Card>
        </Modal >
    )
}


const styles = StyleSheet.create({
    passinputfirst: { textAlign: 'center', lineHeight: 48, borderColor: '#CCCCCC', borderWidth: 1, width: 46, height: 48, },
    passinput: { textAlign: 'center', lineHeight: 48, borderColor: '#CCCCCC', borderWidth: 1, width: 46, height: 48, borderLeftWidth: 0, },
    buyInput: {
        flex: 1,
        height: 40,
        backgroundColor: '#ffffff',
        borderColor: '#C2C2C2',
        borderWidth: 1,
        borderRadius: 10,
        marginLeft: 20,
        marginRight: 20,
        lineHeight: 40,
        textAlign: 'center'
    },
    BuyBtnQ: {
        width: 120,
        height: 40,
        backgroundColor: '#897EF8',
        borderRadius: 50,
        lineHeight: 40,
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700'
    },
    BuyBtnC: {
        width: 120,
        height: 40,
        backgroundColor: '#F5F5F5',
        borderRadius: 50,
        lineHeight: 40,
        textAlign: 'center',
        color: '#333',
        fontSize: 16,
        fontWeight: '700'
    },
    BuyNowImg: {
        width: 100,
        height: 100,
        borderRadius: 5,
        marginBottom: 15
    },
    addImg: {
        width: 30, height: 30
    },
    nameBox: {
        backgroundColor: '#F0EFFE',
        borderRadius: 10,
        paddingTop: 15,
        paddingBottom: 15,
        width: '100%'
    },
    colose: {
        width: 22, height: 22, borderWidth: 1, borderRadius: 11, borderColor: '#ccc', justifyContent: 'center', alignItems: 'center',
        marginRight: -10,
        position: 'absolute',
        right: 20,
        top: 10
    },
    CardBox: {
        width: 640 / 2,
        height: 640 / 2,
        borderRadius: 20,
        position: 'relative',
        paddingBottom: 20,
        zIndex: 100
        // paddingTop: 10,
        // paddingRight: 10
    },
    buyBtn: {
        // position: 'absolute', bottom: 0,
        // right: 20,
        // height: 40,
        backgroundColor: '#897EF8',
        paddingLeft: 20,
        paddingRight: 20,
        lineHeight: 40,
        color: "#fff", borderRadius: 10
    },
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
        // borderBottomColor: '#eee',
        // borderBottomWidth: 1,
        paddingHorizontal: 20,
        paddingBottom: 20
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
        paddingHorizontal: 20,
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
        // borderTopColor: "#ccc",
        // borderTopWidth: 1,
        // borderBottomColor: "#ccc",
        // borderBottomWidth: 1,
        marginTop: 10,
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