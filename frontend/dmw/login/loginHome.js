import { Text, StyleSheet, View,SafeAreaView,Image,Dimensions } from 'react-native'
import React, { Component } from 'react'
// import { Button } from 'react-native-paper'
const screenHeight = Dimensions.get('window').height;

export default class loginHome extends Component {
  render() {
    return (
      <SafeAreaView style={{backgroundColor:'#fff'}}>
            <View style={[styles.container]}>
                 <View> 
                    {/* <Text style={[styles.faceLogin]}>面部登录</Text> */}
                 </View> 
                 
                 <View style={[styles.loginImgBox]}>
                     <Image source={require('../assets/img/login/loginHome.png')} style={[styles.loginImg]}></Image>
                 </View>
                 <View  style={{paddingHorizontal:50}}>
                    <Text style={[styles.loginBtnBox]}>手机号登录</Text>
                    <Text style={[styles.loginBtnBox]}>邮箱登录</Text>
                    <Text  style={[styles.regiset]}>注册</Text>
                 </View>
                 
                 {/* <Button title='邮箱/手机号登录' color="#897EF8" style={[styles.loginBtnBox]}></Button> */}
                 
                 
            </View>
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:"#fff",
        padding:20,
        height: screenHeight,
        justifyContent:'space-between',
    },
    faceLogin:{
        textAlign:'right',
        fontSize:14,
        color: "#897EF8",
    },
    loginImgBox:{
        // marginTop:411/2,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
    },
    loginImg:{
        width:412/2,
        height:355/2,
    },
    loginBtnBox:{
        width:"100%",
        backgroundColor:"#897EF8",
        height: 50,
        lineHeight:50,
        textAlign:'center',
        color:"#fff",
        borderRadius:25,
        fontSize:16,
        fontWeight:'bold',
        marginBottom:20,
    },
    regiset:{
        color:"#897EF8",
        textAlign:'center',
        fontWeight:'bold',
        marginTop:20,
        fontSize:16,
    }
})