import React, { Component, useState, useEffect } from 'react';
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
import { useTranslation } from 'react-i18next'
import { useDmwLogin } from '../../../loginProvider/constans/DmwLoginProvider';
import { useDmwApi } from '../../../DmwApiProvider/DmwApiProvider';

const screenWidth = Dimensions.get('window').width;
const scale = Dimensions.get('window').scale;
const screenHeight = Dimensions.get('window').height;

const SelectLanguage = (porps) => {
  const { setlanguage, language } = useDmwLogin()
  const { setlanguageType } = useDmwApi()
  const [type, setType] = useState(language)
  const { t, i18n } = useTranslation();
  // constructor(porps) {
  //   super(porps);
  //   state = {
  //     type: 'zh',
  //   };
  // }
  useEffect(() => {
    setType(setType)
  }, [language])

  return (
    <SafeAreaView
      style={{
        paddingTop: 38,
        position: 'relative',
        height: Dimensions.get('window').height,
        backgroundColor: '#fff'
      }}>
      <View style={{ paddingLeft: 20, paddingRight: 20 }}>
        <TouchableWithoutFeedback
          onPress={() => {
            setType('zh')
            i18n.changeLanguage('zh')
            setlanguage('zh')
            setlanguageType('zh')
          }}
        >
          {type == 'zh' ? (
            <View style={[true ? styles.boxActive : styles.box]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  style={styles.img}
                  source={require('../../assets/img/my/Chinese.png')}></Image>
                <Text>{t("中文")}</Text>
              </View>

              <Image style={{ width: 17, height: 11 }} source={require('../../assets/img/my/217.png')}></Image>
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
              setType('en')
              i18n.changeLanguage('en')
            setlanguage('en')
            setlanguageType('en')
            }}
           >
            {type == 'en' ? (
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
            setType('jp')
            i18n.changeLanguage('jp')
            setlanguage('jp')
            setlanguageType('jp')
          }}
        >
          {type == 'jp' ? (
            <View style={[true ? styles.boxActive : styles.box]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  style={styles.img}
                  source={require('../../assets/img/my/jpan.jpeg')}></Image>
                <Text>日本語</Text>
              </View>

              <Image style={{ width: 17, height: 11 }} source={require('../../assets/img/my/217.png')}></Image>
            </View>
          ) : (
            <View style={styles.box}>
              <Image
                style={styles.img}
                source={require('../../assets/img/my/jpan.jpeg')}></Image>
              <Text>日本語</Text>
            </View>
          )}
        </TouchableWithoutFeedback>

      </View>

    </SafeAreaView>
  );
}

export default SelectLanguage

const styles = StyleSheet.create({
  img: {
    width: 24,
    height: 24,
    marginRight: 12,
    borderWidth: 1,
    borderRadius: 12
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
