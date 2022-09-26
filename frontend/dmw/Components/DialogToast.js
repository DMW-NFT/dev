import { Text, StyleSheet, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import React, { Component } from 'react';
import { Dialog, Portal, Paragraph, Button } from 'react-native-paper';


export default class DialogToast extends Component {
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
            <Portal>
                <Dialog visible={visible} style={{ borderRadius: 20 }} onDismiss={() => this.close()}>
                    <Dialog.Title style={{ textAlign: this.state.textAlign }}>
                        <Text style={[{ fontSize: this.state.Size, }]}>{this.props.title}</Text>
                    </Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>
                            <Text style={{fontSize:14}}>{this.props.value}</Text>
                        </Paragraph>
                    </Dialog.Content>
                    {
                        this.props.isClose ?
                            <Dialog.Actions style={{ paddingRight: 20, paddingBottom: 20 }}>
                                <TouchableWithoutFeedback onPress={() => { this.close() }}>
                                    <Text style={{ color: '#897EF8', fontSize: 16 }}>OK</Text>

                                </TouchableWithoutFeedback>
                            </Dialog.Actions>
                            :
                            <Dialog.Actions style={{ paddingRight: 20, paddingBottom: 20 }}>
                                {this.props.children}
                            </Dialog.Actions>
                    }

                </Dialog>
            </Portal>
        );
    }

}


const styles = StyleSheet.create({
});
