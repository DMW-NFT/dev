import { Text, StyleSheet, View, Dimensions } from 'react-native';
import React, { Component } from 'react';
import { Modal } from 'react-native-paper';

const scale = Dimensions.get('window').scale;
const screenWidth = Dimensions.get('window').width;

export default class CreateMoney extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    close() {
        this.props.close();
    }

    render() {
        let { visible } = this.props;
        return (
            <View style={[this.props.style, { position: 'absolute' }]}>
                <View style={styles.container}></View>
                <Modal
                    visible={visible}
                    onDismiss={() => this.close()}
                    contentContainerStyle={[styles.footer]}>
                    <View style={[styles.btnline]}></View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}><View style={styles.copy}>
                        <Text sty={{ fontSize: 12 }}>0xD652fw…G673C7C4</Text>
                        <Text style={styles.CopyBtn}>复制</Text>
                    </View></View>
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>复制地址以接收付款</Text>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    CopyBtn: {
        paddingLeft: 15, paddingRight: 15,
        backgroundColor:'#897EF8',
        paddingTop:10,paddingBottom:10,
        borderRadius:20,
        color:'#fff',
        marginLeft:20
    },
    copy: {
        paddingLeft: 20,
        paddingRight: 20,
        height: 50,
        backgroundColor: '#F5F5F5',
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnline: {
        position: 'absolute',
        width: 40,
        height: 6,
        backgroundColor: '#E0E0E0',
        top: 6,
        borderRadius: 50,
        left: '50%',
    },
    footer: {
        height: 428 / 2,
        zIndex: 999,
        width: Dimensions.get('window').width,
        position: 'absolute',
        bottom: 0,
        zIndex: 10,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        // paddingTop: 23,
        paddingBottom: 48,
    },
    createMoneyBtn: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#897EF8',
        height: 50,
        lineHeight: 50,
        textAlign: 'center',
        color: '#897EF8',
        borderRadius: 25,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    sureMoneyBtn: {
        backgroundColor: '#897EF8',
        width: '100%',
        borderWidth: 1,
        borderColor: '#897EF8',
        height: 50,
        lineHeight: 50,
        textAlign: 'center',
        color: '#fff',
        borderRadius: 25,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 100,
    },
    container: {
        height: Dimensions.get('window').height,
        padding: 70 / 2,
        paddingTop: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        top: 0,
    },
    modal_text: {
        fontSize: 16,
        fontWeight: '700',
        fontFamily: 'Source Han Sans CN',
        textAlign: 'center',
        marginBottom: 30,
    },
    line: {
        borderColor: '#CCCCCC',
        width: screenWidth - 40,
        height: 1,
        borderWidth: 1 / scale,
        marginBottom: 20,
    },
});
