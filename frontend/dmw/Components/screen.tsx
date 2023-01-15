import { Text, StyleSheet, View, Dimensions } from 'react-native';
import React, { useState, useEffect, Suspense } from 'react';
import { Modal } from 'react-native-paper';

const scale = Dimensions.get('window').scale;
const screenWidth = Dimensions.get('window').width;

const CreateMoney = (props) => {
  // constructor(props) {
  //   super(props);
  //   state = {
  //     datalist: props.datalist,
  //   };
  // }
  const [datalist, setdatalist] = useState(props.datalist)
  const [activeBtn, setActiveBtn] = useState({})
  const close = () => {
    props.close();
  }

  const determine = () => {
    props.determineFn(activeBtn)
  }
  useEffect(() => {
    // console.log(12);
  }, [activeBtn])

  const btnactive = (title, item) => {
    let arrs = JSON.stringify(activeBtn)
    let arr = JSON.parse(arrs)
    if (arr[title.value]) {
      if (title.multi_select && (activeBtn[title.value].indexOf(item.value) < 0)) {
        arr[title.value].push(item.value)
        setActiveBtn(arr)
      } else {
        arr[title.value] = item.value
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
    <View style={[{ position: 'absolute', width: "100%" ,zIndex:100,bottom:0,height:"100%"}]}>
      <View style={styles.container}></View>
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
                      <Text
                        key={jindex}
                        style={[
                          (activeBtn[item.title.value] && item.title.multi_select && activeBtn[item.title.value].indexOf(jitem.value) > -1) || (!item.title.multi_select && activeBtn[item.title.value] == jitem.value)
                            ? styles.btn_active
                            : styles.btn_noactive,
                        ]}
                        onPress={() =>
                          btnactive(item.title, jitem)
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

        <Text style={[styles.sureMoneyBtn]} onPress={() => determine()}>
          确定
        </Text>
      </Modal>
    </View>
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
    // paddingBottom: 48,
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
    marginBottom: 20,
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
