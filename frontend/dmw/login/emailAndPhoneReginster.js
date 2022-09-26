import { Text, StyleSheet, View, TextInput, Image, TouchableWithoutFeedback, ScrollView, SafeAreaView } from 'react-native'
import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPhone, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import Api from '../Request/http'

import DialogToast from '../Components/DialogToast'
const api = new Api()
export default class EmailAndPhoneReginster extends Component {

    constructor(props) {
        super(props)
        this.state = {
            type: props.route.params['type'], //1为注册邮箱 2为注册手机
            email: '',
            phone: '',
            sancode: '',
            password: '',
            password1: '',
            numend: 60,
            areaCode: "86",//当前选中的区号
            areaCodeList: ['86', "81", "1", '86', "81", "1",], //区号列表
            showareaCode: false,
            secureTextEntry: true, //密码框类型切换
            visible: false,
            message: '温馨提示'
        };
    }
    // const [value, onChangeText] = React.useState('Useless Multiline Placeholder');


    onChangeText = (e, num) => {
        if (num == 1) {
            this.setState({ email: e, });
        } else if (num == 2) {
            this.setState({ phone: e });
        } else if (num == 3) {
            this.setState({ sancode: e });
        } else if (num == 4) {
            this.setState({ password: e });
        } else {
            this.setState({ password1: e });
        }
    }
    // 获取验证码
    getsancode = () => {
        // let taol = 50
        // let timer = setInterval(() => {
        //     taol--
        //     this.setState({ numend: taol })
        //     if (taol == 0) {
        //         clearInterval(timer)
        //         this.setState({ numend: 60 })
        //     }
        // }, 1000)
    }
    changeAreaCode = (item) => {
        this.setState({
            areaCode: item,
            showareaCode: false
        })
    }

    // 提示弹窗
    DT(val) {
        this.setState({
            visible: true,
            message: val
        })
    }
    // 获取验证码
    getPhoneCode() {
        if (this.state.type == 1) {
            // 邮箱验证码
        } else {
            // 手机验证码
            let data = { phone: this.state.phone, phone_prefix: this.state.areaCode }
            let formData = api.formData(data)
            console.log(formData);
            api.post('/index/register/get_phone_code', formData).then(res => {
                console.log(res, this.state.phone, '验证码');
                if (res.code != 200) {
                    this.DT(res.message)
                } else {
                    this.DT(res.message)
                }
            }).catch(err => {
                console.log(err, this.state.phone, '验证码');
                this.DT(err.message)
            })
        }
    }

    registerFn() {
        const _this = this;

        // 手机号注册
        let data = { phone: _this.state.phone, phone_prefix: _this.state.areaCode, phone_code: _this.state.sancode, password: _this.state.password }
        let formData = api.formData(data)
        console.log(formData);
        api.post('/index/register/register_by_phone',
            formData
        ).then(res => {
            console.log(res, '注册');
            if (res.code != 200) {
                this.DT(res.message)
            }else{
                this.DT(res.message)
            }
        }).catch(err => {
            this.DT(err.message)
            console.log(err.message, '错误');
        })

    }

