import React, { useEffect, useMemo, useState } from 'react';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Button } from '@ui-kitten/components';
import Web3 from "web3";
export default function Transfer() {
    const web3 = new Web3();
    const connector = useWalletConnect();
    const [amount, setAmount] = useState('');
    const [address, setAddress] = useState('');

    console.log(connector.connected);
    // const comfirmTransfer = () => {
    //     connector.signTransaction()
    // }

    return (
        <View style={styles.container} >
            <Input
                placeholder='Place your Amount to Transfer'
                value={amount}
                onChangeText={nextValue => setAmount(nextValue)}
            />
            <Input
                placeholder='Place your Address to Transfer'
                value={address}
                onChangeText={nextValue => setAddress(nextValue)}
            />

            <Button style={styles.button} disabled={(amount && address && connector.connected) ? true : false} onPress={(amount && address) && ()} >
                confirm
            </Button>

        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    button: {
        margin: 2,
    },
});