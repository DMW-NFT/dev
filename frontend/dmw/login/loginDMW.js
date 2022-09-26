import { Text, StyleSheet, View, TextInput, Image, TouchableWithoutFeedback, ScrollView, SafeAreaView } from 'react-native'
import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleDown, faPhone } from '@fortawesome/free-solid-svg-icons'
import DialogToast from '../Components/DialogToast'
import Api from '../Request/http'
import { LoginSuccess } from '../redux/actions/Login'
import { connect } from 'react-redux'
const api = new Api()
const mapStateToProps = state => {
    return {
        isLogin: state.Login.isLogin
    }
}
class LoginDMW extends Component {

    constructor(props) {
        super(props)
        this.state = {
            type: props.route.params['type'],//1为邮箱登录  2为手机号登录
            areaCode: "+86",//当前选中的区号
            areaCodeList: ['+86', "+81", "+1", '+86', "+81", "+1"], //区号列表
            showareaCode: false, //显示选择区号框
            showlocal: false, //显示选择语言框
            local: {  //当前选中的语言
                name: "中文",
                id: "zh"
            },
            //语言列表
            localLIst: [
                {
                    name: "中文",
                    id: "zh"
                },
                {
                    name: "英文",
                    id: "en"
                },
                {
                    name: "日文",
                    id: "jp"
                },
            ],
            email: '',
            phone: '',
            password: '',
            secureTextEntry: true, //密码框类型切换
            agree: false, //同意用户协议
            visible: false,
            message: '温馨提示'
        };
    }
    // const [value, onChangeText] = React.useState('Useless Multiline Placeholder');


    onChangeText = (e, num) => {
        if (num == 1) {
            this.setState({ email: e, });
        } else if (num == 2) {
            this.setState({ password: e });
        } else if (num == 3) {
            this.setState({ phone: e });
        }
    }
    typecheck = () => {
        this.setState({ secureTextEntry: !this.state.secureTextEntry });
    }

