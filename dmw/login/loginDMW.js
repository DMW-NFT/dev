import { Text, StyleSheet, View, TextInput, Image, TouchableWithoutFeedback, ScrollView } from 'react-native'
import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleDown, faPhone } from '@fortawesome/free-solid-svg-icons'

export default class faceLogin extends Component {

    // const [value, onChangeText] = React.useState('Useless Multiline Placeholder');
    state = {
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
    };

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


    render() {
        return (
            
            <View style={[styles.container]} >
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
                <View style={[styles.inputBox]}>
                    <Image style={[styles.imageInput]} source={require('../assets/img/login/email.png')}></Image>
                    <TextInput
                        placeholder='请输入邮箱'
                        keyboardType="decimal-pad"

                        onChangeText={text => this.onChangeText(text, 1)}
                        value={this.state.email}
                    />
                </View>
                {/* 电话号码 */}
                <View>
                    <View style={[styles.inputBox, { paddingLeft: 100 }]}>
                       <TouchableWithoutFeedback onPress={()=>{this.setState({showareaCode:true})}}>
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
                    {
                        this.state.showareaCode ?
                            <ScrollView style={[styles.checkColac, { left: 0, top: 50 }]}>
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
                </View>
                <View style={[styles.inputBox,{paddingRight:60}]} >
                    <Image style={[styles.imageInput, { width: 37 / 2, height: 20 }]} source={require('../assets/img/login/password.png')}></Image>
                    <TouchableWithoutFeedback onPress={()=>{this.setState({secureTextEntry:!this.state.secureTextEntry})}} >
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
                <Text style={[styles.forget]} >忘记密码？</Text>
                <Text style={[styles.loginBtnBox]}>登陆</Text>
                <View style={[styles.agren]} >
                    <Text style={[styles.checkbox, { "backgroundColor": this.state.agree ? '#897EF8' : "#fff" }]} onPress={() => { this.setState({ agree: !this.state.agree }) }}></Text>
                    <Text style={[styles.textinfo]}>我已阅读并同意</Text>
                    <Text style={[styles.text]}>《用户协议》</Text>
                    <Text style={[styles.textinfo]}>及</Text>
                    <Text style={[styles.text]}>《隐私政策》</Text>
                </View>
            </View> 
        )
    }
}

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