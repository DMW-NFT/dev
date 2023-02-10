import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
export default class Tabcolumn extends Component {
  constructor(props) {
    super(props);
  }
  paging(typename) {
    this.props.paging(typename);
  }
  render() {
    return (
      <View>
        <View style={[styles.daohang]}>
          <Text
            style={[
              this.props.typename != 'nft'
                ? styles.daonghang_text
                : styles.daonghang_text_ative,
            ]}
            onPress={() => this.paging('nft')}>
            NFT
          </Text>
          <Text
            style={[
              this.props.typename != 'Blind'
                ? styles.daonghang_text
                : styles.daonghang_text_ative,
            ]}
            onPress={() => this.paging('Blind')}>
            Blind box
          </Text>
        </View>
      </View>
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
    
    height: 56,
    lineHeight: 56,
    flex: 1,
    textAlign: 'center',
    borderBottomColor: '#897EF8',
    borderBottomWidth: 3,
    color: '#897EF8',
    borderRadius: 1,
  },
});
