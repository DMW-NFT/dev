import { Text, StyleSheet, View, SafeAreaView, Image, TouchableWithoutFeedback, TextInput } from 'react-native'
import React, { Component } from 'react'

import StepComp from './StepComp'

export default class ImportWord extends Component {
    state = {
        data: [{id:1,name:"what"},{id:2,name:"what"},{id:3,name:"what"},{id:4,name:"what"},
        {id:5,name:"what"},{id:6,name:"what"},{id:7,name:"what"},{id:8,name:"what"},{id:9,name:"what"},{id:10,name:"what"},{id:11,name:"what"},{id:12,name:"what"}
    ], 
    }
    render() {
        return (
            <SafeAreaView style={{backgroundColor:'#fff'}}>
                <View style={[styles.container]}>
                    <StepComp type={2} />
                    <View>
                        <Text style={[styles.topInfo]}>保护您的钱包安全</Text>
                        <Text style={[styles.topInfo1]}>这是您的助记词。将它写在纸上并存放在安全的地方。 </Text>
                        <Text style={[styles.topInfo1]}>您将需要在下一步中重新输入此助记词</Text>
                        <Text style={[styles.topInfo1,{marginBottom: 72 / 2,}]}>（按顺序）。</Text>
                    </View>
                    <View style={[styles.blackBox]}>
                        {
                            this.state.data.map((item,index)=>{
                                return   <Text key={item.id} style={{fontSize:12,color:"#333",width:"50%",textAlign:'center',marginBottom:20,}}>{index+1}{item.name}</Text>
                            })
                        }
                       
                    </View>
                    <Text style={[styles.import]} onPress={()=>{this.props.navigation.navigate('determineWord')}} >继续</Text>
                </View>


            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
 
    blackBox:{
        padding:15,
        paddingLeft:50,
        paddingRight:50,
        flexDirection:"row",
        justifyContent:"space-between",
        flexWrap:'wrap',
        width:"100%",
        height:496/2,
        borderWidth:1,
        borderColor:"#999",
        borderRadius:10,
        justifyContent:'space-around',
        alignItems:'center'

    },
  
    topInfo: {
        textAlign: 'center',
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
        marginBottom: 20/2,
    },
    topInfo1: {
        textAlign: 'center',
        color: '#333333',
        fontSize: 12,
        
    },
    import: {
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


   
    container: {
        padding: 20,
    }
})