import React, { useEffect, useMemo, useState } from 'react';
import DmwWalletContext from './DmwWalletContext'
import Web3 from 'web3';
import { useDmwWeb3 } from '../DmwWeb3/DmwWeb3Provider';
import { generateMnemonic, entropyToMnemonic, mnemonicToEntropy } from 'bip39'
import { ethers, Wallet } from "ethers";
import CryptoJS from 'crypto-js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { promises } from 'dns';
import { clear, time } from 'console';
import getProvider from '../../frontend/constans/rpcProvicer'
import { TransactionConfig } from 'web3-eth';
import { on } from 'stream';
import NFT1155ABI from '../../frontend/contract/NFT1155.json'
import NFT721ABI from '../../frontend/contract/NFT721.json'
import marketplaceABI from '../../frontend/contract/MARKETPLACE.json'
import ERC20ABI from '../contract/ERC20.json'

const DmwWalletProvider = ({ children }) => {

    const [dmwWalletList, setDmwWalletList] = useState([])
    const [currentDmwWallet, setcurrentDmwWallet] = useState('')
    const [dmwChainId, setDmwChainId] = useState(5)
    const [dmwTransactionMap, setDmwTransactionMap] = useState({})
    const [dmwTransactionList, setDmwTransactionList] = useState([])

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
        const mnemonic = generateMnemonic()
        // const mnemonic = "survey caught snap typical veteran area mutual stay wide invite fresh climb"
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
            console.log(e);
            
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


    const dmwTransferNavtie = async (secretKey: string) => {
        web3.eth.setProvider(getProvider(dmwChainId));
        let tx = {
            from: currentDmwWallet, // Required
            to: "0x1b56FC073b1f1929A3aB01b4FC26848afAc702Da", // Required (for non contract deployments)
            value: web3.utils.toWei('0.01', 'ether'), // Optional
            // gasPrice: "34544552563",
        };
        dmwSendTransaction(tx, secretKey).then((hash)=>console.log("hash!!!",hash)).catch(error => console.log("!!!",error))

    }

    const dmwMintWithSignature = async (secretKey:string,SignedPayload, Signature) =>{
        const contractAddress = "0x0ba15eE8874b930c49c7E65fFdEDf41BE9D0847d"

        const contract = new web3.eth.Contract(NFT1155ABI, contractAddress)

        const rawdata = contract.methods.mintWithSignature(SignedPayload, Signature).encodeABI()
        console.log(rawdata);
        const tx = {
            from: currentDmwWallet, // Required
            to: contractAddress, // Required (for non contract deployments)
            data: rawdata, // Required
            // gasPrice: "0x02540be400", // Optional
            // gasLimit: "0x9c40", // Optional
            value: web3.utils.toWei('0', 'ether'), // Optional
            // nonce: "0x0114", // Optional
        };
        dmwSendTransaction(tx, secretKey).then((hash)=>console.log("hash!!!",JSON.stringify(hash))).catch(error => console.log("!!!",error))
        
    }

    const dmwBuyNFT = async (secretKey:string,listingId: number, quantityToBuy: number, currency: string, totalPrice: string) => {
        web3.eth.setProvider(getProvider(dmwChainId));
        const contractAddress = "0x94bA21689AccF38EAcE5Ef53e1f64F63fB38C3a4"
        const contract = new web3.eth.Contract(marketplaceABI, contractAddress)
        const rawdata = contract.methods.buy(listingId, currentDmwWallet, quantityToBuy, currency, web3.utils.toWei(totalPrice, 'ether')).encodeABI()
        console.log(rawdata);
        const tx = {
            from: currentDmwWallet, // Required
            to: contractAddress, // Required (for non contract deployments)
            data: rawdata, // Required
            // gasPrice: "0x02540be400", // Optional
            // gasLimit: "0x9c40", // Optional
            value: (currency == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") ? web3.utils.toWei(totalPrice, 'ether') : web3.utils.toWei("0", 'ether'), // Optional
            // nonce: "0x0114", // Optional
        };
        console.log(tx)
        // Send transaction
        dmwSendTransaction(tx, secretKey).then((hash)=>console.log("hash!!!",JSON.stringify(hash))).catch(error => console.log("!!!",error))
    }

    const dmwSendTransaction = async (tx: TransactionConfig, secretKey: string) => {
        web3.eth.setProvider(getProvider(dmwChainId));
        const walletList = await getWalletListFromAccountStorage(secretKey)
        const privateKey = walletList.walletDict[currentDmwWallet].privateKey
        // console.log(privateKey)
        const gas = await web3.eth.estimateGas(tx)
        tx["gas"] = gas
        // tx["gasPrice"] = web3.utils.toHex(web3.utils.toWei('70','Gwei'))

        const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
        const hash = signedTx.transactionHash;
        setDmwTransactionList([...dmwTransactionList, hash]);
        const result = web3.eth.sendSignedTransaction(signedTx.rawTransaction)
            .once("sending", ((payload) => {
                setDmwTransactionMap({ ...dmwTransactionMap, [hash]: { "payload": payload, "state": "sending" } })
            }))
            .once("sent", ((payload) => {
                setDmwTransactionMap({ ...dmwTransactionMap, [hash]: { "payload": payload, "state": "sent" } })
            }))
            .once("confirmation", ((confNumber, receipt, latestBlockHash) => {
                setDmwTransactionMap({ ...dmwTransactionMap, [hash]: { "payload": receipt, "state": "confirmed" } })
            }))
            .on("error", ((error) => {
                setDmwTransactionMap({ ...dmwTransactionMap, [hash]: { "payload": "", "state": "error", "error": error.message } })
                return error
            }))
            .then(receipt=>{

                return receipt})
        return result
        


    }

    const dmwApprovalForAll = (secretKey:string,contractAddress: string) => {
        console.log(currentDmwWallet)
        web3.eth.setProvider(getProvider(dmwChainId));
        const contract = new web3.eth.Contract(NFT1155ABI, contractAddress)
        const rawdata = contract.methods.setApprovalForAll('0x94bA21689AccF38EAcE5Ef53e1f64F63fB38C3a4', true).encodeABI()
        const tx = {
            from: currentDmwWallet, // Required
            to: contractAddress, // Required (for non contract deployments)
            data: rawdata, // Required
            // gasPrice: "0x02540be400", // Optional
            // gasLimit: "0x9c40", // Optional
            value: web3.utils.toWei("0", 'ether'), // Optional
            // nonce: "0x0114", // Optional
        };
        dmwSendTransaction(tx, secretKey).then((hash)=>console.log("hash!!!",JSON.stringify(hash))).catch(error => console.log("!!!",error))
    }
    

    const dmwCreateListing = (secretKey:string,assetContract: string, tokenId: number, startTime: number, secondsUntilEndTime: number, quantityToList: number, reservePricePerToken: string, buyoutPricePerToken: string, listingType: number) => {
        web3.eth.setProvider(getProvider(dmwChainId));
        const contractAddress = "0x94bA21689AccF38EAcE5Ef53e1f64F63fB38C3a4"
        const contract = new web3.eth.Contract(marketplaceABI, contractAddress)
        // console.log(web3.utils.toWei(reservePricePerToken, 'ether'))
        console.log(assetContract, tokenId, startTime, secondsUntilEndTime, quantityToList, reservePricePerToken, buyoutPricePerToken, listingType)
        const rawdata = contract.methods.createListing([assetContract, tokenId, startTime, secondsUntilEndTime, quantityToList, '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', web3.utils.toWei(reservePricePerToken, 'ether'), web3.utils.toWei(buyoutPricePerToken, 'ether'), listingType]).encodeABI()

        const tx = {
            from: currentDmwWallet, // Required
            to: contractAddress, // Required (for non contract deployments)
            data: rawdata, // Required
            // gasPrice: "0x02540be400", // Optional
            // gasLimit: "0x9c40", // Optional
            value: web3.utils.toWei("0", 'ether'), // Optional
            // nonce: "0x0114", // Optional
        };
        dmwSendTransaction(tx, secretKey).then((hash)=>console.log("hash!!!",JSON.stringify(hash))).catch(error => console.log("!!!",error))
    }


    const dmwMakeOffer = async (secretKey:string,listingId: number, quantityWanted: number, currency: string, pricePerToken: string, expirationTimestamp: number) => {
        web3.eth.setProvider(getProvider(dmwChainId));
        const contractAddress = "0x94bA21689AccF38EAcE5Ef53e1f64F63fB38C3a4"
        const contract = new web3.eth.Contract(marketplaceABI, contractAddress)
        const rawdata = contract.methods.offer(listingId, quantityWanted, currency, web3.utils.toWei(pricePerToken, 'ether'), expirationTimestamp).encodeABI()
        const tx = {
            from: currentDmwWallet, // Required
            to: contractAddress, // Required (for non contract deployments)
            data: rawdata, // Required
            // gasPrice: "0x02540be400", // Optional
            // gasLimit: "0x9c40", // Optional
            value: web3.utils.toWei("0", 'ether'), // Optional
            // nonce: "0x0114", // Optional
        };
        dmwSendTransaction(tx, secretKey).then((hash)=>console.log("hash!!!",JSON.stringify(hash))).catch(error => console.log("!!!",error))
    }

    const dmwAcceptOffer = async (secretKey:string,listingId: number, offeror: string, currency: string, pricePerToken: string) => {
        web3.eth.setProvider(getProvider(dmwChainId));
        const contractAddress = "0x94bA21689AccF38EAcE5Ef53e1f64F63fB38C3a4"
        const contract = new web3.eth.Contract(marketplaceABI, contractAddress)
        const rawdata = contract.methods.acceptOffer(listingId, offeror, currency, web3.utils.toWei(pricePerToken, 'ether')).encodeABI()
        const tx = {
            from: currentDmwWallet, // Required
            to: contractAddress, // Required (for non contract deployments)
            data: rawdata, // Required
            // gasPrice: "0x02540be400", // Optional
            // gasLimit: "0x9c40", // Optional
            value: web3.utils.toWei("0", 'ether'), // Optional
            // nonce: "0x0114", // Optional
        };
        dmwSendTransaction(tx, secretKey).then((hash)=>console.log("hash!!!",JSON.stringify(hash))).catch(error => console.log("!!!",error))
    }

    const cancelDirectListing = async (secretKey:string,listingId: BigNumber) => {
        web3.eth.setProvider(getProvider(dmwChainId));
        const contractAddress = "0x94bA21689AccF38EAcE5Ef53e1f64F63fB38C3a4"
        const contract = new web3.eth.Contract(marketplaceABI, contractAddress)
        const rawdata = contract.methods.cancelDirectListing(listingId).encodeABI()
        const tx = {
            from: currentDmwWallet, // Required
            to: contractAddress, // Required (for non contract deployments)
            data: rawdata, // Required
            // gasPrice: "0x02540be400", // Optional
            // gasLimit: "0x9c40", // Optional
            value: web3.utils.toWei("0", 'ether'), // Optional
            // nonce: "0x0114", // Optional
        };
        dmwSendTransaction(tx, secretKey).then((hash)=>console.log("hash!!!",JSON.stringify(hash))).catch(error => console.log("!!!",error))
    }

    const dmwErc20Approve = (secretKey:string,tokenAddress: string, amount: string) => {
        web3.eth.setProvider(getProvider(dmwChainId));
        const contractAddress = "0x94bA21689AccF38EAcE5Ef53e1f64F63fB38C3a4"
        const contract = new web3.eth.Contract(ERC20ABI, tokenAddress)
        const rawdata = contract.methods.approve(contractAddress, web3.utils.toWei(amount, 'ether')).encodeABI()
        const tx = {
            from: currentDmwWallet, // Required
            to: tokenAddress, // Required (for non contract deployments)
            data: rawdata, // Required
            // gasPrice: "0x02540be400", // Optional
            // gasLimit: "0x9c40", // Optional
            value: web3.utils.toWei("0", 'ether'), // Optional
            // nonce: "0x0114", // Optional
        };
        dmwSendTransaction(tx, secretKey).then((hash)=>console.log("hash!!!",JSON.stringify(hash))).catch(error => console.log("!!!",error))
    }

    const dmwTransfer721NFT = (secretKey:string,conratctAddress:string,tokenId:Number,to:string) =>{
        web3.eth.setProvider(getProvider(dmwChainId));
        const contract = new web3.eth.Contract(NFT721ABI, conratctAddress)
        const rawdata = contract.methods.transferFrom(currentDmwWallet, to,tokenId).encodeABI()
        const tx = {
            from: currentDmwWallet, // Required
            to: conratctAddress, // Required (for non contract deployments)
            data: rawdata, // Required
            // gasPrice: "0x02540be400", // Optional
            // gasLimit: "0x9c40", // Optional
            value: web3.utils.toWei("0", 'ether'), // Optional
            // nonce: "0x0114", // Optional
        };

        dmwSendTransaction(tx, secretKey).then((hash)=>console.log("hash!!!",JSON.stringify(hash))).catch(error => console.log("!!!",error))
    }

    const dmwTransfer1155NFT = (secretKey:string,conratctAddress:string,tokenId:Number,to:string,amount:number) =>{
        web3.eth.setProvider(getProvider(dmwChainId));
        const contract = new web3.eth.Contract(NFT1155ABI, conratctAddress)
        const rawdata = contract.methods.safeTransferFrom(currentDmwWallet, to,tokenId,amount,[]).encodeABI()
        const tx = {
            from: currentDmwWallet, // Required
            to: conratctAddress, // Required (for non contract deployments)
            data: rawdata, // Required
            // gasPrice: "0x02540be400", // Optional
            // gasLimit: "0x9c40", // Optional
            value: web3.utils.toWei("0", 'ether'), // Optional
            // nonce: "0x0114", // Optional
        };

        dmwSendTransaction(tx, secretKey).then((hash)=>console.log("hash!!!",JSON.stringify(hash))).catch(error => console.log("!!!",error))
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
        web3.eth.setProvider(getProvider(dmwChainId));
    }, [dmwWalletList])


    useEffect(() => {
        web3.eth.setProvider(getProvider(dmwChainId));
        web3.eth.getBlockNumber().then((res => console.log(res)))
    }, [dmwChainId, currentDmwWallet])

    useEffect(() => {
        console.log("transaction:",dmwTransactionList[dmwTransactionList.length -1], dmwTransactionMap[dmwTransactionList[dmwTransactionList.length -1]])
    }, [dmwTransactionList, dmwTransactionMap])




    return (

        <DmwWalletContext.Provider value={{dmwBuyNFT,loadWalletFromMnemonic, loadMnemonicFromStorage , newMnemonic , dmwChainId, setDmwChainId, addWalletToAccountStorage, getWalletListFromAccountStorage, dmwWalletList, currentDmwWallet, setcurrentDmwWallet, dmwTransferNavtie ,dmwMintWithSignature,dmwTransactionList,dmwTransactionMap,dmwApprovalForAll,dmwCreateListing,dmwMakeOffer,dmwAcceptOffer,cancelDirectListing,dmwErc20Approve,dmwTransfer721NFT,dmwTransfer1155NFT}}>
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