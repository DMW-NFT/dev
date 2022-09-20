import { Text, StyleSheet, View, SafeAreaView, Image, } from 'react-native'
import React, { Component } from 'react'

import StepComp from './StepComp'

export default class ImportWord extends Component {
    state = {
        data: [{ id: 1, name: "what" }, { id: 2, name: "what" }, { id: 3, name: "what" }, { id: 4, name: "what" },
        { id: 5, name: "what" }, { id: 6, name: "what" }, { id: 7, name: "what" }, { id: 8, name: "what" }, { id: 9, name: "what" }, { id: 10, name: "what" }, { id: 11, name: "what" }, { id: 12, name: "what" }
        ],
    }
    render() {
        return (
            <SafeAreaView>
                <View style={[styles.container]}>
                    <StepComp type={3} />  
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={[styles.Image]} source={require('../../assets/img/money/CompleteBackup.png')}></Image>
                        <Text style={[styles.topInfo]}>恭喜</Text>
                        <Text style={[styles.topInfo1]}>您已成功保护自己的钱包。记住妥善保管您的
                            助记词，这是您的责任！ </Text>
                        <Text style={[styles.topInfo1, { marginTop: 20, }]}>如果您丢失助记词，DMW无法找回您的钱包。
                            您可在“设置”-“助记词”中找到助记词。</Text>
                    </View>

                    <Text style={[styles.import]} onPress={() => { this.props.navigation.navigate('determineWord') }} >完成</Text>
                </View>


            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({

    Image: {
        width: 150,
        height: 150,


    },

    topInfo: {
        textAlign: 'center',
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
        marginBottom: 20 / 2,
    },
    topInfo1: {
        width: "75%",
        textAlign: 'center',
        color: '#333333',
        fontSize: 12,
        lineHeight: 18,

    },
    import: {
        marginTop: 60,
        width: "100%",
        backgroundColor: "#897EF8",
        height: 50,
        lineHeight: 50,
        textAlign: 'center',
        color: "#fff",
        borderRadius: 25,
        fontSize: 16,
        fontWeight: 'bold',
    },



    container: {
        padding: 20,
    }
})