import React, { useEffect, useMemo, useState } from 'react';
import DmwWalletContext from './DmwWalletContext'
import Web3 from 'web3';
import { useDmwWeb3 } from '../DmwWeb3/DmwWeb3Provider';
import { generateMnemonic, entropyToMnemonic, mnemonicToEntropy } from 'bip39'
import { ethers, Wallet } from "ethers";
import CryptoJS from 'crypto-js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { promises } from 'dns';
import { time } from 'console';
import getProvider from '../../frontend/constans/rpcProvicer'
const DmwWalletProvider = ({ children }) => {

    const [dmwWalletList, setDmwWalletList] = useState([])
    const [currentDmwWallet, setcurrentDmwWallet] = useState('')
    const [dmwChainId, setDmwChainId] = useState()

    const web3 = new Web3()

    const verifySecretKey = (secretKey: string, verifyKey: string, storageKey: string) => {
        var ciphertext = CryptoJS.AES.encrypt(
            storageKey
            ,
            secretKey
        ).toString();
        return ciphertext
    }

    // 创建新的助记忆词，需要传入用户的支付密码，助记词将会用AES加密后储存到AsyncStorage的@dmw_mnemonic_storage中。
    const newMnemonic = async (secretKey, reset = false) => {

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

            if (!await AsyncStorage.getItem('@dmw_mnemonic_storage') || reset) {
                await AsyncStorage.setItem('@dmw_mnemonic_storage', ciphertext.toString())
                return { "result": true, "reset": reset, "error": "" }
            } else {
                throw '@dmw_mnemonic_storage is not valid'
            }
        } catch (e) {
            // saving error
            console.log(e)
            // throw '@dmw_mnemonic_storage is not valid!'
        }


    }

    // 从AsyncStorage中读取助记词
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
            console.log("no mnemonic from local storage!!!")
            // error reading value
        }
    }

    // 从助记词中恢复或创建钱包地址，wallet_index 为钱包的序号，每次新增或者向后恢复wallet_index需要自增1
    const loadWalletFromMnemonic = (mnemonic, wallet_index = 0) => {
        let wallet_hdpath = "m/44'/60'/0'/0/";
        const hdwallet = ethers.utils.HDNode.fromMnemonic(mnemonic)
        return hdwallet.derivePath(wallet_hdpath + wallet_index)
    }

    // 向本地存储中添加新的钱包私钥。
    const addWalletToAccountStorage = async (privateKey: string, secretKey: string) => {
        console.log("privateKey input: ", privateKey)
        const newWallet = web3.eth.accounts.privateKeyToAccount(privateKey)
        let currentWalletList = await getWalletListFromAccountStorage(secretKey)

        if (!currentWalletList.walletIndex.includes(newWallet.address)) {
            console.log("new wallet import: ", newWallet.address)
            currentWalletList.walletIndex.push(newWallet.address)
            currentWalletList.walletDict[newWallet.address] = { "addedTime": new Date().getTime(), "privateKey": newWallet.privateKey }

            try {
                console.log("new wallet to add:", currentWalletList)
                var ciphertext = CryptoJS.AES.encrypt(
                    JSON.stringify(currentWalletList.walletDict)
                    ,
                    secretKey
                ).toString();
                currentWalletList.walletDict = ciphertext;
                await AsyncStorage.setItem('@dmw_wallet_list_storage', JSON.stringify(currentWalletList)).then(() => {
                    getWalletListFromAccountStorage(secretKey).then((wallet) => {
                        setDmwWalletList(wallet.walletIndex)
                    })
                })

            } catch (e) {
                console.log("error on add wallet to storage", e)
                // saving error
            }
        }
    }
    // 从本地存储中获取钱包列表
    const getWalletListFromAccountStorage = async (secretKey: string): Promise<{ walletIndex: [string], walletDict: {}, verifyKey: string }> => {
        try {
            console.log("getting wallet list form storage");

            const WalletList_encoded = await AsyncStorage.getItem('@dmw_wallet_list_storage')
            console.log(WalletList_encoded);
            if (WalletList_encoded !== null) {

                const WalletList = JSON.parse(WalletList_encoded)

                if (WalletList['walletIndex'].length > 0) {

                    var bytes = CryptoJS.AES.decrypt(WalletList.walletDict.toString(),
                        secretKey
                    );
                    var walletDict = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                    WalletList.walletDict = walletDict


                }
                return WalletList
            } else {
                console.log("not wallet list from local storage,start to init")
                // const verifyKey = CryptoJS.AES.encrypt("@dmw_wallet_list_storage", secretKey).toString();
                const WalletList = {
                    walletIndex: [],
                    walletDict: {
                    },
                }
                try {
                    await AsyncStorage.setItem('@dmw_wallet_list_storage', JSON.stringify(WalletList))
                    // return WalletList
                } catch (e) {
                    // saving error
                }



            }
        } catch (e) {
            console.log("error when load wallet list from local storage: ", e)
            // error reading value
        }
    }


    const dmwTransferNavtie = async (privateKey: string) => {
        let tx = {
            from: currentDmwWallet, // Required
            to: "0x1b56FC073b1f1929A3aB01b4FC26848afAc702Da", // Required (for non contract deployments)
            value: web3.utils.toWei('0.01', 'ether'), // Optional
        };
        const gas = await web3.eth.estimateGas(tx)
        tx["gas"] = gas
        console.log(tx);
        try {
            const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
            web3.eth.sendSignedTransaction(signedTx.rawTransaction, function (error, hash) {
                if (!error) {
                    console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
                    return hash
                } else {
                    console.log("❗Something went wrong while submitting your transaction:", error)
                }
            });
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        web3.eth.setProvider(getProvider(dmwChainId));
        console.log("currenChainId: ", dmwChainId)
    }, [dmwChainId])

    useEffect(() => {
        AsyncStorage.getItem('@dmw_wallet_list_storage').then((WalletList_encoded) => {
            if (WalletList_encoded) {
                const WalletList = JSON.parse(WalletList_encoded)
                setDmwWalletList(WalletList.walletIndex)
                console.log(WalletList.walletIndex)
            } else {
                console.log("not wallet list from local storage,start to init")
                const WalletList = {
                    walletIndex: [],
                    walletDict: {
                    },
                }
                try {
                    AsyncStorage.setItem('@dmw_wallet_list_storage', JSON.stringify(WalletList))
                } catch (e) {
                }



            }


        })
    }, [])

    useEffect(() => {
        setcurrentDmwWallet(dmwWalletList[(dmwWalletList).length - 1])
    }, [dmwWalletList])


    useEffect(() => {
        web3.eth.setProvider(getProvider(dmwChainId));
        web3.eth.getBlockNumber().then((res => console.log(res)))
    }, [dmwChainId, currentDmwWallet])


    return (

        <DmwWalletContext.Provider value={{newMnemonic,loadMnemonicFromStorage,loadWalletFromMnemonic, dmwChainId, setDmwChainId, addWalletToAccountStorage, getWalletListFromAccountStorage, dmwWalletList, currentDmwWallet, setcurrentDmwWallet, dmwTransferNavtie }}>
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