import { Text, StyleSheet, View, SafeAreaView, Image, } from 'react-native'
import React, { Component } from 'react'

import StepComp from './StepComp'
import { finished } from 'stream'
import { useDmwApi } from '../../../DmwApiProvider/DmwApiProvider'
import { useTranslation } from 'react-i18next'
const CompleteBackup = (props) =>{
    const { t, i18n } = useTranslation();
    const {setMoneyRouteState } = useDmwApi()
const CreateWalletFinish = () => {
    setMoneyRouteState('456')
    props.navigation.popToTop()
}
        return (
            <SafeAreaView style={{backgroundColor:'#fff',flex:1}}>
                <View style={[styles.container]}>
                    <StepComp type={3} />  
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={[styles.Image]} source={require('../../assets/img/money/CompleteBackup.png')}></Image>
                        <Text style={[styles.topInfo]}>{t("恭喜")}</Text>
                        <Text style={[styles.topInfo1]}>
                            {t("恭喜您已成功保护自己的钱包。")}
                            {t("记住妥善保管您的助记词，这是您的责任！")}</Text>
                        <Text style={[styles.topInfo1, { marginTop: 20, }]}>
                            {t("您可在“设置”-“助记词”中找到助记词。")}
                            </Text>
                    </View>

                    <Text style={[styles.import]} onPress={() => { CreateWalletFinish() }} >完成</Text>
                </View>


            </SafeAreaView>
        )
}


export default CompleteBackup
const styles = StyleSheet.create({

    Image: {
        width: 150,
        height: 150,


    },

    topInfo: {
        textAlign: 'center',
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
        marginBottom: 20 / 2,
    },
    topInfo1: {
        width: "75%",
        textAlign: 'center',
        color: '#333333',
        fontSize: 12,
        lineHeight: 18,

    },
    import: {
        marginTop: 60,
        width: "100%",
        backgroundColor: "#897EF8",
        height: 50,
        lineHeight: 50,
        textAlign: 'center',
        color: "#fff",
        borderRadius: 25,
        fontSize: 16,
        fontWeight: 'bold',
    },



    container: {
        padding: 20,
    }
})