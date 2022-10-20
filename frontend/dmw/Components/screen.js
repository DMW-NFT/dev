import {Text, StyleSheet, View, Dimensions} from 'react-native';
import React, {Component} from 'react';
import {Modal} from 'react-native-paper';

const scale = Dimensions.get('window').scale;
const screenWidth = Dimensions.get('window').width;

export default class CreateMoney extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datalist: props.datalist,
    };
  }
  close() {
    this.props.close();
    let data = this.state.datalist;
    data.map(item => {
      item['list'].map(jitem => {
        jitem.active = false;
      });
    });
    this.setState({
      datalist: data,
    });
  }
  btnactive(typename, id) {
    let data = this.state.datalist;
    data.map(item => {
      if (item['typename'] == typename) {
        item['list'].map(jitem => {
          if (jitem.id == id) {
            jitem.active = true;
          } else {
            jitem.active = false;
          }
        });
      }
    });
    this.setState({
      datalist: data,
    });
  }
  render() {
    let {visible} = this.props;
    return (
      <View style={[this.props.style,{position:'absolute',width:"100%"}]}>
        <View style={styles.container}></View>
        <Modal 
          visible={visible}
          onDismiss={() => this.close()}
          contentContainerStyle={[styles.footer]}>
          <View style={[styles.btnline]}></View>
          <Text style={[{}, styles.modal_text]}>
            {this.props.title || 'select filter'}
          </Text>

          <View style={styles.modal_data}>
            {this.state.datalist.map(item => {
              return (
                <View key={item.name}>
                  <Text
                    style={[
                      styles.modal_text,
                      {textAlign: 'left', marginBottom: 20},
                    ]}>
                    {item.typename}
                  </Text>
                  <View style={styles.btn_data}>
                    {item['list'].map(jitem => {
                      return (
                        <Text
                          style={[
                            jitem.active
                              ? styles.btn_active
                              : styles.btn_noactive,
                          ]}
                          onPress={() =>
                            this.btnactive(item.typename, jitem.id)
                          }>
                          {jitem.name}
                        </Text>
                      );
                    })}
                  </View>
                  <View style={styles.line}></View>
                </View>
              );
            })}
          </View>

          <Text style={[styles.sureMoneyBtn]} onPress={() => this.close()}>
            确定
          </Text>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modal_data: {
    marginBottom: 20,
    zIndex:999
  },
  btn_data: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: -15,
  },
  btn_active: {
    color: '#fff',
    backgroundColor: '#ACA4FA',
    height: 34,
    paddingRight: 15,
    paddingLeft: 15,
    borderColor: '#877EF0',
    borderWidth: 1,
    lineHeight: 34,
    borderRadius: 20,
    marginBottom: 15,
    marginRight: 10,
  },
  btn_noactive: {
    height: 34,
    paddingRight: 15,
    paddingLeft: 15,
    borderColor: '#877EF0',
    borderWidth: 1,
    lineHeight: 34,
    borderRadius: 20,
    marginBottom: 15,
    marginRight: 10,
    color: '#333',
  },
  btnline: {
    position: 'absolute',
    width: 40,
    height: 6,
    backgroundColor: '#E0E0E0',
    top: 6,
    borderRadius: 50,
    left: '50%',
  },
  footer: {
    zIndex: 999,
    width: Dimensions.get('window').width,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 23,
    paddingBottom: 48,
  },
  createMoneyBtn: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#897EF8',
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
    color: '#897EF8',
    borderRadius: 25,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  sureMoneyBtn: {
    backgroundColor: '#897EF8',
    width: '100%',
    borderWidth: 1,
    borderColor: '#897EF8',
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
    color: '#fff',
    borderRadius: 25,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 100,
  },
  container: {
    height: Dimensions.get('window').height,
    padding: 70 / 2,
    paddingTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    top: 0,
  },
  modal_text: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Source Han Sans CN',
    textAlign: 'center',
    marginBottom: 30,
  },
  line: {
    borderColor: '#CCCCCC',
    width: screenWidth - 40,
    height: 1,
    borderWidth: 1 / scale,
    marginBottom: 20,
  },
});
