import { Text, StyleSheet, View, Dimensions, SafeAreaView, Image, TouchableWithoutFeedback, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { IndexPath, Select, SelectItem } from '@ui-kitten/components';
import { useDmwWeb3 } from '../../../DmwWeb3/DmwWeb3Provider';
import { useDmwApi } from '../../../DmwApiProvider/DmwApiProvider';

const scale = Dimensions.get('window').scale;
const screenWidth = Dimensions.get('window').width;

const Gift = (props) => {

    const [visible, setvisible] = useState(false)
    const [Blockchainval, setBlockchainval] = useState('0xe403E8011CdB251c12ccF6911F44D160699CCC3c')
    const [TokenType, setTokenType] = useState('USDT')
    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
    const [number, setnumber] = useState(null)
    const {transferToken} = useDmwWeb3()
    const {Toast} = useDmwApi()


     useEffect(()=>{
console.log(props.route.params,'传参');

     },[])
    const close = () => {
        setvisible(false)
    }
    const open = () => {
        setvisible(true)
    }
    useEffect(() => {
        console.log(selectedIndex, '下拉框')
        setnumber('')
        if (selectedIndex.row == 0) {
            setTokenType('USDT')
        } else {
            setTokenType('ETH')
        }
        

    }, [selectedIndex])

    const sendout = () => {
        if(!number){
            Toast('请输入数量')
            return
        }
        console.log(String(TokenType),String(Blockchainval),String(number));
        
        transferToken(String(TokenType),String(Blockchainval),String(number))
        setTimeout(() => {
            setnumber('') 
        }, 3000);
    }

    return (
        <SafeAreaView style={[{ position: 'relative', backgroundColor: '#fff', flex: 1, paddingTop: 30, paddingRight: 20, paddingLeft: 20 }]}>
            <View style={{}}>
                <View style={{ paddingLeft: 15, marginBottom: 10 }}>
                    <Text style={{ fontSize: 12, fontWeight: '700' }}>来自</Text>
                </View>

                <Select
                    style={styles.userlist}
                    selectedIndex={selectedIndex}
                    onSelect={index => setSelectedIndex(index)}
                    value={TokenType}
                >
                    <SelectItem title='USDT' />
                    <SelectItem title='ETH' />
                </Select>


                {

                    true ?
                        <>
                            <View style={styles.userlist}>
                                <View style={{ flex: 1, marginLeft: 10 }}>
                                    {
                                        TokenType == 'USDT' ? <Text>USDT：{props.route.params.USDT}</Text> : <Text>USDT：{props.route.params.ETH}</Text>
                                    }
                                   
                                    {/* <Text>USDT：999.99 </Text> */}
                                </View>


                                <TextInput
                                    textAlignVertical="top"
                                    placeholder='输入数量'
                                    keyboardType="decimal"
                                    style={[styles.textarea,{flex:1,marginTop:10}]}
                                    onChangeText={e => { setnumber(Number(e)) }}
                                    value={number}
                                />
                            </View>

                        </>
                        : null
                }
            </View>



            <View style={{ paddingLeft: 15, marginBottom: 10 }}>
                <Text style={{ fontSize: 12, fontWeight: '700' }}>发送到</Text>
            </View>
            <TextInput
                multiline={true}
                textAlignVertical="top"
                numberOfLines={5}
                placeholder='输入地址'
                keyboardType="decimal"
                style={[styles.textarea]}
                onChangeText={e => {setBlockchainval(e)}}
                value={Blockchainval}
            />


            <View style={styles.container}></View>
            {/* <Modal
                    visible={visible}
                    onDismiss={() => close()}
                    contentContainerStyle={[styles.footer]}>
                    <View style={[styles.btnline]}></View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}><View style={styles.copy}>
                        <Text style={{ fontSize: 12 }}>0xD652fw…G673C7C4</Text>
                        <Text style={styles.CopyBtn}>复制</Text>
                    </View></View>
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>复制地址以接收付款</Text>
                </Modal> */}

            {
                !visible ? <Text style={styles.btn} onPress={()=>sendout()}>发送</Text> : null
            }
        </SafeAreaView>
    );
}

export default Gift

const styles = StyleSheet.create({

    userlist: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#CCCCCC', borderRadius: 10,
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center'
    },

    textarea: {
        paddingTop: 10,
        // borderColor: 'gray', 
        borderWidth: 1,
        borderColor: "#ccc",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 9
    },

    btn: {
        width: screenWidth - 40,
        backgroundColor: '#897EF8',
        color: '#fff',
        height: 50,
        lineHeight: 50,
        textAlign: 'center',
        marginRight: 20,
        marginLeft: 20,
        borderRadius: 50,
        position: 'absolute',
        bottom: 14

    },
    Ethimg: {
        width: 15,
        height: 24
    },
    EthsStyle: {
        height: 40,
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 20

    },
    CopyBtn: {
        paddingLeft: 15, paddingRight: 15,
        backgroundColor: '#897EF8',
        paddingTop: 10, paddingBottom: 10,
        borderRadius: 20,
        color: '#fff',
        marginLeft: 20
    },
    copy: {
        paddingLeft: 20,
        paddingRight: 20,
        height: 50,
        backgroundColor: '#F5F5F5',
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnline: {
        position: 'absolute',
        width: 40,
        height: 6,
        backgroundColor: '#E0E0E0',
        top: 6,
        borderRadius: 50,
        left: '50%',
    },
    footer: {
        height: 428 / 2,
        zIndex: 999,
        width: Dimensions.get('window').width,
        position: 'absolute',
        bottom: 0,
        zIndex: 10,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        // paddingTop: 23,
        // paddingBottom: 48,
    },
    createMoneyBtn: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#897EF8',
        height: 50,
        lineHeight: 50,
        textAlign: 'center',
        color: '#897EF8',
        borderRadius: 25,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    sureMoneyBtn: {
        backgroundColor: '#897EF8',
        width: '100%',
        borderWidth: 1,
        borderColor: '#897EF8',
        height: 50,
        lineHeight: 50,
        textAlign: 'center',
        color: '#fff',
        borderRadius: 25,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 100,
    },
    container: {
        height: Dimensions.get('window').height,
        padding: 70 / 2,
        paddingTop: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        top: 0,
    },
    modal_text: {
        fontSize: 16,
        fontWeight: '700',
        fontFamily: 'Source Han Sans CN',
        textAlign: 'center',
        marginBottom: 30,
    },
    line: {
        borderColor: '#CCCCCC',
        width: screenWidth - 40,
        height: 1,
        borderWidth: 1 / scale,
        marginBottom: 20,
    },
    underline: {
        flex: 1,
        width: screenWidth - 40,
        height: 15,
        borderBottomWidth: 1 / scale,
        marginBottom: 20,
        borderBottomColor: '#CCCCCC'
    },
});
