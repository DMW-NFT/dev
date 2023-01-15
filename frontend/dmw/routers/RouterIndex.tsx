import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import React, { Component, useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import Routers from "./routers";
import StackNavigator from "./StackNavigator";
import { Dialog, Portal, Paragraph, Button } from "react-native-paper";
import { useDmwLogin } from "../../loginProvider/constans/DmwLoginProvider";
import { useDmwApi } from "../../DmwApiProvider/DmwApiProvider";

// async function FN() {
//     let a = await api.GetStorage()
//     initState['isLogin'] = a ? true : false
//     console.log(initState['isLogin']);
// }

const RouterIndex = (props) => {
  const { isLogin, setIsLogin, login, logOut } = useDmwLogin();
  const { show, toastVal } = useDmwApi();

  return (
    <View style={styles.body}>
      {isLogin ? <Routers /> : <StackNavigator />}
      {show && (toastVal.toString().toLowerCase().includes("error") ? (
        <Portal>
          <View style={styles.box}>
            <Text style={styles.errText}>
              {toastVal.toString()}
            </Text>
          </View>
        </Portal>
      ) : (
        <Portal>
          <View style={styles.box}>
            <Text style={styles.text}>
              {toastVal.toString()}
            </Text>
          </View>
        </Portal>
      ))}
    </View>
  );
};
// class RouterIndex extends Component {

//     const [a,setA] = useState()
//     useEffect ( () => {
//         setMaxListeners(api.ge)
//     },[])
//     render() {
//         return (
//             <>
//                 {
//                     this.props.isLogin ? <Routers /> : <StackNavigator />
//                 }

//             </>
//         )
//     }
// }
export default RouterIndex;

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  box: {
    position: "relative",
    top: "40%",
    left: "25%",
  },
  text: {
    width: 200,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: "center",
    borderRadius: 20,
    color: "#fff",
  },
  errText: {
    width: 200,
    backgroundColor: "rgba(255,0,0,0.5)",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: "center",
    borderRadius: 20,
    color: "#fff",
  },
});
