import { Text, StyleSheet, View } from 'react-native'
import React, { Component,useState } from 'react'
import { useTranslation } from 'react-i18next'
const StepComp = (props) => {
    const { t, i18n } = useTranslation();
    const [type,settype] = useState(1)
   const componentDidMount = () => {
     settype(props.type)
    }

        return (
            <View>
                <View style={[styles.topLineBox, { marginBottom: 5 }]}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.boxnum, styles.textTop, { color: type >= 1 ? '#897EF8' : "#999" }, { borderColor: type >= 1 ? '#897EF8' : "#999" }]}>1</Text>
                        <Text style={[styles.textTop, { color: type >= 1 ? '#897EF8' : "#999" }]}> — — — — — — — — —  </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.boxnum, styles.textTop, { color: type > 2 || type == 2 ? '#897EF8' : "#999" }, { borderColor: type >= 2 ? '#897EF8' : "#999" }]}>2</Text>
                        <Text style={[styles.textTop, { color: type >= 2 ? '#897EF8' : "#999" }]}> — — — — — — — — —  </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.boxnum, { color: type >= 3 ? '#897EF8' : "#999" }, { borderColor: type >= 3 ? '#897EF8' : "#999" }]}>3</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                    <View style={[styles.topLineBox, { width: '90%', justifyContent: 'space-between', marginBottom: 20 }]}>
                        <Text style={[styles.textTop, { color: type >= 1 ? '#897EF8' : "#999" }]}>{t("确认密码")}</Text>
                        <Text style={[styles.textTop, { color: type >= 2 ? '#897EF8' : "#999" }]}>{t("保护钱包安全")}</Text>
                        <Text style={[styles.textTop, { color: type >= 3 ? '#897EF8' : "#999" }]}>{t("确认助记词")}</Text>
                    </View>
                </View>
            </View>
             
        )

}

export default StepComp

const styles = StyleSheet.create({
    textTop: {
        fontSize: 10,
    },
    topLineBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'

    },
    boxnum: {
        textAlign: 'center',
        width: 20,
        height: 20,
        lineHeight: 20,
        borderRadius: 10,
        borderColor: "#999",
        borderWidth: 1,
        fontSize: 10,
        color: "#999"
    },


})