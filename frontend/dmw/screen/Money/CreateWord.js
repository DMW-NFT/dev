import { Text, StyleSheet, View ,SafeAreaView,Image,TouchableWithoutFeedback,TextInput} from 'react-native'
import React, { Component } from 'react'

import StepComp from './StepComp'

export default class ImportWord extends Component {
    state={
        secureTextEntry:false,
        word:"",
        password:'',
        password1:'',
    }
  render() {
    return (
      <SafeAreaView style={{backgroundColor:'#fff'}}>
        <View style={[styles.container]}>
            <StepComp type={1}/>
             <View>
                 <Text style={[styles.topInfo]}>创建支付密码</Text>
                 <Text style={[styles.topInfo1]}>此密码将用在您签名资产或者您在支付代币时使用。</Text>
             </View>
            <View style={styles.lis}>
                <View style={{justifyContent:'space-between',alignItems:'center',flexDirection:'row'}}>
                   <Text style={styles.text}>新密码</Text>
                   <TouchableWithoutFeedback onPress={()=>{this.setState({secureTextEntry:!this.state.secureTextEntry})}} onStartShouldSetResponderCapture={()=>true} >
                        {this.state.secureTextEntry?
                            <Image style={[styles.imageshow]}  source={require('../../assets/img/login/nopass.png')} ></Image>:
                            <Image style={[styles.imageshow]}  source={require('../../assets/img/login/showpass.png')} ></Image>
                        } 
                    </TouchableWithoutFeedback>
                </View>
                <TextInput
                    maxLength={6}
                    secureTextEntry={this.state.secureTextEntry}
                    placeholder='新密码' 
                    keyboardType="decimal-pad"
                    style={[styles.input]}
                    onChangeText={e =>  this.setState({ password:e })}
                    value={this.state.password}
                />
            </View>
            <View style={styles.lis}>
                <Text style={styles.text}>新密码</Text>
                <TextInput 
                    maxLength={6}
                    secureTextEntry={this.state.secureTextEntry}
                    placeholder='确认新密码' 
                    keyboardType="decimal-pad"
                    style={[styles.input]}
                    onChangeText={e =>  this.setState({ password1:e })}
                    value={this.state.password1}
                />
                <Text style={[styles.text,{marginTop:10,marginBottom:32}]}>请输入6位数数字</Text>

            </View>
            <Text style={[styles.import]} onPress={()=>{this.props.navigation.navigate('walletSafe')}}>创建密码</Text>
        </View>
        
       
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
    
   
    topInfo:{
        textAlign:'center',
        fontSize:16,
        color:'#333',
        fontWeight:'bold',
        marginBottom:20,
    },
    topInfo1:{
        textAlign:'center',
        color: '#333333',
        fontSize:12,
        marginBottom:72/2,
    },
    import:{
        marginTop:60,
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
   
    input:{
        height:48, 
        borderColor: 'gray', 
        borderWidth: 1,
        borderColor:"#ccc",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        borderBottomRightRadius: 24,
        borderBottomLeftRadius: 24,
        paddingLeft:15,
        paddingRight:15,
    },
    imageshow:{
        width:24,
        height:24,
    },
    text:{
        color:"#333",
        fontWeight:"bold",
        fontSize:12,
        marginBottom:10,
    },
    lis:{
        marginBottom:52/2,
    },
    container:{
        padding:20,
    }
})