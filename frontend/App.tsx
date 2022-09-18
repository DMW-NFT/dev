import React, { useEffect, useMemo, useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDmwWeb3, DmwWeb3Provider } from './constans/DmwWeb3Provider';
import { DmwWeb3context } from './constans/DmwWeb3context';

import { Button } from "@ui-kitten/components";

export default function App() {


  const { connectWallet, currentWallet, currentChainId, disconnectWallet, tranferNative, mintNft } = useDmwWeb3();


  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>

      <Button onPress={() => connectWallet()} >
        Connect
      </Button>
      <Button onPress={() => disconnectWallet()} >
        Disconnect
      </Button>
      <Button onPress={() => tranferNative()} >
        SendTest
      </Button>
      <Button onPress={() => mintNft()} >
        mint
      </Button>
      {/* <Button onPress={() => connector.killSession()} >
        Disconnect
      </Button> */}
      {/* {connector.connected && (<Button onPress={() => connector.signMessage([connector.accounts[0], web3.utils.keccak256('hello')]).then((res) => {
        console.log(res)
        const messageSigner = web3.eth.accounts.recover('hello', res.v, res.r, res.s);
        console.log(messageSigner);
      }
      )} >
        {connector.accounts[0]}
      </Button>)} */}

      {/* <Text> */}
      {/* {connector.connected && connector.accounts[0]} */}
      {/* {connector.connected && connector.chainId} */}

      {/* </Text> */}
      {/* <Text>
        {connector.connected && connector.chainId}
      </Text> */}
      {/* <Text>
        {connector.connected && connector.rpcUrl}
      </Text>
      <Text>

        {web3.utils.keccak256('hello')}

      </Text> */}

      {/* <Button onPress={() => connector.signTransaction()} >
        Disconnect
      </Button> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
