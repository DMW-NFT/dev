import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import React, { useEffect, useContext, useState } from "react";
import { useDmwWallet } from "../../../DmwWallet/DmwWalletProvider";
import StepComp from "./StepComp";

const ViewMnemonics = (props) => {
  const { loadMnemonicFromStorage } = useDmwWallet();
  const [MnemonicList, SetMnemonicList] = useState([]);
  // const [password, setpassword] = useState(props.route.params.password);

  useEffect(() => {
    loadMnemonicFromStorage(props.route.params.password).then((resp) => {
      console.log(resp,'助记词');
      
      let arr = resp.split(" ");
      SetMnemonicList(arr);
    });
    return () => {
      SetMnemonicList([]);
    };
  }, []);
  return (
      <SafeAreaView style={{ backgroundColor: "#fff" ,flex:1}}>
        <View style={[styles.container]}>
          <View style={[styles.blackBox]}>
            {MnemonicList.map((item, index) => {
              return (
                <Text
                  style={{
                    fontSize: 12,
                    color: "#333",
                    width: "50%",
                    textAlign: "left",
                    marginBottom: 20,
                  }}
                >
                  {index + 1} {item}
                </Text>
              );
            })}
          </View>
        </View>
      </SafeAreaView>
  );
};
export default ViewMnemonics;

const styles = StyleSheet.create({
  blackBox: {
    padding: 15,
    paddingLeft: 80,
    paddingRight: 50,
    flexDirection: "row",
    // justifyContent:"space-between",
    flexWrap: "wrap",
    width: "100%",
    height: 496 / 2,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 10,
    justifyContent: "space-around",
    alignItems: "center",
  },

  topInfo: {
    textAlign: "center",
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    marginBottom: 20 / 2,
  },
  topInfo1: {
    textAlign: "center",
    color: "#333333",
    fontSize: 12,
  },
  import: {
    marginTop: 60,
    width: "100%",
    backgroundColor: "#897EF8",
    height: 50,
    lineHeight: 50,
    textAlign: "center",
    color: "#fff",
    borderRadius: 25,
    fontSize: 16,
    fontWeight: "bold",
  },

  container: {
    padding: 20,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'space-around'
  },
});
