import React, {Component,useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import { useTranslation } from 'react-i18next'
const Tabcolumn = (props) => {
  // constructor(props) {
  //   super(props);
  // }

  const { t, i18n } = useTranslation();
const  paging = (typename) => {
    props.paging(typename);
  }
    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={[styles.daohang]}>
          <Text
            style={[
              props.typename == '我的藏品'
                ? styles.daonghang_text_ative
                : styles.daonghang_text,
            ]}
            onPress={() => paging('我的藏品')}>
            {t("我的藏品")}
          </Text>
          <Text
            style={[
              props.typename == '我创建的'
                ? styles.daonghang_text_ative
                : styles.daonghang_text,
            ]}
            onPress={() => paging('我创建的')}>
            {t("我创建的")}
          </Text>
          {/* <Text
            style={[
              props.typename == '事件'
                ? styles.daonghang_text_ative
                : styles.daonghang_text,
            ]}
            onPress={() => paging('事件')}>
           {t("事件")} 
          </Text> */}
          <Text
            style={[
              props.typename == '我喜欢的'
                ? styles.daonghang_text_ative
                : styles.daonghang_text,
            ]}
            onPress={() => paging('我喜欢的')}>
           {t("我喜欢的")} 
          </Text>
        </View>
      </ScrollView>
    );
}

export default Tabcolumn

const styles = StyleSheet.create({
  daohang: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight:-20,
    marginLeft:-20
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
