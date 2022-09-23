import { Text, StyleSheet, View, SafeAreaView, ScrollView, Image, FlatList, TouchableWithoutFeedback } from 'react-native'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Routers from "./routers";
import StackNavigator from "./StackNavigator";
const mapStateToProps = state => {
    return {
        isLogin: state.Login.isLogin
    }
}
class RouterIndex extends Component {
    render() {
        return (
            <>
                {
                    this.props.isLogin ? <Routers /> : <StackNavigator />
                }

            </>
        )
    }
}
export default connect(mapStateToProps)(RouterIndex)