import { StyleSheet } from "react-native";
import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import JiaoyiScreen from "../screen/Jiaoyi/Jiaoyi";
import QuotationDetails from "../screen/Other/QuotationDetails";
const Stack = createStackNavigator();
export default class Home extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
        <Stack.Screen
          component={JiaoyiScreen}
          name="jiaoyi"
          options={{
            headerMode: "none",
          }}
        ></Stack.Screen>
        <Stack.Screen
          component={QuotationDetails}
          name="QuotationDetails"
          options={{
            title: "",
          }}
        ></Stack.Screen>
      </Stack.Navigator>
    );
  }
}

const styles = StyleSheet.create({});
