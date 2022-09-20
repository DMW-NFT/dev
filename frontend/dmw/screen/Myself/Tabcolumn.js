import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
export default class Tabcolumn extends Component {
  constructor(props) {
    super(props);
  }
  paging(typename) {
    this.props.paging(typename);
  }
  render() {
    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={[styles.daohang]}>
          <Text
            style={[
              this.props.typename == '我的藏品'
                ? styles.daonghang_text_ative
                : styles.daonghang_text,
            ]}
            onPress={() => this.paging('我的藏品')}>
            我的藏品
          </Text>
          <Text
            style={[
              this.props.typename == '我创建的'
                ? styles.daonghang_text_ative
                : styles.daonghang_text,
            ]}
            onPress={() => this.paging('我创建的')}>
            我创建的
          </Text>
          <Text
            style={[
              this.props.typename == '事件'
                ? styles.daonghang_text_ative
                : styles.daonghang_text,
            ]}
            onPress={() => this.paging('事件')}>
            事件
          </Text>
          <Text
            style={[
              this.props.typename == '我喜欢的'
                ? styles.daonghang_text_ative
                : styles.daonghang_text,
            ]}
            onPress={() => this.paging('我喜欢的')}>
            我喜欢的
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  daohang: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'pink',
  },
  daonghang_text: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Source Han Sans CN',
    height: 56,
    lineHeight: 56,
    color: '#666666',
    textAlign: 'center',
    paddingLeft: 25,
    paddingRight: 25,
    // borderBottomColor:'#897EF8',
    // borderBottomWidth:3
  },
  daonghang_text_ative: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Source Han Sans CN',
    height: 56,
    lineHeight: 56,
    textAlign: 'center',
    borderBottomColor: '#897EF8',
    borderBottomWidth: 3,
    color: '#897EF8',
    borderRadius: 1,
    paddingLeft: 25,
    paddingRight: 25,
  },
});
