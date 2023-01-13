import { StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import DataScreen from '../screen/Data/Data'


import CollectionDetails from "../screen/Other/CollectionDetails";
import { useTranslation } from 'react-i18next'
const Stack = createStackNavigator()
const Data = () => {
  const { t, i18n } = useTranslation();
  return (
    <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen
        component={DataScreen}
        name='dataScreen'
        options={{
          title: "stats"
        }}
      >
      </Stack.Screen>

      <Stack.Screen
        component={CollectionDetails}
        name="CollectionDetails"
        options={{
          headerTitle: t("合集"),
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  )
}
export default Data
const styles = StyleSheet.create({})