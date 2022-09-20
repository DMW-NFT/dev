import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  TextInput,
  Button,
} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const scale = Dimensions.get('window').scale;
const screenHeight = Dimensions.get('window').height;
export default class ILikeIt extends Component {
  constructor(porps) {
    super(porps);
    this.state = {
      type: 'ch',
    };
  }
  render() {
    return (
      <SafeAreaView
        style={{
          paddingTop: 30,
          position: 'relative',
          height: Dimensions.get('window').height,
          backgroundColor:'#fff'
        }}>
        <View style={{paddingLeft: 20, paddingRight: 20}}>
         
    <View style={styles.box}>
        <Image style={{width:50,height:50,borderRadius:25}} source={require('../../assets/img/my/any2.jpg')}></Image>
        <View style={styles.info}>
            <Text style={{fontSize:14,color:'#666666'}}>dfk123</Text>
            <View style={styles.time}>
                <Text style={{fontSize:12,color:'#666666'}}>赞了这个合集</Text>
                <Text style={{marginLeft:10,fontSize:10,color:'#999999'}}>06-24 17:40</Text>
            </View>
        </View>
        <Image style={{width:60,height:60}} source={require('../../assets/img/my/any2.jpg')}></Image>
    </View>


    <View style={styles.box}>
        <Image style={{width:50,height:50,borderRadius:25}} source={require('../../assets/img/my/any2.jpg')}></Image>
        <View style={styles.info}>
            <Text style={{fontSize:14,color:'#666666'}}>dfk123</Text>
            <View style={styles.time}>
                <Text style={{fontSize:12,color:'#666666'}}>赞了这个合集</Text>
                <Text style={{marginLeft:10,fontSize:10,color:'#999999'}}>06-24 17:40</Text>
            </View>
        </View>
        <Image style={{width:60,height:60}} source={require('../../assets/img/my/any2.jpg')}></Image>
    </View>

        </View>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    box:{
        flexDirection:'row',
        alignItems:'center',
        height:60,
        marginBottom:30
    },
    info:{
        marginLeft:12,
        flex:1,
    },
    time:{
        flexDirection:'row',
        alignItems:'center'
    }
});
