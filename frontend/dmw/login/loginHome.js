import { Text, StyleSheet, View, SafeAreaView, Image, Dimensions } from 'react-native'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LoginSuccess } from '../redux/actions/Login';
import storage from '../Storage/storage';

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
         // 读取
    //   storage
    //   .load({
    //     key: 'loginState',
    
    //     // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
    //     autoSync: true, // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
    
    //     // syncInBackground(默认为true)意味着如果数据过期，
    //     // 在调用sync方法的同时先返回已经过期的数据。
    //     syncInBackground: true,
    //     // 你还可以给sync方法传递额外的参数
    //     syncParams: {
    //       extraFetchOptions: {
    //         // 各种参数
    //       },
    //       someFlag: true,
    //     },
    //   })
    //   .then(ret => {
    //     // 如果找到数据，则在then方法中返回
    //     // 注意：这是异步返回的结果（不了解异步请自行搜索学习）
    //     // 你只能在then这个方法内继续处理ret数据
    //     // 而不能在then以外处理
    //     // 也没有办法“变成”同步返回
    //     // 你也可以使用“看似”同步的async/await语法
    
    //     console.log(ret.token,'----------------------');
    //     // this.setState({ user: ret });
    //   })
    //   .catch(err => {
    //     //如果没有找到数据且没有sync方法，
    //     //或者有其他异常，则在catch中返回
    //     console.warn(err.message);
    //     switch (err.name) {
    //       case 'NotFoundError':
    //         // TODO;
    //         break;
    //       case 'ExpiredError':
    //         // TODO
    //         break;
    //     }
    //   });
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