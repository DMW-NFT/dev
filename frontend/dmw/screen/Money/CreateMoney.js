import { Text, StyleSheet, View, SafeAreaView, Image, Dimensions } from 'react-native'
import React, { Component } from 'react'
// import * as Animatable from 'react-native-animatable'
import { Modal } from 'react-native-paper';
export default class CreateMoney extends Component {
    state = {
        visible: false,
    }
    navigate(val){
        this.props.navigation.navigate(val)
        this.setState({
            visible:false,
        })
    }
    render() {
        let { visible } = this.state
        return (
            <SafeAreaView style={{backgroundColor:'#fff'}}>
                <View style={[styles.container]}>
                    <Text style={[styles.title]}>Connect with Wallet</Text>
                    <View style={[styles.imgBox]}>
                        <Image style={[styles.Image]} source={require('../../assets/img/money/78.png')}></Image>
                        <Image style={[styles.Image]} source={require('../../assets/img/money/79.png')}></Image>
                        <Image style={[styles.Image]} source={require('../../assets/img/money/80.png')}></Image>
                        <Image style={[styles.Image]} source={require('../../assets/img/money/81.png')}></Image>
                        <Image style={[styles.Image]} source={require('../../assets/img/money/82.png')}></Image>
                        <Image style={[styles.Image]} source={require('../../assets/img/money/83.png')}></Image>
                    </View>
                    <Text style={[styles.createMoneyBtn]} onPress={() => { this.setState({ visible: true }) }}>创建新钱包</Text>

                    {/* <Animatable.View animation="fadeInUpBig" style={[styles.footer]}>
                        </Animatable.View> */}

                </View>
                <Modal visible={visible} onDismiss={() => { this.setState({ visible: false }) }} contentContainerStyle={[styles.footer]}>
                    <View style={[styles.btnline]}></View>
                    <Text style={[styles.createMoneyBtn]} onPress={() => {  this.navigate('createWord') }}>暂无助记词，去新建</Text>
                    <Text style={[styles.createMoneyBtn]} onPress={() => { this.navigate("importWord")}}>已有助记词，去导入</Text>
                </Modal>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    btnline: {
        position: 'absolute',
        width: 40,
        height: 6,
        backgroundColor:'#E0E0E0',
        top:6,
        borderRadius:50,
        left:'50%'
    },
    footer: {
        zIndex: 999,
        width: Dimensions.get('window').width,
        height: '40%',
        position: 'absolute',
        bottom: 0,
        zIndex: 10,
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
    },
    createMoneyBtn: {
        width: "100%",
        borderWidth: 1,
        borderColor: '#897EF8',
        height: 50,
        lineHeight: 50,
        textAlign: 'center',
        color: "#897EF8",
        borderRadius: 25,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    Image: {
        width: '47%',
        height: 250 / 2,
    },
    imgBox: {
        flexDirection: "row",
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    title: {
        textAlign: 'center',
        fontWeight: "bold",
        color: '#0F172C',
        fontSize: 20,
    },
    container: {
        height: Dimensions.get('window').height,
        padding: 70 / 2,
        paddingTop: 10,
        paddingBottom: 130,
        justifyContent: "space-between",
        alignItems: "center"
    }
})