import React, { useEffect, useMemo, useState } from 'react';
import DmwWalletContext from './DmwWalletContext'
import Web3 from 'web3';
import { useDmwWeb3 } from '../DmwWeb3/DmwWeb3Provider';
import { generateMnemonic, entropyToMnemonic, mnemonicToEntropy } from 'bip39'
import { ethers, Wallet } from "ethers";
import CryptoJS from 'crypto-js'
import AsyncStorage from '@react-native-async-storage/async-storage';
const DmwWalletProvider = ({ children }) => {

    const web3 = new Web3()

    const createWallet = async (secretKey) => {

        // const wallet = web3.eth.accounts.create()
        // console.log(wallet.privateKey)
        // const mnemonic = generateMnemonic()
        const mnemonic = "survey caught snap typical veteran area mutual stay wide invite fresh climb"
        var ciphertext = CryptoJS.AES.encrypt(
            mnemonic
            ,
            secretKey
        );
        try {
            await AsyncStorage.setItem('@dmw_mnemonic_storage', ciphertext.toString())
        } catch (e) {
            // saving error
        }


    }


    const loadMnemonicFromStorage = async (secretKey) => {

        try {
            const mnemonic_encoded = await AsyncStorage.getItem('@dmw_mnemonic_storage')
            if (mnemonic_encoded !== null) {
                // value previously stored
                var bytes = CryptoJS.AES.decrypt(mnemonic_encoded.toString(),
                    secretKey
                );
                var mnemonic = bytes.toString(CryptoJS.enc.Utf8);

                return mnemonic
            }
        } catch (e) {
            console.log("not mnemonic from local storage!!!")
            // error reading value
        }
    }

    const loadWalletFromMnemonic = (mnemonic, wallet_index = 0) => {
        let wallet_hdpath = "m/44'/60'/0'/0/";
        const hdwallet = ethers.utils.HDNode.fromMnemonic(mnemonic)
        return hdwallet.derivePath(wallet_hdpath + wallet_index)
    }

    const addWalletToAccountStorage = async (wallet,privateKey) => {
        
    }

    const getWalletListFromAccountStorage = async (secretKey) => {
        try {
            const WalletList_encoded = await AsyncStorage.getItem('@dmw_wallet_list_storage')
            if (WalletList_encoded !== null) {
                // value previously stored
                var bytes = CryptoJS.AES.decrypt(WalletList_encoded.toString(),
                    secretKey
                );
                var WalletList = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

                return WalletList
            }
        } catch (e) {
            console.log("not mnemonic from local storage!!!")
            // error reading value
        }
    }

    useEffect(() => {
        createWallet('123456');
        loadMnemonicFromStorage('123456').then((mnemonic) => {
            console.log(mnemonic)
            // return mnemonic
            const wallet = loadWalletFromMnemonic(mnemonic,0)
            console.log(wallet.privateKey,wallet.address)
    
        })
        
        
    }, [])



    return (

        <DmwWalletContext.Provider value={null}>
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

export { DmwWalletProvider, useDmwWallet }