    changeCloca = (item) => {
        this.setState({
            local: item,
            showlocal: false,
        })
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

    // 登录按钮
    login() {
        let data = { phone: this.state.phone, password: this.state.password }
        let formData = api.formData(data)
        api.post('/index/login/login_by_phone', formData).then(res => {
            // this.DT(res || '登陆成功！')
            console.log(res.data.token);
            this.props.LoginSuccess()
        }).catch(err => {
            this.DT(err.message)
        })
    }


    render() {
        return (

            <SafeAreaView style={[styles.container, { backgroundColor: "#fff", flex: 1 }]} >
                <View style={[styles.TopBox]}>
                    <Text style={[styles.topText]}>欢迎登陆DMW</Text>
                    <View>
                        <TouchableWithoutFeedback onPress={() => { this.setState({ showlocal: true }) }}>
                            <View style={[styles.TopBox, styles.coale]} >
                                <Text>{this.state.local.name}</Text>
                                <FontAwesomeIcon icon={faAngleDown} color='#707070' size={20} style={{ marginLeft: 10 }} />
                            </View>
                        </TouchableWithoutFeedback>
                        {
                            this.state.showlocal ?
                                <ScrollView style={[styles.checkColac]}>
                                    {
                                        this.state.localLIst.map((item, index) => {
                                            return (
                                                <TouchableWithoutFeedback key={index} onPress={() => { this.changeCloca(item) }}>
                                                    <Text style={[styles.liscloca, index == 1 ? styles.lisEnglish : '']} >{item.name}</Text>

                                                </TouchableWithoutFeedback>
                                            )
                                        })
                                    }
                                </ScrollView> : <Text></Text>
                        }
                    </View>

                </View>
                {/* 邮箱 */}
                {/* {
                    this.state.type==1?
                    
                } */}
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
                                    placeholder='请输入电话号码'
                                    keyboardType="decimal-pad"
                                    onChangeText={text => this.onChangeText(text, 3)}
                                    value={this.state.phone}
                                />
                            </View>
                            {/* <View> */}
                            {
                                this.state.showareaCode ?
                                    <ScrollView style={[styles.checkColac, { left: 0, top: 50, height: 200 }]} showsVerticalScrollIndicator={false}>
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
                <View style={[styles.inputBox, { paddingRight: 60 }]} >
                    <Image style={[styles.imageInput, { width: 37 / 2, height: 20 }]} source={require('../assets/img/login/password.png')}></Image>
                    <TouchableWithoutFeedback onPress={() => { this.setState({ secureTextEntry: !this.state.secureTextEntry }) }} >
                        {this.state.secureTextEntry ?
                            <Image style={[styles.imageshow]} source={require('../assets/img/login/nopass.png')} ></Image> :
                            <Image style={[styles.imageshow]} source={require('../assets/img/login/showpass.png')} ></Image>
                        }
                    </TouchableWithoutFeedback>
                    <TextInput
                        onStartShouldSetResponderCapture={() => true}
                        placeholder='请输入密码'
                        keyboardType="decimal-pad"
                        secureTextEntry={this.state.secureTextEntry}

                        onChangeText={text => this.onChangeText(text, 2)}
                        value={this.state.password}
                    />
                </View>
                <Text style={[styles.forget]} onPress={() => { this.props.navigation.navigate('ForgetPassword', { type: this.state.type }) }}>忘记密码？</Text>
                <Text onPress={() => this.login()} style={[styles.loginBtnBox]}>登陆</Text>
                <View style={[styles.agren]} >
                    <Text style={[styles.checkbox, { "backgroundColor": this.state.agree ? '#897EF8' : "#fff" }]} onPress={() => { this.setState({ agree: !this.state.agree }) }}></Text>
                    <Text style={[styles.textinfo]}>我已阅读并同意</Text>
                    <Text style={[styles.text]}>《用户协议》</Text>
                    <Text style={[styles.textinfo]}>及</Text>
                    <Text style={[styles.text]}>《隐私政策》</Text>
                </View>

                <DialogToast visible={this.state.visible} isClose={true} value={this.state.message} title='温馨提示' Size='18' textAlign='left' close={() => { this.setState({ visible: false }) }}>
                    <Text style={{ fontSize: 16 }}>OK</Text>
                </DialogToast>

            </SafeAreaView>
        )
    }
}
export default connect(mapStateToProps, { LoginSuccess })(LoginDMW)
const styles = StyleSheet.create({
    lisEnglish: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        borderTopColor: "#ccc",
        borderTopWidth: 1,
    },
    liscloca: {
        textAlign: "center",
        height: 40,
        lineHeight: 40,

    },
    coale: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#ccc",
        alignItems: 'center',




    },
    container: {
        padding: 20,
    },
    topText: {
        color: "#0F172C",
        marginBottom: 40,
        fontSize: 16,
    },
    checkColac: {
        position: 'absolute',
        width: 100,
        paddingHorizontal: 20,
        // height:160,
        borderWidth: 1,
        backgroundColor: "#fff",
        top: 40,
        right: 0,
        zIndex: 99,
        borderColor: "#ccc",
        borderRadius: 10,
    },
    TopBox: {
        justifyContent: "space-between",
        alignContent: "center",
        flexDirection: "row"
    },
    loginBtnBox: {
        justifyContent: 'flex-end',
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
        // position: 'relative',
        borderColor: 'gray',
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 24,
        paddingLeft: 46,
        paddingRight: 15,
        marginBottom: 30,
        // alignItems:'center',
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
        width: 24,
        height: 24,
        position: "absolute",
        right: 18,
        top: 14,
    },
    forget: {
        textAlign: 'right',
        fontSize: 12,
        color: '#0F172C',
    },
    agren: {
        flexDirection: "row",
        marginTop: 21,
        alignItems: 'center'
    },
    textinfo: {
        fontSize: 12,
        color: "#666"
    },
    text: {
        color: "#897EF8",
        fontSize: 12,
    },
    checkbox: {
        width: 20,
        height: 20,
        backgroundColor: '#FFFFFF',
        borderColor: "#c2c2c2",
        borderWidth: 1,
        borderRadius: 4,
        marginRight: 5,
    }



})