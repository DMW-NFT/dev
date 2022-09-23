import { Text, StyleSheet, View, SafeAreaView, Image, Dimensions } from 'react-native'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LoginSuccess } from '../redux/actions/Login';


const mapStateToProps = state => {
    return {
        isLogin: state.Login.isLogin
    }
}


// import { Button } from 'react-native-paper'
const screenHeight = Dimensions.get('window').height;

class LoginHome extends Component {
    constructor(props) {
        super(props)

    }
    // 手机登录
    PhoneSignIn = (app = { a: 1 }) => {
        // console.log(app);
        // console.log(this.props.isLogin);
        // this.props.LoginSuccess(app)
        this.props.navigation.navigate('LoginDMW', { type: 2 })
    }
    // 邮箱登录
    mailboxSignIn = () => {
        this.props.navigation.navigate('LoginDMW', { type: 1 })
    }

    // 注册
    register = () => {
        this.props.navigation.navigate('EmailAndPhoneReginster', { type: 2 })
    }

    render() {
        return (
            <SafeAreaView style={{ backgroundColor: '#fff', marginTop: -50, flex: 1 }}>
                <View style={[styles.container]}>
                    <View>
                        {/* <Text style={[styles.faceLogin]}>面部登录</Text> */}
                    </View>

                    <View style={[styles.loginImgBox]}>
                        <Image source={require('../assets/img/login/loginHome.png')} style={[styles.loginImg]}></Image>
                    </View>
                    <View style={{ paddingHorizontal: 50 }}>
                        <Text onPress={() => this.PhoneSignIn()} style={[styles.loginBtnBox]}>手机号登录</Text>
                        <Text onPress={() => this.mailboxSignIn()} style={[styles.loginBtnBox]}>邮箱登录</Text>
                        <Text onPress={() => this.register()} style={[styles.regiset]}>注册</Text>
                    </View>

                    {/* <Button title='邮箱/手机号登录' color="#897EF8" style={[styles.loginBtnBox]}></Button> */}


                </View>
            </SafeAreaView>
        )
    }
}

export default connect(mapStateToProps, { LoginSuccess })(LoginHome)

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 20,
        height: screenHeight,
        justifyContent: 'space-between',
    },
    faceLogin: {
        textAlign: 'right',
        fontSize: 14,
        color: "#897EF8",
    },
    loginImgBox: {
        // marginTop:411/2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loginImg: {
        width: 412 / 2,
        height: 355 / 2,
    },
    loginBtnBox: {
        width: "100%",
        backgroundColor: "#897EF8",
        height: 50,
        lineHeight: 50,
        textAlign: 'center',
        color: "#fff",
        borderRadius: 25,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    regiset: {
        color: "#897EF8",
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 20,
        fontSize: 16,
        marginBottom: 14
    }
})