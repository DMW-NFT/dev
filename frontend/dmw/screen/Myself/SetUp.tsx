import React, { Component, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { StyleSheet, View, Text, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { Switch } from 'react-native-paper';
import { useTranslation } from 'react-i18next'
import { useDmwLogin } from '../../../loginProvider/constans/DmwLoginProvider';

const SetUp = (props) => {
  const { t, i18n } = useTranslation();
  const { language } = useDmwLogin()
  const [Switchshow, setSwitchshow] = useState(false)

  return (
    <SafeAreaView style={{ paddingLeft: 20, paddingRight: 20, backgroundColor: '#fff' }}>
      <View style={[{ padding: 20 }, styles.box]}>
        <Text style={styles.title}>{t("账户")}</Text>
        <TouchableWithoutFeedback onPress={() => { props.navigation.navigate('ModifyInfo') }}>
          <View style={[styles.list, { marginBottom: 31 }]}>
            <Text style={styles.textname}>{t("修改个人信息")}</Text>
            <FontAwesomeIcon icon={faChevronRight} color='#707070' size={16} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => { props.navigation.navigate('BlockchainQuery') }}>
          <View style={styles.list}>
            <Text style={styles.textname} >{t("区块链信息查询")}</Text>
            <FontAwesomeIcon icon={faChevronRight} color='#707070' size={16} />
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={[{ padding: 20 }, styles.box]}>
        <Text style={styles.title}>{t("设备")}</Text>
        <TouchableWithoutFeedback onPress={() => { props.navigation.navigate('SelectLanguage') }}>
          <View style={[styles.list, { marginBottom: 31 }]}>
            <Text style={styles.textname} >{t("选择语言")}</Text>
            <View style={{ flexDirection: 'row' }}><Text style={styles.language}>{language == 'zh' ? "中文" :(language == 'jp' ? "日本語" : 'English') }</Text><FontAwesomeIcon icon={faChevronRight} color='#707070' size={16} /></View>
          </View>
        </TouchableWithoutFeedback>

        {/* <View style={styles.list}>
          <Text style={styles.textname}>{t("面容登陆")}</Text>
          <Switch color='#897EF8' value={Switchshow} onValueChange={() => { setSwitchshow(!Switchshow) }} />
        </View> */}
      </View>


      <View style={[{ padding: 20 }, styles.box]}>
        <Text style={styles.title}>{t("关于&支持")}</Text>
        <TouchableWithoutFeedback onPress={()=>{props.navigation.navigate('ContactUs')}} >
          <View style={[styles.list, { marginBottom: 31 }]}>
            <Text style={styles.textname}>{t("联系我们")}</Text>
            <FontAwesomeIcon icon={faChevronRight} color='#707070' size={16} />
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={()=>{props.navigation.navigate('WebViewModal',{type:'userAgreement',language:language})}}>
          <View style={[styles.list, { marginBottom: 31 }]}>
            <Text style={styles.textname}>{t("常见问题解答")}</Text>
            <FontAwesomeIcon icon={faChevronRight} color='#707070' size={16} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>{props.navigation.navigate('WebViewModal',{type:'userAgreement',language:language})}}>
          <View style={[styles.list, { marginBottom: 31 }]}>
            <Text style={styles.textname}>{t("服务条款")}</Text>
            <FontAwesomeIcon icon={faChevronRight} color='#707070' size={16} />
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback  onPress={()=>{props.navigation.navigate('WebViewModal',{type:'privacyPolicy',language:language})}}>
          <View style={[styles.list, { marginBottom: 31 }]}>
            <Text style={styles.textname}>{t("隐私政策") }</Text>
            <FontAwesomeIcon icon={faChevronRight} color='#707070' size={16} />
          </View>
        </TouchableWithoutFeedback>
      </View>


    </SafeAreaView>
  );
}


export default SetUp

const styles = StyleSheet.create({
  box: { marginBottom: 20 },
  title: {
    marginBottom: 16,
    fontWeight: '700'
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center"

  },
  textname: {
    fontSize: 14,
    fontFamily: 'Source Han Sans CN',
    color: '#666666',
    flex: 1
  },
  language: {
    fontSize: 12,
    color: '#999999',
    fontFamily: 'Source Han Sans CN',
    alignItems: 'center',
    marginRight: 5
  }
})