import { Text, StyleSheet, View, SafeAreaView } from 'react-native'
import React, { Component } from 'react'

import StepComp from './StepComp'

export default class ImportWord extends Component {
    state = {
        data: [{id:1,name:"what"},{id:2,name:"what"},{id:3,name:"what"},{id:4,name:"what"},
               {id:5,name:"what"},{id:6,name:"what"},{id:7,name:"what"},{id:8,name:"what"},{id:9,name:"what"},{id:10,name:"what"},{id:11,name:"what"},{id:12,name:"what"}],
        checkdata:[{id:1,name:"what"},{id:2,name:"what"},{id:3,name:"what"}]
     
    }
    checkList=(item)=>{
        this.state.checkdata.forEach((item1,index1)=>{
           
            if(item.id==item1.id){ 
                //  this.state.checkdata.splice(index1,1)
                //  console.log( this.state.checkdata)
                // this.setState({checkdata: this.state.checkdata.splice(index1,1)}) 
                return
            }else{
                console.log(123465)
                this.setState({checkdata:[...this.state.checkdata,item]})
                return 
            }
        })
    }
    render() {
        return (
            <SafeAreaView style={{backgroundColor:'#fff'}}>
                <View style={[styles.container]}>
                    <StepComp type={3} />
                    <View>
                        <Text style={[styles.topInfo]}>确认助记词</Text>
                        <Text style={[styles.topInfo1,{marginBottom: 20,}]}>按照之前呈现的顺序选择每个字词</Text>
                    </View>
                    <View style={[styles.blackBox]}>
                        {
                            this.state.checkdata.map((item,index)=>{
                                return  <Text key={item.id} style={[styles.checkdata]}>{'      '+item.name}</Text>
                            })
                        }
                    </View>
                    <View style={[styles.Box]}>
                        {
                            this.state.data.map((item,index)=>{
                                return   <Text key={item.id} style={[styles.lis,this.state.checkdata.includes(item.id)?'':'active']} onPress={()=>{this.checkList(item)}}>{item.name}</Text>
                            })
                        }
                    </View>
                    
                    <Text style={[styles.import]} onPress={()=>{this.props.navigation.navigate('completeBackup')}}>完成备份</Text>
                </View>


            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    active:{
        backgroundColor:"#ccc" ,
        borderColor:"#ccc",
        color:"#333"
    },
    lis:{
        width:200/2,
        height:54/2,
        lineHeight:54/2,
        textAlign:'center',
        borderWidth:1,
        borderColor:"#897EF8",
        borderRadius:54/2,
        marginBottom:10


    },
    Box:{
        marginTop:20,
        flexDirection:'row',
        justifyContent:'space-between',
        flexWrap:'wrap', 

    },
    checkdata:{
        color:"#333",
        fontSize:12,
        marginBottom:20,
    },
 
    blackBox:{
        paddingVertical:10,
        paddingHorizontal:15,
        flexDirection:"row",
        flexWrap:'wrap',
        width:"100%",
        height:100,
        borderWidth:1,
        borderColor:"#999",
        borderRadius:10,
        
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