import {  StyleSheet, View,Dimensions } from 'react-native'
import React, { Component } from 'react'
import { Modal } from 'react-native-paper';
export default class Model extends Component {
  render() {
    return (
      <Modal visible={this.props.visible} onDismiss={() => { this.props.changeVisible(false) }} contentContainerStyle={[styles.footer]}>
        <View style={[styles.btnline]}></View>
          {this.props.children}
     </Modal>
    )
  }
}

const styles = StyleSheet.create({
  btnline: {
    position: 'absolute',
    width: 40,
    height: 6,
    backgroundColor:'#E0E0E0',
    top:6,
    borderRadius:50,
    left:'50%'
},
footer: {
    zIndex: 999,
    width: Dimensions.get('window').width,
    maxHeight: '80%',
    position: 'absolute',
    bottom: 0,
    zIndex: 10,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow:'hidden'
},
})