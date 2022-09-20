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
export default class SelectLanguage extends Component {
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
          paddingTop: 38,
          position: 'relative',
          height: Dimensions.get('window').height,
        }}>
        <View style={{paddingLeft: 20, paddingRight: 20}}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.setState({type: 'ch'});
            }}
            onStartShouldSetResponderCapture={() => true}>
            {this.state.type == 'ch' ? (
              <View style={[true ? styles.boxActive : styles.box]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    style={styles.img}
                    source={require('../../assets/img/my/Chinese.png')}></Image>
                  <Text>中文</Text>
                </View>

                <Image style={{width:17,height:11}} source={require('../../assets/img/my/217.png')}></Image>
              </View>
            ) : (
              <View style={styles.box}>
                <Image
                  style={styles.img}
                  source={require('../../assets/img/my/Chinese.png')}></Image>
                <Text>中文</Text>
              </View>
            )}
          </TouchableWithoutFeedback>


          <TouchableWithoutFeedback
            onPress={() => {
              this.setState({type: 'en'});
            }}
            onStartShouldSetResponderCapture={() => true}>
            {this.state.type == 'en' ? (
              <View style={[true ? styles.boxActive : styles.box]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    style={styles.img}
                    source={require('../../assets/img/my/English.png')}></Image>
                  <Text>English</Text>
                </View>

                <Image style={{width:17,height:11}} source={require('../../assets/img/my/217.png')}></Image>
              </View>
            ) : (
              <View style={styles.box}>
                <Image
                  style={styles.img}
                  source={require('../../assets/img/my/English.png')}></Image>
                <Text>English</Text>
              </View>
            )}
          </TouchableWithoutFeedback>


          <TouchableWithoutFeedback
            onPress={() => {
              this.setState({type: 'jp'});
            }}
            onStartShouldSetResponderCapture={() => true}>
            {this.state.type == 'jp' ? (
              <View style={[true ? styles.boxActive : styles.box]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    style={styles.img}
                    source={require('../../assets/img/my/Chinese.png')}></Image>
                  <Text>日本語</Text>
                </View>

                <Image style={{width:17,height:11}} source={require('../../assets/img/my/217.png')}></Image>
              </View>
            ) : (
              <View style={styles.box}>
                <Image
                  style={styles.img}
                  source={require('../../assets/img/my/Chinese.png')}></Image>
                <Text>日本語</Text>
              </View>
            )}
          </TouchableWithoutFeedback>
    
        </View>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  box: {
    width: screenWidth - 40,
    height: 53,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 16,
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  boxActive: {
    width: screenWidth - 40,
    height: 53,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#897EF8',
    borderRadius: 16,
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
});
