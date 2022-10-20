import { StyleSheet, View, Dimensions, Text, ScrollView, TouchableHighlight } from 'react-native'
import React, { Component } from 'react'
import Modal from './Model';
import { useEffect, useState } from 'react';
import { useDmwApi } from "../../DmwApiProvider/DmwApiProvider";
import { mapping } from '@eva-design/eva';
const Model = (props) => {
 
  return (
    <Modal visible={props.visible} changeVisible={() => { props.changeVisible(false) }} >
      <ScrollView showsVerticalScrollIndicator={false} style={{paddingBottom:80,maxHeight:'90%'}}>
        {
          props.shaiuanList.map(item => {
            return (
              <TouchableHighlight onPress={() => { props.changeVisible(false, item) }} underlayColor='#ccc'>
                <Text style={[styles.textCateg]}>{item.name}</Text>
              </TouchableHighlight>
            )
          })
        }
      </ScrollView>
    </Modal>
  )

}
export default Model

const styles = StyleSheet.create({
  textCateg: {
    color: '#333',
    fontSize: 14,
    marginTop: 15,
    marginBottom: 15,
    paddingHorizontal: 20,
  },


})