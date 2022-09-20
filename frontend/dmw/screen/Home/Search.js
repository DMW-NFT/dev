import { Text, StyleSheet, View, TextInput, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearchMinus } from '@fortawesome/free-solid-svg-icons'
import List from '../../Components/List'
import Model  from '../../Components/Model'
export default class Search extends Component {
    state = {
        input: "",
        list:[{},{},{}],
        visible:false,
    }
    changeVisible=(val)=>{
        console.log(val)
        this.setState({visible:val})
    }
    componentDidMount=()=>{
        // const {visible} = this.props.navigation.navigate
        // console.log(visible)  
    } 
    getList=()=>{

    }
    render() {
        return (
            <SafeAreaView style={{backgroundColor:'#fff'}}> 
                <ScrollView>
                    <View style={[styles.container]}>
                        <View style={[styles.inputBox]} >
                            <Text style={[styles.imageshow]} onPress={()=>this.setState({input:''})}>
                                {
                                    this.state.input.length>0?'x':''
                                }</Text> 
                            {/* <Image style={[styles.imageshow]}  source={require('../assets/img/login/showpass.png')} ></Image> */}
                            <FontAwesomeIcon icon={faSearchMinus} color='#999999' size={20} style={[styles.imageInput, { width: 37 / 2, height: 20 }]} />
                            <TextInput
                                onStartShouldSetResponderCapture={() => true}
                                placeholder='Search items…'
                                style={[styles.input]}
                                onChangeText={e => this.setState({ input: e })}
                                value={this.state.input}
                            />
                        </View>
                       
                        <List list={this.state.list} type={1} getList={this.getList}/>
                    </View>
                    <Model visible={this.state.visible} changeVisible={this.changeVisible}>
                        <Text>789156</Text>
                    </Model>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    
   
    container: {
        padding: 20,
        // marginTop:headerHeight,
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingLeft: 46,
        paddingRight: 30,
        color:"#333",
    },
 
    inputBox: {
        position: 'relative',
        marginBottom:20,
    },
    imageInput: {
        width: 20,
        height: 17,
        position: "absolute",
        top: 23,
        left: 15,
        marginTop: -17 / 2,

    },
    imageshow: {
        fontSize:24,
        position: "absolute", 
        right: 15,
        top: 5,
        color:'#333333',
    },
})