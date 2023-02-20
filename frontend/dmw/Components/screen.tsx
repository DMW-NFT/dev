import { Text, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, Suspense } from 'react';
import { Modal } from 'react-native-paper';
import { t } from 'i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

const scale = Dimensions.get('window').scale;
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const CreateMoney = (props) => {
  // constructor(props) {
  //   super(props);
  //   state = {
  //     datalist: props.datalist,
  //   };
  // }
  const [datalist, setdatalist] = useState(props.datalist)
  const [activeBtn, setActiveBtn] = useState(props.Fndetermine || {})
  const close = () => {
    props.close();
  }

  const determine = () => {
    props.determineFn(activeBtn)
  }
  // useEffect(() => {
  //   console.log(props.Fndetermine, 'activeBtn');
  //   setActiveBtn(props.Fndetermine)
  // }, [props])

  const btnactive = (title, item) => {
    let arrs = JSON.stringify(activeBtn)
    let arr = JSON.parse(arrs)
    if (arr[title.value]) {
      if (title.multi_select && (activeBtn[title.value].indexOf(item.value) < 0)) {
        arr[title.value].push(item.value)
        setActiveBtn(arr)
      } else {
        if (arr[title.value] == item.value) {
          arr[title.value] = ''
        } else {
          arr[title.value] = item.value
        }

        setActiveBtn(arr)
      }
      // console.log(arr);
    } else {
      if (title.multi_select) {
        arr[title.value] = [item.value]
        setActiveBtn(arr)
      } else {
        arr[title.value] = item.value
        setActiveBtn(arr)
      }
      // console.log(arr);
    }
  }

  let { visible } = props;
  return (
    <SafeAreaView style={{width: "100%", zIndex: 100, height: screenHeight,position:"absolute", }}>
      {/* <View style={styles.container}></View> */}
      <Modal
        visible={visible}
        onDismiss={() => close()}
        contentContainerStyle={[styles.footer]}>
        <View style={[styles.btnline]}></View>
        <Text style={[{}, styles.modal_text]}>
          {props.title || 'select filter'}
        </Text>

        <View style={styles.modal_data}>
          {datalist.map((item, idnex) => {
            return (
              <View key={idnex}>
                <Text
                  style={[
                    styles.modal_text,
                    { textAlign: 'left', marginBottom: 20 },
                  ]}>
                  {item.title.name}
                </Text>
                <View style={styles.btn_data}>
                  {item['tabs'].map((jitem, jindex) => {
                    return (
                      <TouchableOpacity
                        key={jindex}
                        style={[
                          (activeBtn[item.title.value] && item.title.multi_select && activeBtn[item.title.value].indexOf(jitem.value) > -1) || (!item.title.multi_select && activeBtn[item.title.value] == jitem.value)
                            ? styles.btn_active
                            : styles.btn_noactive,
                        ]}
                        onPress={() =>
                          btnactive(item.title, jitem)
                        }>
                       <Text style={[styles.btn_text,activeBtn[item.title.value] == jitem.value&&styles.btn_text_active]}>{jitem.name}</Text>
                      </TouchableOpacity>

                    );
                  })}
                </View>
                <View style={styles.line}></View>
              </View>
            );
          })}
        </View>

        <TouchableOpacity style={[styles.sureMoneyBtn]} onPress={() => determine()}>

          <Text style={{
            lineHeight: 50,
            textAlign: 'center',
            color: '#fff',

            fontSize: 16,
            fontWeight: 'bold',
          }}>
            {t('确定') + ''}
          </Text>
        </TouchableOpacity>

      </Modal>
    </SafeAreaView>
  );
}

export default CreateMoney

const styles = StyleSheet.create({
  modal_data: {
    marginBottom: 20,
    zIndex: 999
  },
  btn_data: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: -15,
  },
  btn_text: {
    lineHeight: 34,
    color: '#333',
  },
  btn_text_active: {

    color: '#fff',
  },
  btn_active: {
    backgroundColor: '#ACA4FA',
    height: 34,
    paddingRight: 15,
    paddingLeft: 15,
    borderColor: '#877EF0',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 15,
    marginRight: 10,
    justifyContent:"center",
  },
  btn_noactive: {
    height: 34,
    paddingRight: 15,
    paddingLeft: 15,
    borderColor: '#877EF0',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 15,
    marginRight: 10,
    justifyContent:"center",
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
    // height:"100%",
    zIndex: 999,
    width: Dimensions.get('window').width,
    position: "absolute",
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 23,
    minWidth: '50%',
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

    marginBottom: 20,
    borderRadius: 25,
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
