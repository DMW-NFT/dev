import React, { useEffect, useMemo, useState } from 'react';
import DmwWeb3Context from './DmwWeb3context'
import Web3 from "web3";
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import getProvider from '../../frontend/constans/rpcProvicer'
import NFT1155 from '../contract/NFT1155.json'


const DmwWeb3Provider = ({ children }) => {
    // const mnemonic = bip39.generateMnemonic()

    const connector = useWalletConnect();
    // ethersProvider.getBlockNumber().then((res => console.log('ether')))
    const [currentWallet, setCurrentWallet] = useState('');
    const [currentChainId, setCurrenChainId] = useState(null);
    const [connected, setConnected] = useState(false);

    const web3 = new Web3()
      // 链接第三方钱包
    //   const connectWallet = async () => {
    //     console.log('Connecting')
    //   return  
    //     //.then((res) => { setConnected(true);
    //     // return res }).catch(error => {
    //     //   // Error returned when rejected
    //     //   return error
    //     };
    
        // if (connector.connected) {
        //   console.log(connector.accounts[0], 'is connected');
        //   setCurrentWallet(connector.accounts[0]);
        //   setCurrenChainId(connector.chainId);
        //   console.log(currentChainId, getProvider(currentChainId));
        //   web3.eth.setProvider(getProvider(currentChainId));
        //   web3.eth.getBlockNumber().then((res => console.log(res)))
 // }
    
// }

    const disconnectWallet = () => {
        console.log('disonnecting');
        connector.killSession();
        setConnected(false);

        if (!connector.connected) {
            console.log('disconnected');
            // setCurrentWallet(connector.accounts[0]);
            // setCurrenChainId(connector.chainId);
        }
    }

    const tranferNative = () => {

        const tx = {
            from: currentWallet, // Required
            to: "0x1b56FC073b1f1929A3aB01b4FC26848afAc702Da", // Required (for non contract deployments)
            value: web3.utils.toWei('0.1', 'ether'), // Optional

        };

        connector
            .sendTransaction(tx)
            .then(result => {
                // Returns transaction id (hash)
                console.log(result);
            })
            .catch(error => {
                // Error returned when rejected
                console.error(error);
            });

    }

    const mintNft = () => {
        const contractAddress = "0x15Ca27efa25886b830269f614ad2Af473905d09c"

        const contract = new web3.eth.Contract(NFT1155, contractAddress)

        const rawdata = contract.methods.mint(currentWallet, 100, [], "  https://ipfs.moralis.io:2053/ipfs/QmZJxFn8kTwb8HcpHyoNPq1jsDSE2pEqG848FGhtFGU5ES").encodeABI()
        console.log(rawdata);
        const tx = {
            from: currentWallet, // Required
            to: contractAddress, // Required (for non contract deployments)
            data: rawdata, // Required
            // gasPrice: "0x02540be400", // Optional
            // gasLimit: "0x9c40", // Optional
            // value: "0x00", // Optional
            // nonce: "0x0114", // Optional
        };

        // Send transaction
        connector
            .sendTransaction(tx)
            .then(result => {
                // Returns transaction id (hash)
                console.log(result);
            })
            .catch(error => {
                // Error returned when rejected
                console.error(error);
            });
    }
    const mintNftWithSignature = () => {
        const contractAddress = "0x0ba15eE8874b930c49c7E65fFdEDf41BE9D0847d"

        const contract = new web3.eth.Contract(NFT1155, contractAddress)

        const rawdata = contract.methods.mintWithSignature(['0xA7eCf6E1a3CD608016dDb385Dddb64ED6487d6AE', '0x0000000000000000000000000000000000000000', 0, '0x0000000000000000000000000000000000000000', '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', 'https://gateway.ipfscdn.io/ipfs/QmZJ2uN4bM81FTbLzGNHzXeXSSdEF9dJGmvi48V5cWXETd/0', 10, '10000000000000000', '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', 1663839063, 88063839063, '0x3731353764393666393837383433343439313961376162376163366637663363'], '0x7c4bf99dd8f4a3f0b11254add0b70cfdfc359037b67bca56940e4048cc98ed9e2da553608acb277dac61cee8cd520d539805b91f92b51037d4b73cc5ab78cc221b').encodeABI()
        console.log(rawdata);
        const tx = {
            from: currentWallet, // Required
            to: contractAddress, // Required (for non contract deployments)
            data: rawdata, // Required
            // gasPrice: "0x02540be400", // Optional
            // gasLimit: "0x9c40", // Optional
            value: web3.utils.toWei('0.1', 'ether'), // Optional
            // nonce: "0x0114", // Optional
        };

        // Send transaction
        connector
            .sendTransaction(tx)
            .then(result => {
                // Returns transaction id (hash)
                console.log(result);
            })
            .catch(error => {
                // Error returned when rejected
                console.error(error);
            });
    }

    const getWalletNfts = () => {
        console.log(currentWallet)
        return fetch(`https://eth-goerli.g.alchemy.com/nft/v2/S8xDLVufmTFUnjHYkZDOW5NkQtQG8q8J/getNFTs?owner=${currentWallet}&pageSize=10&withMetadata=false`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then((response) => response.json())
            .then((json) => {
                // console.log(json)
                // for (let index = 0; index < json.ownedNfts.length; index++) {
                    // const element = json.ownedNfts[index];
                    // console.log(element)
                    
                // }
                return json;
            })
            .catch((error) => {
                console.error(error);
            });

    }

    const checkIsApproveForAll = (nftContract,account,operator)=> {
        web3.eth.setProvider(getProvider(currentChainId));
        const contract = new web3.eth.Contract(NFT1155, nftContract)
        
        contract.methods.isApprovedForAll(account,operator).call().then((res) => {
            console.log(res)
            res?console.log(nftContract,'is approved to ',operator):console.log(nftContract,'is not approved to ',operator)
        })

    }





    useEffect(() => {
        // connector.on('disconnect', connectWallet);
        if (connector.connected) {
            console.log('connected');
            setCurrentWallet(connector.accounts[0]);
            setCurrenChainId(connector.chainId);
            console.log(currentChainId, getProvider(currentChainId));
            web3.eth.setProvider(getProvider(currentChainId));
            web3.eth.getBlockNumber().then((res => console.log(res)))
        }

    }, [currentChainId, connected])


    return (

        <DmwWeb3Context.Provider value={{setConnected,connector, currentWallet, connected, disconnectWallet, web3, tranferNative, mintNft, mintNftWithSignature,getWalletNfts,checkIsApproveForAll }}>
            {children}
        </DmwWeb3Context.Provider>
    )
}

function useDmwWeb3() {
    const context = React.useContext(DmwWeb3Context);
    if (context === undefined) {
        throw new Error('useDmwWeb3 must be used within a DmwWeb3Provider');
    }
    return context;
}


export { DmwWeb3Provider, useDmwWeb3 } 