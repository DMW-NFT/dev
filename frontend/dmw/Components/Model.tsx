import {  StyleSheet, View,Dimensions,Text } from 'react-native'
import React, { Component,useState } from 'react'
import { Modal } from 'react-native-paper';



const Model = (props) => {

    const [visible,setVisible] = useState(false)

    return (
      <Modal visible={visible} onDismiss={() => { setVisible(false) }} contentContainerStyle={[styles.footer]}>
       <View style={{flexDirection:'row',justifyContent:'center',height:20,flex:1,alignItems:'center',marginTop:6}}>
       <Text style={[styles.btnline]}></Text>
       </View>
       <Text style={{fontSize:16,textAlign:'center',fontWeight:'700',marginBottom:30,marginTop:10}}>筛选</Text>
          {props.children}

<View>

</View>

     </Modal>
    )
  
}

export default Model
// export default class Model extends Component {
//   render() {
//     return (
//       <Modal visible={this.props.visible} onDismiss={() => { this.props.changeVisible(false) }} contentContainerStyle={[styles.footer]}>
//        <View style={{flexDirection:'row',justifyContent:'center',height:20,flex:1,alignItems:'center',marginTop:6}}>
//        <Text style={[styles.btnline]}></Text>
//        </View>
//        <Text style={{fontSize:16,textAlign:'center',fontWeight:'700',marginBottom:30,marginTop:10}}>筛选</Text>
//           {this.props.children}

// <View>

// </View>

//      </Modal>
//     )
//   }
// }

const styles = StyleSheet.create({
  btnline: {
    width: 40,
    height: 6,
    backgroundColor:'#E0E0E0',
    borderRadius:50,
},
footer: {
    zIndex: 999,
    width: Dimensions.get('window').width,
    position: 'absolute',
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow:'hidden',
    paddingBottom:48,
    paddingLeft:20,
    paddingRight:20
},
})