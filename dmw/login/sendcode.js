import React, { Component } from 'react';
import { SafeAreaView, Text, StyleSheet, View,Dimensions } from 'react-native';

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    title: { textAlign: 'center', fontSize: 30 },
    codeFiledRoot: {
        marginTop: 115/2 ,
        paddingLeft:123/2,
        paddingRight:123/2,
        
    },
    // 里面每个密码小框的样式
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 20,
        fontWeight:"bold",
        borderWidth: 1,
        borderColor:"#fff",
        backgroundColor:'#fff',
        borderBottomColor: '#D4D4D4',
        textAlign: 'center',
    },
    // 当里面的每个密码小框被选中之后的样式
    focusCell: {
        borderColor: '#fff',
    },
    container: {
        height:screenHeight,
        backgroundColor:"#fff",
        padding: 10,
    },
    topBox:{
        marginTop:70,
        textAlign:'left',
    },
    toptext:{
        fontSize:18,
        color: "#0F172C",
        lineHeight:25,
    },
    number:{
        color: '#0F172C',
        marginTop:20,
        fontSize:12,

    },
    aginsend:{
        color: '#897EF8',
        lineHeight:28,
        fontSize:12,
    },
    loginBtnBox:{
        marginTop:121/2,
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
});


class Index extends Component {
    state = {
        type:1, //1是邮箱 2是手机
        vcodeTxt: '',
        number:60, //倒计时
    };

    onVcodeChangeText = (e) => {
        this.setState({ vcodeTxt:e });
        console.log(e)
    }

    render() {
        return (
            <SafeAreaView>
                <View style={[styles.container]}>
                    <View style={[styles.topBox]}>
                        <Text style={[styles.toptext]}>验证码已发送到您的{this.state.type==1?'邮箱':"手机"}</Text>
                        <Text style={[styles.toptext]}>709644942@qq.com</Text>
                    </View>

                    <CodeField
                        value={this.state.vcodeTxt}
                        onChangeText={this.onVcodeChangeText}
                        // 输入密码框的个数
                        cellCount={4}
                        rootStyle={styles.codeFiledRoot}
                        keyboardType="number-pad"
                        renderCell={({ index, symbol, isFocused }) => (
                            <Text
                                key={index}
                                style={[styles.cell, isFocused && styles.focusCell]}
                            >
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        )}
                    />
                    <View style={[styles.number]}>
                        <Text>00:{this.state.number}</Text>
                        <Text style={[styles.aginsend]}>重新发送</Text>
                    </View>
                    <Text style={[styles.loginBtnBox]}>完成</Text>
                </View>
            </SafeAreaView>
        );
    }
}

export default Index;
