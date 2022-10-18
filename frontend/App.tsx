import React, { useEffect, useMemo, useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDmwWeb3 } from './DmwWeb3/DmwWeb3Provider';
import { useDmwWallet } from './DmwWallet/DmwWalletProvider';
import { Button, Input, IndexPath, Layout, Select, SelectItem } from "@ui-kitten/components";
import Web3 from 'web3';
import { Wallet } from 'ethers';


export default function App() {

  const [nftList, setNftList] = useState([])
  const { connectWallet, currentWallet, connected, currentChainId, checkIsApproveForAll, disconnectWallet, tranferNative, getWalletNfts, mintNft, mintNftWithSignature,buyNFT } = useDmwWeb3();
  const { addWalletToAccountStorage, currentDmwWallet, getWalletListFromAccountStorage, setDmwChainId, dmwWalletList, setcurrentDmwWallet, dmwChainId, dmwTransferNavtie,dmwMintWithSignature } = useDmwWallet()
  const [privateKey, setPrivateKey] = useState('')
  const [connect, setConnect] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const [selectedChainInIndex, setSelectedChainInIndex] = useState(new IndexPath(1));
  const chainIdMapIndex = [1, 5]

  const confirmToTransfer = async (secretKey: string) => {
    const walletList = await getWalletListFromAccountStorage(secretKey)
    const privateKey = walletList.walletDict[currentDmwWallet]
    // console.log(privateKey.privateKey);
    await dmwTransferNavtie(privateKey.privateKey)
  }

  const confirmMintWithSignature = async (secretKey: string) => {
    const walletList = await getWalletListFromAccountStorage(secretKey)
    const privateKey = walletList.walletDict[currentDmwWallet]
    // console.log(privateKey.privateKey);
    await dmwMintWithSignature(privateKey.privateKey)
  }


  useEffect(() => {
    currentWallet && getWalletNfts().then((res) => {
      setNftList(res.ownedNfts)
      console.log(typeof (res.ownedNfts))
      console.log(res.ownedNfts)
    })
  }, [currentWallet, connected])

  useEffect(() => {
    setDmwChainId(5);
  }, [])

  useEffect(() => {
    // console.log(selectedIndex)
    setcurrentDmwWallet(dmwWalletList[selectedIndex.row])
  }, [selectedIndex])
  useEffect(() => {
    // console.log(selectedIndex)
    setDmwChainId(chainIdMapIndex[selectedChainInIndex.row])
  }, [selectedChainInIndex])

  useEffect(()=>{
    checkIsApproveForAll('0x0ba15eE8874b930c49c7E65fFdEDf41BE9D0847d','0xe403e8011cdb251c12ccf6911f44d160699ccc3c','0x94bA21689AccF38EAcE5Ef53e1f64F63fB38C3a4','721')
  })



  return (
    <View style={styles.container}>
      <Text>{currentWallet}</Text>
      <Button onPress={() => connectWallet()} >
        Connect
      </Button>
      <Button onPress={() => disconnectWallet()} >
        Disconnect
      </Button>
      <View style={styles.importBox}>
        <Input
          style={{ flex: 3 }}
          placeholder='input private key'
          value={privateKey}
          onChangeText={nextValue => setPrivateKey(nextValue)
          }
        />
        <Button style={{ flex: 1 }} onPress={() => addWalletToAccountStorage(privateKey, '123456')} >
          import
        </Button>
      </View>
      <View style={{
        flexDirection: "row",
        flexWrap: "wrap",
      }}>
        <Select
          style={{ flex: 4 }}
          selectedIndex={selectedIndex}
          value={currentDmwWallet}
          onSelect={index => setSelectedIndex(index)}>
          {dmwWalletList.map((wallet) => (
            <SelectItem title={wallet} />
          ))}
        </Select>

        <Select
          style={{ flex: 2 }}
          selectedIndex={selectedChainInIndex}
          value={dmwChainId}
          onSelect={index => setSelectedChainInIndex(index)}>
          <SelectItem title='Ethereum' />
          <SelectItem title='Goerli' />
        </Select>
      </View>
      <View>
        <Button  onPress={() => confirmToTransfer('123456')} >
          transferNative
        </Button>
        <Button onPress={() => tranferNative()} >
        SendTest
      </Button>
      <Button onPress={() => confirmMintWithSignature('123456')} >
        mintWithSignature
      </Button>
      <Button onPress={() => buyNFT('28','0xe403E8011CdB251c12ccF6911F44D160699CCC3c',2,'0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee','0.0002')} >
        buynow
      </Button>
      </View>





      {/* <Button onPress={() => connectWallet()} >
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

      <Button onPress={() => getWalletNfts()} >
        getWalletNfts
      </Button>
      <>
        {connected && nftList.map(item => (
          <>
            <Text>
              {item.id.tokenId}
              <Button onPress={() => checkIsApproveForAll(item.contract.address, currentWallet, "0x94bA21689AccF38EAcE5Ef53e1f64F63fB38C3a4")} >
                list
              </Button>
            </Text>

          </>


        ))}
      </> */}


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
  importBox: {
    flexDirection: "row",
    flexWrap: "wrap",
  }

});