    render() {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: '#fff', flex: 1 }]} >
                <Text style={[styles.topText]}>注册一个新账号</Text>
                {/* 邮箱/电话号码 */}
                {
                    this.state.type == 1 ?
                        <View style={[styles.inputBox]}>
                            <Image style={[styles.imageInput]} source={require('../assets/img/login/email.png')}></Image>
                            <TextInput
                                placeholder='请输入邮箱'
                                keyboardType="decimal-pad"
                                style={[styles.input]}
                                onChangeText={text => this.onChangeText(text, 1)}
                                value={this.state.email}
                            />
                        </View> :
                        <View>
                            <View style={[styles.inputBox, { paddingLeft: 100 }]}>
                                <TouchableWithoutFeedback onPress={() => { this.setState({ showareaCode: true }) }}>
                                    <View style={[styles.imageInput, { flexDirection: "row", width: 80, justifyContent: "space-between" }]} >
                                        <FontAwesomeIcon icon={faPhone} color='#707070' size={20} />
                                        <Text>{this.state.areaCode}</Text>
                                        <FontAwesomeIcon icon={faAngleDown} color='#707070' size={20} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <TextInput
                                    onStartShouldSetResponderCapture={(ev) => true}
                                    placeholder='请输电话号码'
                                    keyboardType="decimal-pad"
                                    onChangeText={text => this.onChangeText(text, 2)}
                                    value={this.state.phone}
                                />
                            </View>
                            {/* <View> */}
                            {
                                this.state.showareaCode ?
                                    <ScrollView style={[styles.checkColac, { left: 0, top: 50 }]} showsVerticalScrollIndicator={false}>
                                        {
                                            this.state.areaCodeList.map((item, index) => {
                                                return (
                                                    <TouchableWithoutFeedback key={index} onPress={() => { this.changeAreaCode(item) }}>
                                                        <Text style={[styles.liscloca, { borderBottomColor: "#ccc", borderBottomWidth: 1 }]} >{item}</Text>
                                                    </TouchableWithoutFeedback>
                                                )
                                            })
                                        }
                                    </ScrollView> : <View></View>
                            }
                            {/* </View> */}
                        </View>
                }
                {/* 验证码 */}
                <View style={[styles.inputBox, { paddingRight: 80 }]} >
                    <Image style={[styles.imageInput, { width: 37 / 2, height: 20 }]} source={require('../assets/img/login/forgetpass.png')}></Image>
                    <TouchableWithoutFeedback onPress={() => this.getPhoneCode()}>
                        {/* {this.state.numend == 60 ? '获取验证码' : this.state.numend} */}
                        <Text style={[styles.getsancode]}>获取验证码</Text>
                    </TouchableWithoutFeedback>
                    <TextInput
                        maxLength={6}
                        placeholder='请输入验证码'
                        keyboardType="decimal-pad"
                        onChangeText={text => this.onChangeText(text, 3)}
                        value={this.state.sancode}
                    />
                </View>
                <View style={[styles.inputBox, styles.input, { paddingRight: 40 }]} >
                    <Image style={[styles.imageInput, { width: 37 / 2, height: 20 }]} source={require('../assets/img/login/password.png')}></Image>
                    <TouchableWithoutFeedback onPress={() => { this.setState({ secureTextEntry: !this.state.secureTextEntry }) }}  >
                        {this.state.secureTextEntry ?
                            <Image style={[styles.imageshow]} source={require('../assets/img/login/nopass.png')} ></Image> :
                            <Image style={[styles.imageshow]} source={require('../assets/img/login/showpass.png')} ></Image>
                        }
                    </TouchableWithoutFeedback>
                    <TextInput
                        maxLength={6}
                        placeholder='请输入密码'
                        keyboardType="decimal-pad"
                        secureTextEntry={this.state.secureTextEntry}
                        onChangeText={text => this.onChangeText(text, 4)}
                        value={this.state.password}
                    />
                </View>
                <View style={[styles.inputBox]}>
                    <Image style={[styles.imageInput, { width: 37 / 2, height: 20 }]} source={require('../assets/img/login/password.png')}></Image>
                    <TextInput
                        maxLength={6}
                        placeholder='请再次输入密码'
                        keyboardType="decimal-pad"
                        secureTextEntry={true}
                        numberOfLines={4}
                        onChangeText={text => this.onChangeText(text, 5)}
                        value={this.state.password1}
                    />

                </View>
                <Text style={{ marginTop: -15 }} onPress={() => this.setState({ type: this.state.type == 1 ? 2 : 1 })}>{this.state.type == 1 ? '手机号注册' : '邮箱注册'}</Text>
                <Text onPress={() => this.registerFn()} style={[styles.loginBtnBox]}>注册</Text>

                <DialogToast visible={this.state.visible} isClose={true} value={this.state.message} title='温馨提示' Size='18' textAlign='left' close={() => { this.setState({ visible: false }) }}>
                    <Text style={{ fontSize: 16 }}>OK</Text>
                </DialogToast>

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    liscloca: {
        textAlign: "center",
        height: 40,
        lineHeight: 40,

    },
    checkColac: {
        position: 'absolute',
        width: 100,
        paddingHorizontal: 20,
        height: 160,
        borderWidth: 1,
        backgroundColor: "#fff",
        top: 40,
        right: 0,
        zIndex: 99,
        borderColor: "#ccc",
        borderRadius: 10,
    },
    container: {
        padding: 20,
    },
    topText: {
        color: "#0F172C",
        marginBottom: 40,
        fontSize: 16,
    },
    getsancode: {
        position: "absolute",
        right: 18,
        top: 16,
        fontSize: 12,
        color: "#897EF8",
    },
    loginBtnBox: {
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
    inputBox: {
        height: 48,
        lineHeight: 48,
        borderColor: 'gray',
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 20,
        paddingLeft: 46,
        paddingRight: 15,
        marginBottom: 30,
        justifyContent: 'center'

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
        width: 16,
        height: 16,
        position: "absolute",
        right: 18,
        top: 14,

    }


})