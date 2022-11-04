import { Text, StyleSheet, View, SafeAreaView, Image, TouchableWithoutFeedback, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDmwWallet } from '../../../DmwWallet/DmwWalletProvider'
import { useDmwApi } from '../../../DmwApiProvider/DmwApiProvider'

const ImportWord = (props) => {
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
    const { Toast ,setMoneyRouteState } = useDmwApi()
    const { addMnemonic, loadWalletFromMnemonic, addWalletToAccountStorage } = useDmwWallet()

    const introduce = () => {
        if (!word) {
            Toast("请输入助记词")
            return
        }
        if (!password) {
            Toast("请输入密码")
            return
        }
        if (!password1) {
            Toast("请重新输入密码")
            return
        }
        if (password != password1) {
            Toast("两次密码不一致")
            return
        }
        let res = loadWalletFromMnemonic(word);
        if (res) {
            console.log(res.privateKey, "钱包地址");
            addMnemonic(password1, word).then(resp => {
                console.log(resp, '助记词登录');
                setMoneyRouteState('456')
                addWalletToAccountStorage(res.privateKey, password1).then((res) => {
                    Toast("导入成功")
                    
                    setTimeout(() => {
                        props.navigation.popToTop() 
                    }, 1000);
                });
            })
        } else {
            Toast("助记词解析错误，请重新尝试")
        }



    }

    return (
        <SafeAreaView>
            <View style={[styles.container]}>
                <View style={styles.lis}>
                    <Text style={styles.text}>助记词</Text>
                    <TextInput
                        multiline={true}
                        textAlignVertical="top"
                        numberOfLines={5}
                        placeholder='在此输入你的助记词'
                        style={[styles.textarea]}
                        onChangeText={e => setword(e)}
                        value={word}
                    />
                </View>
                <View style={styles.lis}>
                    <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                        <Text style={styles.text}>新密码</Text>
                        <TouchableWithoutFeedback onPress={() => { setsecureTextEntry(!secureTextEntry) }}  >
                            {secureTextEntry ?
                                <Image style={[styles.imageshow]} source={require('../../assets/img/login/nopass.png')} ></Image> :
                                <Image style={[styles.imageshow]} source={require('../../assets/img/login/showpass.png')} ></Image>
                            }
                        </TouchableWithoutFeedback>
                    </View>
                    <TextInput
                        maxLength={6}
                        secureTextEntry={secureTextEntry}
                        placeholder='新密码'
                        keyboardType="decimal-pad"
                        style={[styles.input]}
                        onChangeText={e => { setpassword(e) }}
                        value={password}
                    />
                </View>
                <View style={styles.lis}>
                    <Text style={styles.text}>新密码</Text>
                    <TextInput
                        maxLength={6}
                        secureTextEntry={secureTextEntry}
                        placeholder='确认新密码'
                        keyboardType="decimal-pad"
                        style={[styles.input]}
                        onChangeText={e => { setpassword1(e) }}
                        value={password1}
                    />
                    <Text style={[styles.text, { marginTop: 10, marginBottom: 32 }]}>请输入6位数数字</Text>

                </View>
                <Text style={[styles.import]} onPress={() => introduce()}>导入</Text>
            </View>


        </SafeAreaView>
    )
}


export default ImportWord
const styles = StyleSheet.create({
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
    textarea: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        borderBottomRightRadius: 24,
        borderBottomLeftRadius: 24,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: "#ccc",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        borderBottomRightRadius: 24,
        borderBottomLeftRadius: 24,
        paddingLeft: 15,
        paddingRight: 15,
    },
    imageshow: {
        width: 24,
        height: 24,
    },
    text: {
        color: "#333",
        fontWeight: "bold",
        fontSize: 12,
        marginBottom: 10,
    },
    lis: {
        marginBottom: 52 / 2,
    },
    container: {
        padding: 20,
    }
})