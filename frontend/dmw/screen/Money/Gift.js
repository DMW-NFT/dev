import { Text, StyleSheet, View, Dimensions, SafeAreaView, Image, TouchableWithoutFeedback, TextInput } from 'react-native';
import React, { Component } from 'react';
import { Modal } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
const scale = Dimensions.get('window').scale;
const screenWidth = Dimensions.get('window').width;

export default class Gift extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            Blockchainval: ''
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
            <SafeAreaView style={[{ position: 'relative', backgroundColor: '#fff', flex: 1, paddingTop: 30, paddingRight: 20, paddingLeft: 20 }]}>
                <View style={{}}>
                    <View style={{ paddingLeft: 15, marginBottom: 10 }}>
                        <Text style={{ fontSize: 12, fontWeight: '700' }}>来自</Text>
                    </View>
                    <TouchableWithoutFeedback onPress={() => this.open()}>
                        <View style={styles.userlist}>
                            <Image style={{ width: 40, height: 40, borderRadius: 20 }} source={require('../../assets/img/my/any2.jpg')}></Image>
                            <View style={{ flex: 1, marginLeft: 10 }}>
                                <Text>Account 1</Text>
                                <Text>余额：999.99 USDT</Text>
                            </View>
                            <FontAwesomeIcon
                                icon={faCaretDown}
                                color="#707070"
                                size={17}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>



                <View style={{ paddingLeft: 15, marginBottom: 10 }}>
                        <Text style={{ fontSize: 12, fontWeight: '700' }}>发送到</Text>
                    </View>
                <TextInput
                    multiline={true}
                    textAlignVertical="top"
                    numberOfLines={5}
                    placeholder='输入地址'
                    keyboardType="decimal"
                    style={[styles.textarea]}
                    onChangeText={e => this.setState({ Blockchainval: e })}
                    value={this.state.Blockchainval}
                />


                <View style={styles.container}></View>
                <Modal
                    visible={this.state.visible}
                    onDismiss={() => this.close()}
                    contentContainerStyle={[styles.footer]}>
                    <View style={[styles.btnline]}></View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}><View style={styles.copy}>
                        <Text sty={{ fontSize: 12 }}>0xD652fw…G673C7C4</Text>
                        <Text style={styles.CopyBtn}>复制</Text>
                    </View></View>
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>复制地址以接收付款</Text>
                </Modal>

                {
                 !this.state.visible ?   <Text style={styles.btn}>发送</Text> : null
                }
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({

    userlist: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#CCCCCC', borderRadius: 10,
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center'
    },

    textarea: {
        paddingTop: 10,
        // borderColor: 'gray', 
        borderWidth: 1,
        borderColor: "#ccc",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 9
    },

    btn: {
        width: screenWidth - 40,
        backgroundColor: '#897EF8',
        color: '#fff',
        height: 50,
        lineHeight: 50,
        textAlign: 'center',
        marginRight: 20,
        marginLeft: 20,
        borderRadius: 50,
        position: 'absolute',
        bottom: 14

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
        // paddingBottom: 48,
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
