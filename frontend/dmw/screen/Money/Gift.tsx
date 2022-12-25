import { Text, StyleSheet, View, Dimensions, SafeAreaView, Image, TouchableWithoutFeedback, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { IndexPath, Select, SelectItem } from '@ui-kitten/components';
import { useDmwWeb3 } from '../../../DmwWeb3/DmwWeb3Provider';
import { useDmwWallet } from '../../../DmwWallet/DmwWalletProvider';
import { useDmwApi } from '../../../DmwApiProvider/DmwApiProvider';
import { useDmwLogin } from '../../../loginProvider/constans/DmwLoginProvider';
import VerfiySecretModal from '../../Components/VerfiySecretModal'
import TxProccessingModal from '../../Components/TxProccessingModal'
import { useTranslation } from 'react-i18next'
import Web3 from 'web3';
const scale = Dimensions.get('window').scale;
const screenWidth = Dimensions.get('window').width;

const Gift = (props) => {
    const { WalletInUse } = useDmwLogin()
    const { t, i18n } = useTranslation();
    const [receiptAddress, setReceiptAddress] = useState('')
    const [TokenType, setTokenType] = useState('ETH')
    const [selectedToken, setSelectedToken] = useState({})
    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
    const [number, setnumber] = useState(null)
    const { transferToken, nativeToken } = useDmwWeb3()
    const { getWalletListFromAccountStorage, currentDmwWallet, dmwTransferToken } = useDmwWallet();
    const { Toast, Copy } = useDmwApi()
    const [balanceData, setBalanceData] = useState([])
    const [password, setPassword] = useState('')
    const [vfModalVisible, setVfModalVisible] = useState(false)
    const [txModalVisible, setTxModalVisible] = useState(false)
    useEffect(() => {
        console.log(props.route.params, '传参');
        setBalanceData(props.route.params);

    }, [])

    useEffect(() => {
        console.log(selectedIndex, '下拉框')
        setnumber('')
        if (selectedIndex.row == 0) {
            setSelectedToken({ symbol: nativeToken, amount: Number(balanceData.NativToken), contractAddress: null })
        } else {
            setSelectedToken({ symbol: balanceData.ERC20Token[selectedIndex.row - 1].symbol, amount: Number(balanceData.ERC20Token[selectedIndex.row - 1].balance) / 10 ** Number(balanceData.ERC20Token[selectedIndex.row - 1].decimals), contractAddress: balanceData.ERC20Token[selectedIndex.row - 1].token_address, decimals: balanceData.ERC20Token[selectedIndex.row - 1].decimals })
        }


    }, [selectedIndex])

    const sendout = () => {
        if (!number) {
            Toast(t('请输入数量'))
            return
        }
        if (!Web3.utils.isAddress(receiptAddress)) {
            Toast(t('请输入正确的区块链地址'))
            return
        }
        console.log(String(TokenType), String(receiptAddress), String(number));

        if (WalletInUse == 1) {
            setVfModalVisible(true)
        } else {
            transferToken(String(receiptAddress), String(number), selectedToken.contractAddress, selectedToken.decimals ? selectedToken.decimals : null)
            setTxModalVisible(true)
            setTimeout(() => {
                setnumber('')
            }, 3000);

        }
    }

    useEffect(() => {
        WalletInUse == 1 && (Array.from(password).length == 6) &&
            getWalletListFromAccountStorage(password).then(res => {
                if (res) {
                    console.log(res.walletDict[currentDmwWallet].privateKey)
                    // console.log(selectedToken)
                    setVfModalVisible(false)
                    setTxModalVisible(true)
                    setPassword('')
                    dmwTransferToken(res.walletDict[currentDmwWallet].privateKey, selectedToken.contractAddress, String(receiptAddress), String(number), selectedToken.decimals ? selectedToken.decimals : null)



                } else {
                    Toast("密码错误")
                }
            })
    }, [password])

    return (
        <SafeAreaView style={[{ position: 'relative', backgroundColor: '#fff', flex: 1, paddingTop: 30, paddingRight: 20, paddingLeft: 20 }]}>
            <View>
                <View style={{ paddingLeft: 15, marginBottom: 10 }}>
                    <Text style={{ fontSize: 12, fontWeight: '700' }}>Token:</Text>
                </View>

                <Select
                    style={[styles.userlist]}
                    selectedIndex={selectedIndex}
                    onSelect={index => setSelectedIndex(index)}
                    value={(
                        <View >
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text>{selectedToken.symbol}</Text>
                                <Text>{selectedToken.amount ? Number(selectedToken.amount).toFixed(6) : null}</Text>
                            </View>
                        </View>
                    )}
                >
                    <SelectItem title={(
                        <View >
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text>{nativeToken}</Text>
                                <Text>{Number(balanceData.NativToken).toFixed(6)}</Text>
                            </View>
                        </View>
                    )} />

                    {balanceData.ERC20Token && balanceData.ERC20Token.map((item) => (
                        <SelectItem title={(
                            <View >

                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text>{item.symbol}</Text>
                                    <Text>{(Number(item.balance) / 10 ** Number(item.decimals)).toFixed(6)}</Text>
                                </View>
                            </View>
                        )} />
                    ))}




                </Select>


                {

                    true ?
                        <>
                            <View style={styles.userlist}>
                                <View style={{ flex: 1, marginLeft: 10 }}>
                                    <Text>{t("输入数量")}</Text>
                                </View>


                                <TextInput
                                    textAlignVertical="top"
                                    placeholder={`0 ${selectedToken.symbol}`}
                                    style={[styles.textarea, { flex: 1, marginTop: 10 }]}
                                    onChangeText={(text) => {
                                        const newText = text.replace(/[^\d^\.?]+/g, "").replace(/^0+(\d)/, "$1").replace(/^\./, "0.").match(/^\d*(\.?\d{0,18})/g)[0] || "";
                                        setnumber(newText);
                                    }}
                                    value={number}
                                    keyboardType="numeric"
                                    textContentType=""
                                />
                            </View>

                        </>
                        : null
                }
            </View>



            <View style={{ paddingLeft: 15, marginBottom: 10 }}>
                <Text style={{ fontSize: 12, fontWeight: '700' }}>{t("发送到")}</Text>
            </View>
            <TextInput
                multiline={true}
                textAlignVertical="top"
                numberOfLines={5}
                placeholder={`${t('输入地址')}: 0x.....`}
                style={[styles.textarea]}
                onChangeText={e => { setReceiptAddress(e) }}
                value={receiptAddress}
            />


            {/* <View style={styles.container}></View> */}

            <Text style={styles.btn} onPress={() => sendout()}>{t("发送")}</Text>

            {vfModalVisible && <VerfiySecretModal setModalVisible={setVfModalVisible} modalVisible={vfModalVisible} setPassword={setPassword} />}
            {txModalVisible && <TxProccessingModal setModalVisible={setTxModalVisible} modalVisible={txModalVisible} />}
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
