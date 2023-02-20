import React, { Component, useRef, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Touchable } from 'react-native';
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native-gesture-handler';
const Tabcolumn = (props) => {
  // constructor(props) {
  //   super(props);
  // }
  const scrollViewRef = useRef<ScrollView>(null);
  const { t, i18n } = useTranslation();
  const paging = (typename) => {
    props.paging(typename);
  }
  return (
    <ScrollView ref={scrollViewRef} horizontal={true} showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 50 }}>
      <View style={[styles.daohang]}>

        <TouchableOpacity style={[styles.tab, props.typename == '我的藏品' && styles.tab_active

        ]} onPress={() => paging('我的藏品')}>
          <Text style={[styles.text, props.typename == '我的藏品' && styles.text_active]}>
            {t("我的藏品")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, props.typename == '我创建的' && styles.tab_active

        ]} onPress={() => {
          scrollViewRef.current?.scrollTo({x: 200});
          paging('我创建的')}}>
          <Text style={[styles.text, props.typename == '我创建的' && styles.text_active]}>
            {t("我创建的")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, props.typename == '我喜欢的' && styles.tab_active

        ]} onPress={() => paging('我喜欢的')}>
          <Text style={[styles.text, props.typename == '我喜欢的' && styles.text_active]}>
            {t("我喜欢的")}
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

export default Tabcolumn

const styles = StyleSheet.create({
  daohang: {
    height: 56,
    // width:300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'pink',
    marginRight:70
  },

  text: {
    lineHeight: 56,
    color: '#666666',
    textAlign: 'center',
  },
  text_active: {
    color: '#897EF8',
  },
  tab: {
    paddingHorizontal: 25,
    height: 56,
  },
  tab_active: {
    borderBottomColor: '#897EF8',
    borderBottomWidth: 3,
  },

});
