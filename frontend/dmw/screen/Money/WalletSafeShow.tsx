import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import React, { useEffect, useContext, useState } from "react";
import { useDmwWallet } from "../../../DmwWallet/DmwWalletProvider";
import StepComp from "./StepComp";
import { ScrollView } from "react-native-gesture-handler";

const WalletSafeShow = (props) => {
  const { t, i18n } = useTranslation();
  const { loadMnemonicFromStorage } = useDmwWallet();
  const [MnemonicList, SetMnemonicList] = useState([]);
  const [password, setpassword] = useState(props.route.params.password);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadMnemonicFromStorage(password).then((resp) => {
      let arr = resp.split(" ");
      SetMnemonicList(arr);
    });
    return () => {
      SetMnemonicList([]);
    };
  }, []);
  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <ScrollView>
        <View style={[styles.container]}>
          <StepComp type={2} />
          <View>
            <Text style={[styles.topInfo]}> {t("保护您的钱包安全")}</Text>
            <Text style={[styles.topInfo1]}>
              {t(
                "这是您的助记词，将它写在纸上并存放在安全的地方。您将需要在下一步中重新输入此助记词（按顺序）"
              )}
            </Text>
          </View>
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
          <TouchableOpacity style={[styles.import]}
            onPress={() => {
              props.navigation.navigate("determineWord", { password });
            }} >
            <Text
              style={{
                lineHeight: 50,
                textAlign: "center",
                color: "#fff",

                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {t("继续")}
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default WalletSafeShow;

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

    borderRadius: 25,
  },

  container: {
    padding: 20,
  },
});
