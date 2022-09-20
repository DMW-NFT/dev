import { Text, StyleSheet, View, SafeAreaView, ScrollView, TouchableWithoutFeedback, ImageBackground } from 'react-native'
import React, { Component } from 'react'
import List from '../../Components/List'
import Screen from '../../Components/screen'

export default class Categray extends Component {
  state = {
    list: [{}, {}, {}],
    visible:false,
    data : [
      {  
        typename: 'Status',  
        list: [
          { name: 'Buy now', id: 1, active: false },
          { name: 'On auction', id: 2, active: false },
          { name: 'Has offers', id: 3, active: false },
          { name: 'most viewed', id: 4, active: false },
        ],
      },
      {
        typename: 'sort by',
        list: [
          { name: 'recently created', id: 5, active: false },
          { name: 'most viewed', id: 6, active: false },
          { name: 'oldest', id: 7, active: false },
          { name: 'Low to High', id: 8, active: false },
          { name: 'High to Low', id: 9, active: false },
        ],
      },
    ]
  }

  componentDidMount() {
    // 动态修改标题
    this.props.navigation.setOptions({
      title: this.props.route.params.categray,
      headerRight: () => {
        return (
          // 修改标题栏
          <View style={{ flexDirection: 'row' }}>
            <TouchableWithoutFeedback onPress={() => { this.props.navigation.navigate('searchScreen', { visible: true }) }}>
              <ImageBackground source={require('../../assets/img/allIconAndlImage/3571.png')} style={{ width: 40, height: 40, marginRight: 15 }}></ImageBackground>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => { this.setState({visible:true}) }}>
              <ImageBackground onPress={() => { this.props.navigation.navigate('searchScreen', { visible: true }) }} source={require('../../assets/img/allIconAndlImage/3574.png')} style={{ width: 40, height: 40, marginRight: 15 }}></ImageBackground>
            </TouchableWithoutFeedback>
          </View>
        )
      }
    })

    // this.props.navigation.createStackNavigator({
    //   categray:{
    //      Option:{ title: this.props.route.params.categray,}
    //   }
    // })
    console.log(this.props, '123')
  }

  render() {
    
    return (
      <SafeAreaView style={{backgroundColor:'#fff'}}>
        <ScrollView style={[styles.container]}>
          <List list={this.state.list} type={1} getList={this.getList} />
        </ScrollView>
        <Screen
            title="select filter"
            style={{width: '100%',position: 'absolute',}}
            visible={this.state.visible} 
            close={() =>this.setState({visible:false})}
            datalist={this.state.data}>
         </Screen> 
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  
  container: {
    padding: 20,
  }
})