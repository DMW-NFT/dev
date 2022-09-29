import { Text, StyleSheet, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import React, { Component } from 'react';
import { Dialog, Portal, Paragraph, Button } from 'react-native-paper';


export default class Toast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Size: Number(props.Size) || 20,
            textAlign: props.textAlign || 'left'
        };
    }
    close() {
        this.props.close();
    }

    render() {
        let { visible } = this.props;
        return (
            visible ?
                <Portal>

                    <View style={styles.box}>
                        <Text style={styles.text}>{this.props.value}</Text>
                    </View>


                </Portal>
                : null
        );
    }

}


const styles = StyleSheet.create({
    box: {
        position: 'relative',
        top: '50%',
        left: '25%'
    },
    text: {
        width: 200,
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',
        borderRadius: 20,
        color: '#fff'
    }
});
