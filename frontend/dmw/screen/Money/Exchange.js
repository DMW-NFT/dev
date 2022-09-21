import { Text, StyleSheet, View, Dimensions, SafeAreaView, Image, TouchableWithoutFeedback } from 'react-native';
import React, { Component } from 'react';
import { Modal } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
const scale = Dimensions.get('window').scale;
const screenWidth = Dimensions.get('window').width;

export default class Exchange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }
    close() {
        this.setState({
            visible: false
        })
    }
    open() {
        this.setState({
            visible: true
        })
    }

    render() {
        let { visible } = this.state;
        return (
            <SafeAreaView style={[this.props.style, { position: 'relative', backgroundColor: '#fff', flex: 1, paddingTop: 30 }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                    <TouchableWithoutFeedback onPress={()=>this.open()}>
                        <View style={styles.EthsStyle}>
                            <Image style={styles.Ethimg} source={require('../../assets/img/money/duihuan1.png')}></Image>
                            <Text style={{ marginLeft: 15, marginRight: 22, fontSize: 12, fontWeight: '500' }}>ETH</Text>
                            <FontAwesomeIcon
                                icon={faCaretDown}
                                color="#707070"
                                size={17}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <View style={{ marginBottom: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: '800', textAlign: 'center' }}>0</Text>
                </View>

                <View style={{ marginBottom: 20 }}>
                    <Text style={{ fontSize: 12, fontWeight: '500', textAlign: 'center' }}>2.89 eth可供交换</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                    <Text style={styles.underline}></Text>
                    <Image style={{ width: 15, height: 15, marginLeft: 15, marginRight: 15 }} source={require('../../assets/img/money/duanhaun2.png')}></Image>
                    <Text style={styles.underline}></Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={styles.EthsStyle}>
                        {/* <Image style={styles.Ethimg} source={require('../../assets/img/money/duihuan1.png')}></Image> */}
                        <Text style={{ marginLeft: 15, marginRight: 22, fontSize: 12, fontWeight: '500' }}>选择代币</Text>
                        <FontAwesomeIcon
                            icon={faCaretDown}
                            color="#707070"
                            size={17}
                        />
                    </View>
                </View>


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

                <Text style={styles.btn}>保存更改</Text>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({

    btn: {
        width:screenWidth - 40 ,
        backgroundColor:'#897EF8',
        color:'#fff',
        height:50,
        lineHeight:50,
        textAlign:'center',
        marginRight:20,
        marginLeft:20,
        borderRadius:50,
        position:'absolute',
        bottom:14
    
      },
    Ethimg: {
        width: 15,
        height: 24
    },
    EthsStyle: {
        height: 40,
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 20

    },
    CopyBtn: {
        paddingLeft: 15, paddingRight: 15,
        backgroundColor: '#897EF8',
        paddingTop: 10, paddingBottom: 10,
        borderRadius: 20,
        color: '#fff',
        marginLeft: 20
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
    underline: {
        flex: 1,
        width: screenWidth - 40,
        height: 15,
        borderBottomWidth: 1 / scale,
        marginBottom: 20,
        borderBottomColor: '#CCCCCC'
    },
});
