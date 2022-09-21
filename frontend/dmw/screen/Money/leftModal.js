import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
const scale = Dimensions.get('window').scale;
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

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

  render() {
    let { visible } = this.props;
    return (
      <View style={{ position: 'absolute' }}>
        <Text
          onPress={() => this.close()}
          style={[visible ? styles.black : '', { position: 'absolute' }]}></Text>

        {visible ? (
          <View style={styles.Lm_box}>
           
        
            
            <View>
              <TouchableWithoutFeedback
                onPress={() => this.cilck('MessageCenter')}
                onStartShouldSetResponderCapture={() => true}>
                {
              <View style={styles.more}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
