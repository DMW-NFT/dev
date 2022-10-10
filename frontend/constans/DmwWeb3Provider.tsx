import React, { useEffect, useMemo, useState } from 'react';
import DmwWeb3Context from './DmwWeb3context'
import Web3 from "web3";
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import getProvider from './rpcProvicer'
import NFT1155 from '../contract/NFT1155.json'

const DmwWeb3Provider = ({ children }) => {

    const connector = useWalletConnect();

    const [currentWallet, setCurrentWallet] = useState('');
    const [currentChainId, setCurrenChainId] = useState(null);
    const [connected, setConnected] = useState(false);

    const web3 = new Web3()
    const connectWallet = () => {
        console.log('Connecting')
        connector.connect().then(() => { setConnected(true); });

        if (connector.connected) {
            console.log('connected');
            setCurrentWallet(connector.accounts[0]);
            setCurrenChainId(connector.chainId);
            console.log(currentChainId, getProvider(currentChainId));
            web3.eth.setProvider(getProvider(currentChainId));
            web3.eth.getBlockNumber().then((res => console.log(res)))
        }

    }

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

        <DmwWeb3Context.Provider value={{ connected,currentWallet, connector, connectWallet,setConnected, disconnectWallet, web3, tranferNative, mintNft }}>
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