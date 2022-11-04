import { Text, StyleSheet, View, SafeAreaView, Image, TouchableWithoutFeedback, TextInput,Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
const screenWidth = Dimensions.get('window').width;
const Privatekeyimport = () => {
    // state={
    //     secureTextEntry:false,
    //     word:"",
    //     password:'',
    //     password1:'',
    // }
    const [secureTextEntry, setsecureTextEntry] = useState(false)

    const [word, setword] = useState('')
    const [password, setpassword] = useState('')
    const [password1, setpassword1] = useState('')

    const introduce = () => {
        
    }
    return (
        <SafeAreaView style={styles.box}>
            <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Image style={styles.daoruimg} source={require("../../assets/img/money/daorusiyao.png")}></Image>
                <Text style={styles.title}>导入账户</Text>
                <Text style={styles.text}>
                    导入的账户可在您的钱包中查看，但无法通过DMW助记词找回。
                </Text>
            </View>
            <View style={styles.twoBox}>
                <Text style={styles.Ttitle}>黏贴您的私钥字符串</Text>

                <TextInput
                    multiline={true}
                    textAlignVertical="top"
                    numberOfLines={5}
                    maxLength={6}
                    secureTextEntry={secureTextEntry}
                    placeholder='例如：
                    4d56sd46sd445d6s4d6544d56s4d656d4s65465'
                    keyboardType="decimal-pad"
                    style={{
                        borderStyle: 'dotted',// 虚线 效果
                        borderWidth: 1, //虚线 线宽
                        borderColor: '#e8e8e8', // 虚线颜色
                        borderRadius: 10,
                        padding:20
                    }}
                    onChangeText={e => { setword(e) }}
                    value={word}
                />
            </View>

            <Text style={styles.btn} onPress={()=>introduce()}>导入</Text>

        </SafeAreaView>
    )

    
}


export default Privatekeyimport
const styles = StyleSheet.create({
    box: {

        paddingBottom: 0,
        paddingTop: 30,
        backgroundColor: "#F0EFFE",
        flex: 1
    },
    daoruimg: {
        width: 40,
        height: 40,
        marginBottom: 72 / 2,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 24
    },
    text: {
        marginBottom: 60,
        fontSize: 14
    },
    twoBox: {
        backgroundColor: '#fff',
        flex: 1,
        padding: 20,
        paddingTop: 36
    },
    Ttitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 16
    },
    Btn:{
        backgroundColor:'#897EF8'
    },
    btn: {
        width:screenWidth -40,
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
})