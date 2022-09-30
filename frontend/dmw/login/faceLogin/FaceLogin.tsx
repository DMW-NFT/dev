import { Text, StyleSheet, View,Image,SafeAreaView } from 'react-native'
import React, { Component } from 'react'

const FaceLogin = () => {
    return (
      <SafeAreaView style={[styles.container]}>
        <View style={[styles.topBox]}>
            <Image source={require('../../assets/img/login/faceLogin.png')} style={[styles.LoginImage]}></Image>
            <Text style={[styles.facetext]}>推荐开通面容登陆</Text>
            <Text style={[styles.info]}>面容登陆更安全更便捷</Text>
        </View>
        <View>
            <Text style={[styles.loginBtnBox]}>开通面容登陆</Text>
            <Text  style={[styles.later]}>Later</Text>
        </View>
      </SafeAreaView>
    )
}


export default FaceLogin
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignContent:'center',
        padding:20,
        paddingBottom:80,
        backgroundColor:'#fff'
    },
    topBox:{
        // flex:1,
        alignItems:'center',
        // justifyContent:'center',
    },
    LoginImage:{
        width:140,
        height:140,
    },
    loginBtnBox:{
        marginTop:120,
        width:"100%",
        backgroundColor:"#897EF8",
        height: 50,
        lineHeight:50,
        textAlign:'center',
        color:"#fff",
        borderRadius:25,
        fontSize:16,
        fontWeight:'bold',
    },
    later:{
        color:"#897EF8",
        textAlign:'center',
        fontWeight:'bold',
        marginTop:20,
        fontSize:16,
    },
    facetext:{
        fontWeight:'bold',
        marginTop:20,
        color:'#333333',
        fontSize:18,
    },
    info:{
        marginTop:20,
        color:'#666',
        fontSize:12,
    }

})