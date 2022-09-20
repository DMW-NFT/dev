import { Text, StyleSheet, View, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native'
import React, { Component } from 'react'

export default class RradeSuccessfully extends Component {
  state = {
    type: 1, //1是交易成功  2是交易关闭
  }
  render() {
    return (
      <SafeAreaView style={{backgroundColor:'#fff'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={[styles.whiteBox]}>
              <View style={[styles.flex]}>
                <Image source={require('../../assets/img/index/any3.jpg')} style={[styles.whiteImage]}></Image>
                <Text style={[styles.whiteImageText]}>Simon D</Text>
              </View>
              <View style={[styles.imageBox]}>
                <View style={[styles.flex]}>
                  <Image source={require('../../assets/img/index/any3.jpg')} style={[styles.imgBoxImage]}></Image>
                  <View style={{ flex: 1 }}>
                    <View style={[styles.flexJBC]}>
                      <Text style={[styles.ImageBoxName, { marginBottom: 23, }]}>恶魔果实#0215</Text>
                      <Text style={[styles.ImageBoxName, { fontWeight: 'bold' }]}>12u</Text>
                    </View>
                    <Text style={[styles.ImageBoxColl]}>海贼王</Text>
                  </View>
                </View>
              </View>
              {
                this.state.type == 1 ?
                  <View>
                    <View style={[styles.flexJBC, styles.mb30]} >
                      <Text style={[styles.ImageBoxName]}>服务费2%</Text>
                      <Text style={[styles.ImageBoxColl]}>2u</Text>
                    </View>
                    <View style={[styles.flexJBC, styles.borderling]}>
                      <Text style={[styles.ImageBoxName]}>成交价</Text>
                      <Text style={[styles.ImageBoxColl, { color: "#897EF8", fontSize: 16, fontWeight: 'bold' }]}>12u</Text>
                    </View>
                  </View> :
                  <View style={[styles.borderling, { paddingBottom: 0 }]}></View>
              }

              <View style={[styles.flexJBC, styles.mb30]} >
                <Text style={[styles.ImageBoxName]}>创建时间</Text>
                <Text style={[styles.ImageBoxColl]}>2011-06-10 12:10:10</Text>
              </View>
              {
                this.state.type==1?
                <View style={[styles.flexJBC, styles.mb30]} >
                <Text style={[styles.ImageBoxName]}>成交时间</Text>
                <Text style={[styles.ImageBoxColl]}>2011-06-10 12:10:10</Text>
              </View>:<Text></Text>
              }
              <View style={[styles.flexJBC, styles.mb30]} >
                <Text style={[styles.ImageBoxName]}>买方</Text>
                <Text style={[styles.ImageBoxColl]}>mahoshoujo</Text>
              </View>
              <View style={[styles.flexJBC, styles.mb30]} >
                <Text style={[styles.ImageBoxName]}>藏品地址</Text>
                <Text style={[styles.ImageBoxColl, { color: "#897EF8" }]}>0xD652fw…G673C7C4</Text>
              </View>
              
              <View style={[styles.flexJBC, styles.mb30]} >
                <Text style={[styles.ImageBoxName]}>Token ID</Text>
                <Text style={[styles.ImageBoxColl]}>0xD652fw…G673C7C4</Text>
              </View>
              <View style={[styles.flexJBC, styles.mb30]} >
                <Text style={[styles.ImageBoxName]}>哈希地址</Text>
                <Text style={[styles.ImageBoxColl, { color: "#897EF8" }]}>0xD652fw…G673C7C4</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  borderling: {
    paddingBottom: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,

  },
  mb30: {
    marginBottom: 15,
  },
  ImageBoxColl: {
    color: "#999",
    fontSize: 12
  },
  ImageBoxName: {
    fontSize: 12,
    color: "#333",

  },
  imgBoxImage: {
    width: 75,
    height: 75,
    borderRadius: 10,
    marginRight: 10,
  },
  imageBox: {
    marginTop: 15,
    marginBottom: 17,
  },
  whiteImageText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#333",
  },
  whiteImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 5,
  },
  whiteBox: {
    height:858/2,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
  },
  container: {
    minHeight: Dimensions.get('window').height - 106,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  flex: {
    flexDirection: "row",
    alignItems: 'center',
  },
  flexJBC: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})