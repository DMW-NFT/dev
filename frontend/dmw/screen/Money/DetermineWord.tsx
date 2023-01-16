import { Text, StyleSheet, View, SafeAreaView } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import StepComp from "./StepComp";
import { useDmwWallet } from "../../../DmwWallet/DmwWalletProvider";
import { useDmwApi } from "../../../DmwApiProvider/DmwApiProvider";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native-gesture-handler";
const DetermineWord = (props) => {
  const { t, i18n } = useTranslation();
  const [checkdata, setCheckdata] = useState([]);
  const {
    loadMnemonicFromStorage,
    addWalletToAccountStorage,
    loadWalletFromMnemonic,
    dmwWalletList,
  } = useDmwWallet();
  const [MnemonicList, SetMnemonicList] = useState([]);
  const [MnemonicListdata, SetMnemonicListdata] = useState("");
  const [Mnemonic, SetMnemonic] = useState("");
  const [password, setpassword] = useState(props.route.params.password);
  const [loading, setLoading] = useState(false);
  const { Toast } = useDmwApi();
  const shuffle = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;
      [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    }
    return arr;
  };

  useEffect(() => {
    loadMnemonicFromStorage(password).then((resp) => {
      let arr = resp.split(" ");
      SetMnemonicListdata(arr.join());
      SetMnemonicList(shuffle(arr));
      SetMnemonic(resp);
    });
    return () => {
      SetMnemonicList([]);
    };
  }, []);
  const checkList = (item) => {
    var arr = checkdata;
    let index = checkdata.indexOf(item);
    if (arr.includes(item)) {
      arr.splice(index, 1);
      setCheckdata([...arr]);
    } else {
      setCheckdata([...checkdata, item]);
    }
  };

  const Complete = () => {
    setLoading(true);
    if (MnemonicListdata == checkdata.join()) {
      let res = loadWalletFromMnemonic(Mnemonic);
      console.log(res.privateKey, "钱包地址");
      addWalletToAccountStorage(res.privateKey, password).then((res) => {
        props.navigation.navigate("completeBackup");
      });
    } else {
      Toast(t("助记词不正确"));
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <View style={[styles.container]}>
        <StepComp type={3} />
        <View>
          <Text style={[styles.topInfo]}>{t("确认助记词")}</Text>
          <Text style={[styles.topInfo1, { marginBottom: 20 }]}>
            {t("按照之前按呈现的顺序选择每个字词")}
          </Text>
        </View>
        <View style={[styles.blackBox]}>
          {checkdata.map((item, index) => {
            return <Text style={[styles.checkdata]}>{item}</Text>;
          })}
        </View>
        <View style={[styles.Box]}>
          {MnemonicList.map((item, index) => {
            return (
              <Text
                style={[
                  styles.lis,
                  checkdata.includes(item) ? styles.active : null,
                ]}
                onPress={() => {
                  checkList(item);
                }}
              >
                {item}
              </Text>
            );
          })}
        </View>
        {!loading ? (
          <TouchableOpacity
            style={[styles.import, { justifyContent: "center" }]}
            onPress={() => Complete()}
          >
            <Text
              style={{
                textAlign: "center",
                alignSelf: "center",
                color: "white",
                fontSize: 20,
              }}
            >
              {t("完成备份")}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.import, { justifyContent: "center" }]}
            // onPress={() => Complete()}
          >
            <Text
              style={{
                textAlign: "center",
                alignSelf: "center",
                color: "white",
                fontSize: 20,
              }}
            >
              {t("loading...")}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DetermineWord;

const styles = StyleSheet.create({
  active: {
    backgroundColor: "#ccc",
    borderColor: "#ccc",
    color: "#333",
  },
  lis: {
    width: 200 / 2,
    height: 54 / 2,
    lineHeight: 54 / 2,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#897EF8",
    borderRadius: 54 / 2,
    marginBottom: 10,
  },
  Box: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  checkdata: {
    color: "#333",
    fontSize: 12,
    marginBottom: 20,
    // marginLeft:40
    width: "25%",
  },

  blackBox: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    height: 140,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 10,
    paddingLeft: 40,
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
  },
});
