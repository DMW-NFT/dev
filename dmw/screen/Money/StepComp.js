import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'

export default class StepComp extends Component {
    state = {
        type: 1,
    }
    componentDidMount() {
        this.setState({
            type: this.props.type
        })
    }
    render() {
        return (
            <View>
                <View style={[styles.topLineBox, { marginBottom: 5 }]}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.boxnum, styles.textTop, { color: this.state.type >= 1 ? '#897EF8' : "#999" }, { borderColor: this.state.type >= 1 ? '#897EF8' : "#999" }]}>1</Text>
                        <Text style={[styles.textTop, { color: this.state.type >= 1 ? '#897EF8' : "#999" }]}> — — — — — — — — —  </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.boxnum, styles.textTop, { color: this.state.type >= 2 ? '#897EF8' : "#999" }, { borderColor: this.state.type >= 2 ? '#897EF8' : "#999" }]}>2</Text>
                        <Text style={[styles.textTop, { color: this.state.type >= 2 ? '#897EF8' : "#999" }]}> — — — — — — — — —  </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.boxnum, { color: this.state.type >= 3 ? '#897EF8' : "#999" }, { borderColor: this.state.type >= 3 ? '#897EF8' : "#999" }]}>3</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                    <View style={[styles.topLineBox, { width: '90%', justifyContent: 'space-between', marginBottom: 20 }]}>
                        <Text style={[styles.textTop, { color: this.state.type >= 1 ? '#897EF8' : "#999" }]}>创建支付密码</Text>
                        <Text style={[styles.textTop, { color: this.state.type >= 2 ? '#897EF8' : "#999" }]}>保护钱包安全</Text>
                        <Text style={[styles.textTop, { color: this.state.type >= 3 ? '#897EF8' : "#999" }]}>确认助记词</Text>
                    </View>
                </View>
            </View>
             
        )
    }
}

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