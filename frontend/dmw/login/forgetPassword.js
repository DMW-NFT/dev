import { Text, StyleSheet, View, TextInput, Image, TouchableWithoutFeedback ,ScrollView} from 'react-native'
import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPhone,faAngleDown } from '@fortawesome/free-solid-svg-icons'

export default class faceLogin extends Component {

    // const [value, onChangeText] = React.useState('Useless Multiline Placeholder');
    state = {
        type: 2, //1为邮箱找回 2为手机找回密码
        email: '',
        phone: '',
        sancode: '',
        password: '',
        password1: '',
        numend: 60,
        areaCode: "+86",//当前选中的区号
        areaCodeList: ['+86', "+81", "+1", '+86', "+81", "+1",], //区号列表
        showareaCode:false, 
        secureTextEntry: true, //密码框类型切换
    }; 
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
        let taol = 50
        let timer = setInterval(() => {
            taol--
            this.setState({ numend: taol })
            if (taol == 0) {
                clearInterval(timer)
                this.setState({ numend: 60 })
            }
        }, 1000)
    } 
    changeAreaCode = (item) => {
        this.setState({
            areaCode: item,
            showareaCode: false
        })
    }
    render() {
        return (
            <View style={[styles.container]} >
                <Text style={[styles.topText]}>忘记密码？</Text>
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
                                    onChangeText={text => this.onChangeText(text, 3)}
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
                    <TouchableWithoutFeedback onPress={this.getsancode} >
                        <Text style={[styles.getsancode]}>{this.state.numend == 60 ? '获取验证码' : this.state.numend}</Text>
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
                <Text style={[styles.loginBtnBox]}>登录</Text>
            </View>
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
        height:160,
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