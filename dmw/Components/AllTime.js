import {  StyleSheet, View,Dimensions,Text ,ScrollView ,TouchableHighlight} from 'react-native'
import React, { Component } from 'react'
import Modal from './Model';
export default class Model extends Component {
  render() {
    return (
      <Modal visible={this.props.visible} changeVisible={() => { this.props.changeVisible(false) }} >
           <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableHighlight onPress={()=>{this.props.changeVisible(false,{id:1,name:"All Time"})}} underlayColor='#ccc'> 
                <Text style={[styles.textCateg]}>All categories</Text> 
            </TouchableHighlight> 
            <TouchableHighlight onPress={()=>{console.log(123)}} underlayColor='#ccc'> 
              <Text style={[styles.textCateg]}>Muti collections</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={()=>{console.log(123)}} underlayColor='#ccc'> 
              <Text style={[styles.textCateg]}>music</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={()=>{console.log(123)}} underlayColor='#ccc'> 
              <Text style={[styles.textCateg]}>art</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={()=>{console.log(123)}} underlayColor='#ccc'> 
            <Text style={[styles.textCateg]}>sports</Text>
            </TouchableHighlight>
            
            <TouchableHighlight onPress={()=>{console.log(123)}} underlayColor='#ccc'> 
            <Text style={[styles.textCateg]}>utility</Text>
            </TouchableHighlight>
            
            <TouchableHighlight onPress={()=>{console.log(123)}} underlayColor='#ccc'> 
            <Text style={[styles.textCateg]}>Trading cards</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={()=>{console.log(123)}} underlayColor='#ccc'> 
            <Text style={[styles.textCateg]}>collectibles</Text>
            </TouchableHighlight>
           </ScrollView>
     </Modal>
    )
  }
}

const styles = StyleSheet.create({  
    textCateg:{
        color:'#333',
        fontSize:14,
        marginTop:25, 
        marginBottom:25 ,
        paddingHorizontal:20,
    },


})