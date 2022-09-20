import { Text, StyleSheet, View,TextInput,Image ,TouchableWithoutFeedback} from 'react-native'
import React, { Component } from 'react'

export default class faceLogin extends Component {
    
    // const [value, onChangeText] = React.useState('Useless Multiline Placeholder');
    state = {
        email: '',
        password:'',
        password1:'',
        secureTextEntry:true, //密码框类型切换
    };

    onChangeText = (e,num) => {
        if(num==1){
            this.setState({ email:e ,});
        }else if(num==2){
            this.setState({ password:e });
        }else{
            this.setState({ password1:e });
        }
    }
    typecheck=()=>{
        this.setState({ secureTextEntry:!this.state.secureTextEntry });
    }
  render() {
    return (
      <View style={[styles.container]} >
       

          <Text style={[styles.topText]}>注册一个新账号</Text>
          <View style={[styles.inputBox]}>
            <Image style={[styles.imageInput]} source={require('../assets/img/login/email.png')}></Image>
            <TextInput
                placeholder='请输入邮箱/电话号码' 
                keyboardType="decimal-pad"
                style={[styles.input]}
                onChangeText={text => this.onChangeText(text,1)}
                value={this.state.email}
            />
          </View>
          <View style={[styles.inputBox]} >
            <Image style={[styles.imageInput,{width:37/2,height:20}]} source={require('../assets/img/login/password.png')}></Image>
            <TouchableWithoutFeedback onPress={this.typecheck} onStartShouldSetResponderCapture={()=>true} >
                {this.state.secureTextEntry?
                    <Image style={[styles.imageshow]}  source={require('../assets/img/login/nopass.png')} ></Image>:
                    <Image style={[styles.imageshow]}  source={require('../assets/img/login/showpass.png')} ></Image>
                }
            </TouchableWithoutFeedback>
            <TextInput 
            placeholder='请输入密码' 
            keyboardType="decimal-pad"
            secureTextEntry={this.state.secureTextEntry}
            style={[styles.input]}
            onChangeText={text => this.onChangeText(text,2)}
            value={this.state.password}
           />
          </View>
          <View style={[styles.inputBox]}>
            <Image style={[styles.imageInput,{width:37/2,height:20}]} source={require('../assets/img/login/password.png')}></Image>
            <TextInput
            placeholder='请再次输入密码' 
            keyboardType="decimal-pad"
            secureTextEntry={true}
            numberOfLines={4}
            style={[styles.input]}
            onChangeText={text => this.onChangeText(text,3)}
            value={this.state.password1}
           />
          </View>
            <Text style={[styles.loginBtnBox]}>注册</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        padding:20,
    },
    topText:{
        color: "#0F172C",
        marginBottom:40,
        fontSize:16,    
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
        paddingLeft:46,
        paddingRight:15,
        marginBottom:30,
        
    },
    loginBtnBox:{
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
    inputBox:{
        position:'relative',
        
    },
    imageInput:{
        width:20,
        height:17,
        position:"absolute",
        top:23,
        left:15,
        marginTop:-17/2,
        
    },
    imageshow:{
        width:16,
        height:16,
        position:"absolute",
        right:18,
        top:14,

    }
   

})