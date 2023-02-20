import { Text, StyleSheet, View, Dimensions, Image } from 'react-native';
import React, { Component, useState, useEffect } from 'react';
import { Modal } from 'react-native-paper';
import QRCode from 'qrcode-generator';
import { useDmwWeb3 } from '../../../DmwWeb3/DmwWeb3Provider';
import { useDmwWallet } from '../../../DmwWallet/DmwWalletProvider';
import { useDmwApi } from '../../../DmwApiProvider/DmwApiProvider';
import { useDmwLogin } from '../../../loginProvider/constans/DmwLoginProvider';
import { useTranslation } from 'react-i18next'

const scale = Dimensions.get('window').scale;
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


const BottomPopUpWindow = (props) => {
    // const [visible, setVisible] = useState(true)
    const { t, i18n } = useTranslation();
    const [base64Img, setBase64Img] = useState(undefined);
    const { WalletInUse } = useDmwLogin()
    const { currentWallet } = useDmwWeb3()
    const { currentDmwWallet } = useDmwWallet();
    const { Copy } = useDmwApi()
    useEffect(() => {
        if ((WalletInUse == 1 && currentDmwWallet) || (WalletInUse == 2 && currentWallet)) {
            const typeNumber = 4;
            const errorCorrectionLevel = 'Q';
            const qr = QRCode(typeNumber, errorCorrectionLevel,);
            qr.addData(WalletInUse == 1 ? currentDmwWallet : currentWallet);
            qr.make();
            setBase64Img(qr.createDataURL());
            console.log(base64Img)
        }

    }, [WalletInUse, currentWallet, currentDmwWallet]);
    return (<View style={ { height:screenHeight,width:screenWidth,position:"absolute" ,bottom:0}}>
        {/* <View style={styles.container}></View> */}
        <Modal
            visible={props.visible}
            onDismiss={() => props.close()}
            contentContainerStyle={[styles.footer,{flexDirection:"column",alignContent:"flex-end"}]}
            style={{position:"absolute",bottom:0}}>
            <View style={[styles.btnline]}></View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', height: "60%" }}>
                {base64Img ?
                    <Image source={{ uri: base64Img }} style={{ width: "100%", height: "100%" }} resizeMode="contain" />
                    :
                    null}
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <View style={styles.copy}>
                    <Text style={{ fontSize: 10 }}>{WalletInUse == 1 ? currentDmwWallet : currentWallet}</Text>
                    <Text style={styles.CopyBtn} onPress={() => { Copy(WalletInUse == 1 ? currentDmwWallet : currentWallet) }}>{t("复制")}</Text>
                </View>
            </View>
            {/* <Text style={{ textAlign: 'center', marginTop: 20, }}>{t("复制地址以接收付款")}</Text> */}
        </Modal >
    </View >)
}


export default BottomPopUpWindow

const styles = StyleSheet.create({
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
        alignItems: 'center',
    },
    btnline: {
        position: 'absolute',
        width: 40,
        height: 6,
        backgroundColor: '#E0E0E0',
        top: 6,
        borderRadius: 50,
        left: '50%',
        zIndex:99
    },
    footer: {
        height: "40%",
        zIndex: 999,
        width: Dimensions.get('window').width,
        position: "absolute",
        bottom: 0,
        // zIndex: 10,
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
        // marginBottom: 30,
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
        // padding: 70 / 2,
        paddingTop: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        backgroundColor:"white",
        top: 0,
    },
    modal_text: {
        fontSize: 16,
        fontWeight: '700',
        
        textAlign: 'center',
        // marginBottom: 30,
    },
    line: {
        borderColor: '#CCCCCC',
        width: screenWidth - 40,
        height: 1,
        borderWidth: 1 / scale,
        // marginBottom: 20,
    },
});
