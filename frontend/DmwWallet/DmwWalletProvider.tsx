import React, { useEffect, useMemo, useState } from 'react';
import DmwWalletContext from './DmwWalletContext'
import Web3 from 'web3';
import { useDmwWeb3 } from '../DmwWeb3/DmwWeb3Provider';
import {generateMnemonic,entropyToMnemonic} from 'bip39'
import { ethers } from "ethers";
const DmwWalletProvider = ({ children }) => {

    const web3 = new Web3()
    const createWallet = () => {
        let wallet_hdpath = "m/44'/60'/0'/0/";
        // const wallet = web3.eth.accounts.create()
        // console.log(wallet.privateKey)
        // const mnemonic = generateMnemonic()
        const mnemonic = "tilt divert wall rival diary ask suspect patch release elevator pluck rely"
        console.log(mnemonic)
        const hdwallet = ethers.utils.HDNode.fromMnemonic(mnemonic)
        console.log(hdwallet.derivePath(wallet_hdpath + 6).address)
        console.log(hdwallet.derivePath(wallet_hdpath + 6).privateKey)
        // web3.eth.accounts.create()
        
    }
    createWallet()


    return (

        <DmwWalletContext.Provider value = {null}>
            {children}
        </DmwWalletContext.Provider>

    )
}

const useDmwWallet = () => {
    const context = React.useContext(DmwWalletContext);
    if (context === undefined) {
        throw new Error('useDmwWallet must be used within a DmwWalletProvider');
    }
    return context;
}

export {DmwWalletProvider,useDmwWallet}