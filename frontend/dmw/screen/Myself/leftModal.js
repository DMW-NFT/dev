import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux'
import { LoginFailed } from '../../redux/actions/Login';
const scale = Dimensions.get('window').scale;
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const mapStateToProps = state => {
  return {
    isLogin: state.Login.isLogin
  }
}
export default class Lmodal extends Component {
  constructor(props) {
    super(props);
  }
  close() {
    this.props.close();
  }
  cilck(path) {
    this.props.goto(path);
  }
  logout() {
    this.props.LoginFailed()
  }

  render() {
    let { visible } = this.props;
    return (
      <View style={{ position: 'absolute' }}>
        <Text
          onPress={() => this.close()}
          style={[visible ? styles.black : '', { position: 'absolute' }]}></Text>

        {visible ? (
          <View style={styles.Lm_box}>
            <Text style={styles.title}>常用功能</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 44,
              }}>
              <TouchableWithoutFeedback onPress={() => { this.props.goto('auctionOrder') }}>
                <View style={{ flexDirection: 'column' }} >
                  <Image
                    style={{ width: 96 / 2, height: 96 / 2 }}
                    source={require('../../assets/img/my/3422.png')}></Image>
                  <Text style={styles.img_bottom_text} >拍卖订单</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => { this.props.goto('sellOrder') }}>
                <View style={{ flexDirection: 'column' }} >
                  <Image
                    style={{ width: 96 / 2, height: 96 / 2 }}
                    source={require('../../assets/img/my/3338.png')}></Image>
                  <Text style={styles.img_bottom_text}>售卖订单</Text>
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={() => { this.props.goto('myCollection') }}>
                <View style={{ flexDirection: 'column' }}>
                  <Image
                    style={{ width: 96 / 2, height: 96 / 2 }}
                    source={require('../../assets/img/my/3337.png')}></Image>
                  <Text style={styles.img_bottom_text}>合集</Text>
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback
                onPress={() => this.cilck('CreateCollection')}
                onStartShouldSetResponderCapture={() => true}>
                {
                  <View style={{ flexDirection: 'column' }}>
                    <Image
                      style={{ width: 96 / 2, height: 96 / 2 }}
                      source={require('../../assets/img/my/3336.png')}></Image>
                    <Text style={styles.img_bottom_text}>创建</Text>
                  </View>
                }
              </TouchableWithoutFeedback>
            </View>
            <Text style={styles.title}>更多功能</Text>
            <View>

              <TouchableWithoutFeedback
                onPress={() => this.cilck('TransferredIntoCollection')}
                onStartShouldSetResponderCapture={() => true}>
                {
                  <View style={styles.more}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image
                        style={styles.moreimg}
                        source={require('../../assets/img/my/b3.png')}></Image>
                      <Text style={styles.more_text}>转入藏品</Text>
                    </View>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      color="#707070"
                      size={16}
                    />
                  </View>
                }
              </TouchableWithoutFeedback>


              <TouchableWithoutFeedback
                onPress={() => this.cilck('MessageCenter')}
                onStartShouldSetResponderCapture={() => true}>
                {
                  <View style={styles.more}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image
                        style={styles.moreimg}
                        source={require('../../assets/img/my/b1.png')}></Image>
                      <Text style={styles.more_text}>消息中心</Text>
                    </View>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      color="#707070"
                      size={16}
                    />
                  </View>
                }
              </TouchableWithoutFeedback>

              <View style={styles.more}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    style={styles.moreimg}
                    source={require('../../assets/img/my/b5.png')}></Image>
                  <Text style={styles.more_text}>新闻资讯</Text>
                </View>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  color="#707070"
                  size={16}
                />
              </View>

              <View style={styles.more}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    style={styles.moreimg}
                    source={require('../../assets/img/my/b2.png')}></Image>
                  <Text style={styles.more_text}>帮助</Text>
                </View>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  color="#707070"
                  size={16}
                />
              </View>


              <TouchableWithoutFeedback
                onPress={() => this.logout()}
                onStartShouldSetResponderCapture={() => true}>
                {
                  <View style={styles.more}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image
                        style={styles.moreimg}
                        source={require('../../assets/img/my/b4.png')}></Image>
                      <Text style={styles.more_text}>退出</Text>
                    </View>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      color="#707070"
                      size={16}
                    />
                  </View>
                }
              </TouchableWithoutFeedback>
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}



const styles = StyleSheet.create({
  black: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 9,
  },
  Lm_box: {
    zIndex: 10,
    width: screenWidth - 60,
    height: screenHeight,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Source Han Sans CN',
    fontWeight: '700',
    marginBottom: 20,
  },
  img_bottom_text: {
    fontSize: 12,
    textAlign: 'center',
  },
  moreimg: {
    width: 45,
    height: 45,
    marginRight: 10,
  },
  more: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  more_text: {
    fontSize: 14,
    fontWeight: '500',
  },
});
