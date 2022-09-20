import React, {Component} from 'react';
import { View, Image, TextInput,Pressable} from 'react-native';

export default class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            strText : ''
        }
    }
    onChange(strText){
        console.log(strText);
        this.setState({
            strText
        })
        this.props.onChange(strText)
    }
  render() {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', height: 50}}>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 10,
            flex: 1, 
            flexDirection: 'row',
            alignItems: 'center',
            paddingRight:15,
            paddingLeft:15
          }}
          >
          <Image
            style={{width: 20, height: 20,marginRight:6}}
            source={require('../assets/img/my/2876.png')}></Image>
          <TextInput
            value={this.state.strText}
            placeholderTextColor="#ccc"
            placeholder="Search items…"
            cursorColor='#897EF8'
            style={{flex: 1, borderRadius: 10, height: 50}}
            onChangeText={ (strText) => this.onChange(strText)}
          />
        </View>
        <Pressable onPress={this.props.visible}>
          <Image
            style={{width: 40, height: 40, marginLeft: 20}}
            source={require('../assets/img/my/3370.png')}></Image>
        </Pressable>
      </View>
    );
  }
}
