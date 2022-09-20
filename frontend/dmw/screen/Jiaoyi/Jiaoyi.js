import { Text, StyleSheet, View,SafeAreaView ,ScrollView} from 'react-native'
import React, { Component } from 'react'
import List from '../../Components/List'
export default class Jiaoyi extends Component {
  state={
    type:2, //2是寄售 3是拍卖
    list:[{},{}] 
  }
  changetype=(val)=>{  
    console.log(val)
    this.setState({
      type:val, 
    })
  }
  navigatetoDetail=(id)=>{
    this.props.navigation.navigate('goodsDetail',{id:id})
  } 
  render() {
    return (
      <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* tab栏 -- start */}
        <View style={[styles.index_box, styles.daohang]}>
            <Text style={[this.state.type === 2 ? styles.daonghang_text_ative : styles.daonghang_text]} onPress={() => this.changetype(2)}>寄售</Text>
            <Text style={[this.state.type === 3 ? styles.daonghang_text_ative  : styles.daonghang_text]} onPress={() => this.changetype(3)}>拍卖</Text>
          </View>
          {/* tab栏 -- end */}

          <View style={[styles.listbox]}>
              <List list={this.state.list} type={this.state.type} getList={this.getList} navigatetoDetail={this.navigatetoDetail}/>
          </View>
      </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  listbox: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  index_box: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  daohang: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth:1,
    borderBottomColor:'#ccc',


    // backgroundColor: 'pink',
  },
  daonghang_text: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Source Han Sans CN',
    height: 56,
    lineHeight: 56,
    flex: 1,
    color: '#666666',
    textAlign: 'center',
    // borderBottomColor:'#897EF8',
    // borderBottomWidth:3
  },
  daonghang_text_ative: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Source Han Sans CN',
    height: 56,
    lineHeight:56,
    flex: 1,
    textAlign: 'center',
    borderBottomColor: '#897EF8',
    borderBottomWidth: 3,
    color: '#897EF8',
    borderRadius: 1,
  }

})