import { ScrollView } from "react-native-gesture-handler";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Linking,
  Clipboard,
} from "react-native";
import { SocialIcon, SocialIconProps, Icon } from "@rneui/themed";
import { useTranslation } from "react-i18next";

const ContactUs = () => {
  const { t, i18n } = useTranslation();
  const contactInfo = {
    email: "dev@wfca.io",
    mobile: "+86 ",
    discord: "https://discord.gg/ZJPPgcc4dq",
    youtuber: "https://www.youtube.com/",
    twitter: "https://twitter.com/DMW_offical",
  };

  const callSupportAgent = () => {
    Linking.openURL("tel:" + contactInfo.mobile).catch((error) =>
      console.log("tel error", error)
    );
  };

  const openLinkUrl = (url: string) => {
    Linking.openURL(url).catch((error) =>
      console.log("open link url error", error)
    );
  };
  const openEmail = () => {
    Linking.openURL("mailto:" + contactInfo.email).catch((error) =>
      console.log("open email error", error)
    );
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            margin: 20,

            height: 500,
            backgroundColor: "white",

            borderRadius: 15,
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              callSupportAgent();
            }}
          >
            <View
              style={{
                height: 100,
                backgroundColor: "white",
                borderTopStartRadius: 15,
                borderTopEndRadius: 15,
                borderBottomColor: "#F5F1F0",
                borderBottomWidth: 4,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Icon
                name="support-agent"
                type="material"
                size={30}
                reverse={true}
                color={"green"}
              />
              <View style={{ flexDirection: "column", marginStart: 20 }}>
                <Text style={{ marginBottom: 10, color: "gray", fontSize: 20 }}>
                  24H {t("在线客服")}
                </Text>
                <Text
                  style={{ marginBottom: 10, color: "green", fontSize: 20 }}
                >
                  {contactInfo.mobile}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              openEmail();
            }}
          >
            <View
              style={{
                height: 100,
                backgroundColor: "white",
                borderBottomColor: "#F5F1F0",
                borderBottomWidth: 4,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Icon
                name="mail"
                type="material"
                size={30}
                reverse={true}
                color={"blue"}
              />
              <View style={{ flexDirection: "column", marginStart: 20 }}>
                <Text style={{ marginBottom: 10, color: "gray", fontSize: 20 }}>
                  {t("联系邮箱")}
                </Text>
                <Text style={{ marginBottom: 10, color: "blue", fontSize: 20 }}>
                  {contactInfo.email}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              openLinkUrl(contactInfo.twitter);
            }}
          >
            <View
              style={{
                height: 100,
                backgroundColor: "white",
                borderBottomColor: "#F5F1F0",
                borderBottomWidth: 4,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Icon
                name="twitter"
                type="antdesign"
                size={30}
                reverse={true}
                color={"#1d9bf0"}
              />
              <View style={{ flexDirection: "column", marginStart: 20 }}>
                <Text style={{ marginBottom: 10, color: "gray", fontSize: 20 }}>
                  {t("Twitter")}
                </Text>
                <Text
                  style={{ marginBottom: 10, color: "#1d9bf0", fontSize: 15 }}
                >
                  {contactInfo.twitter}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              openLinkUrl(contactInfo.discord);
            }}
          >
            <View
              style={{
                height: 100,
                backgroundColor: "white",
                borderBottomColor: "#F5F1F0",
                borderBottomWidth: 4,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Icon
                name="discord"
                type="font-awesome-5"
                size={30}
                reverse={true}
                color={"#2962ff"}
              />
              <View style={{ flexDirection: "column", marginStart: 20 }}>
                <Text style={{ marginBottom: 10, color: "gray", fontSize: 20 }}>
                  {t("Discord")}
                </Text>
                <Text
                  style={{ marginBottom: 10, color: "#2962ff", fontSize: 15 }}
                >
                  {contactInfo.discord}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              openLinkUrl(contactInfo.youtuber);
            }}
          >
            <View
              style={{
                height: 100,
                backgroundColor: "white",
                borderBottomStartRadius: 15,
                borderBottomEndRadius: 15,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Icon
                name="youtube"
                type="font-awesome-5"
                size={30}
                reverse={true}
                color={"red"}
              />
              <View style={{ flexDirection: "column", marginStart: 20 }}>
                <Text style={{ marginBottom: 10, color: "gray", fontSize: 20 }}>
                  {t("Youtube")}
                </Text>
                <Text style={{ marginBottom: 10, color: "red", fontSize: 15 }}>
                  {contactInfo.youtuber}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {};

export default ContactUs;
