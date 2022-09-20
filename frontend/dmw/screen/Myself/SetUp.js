import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronRight  } from '@fortawesome/free-solid-svg-icons'
import {StyleSheet, View, Text,SafeAreaView} from 'react-native';
import { Switch } from 'react-native-paper';
export default class SetUp extends Component {
    constructor(porps){
        super(porps)
        this.state = {
            Switch : false
        }
    }
  render() {
    return (
      <SafeAreaView style={{paddingLeft: 20, paddingRight: 20,backgroundColor:'#fff'}}>
        <View style={[{padding: 20},styles.box]}>
          <Text style={styles.title}>账户</Text>
          <View style={[styles.list,{ marginBottom:31}]}>
            <Text style={styles.textname} onPress={()=>{this.props.navigation.navigate('ModifyInfo')}}>修改个人信息</Text> 
            <FontAwesomeIcon icon={faChevronRight} color='#707070'  size={16} />
          </View>

          <View style={styles.list}>
            <Text style={styles.textname} onPress={()=>{this.props.navigation.navigate('BlockchainQuery')}}>区块链信息查询</Text>
            <FontAwesomeIcon icon={faChevronRight} color='#707070'  size={16} />
          </View>
        </View>

        <View style={[{padding: 20},styles.box]}>
          <Text style={styles.title}>设备</Text>
          <View style={[styles.list,{ marginBottom:31}]}>
            <Text style={styles.textname} onPress={()=>{this.props.navigation.navigate('SelectLanguage')}}>选择语言</Text> 
            <View style={{flexDirection:'row'}}><Text style={styles.language}>Chinese</Text><FontAwesomeIcon icon={faChevronRight} color='#707070'  size={16} /></View>
          </View>

          <View style={styles.list}>
            <Text style={styles.textname}>面容登陆</Text>
            <Switch color='#897EF8' value={this.state.Switch} onValueChange={()=>{this.setState({Switch : !this.state.Switch})}} />
          </View>
        </View>


        <View style={[{padding: 20},styles.box]}>
          <Text style={styles.title}>关于&支持</Text>
          <View style={[styles.list,{ marginBottom:31}]}>
            <Text style={styles.textname}>联系我们</Text> 
            <FontAwesomeIcon icon={faChevronRight} color='#707070'  size={16} />
          </View>

          <View style={[styles.list,{ marginBottom:31}]}>
            <Text style={styles.textname}>常见问题解答</Text>
            <FontAwesomeIcon icon={faChevronRight} color='#707070'  size={16} />
          </View>

          <View style={[styles.list,{ marginBottom:31}]}>
            <Text style={styles.textname}>服务条款</Text>
            <FontAwesomeIcon icon={faChevronRight} color='#707070'  size={16} />
          </View>

          <View style={[styles.list,{ marginBottom:31}]}>
            <Text style={styles.textname}>隐私政策</Text>
            <FontAwesomeIcon icon={faChevronRight} color='#707070'  size={16} />
          </View>

        </View>


      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
    box:{marginBottom:20},
    title:{
        marginBottom:16,
        fontWeight:'700'
    },
    list:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:"center"

    },
    textname:{
        fontSize:14,
        fontFamily:'Source Han Sans CN',
        color:'#666666',
        flex:1
    },
    language:{
        fontSize:12,
        color: '#999999',
        fontFamily:'Source Han Sans CN',
        alignItems:'center',
        marginRight:5
    }
})