import React, { useEffect, useMemo, useState } from "react";
import DmwWalletContext from "./DmwWalletContext";
import Web3 from "web3";
import { useDmwWeb3 } from "../DmwWeb3/DmwWeb3Provider";
import { generateMnemonic, entropyToMnemonic, mnemonicToEntropy } from "bip39";
import { ethers, Wallet } from "ethers";
import CryptoJS from "crypto-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { promises } from "dns";
import { clear, time } from "console";
import getProvider from "../../frontend/constans/rpcProvider";
import { TransactionConfig } from "web3-eth";
import { on } from "stream";
import NFT1155ABI from "../../frontend/contract/NFT1155.json";
import NFT721ABI from "../../frontend/contract/NFT721.json";
import marketplaceABI from "../../frontend/contract/MARKETPLACE.json";
import ERC20ABI from "../contract/ERC20.json";
import { Address } from "cluster";
import ChainIdMap from "../constans/chainIdMap.json";

const DmwWalletProvider = ({ children }) => {
  const [dmwWalletList, setDmwWalletList] = useState([]);
  const [currentDmwWallet, setcurrentDmwWallet] = useState("");
  const [dmwChainId, setDmwChainId] = useState(137);
  const [dmwTransactionMap, setDmwTransactionMap] = useState({});
  const [dmwTransactionList, setDmwTransactionList] = useState([]);
  const { globalError, setGlobalError,throwTxError } = useDmwWeb3();
  const web3 = new Web3();

  const verifySecretKey = (
    secretKey: string,
    verifyKey: string,
    storageKey: string
  ) => {
    var ciphertext = CryptoJS.AES.encrypt(storageKey, secretKey).toString();
    return ciphertext;
  };

  // 创建新的助记忆词，需要传入用户的支付密码，助记词将会用AES加密后储存到AsyncStorage的@dmw_mnemonic_storage中。
  const newMnemonic = async (secretKey, reset = false) => {
    // const wallet = web3.eth.accounts.create()
    // console.log(wallet.privateKey)
    const mnemonic = generateMnemonic();
    // const mnemonic = "survey caught snap typical veteran area mutual stay wide invite fresh climb"
    var ciphertext = CryptoJS.AES.encrypt(mnemonic, secretKey);
    try {
      if (!(await AsyncStorage.getItem("@dmw_mnemonic_storage")) || reset) {
        await AsyncStorage.setItem(
          "@dmw_mnemonic_storage",
          ciphertext.toString()
        );
        return { result: true, reset: reset, error: "" };
      } else {
        throw "@dmw_mnemonic_storage is not valid";
      }
    } catch (e) {
      // saving error
      console.log(e);
      // throw '@dmw_mnemonic_storage is not valid!'
    }
  };
  // 导入新的助记忆词，需要传入用户的支付密码，助记词将会用AES加密后储存到AsyncStorage的@dmw_mnemonic_storage中。
  const addMnemonic = async (secretKey, mnemonic, reset = true) => {
    // const wallet = web3.eth.accounts.create()
    // console.log(wallet.privateKey)
    // const mnemonic = generateMnemonic()
    // const mnemonic = "survey caught snap typical veteran area mutual stay wide invite fresh climb"
    var ciphertext = CryptoJS.AES.encrypt(mnemonic, secretKey);
    try {
      if (!(await AsyncStorage.getItem("@dmw_mnemonic_storage")) || reset) {
        await AsyncStorage.setItem(
          "@dmw_mnemonic_storage",
          ciphertext.toString()
        );
        return { result: true, reset: reset, error: "" };
      } else {
        throw "@dmw_mnemonic_storage is not valid";
      }
    } catch (e) {
      // saving error
      console.log(e);
      // throw '@dmw_mnemonic_storage is not valid!'
    }
  };

  // 从AsyncStorage中读取助记词
  const loadMnemonicFromStorage = async (secretKey) => {
    try {
      const mnemonic_encoded = await AsyncStorage.getItem(
        "@dmw_mnemonic_storage"
      );
      if (mnemonic_encoded !== null) {
        // value previously stored
        var bytes = CryptoJS.AES.decrypt(
          mnemonic_encoded.toString(),
          secretKey
        );
        var mnemonic = bytes.toString(CryptoJS.enc.Utf8);

        return mnemonic;
      }
    } catch (e) {
      console.log(e);

      console.log("no mnemonic from local storage!!!");
      // error reading value
    }
  };

  // 从助记词中恢复或创建钱包地址，wallet_index 为钱包的序号，每次新增或者向后恢复wallet_index需要自增1
  const loadWalletFromMnemonic = (mnemonic, wallet_index = 0) => {
    console.log(mnemonic);

    let wallet_hdpath = "m/44'/60'/0'/0/";
    try {
      const hdwallet = ethers.utils.HDNode.fromMnemonic(mnemonic);
      return hdwallet.derivePath(wallet_hdpath + wallet_index);
    } catch (e) {
      return null;
    }
  };

  // 向本地存储中添加新的钱包私钥。
  const addWalletToAccountStorage = async (
    privateKey: string,
    secretKey: string
  ) => {
    console.log("privateKey input: ", privateKey);
    const newWallet = web3.eth.accounts.privateKeyToAccount(privateKey);
    let currentWalletList = await getWalletListFromAccountStorage(secretKey);

    if (!currentWalletList.walletIndex.includes(newWallet.address)) {
      console.log("new wallet import: ", newWallet.address);
      currentWalletList.walletIndex.push(newWallet.address);
      currentWalletList.walletDict[newWallet.address] = {
        addedTime: new Date().getTime(),
        privateKey: newWallet.privateKey,
      };

      try {
        console.log("new wallet to add:", currentWalletList);
        var ciphertext = CryptoJS.AES.encrypt(
          JSON.stringify(currentWalletList.walletDict),
          secretKey
        ).toString();
        currentWalletList.walletDict = ciphertext;
        setDmwWalletList(currentWalletList.walletIndex);
        await AsyncStorage.setItem(
          "@dmw_wallet_list_storage",
          JSON.stringify(currentWalletList)
        ).then(() => {});
      } catch (e) {
        console.log("error on add wallet to storage", e);
        // saving error
      }
    }
  };
  // 从本地存储中获取钱包列表
  const getWalletListFromAccountStorage = async (
    secretKey: string
  ): Promise<{ walletIndex: [string]; walletDict: {}; verifyKey: string }> => {
    try {
      console.log("getting wallet list form storage");

      const WalletList_encoded = await AsyncStorage.getItem(
        "@dmw_wallet_list_storage"
      );
      console.log(WalletList_encoded);
      if (WalletList_encoded !== null) {
        const WalletList = JSON.parse(WalletList_encoded);

        if (WalletList["walletIndex"].length > 0) {
          var bytes = CryptoJS.AES.decrypt(
            WalletList.walletDict.toString(),
            secretKey
          );
          var walletDict = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
          WalletList.walletDict = walletDict;
        }
        return WalletList;
      } else {
        console.log("not wallet list from local storage,start to init");
        // const verifyKey = CryptoJS.AES.encrypt("@dmw_wallet_list_storage", secretKey).toString();
        const WalletList = {
          walletIndex: [],
          walletDict: {},
        };
        try {
          await AsyncStorage.setItem(
            "@dmw_wallet_list_storage",
            JSON.stringify(WalletList)
          );
          // return WalletList
        } catch (e) {
          // saving error
        }
      }
    } catch (e) {
      console.log("error when load wallet list from local storage: ", e);
      // error reading value
    }
  };

  //修改secretKey
  const changeSecretKey = async (
    originSecretKey: string,
    newSecretKey: string
  ) => {
    const mnemonic = await loadMnemonicFromStorage(originSecretKey);
    await addMnemonic(newSecretKey, mnemonic);

    let currentWalletList = await getWalletListFromAccountStorage(
      originSecretKey
    );

    try {
      console.log("new wallet to add:", currentWalletList);
      var ciphertext = CryptoJS.AES.encrypt(
        JSON.stringify(currentWalletList.walletDict),
        newSecretKey
      ).toString();
      currentWalletList.walletDict = ciphertext;
      setDmwWalletList(currentWalletList.walletIndex);
      await AsyncStorage.setItem(
        "@dmw_wallet_list_storage",
        JSON.stringify(currentWalletList)
      );

      return true;
    } catch (e) {
      console.log("error on add wallet to storage", e);
      return false;
      // saving error
    }
  };

  const dmwTransferNavtive = async (
    secretKey: string,
    to: string,
    value: string
  ) => {
    web3.eth.setProvider(getProvider(dmwChainId));
    let tx = {
      from: currentDmwWallet, // Required
      to: to, // Required (for non contract deployments)
      value: web3.utils.toWei(value, "ether"), // Optional
      // gasPrice: "34544552563",
    };
    return dmwSendTransaction(tx, secretKey)
      .then((res) => {
        return res;
      })
      .catch((error) => throwTxError(error));
  };

  const dmwTransferERC20 = (
    secretKey: string,
    contractAddress: string,
    to: string,
    amount: string,
    decimal: number
  ) => {
    web3.eth.setProvider(getProvider(dmwChainId));
    const contract = new web3.eth.Contract(ERC20ABI, contractAddress);
    const rawdata = contract.methods
      .transfer(to, ethers.utils.parseUnits(amount, decimal))
      .encodeABI();
    const tx = {
      from: currentDmwWallet, // Required
      to: contractAddress, // Required (for non contract deployments)
      data: rawdata, // Required
      // gasPrice: "0x02540be400", // Optional
      // gasLimit: "0x9c40", // Optional
      value: web3.utils.toWei("0", "ether"), // Optional
      // nonce: "0x0114", // Optional
    };
    return dmwSendTransaction(tx, secretKey)
      .then((res) => {
        return res;
      })
      .catch((error) => throwTxError(error));
  };

  const dmwTransferToken = (
    secretKey: string,
    contract: string = null,
    to: string,
    amount: string,
    decimal: number = null
  ) => {
    contract
      ? dmwTransferERC20(secretKey, contract, to, amount, decimal).then(
          (res) => {
            return res;
          }
        )
      : dmwTransferNavtive(secretKey, to, amount).then((res) => {
          return res;
        });
  };

  const dmwMintWithSignature = async (
    secretKey: string,
    SignedPayload,
    Signature
  ) => {
    const contractAddress = ChainIdMap[dmwChainId].nft_contract;

    const contract = new web3.eth.Contract(NFT1155ABI, contractAddress);

    const rawdata = contract.methods
      .mintWithSignature(SignedPayload, Signature)
      .encodeABI();
    console.log(rawdata);
    const tx = {
      from: currentDmwWallet, // Required
      to: contractAddress, // Required (for non contract deployments)
      data: rawdata, // Required
      // gasPrice: "0x02540be400", // Optional
      // gasLimit: "0x9c40", // Optional
      value: web3.utils.toWei("0", "ether"), // Optional
      // nonce: "0x0114", // Optional
    };
    return dmwSendTransaction(tx, secretKey)
      .then((res) => {
        return res;
      })
      .catch((error) => throwTxError(error));
  };

  const dmwBuyNFT = async (
    secretKey: string,
    listingId: number,
    quantityToBuy: number,
    currency: string,
    totalPrice: string
  ) => {
    web3.eth.setProvider(getProvider(dmwChainId));
    const contractAddress = ChainIdMap[dmwChainId].market_contract;
    const contract = new web3.eth.Contract(marketplaceABI, contractAddress);
    const rawdata = contract.methods
      .buy(
        listingId,
        currentDmwWallet,
        quantityToBuy,
        currency,
        web3.utils.toWei(totalPrice, "ether")
      )
      .encodeABI();
    console.log(rawdata);
    const tx = {
      from: currentDmwWallet, // Required
      to: contractAddress, // Required (for non contract deployments)
      data: rawdata, // Required
      // gasPrice: "0x02540be400", // Optional
      // gasLimit: "0x9c40", // Optional
      value:
        currency.toLowerCase() == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
          ? web3.utils.toWei(totalPrice, "ether")
          : web3.utils.toWei("0", "ether"), // Optional
      // nonce: "0x0114", // Optional
    };
    console.log(tx);
    // Send transaction
    return dmwSendTransaction(tx, secretKey)
      .then((res) => {
        return res;
      })
      .catch((error) => throwTxError(error));
  };

  const dmwSendTransaction = async (
    tx: TransactionConfig,
    privateKey: string
  ) => {
    web3.eth.setProvider(getProvider(dmwChainId));
    const gas = await web3.eth.estimateGas(tx);
    tx["gas"] = gas;

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    const hash = signedTx.transactionHash;
    setDmwTransactionList([...dmwTransactionList, hash]);
    const result = web3.eth
      .sendSignedTransaction(signedTx.rawTransaction)
      .once("sending", (payload) => {
        setDmwTransactionMap({
          ...dmwTransactionMap,
          [hash]: { payload: payload, state: "sending" },
        });
      })
      .once("sent", (payload) => {
        setDmwTransactionMap({
          ...dmwTransactionMap,
          [hash]: { payload: payload, state: "sent" },
        });
      })
      .once("confirmation", (confNumber, receipt, latestBlockHash) => {
        setDmwTransactionMap({
          ...dmwTransactionMap,
          [hash]: { payload: receipt, state: "confirmed" },
        });
      })
      .on("error", (error) => {
        setDmwTransactionMap({
          ...dmwTransactionMap,
          [hash]: { payload: "", state: "error", error: error.message },
        });
        throw error;
      })
      .then((receipt) => {
        return receipt;
      });
    return result;
  };

  const dmwApprovalForAll = (secretKey: string, contractAddress: string) => {
    console.log(currentDmwWallet);
    web3.eth.setProvider(getProvider(dmwChainId));
    const contract = new web3.eth.Contract(NFT1155ABI, contractAddress);
    const rawdata = contract.methods
      .setApprovalForAll(ChainIdMap[dmwChainId].market_contract, true)
      .encodeABI();
    const tx = {
      from: currentDmwWallet, // Required
      to: contractAddress, // Required (for non contract deployments)
      data: rawdata, // Required
      // gasPrice: "0x02540be400", // Optional
      // gasLimit: "0x9c40", // Optional
      value: web3.utils.toWei("0", "ether"), // Optional
      // nonce: "0x0114", // Optional
    };
    return dmwSendTransaction(tx, secretKey)
      .then((res) => {
        return res;
      })
      .catch((error) => throwTxError(error));
  };

  const dmwCreateListing = (
    secretKey: string,
    assetContract: string,
    tokenId: number,
    startTime: number,
    secondsUntilEndTime: number,
    quantityToList: number,
    reservePricePerToken: string,
    buyoutPricePerToken: string,
    listingType: number
  ) => {
    web3.eth.setProvider(getProvider(dmwChainId));
    const contractAddress = ChainIdMap[dmwChainId].market_contract;
    const contract = new web3.eth.Contract(marketplaceABI, contractAddress);
    // console.log(web3.utils.toWei(reservePricePerToken, 'ether'))
    console.log(
      assetContract,
      tokenId,
      startTime,
      secondsUntilEndTime,
      quantityToList,
      reservePricePerToken,
      buyoutPricePerToken,
      listingType
    );
    const rawdata = contract.methods
      .createListing([
        assetContract,
        tokenId,
        startTime,
        secondsUntilEndTime,
        quantityToList,
        "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        web3.utils.toWei(reservePricePerToken, "ether"),
        web3.utils.toWei(buyoutPricePerToken, "ether"),
        listingType,
      ])
      .encodeABI();

    const tx = {
      from: currentDmwWallet, // Required
      to: contractAddress, // Required (for non contract deployments)
      data: rawdata, // Required
      // gasPrice: "0x02540be400", // Optional
      // gasLimit: "0x9c40", // Optional
      value: web3.utils.toWei("0", "ether"), // Optional
      // nonce: "0x0114", // Optional
    };
    return dmwSendTransaction(tx, secretKey)
      .then((res) => {
        return res;
      })
      .catch((error) => throwTxError(error));
  };

  const dmwMakeOffer = async (
    secretKey: string,
    listingId: number,
    quantityWanted: number,
    currency: string,
    decimals: number,
    pricePerToken: string,
    expirationTimestamp: number
  ) => {
    web3.eth.setProvider(getProvider(dmwChainId));
    console.log("making offer..");
    const contractAddress = ChainIdMap[dmwChainId].market_contract;
    const contract = new web3.eth.Contract(marketplaceABI, contractAddress);
    const rawdata = contract.methods
      .offer(
        listingId,
        quantityWanted,
        currency,
        pricePerToken != "0"
          ? ethers.utils.parseUnits(pricePerToken, decimals)
          : "0",
        expirationTimestamp
      )
      .encodeABI();
    const tx = {
      from: currentDmwWallet, // Required
      to: contractAddress, // Required (for non contract deployments)
      data: rawdata, // Required
      // gasPrice: "0x02540be400", // Optional
      // gasLimit: "0x9c40", // Optional
      value: web3.utils.toWei("0", "ether"), // Optional
      // nonce: "0x0114", // Optional
    };
    return dmwSendTransaction(tx, secretKey)
      .then((res) => {
        return res;
      })
      .catch((error) => throwTxError(error));
  };

  const dmwAcceptOffer = async (
    secretKey: string,
    listingId: number,
    offeror: string,
    currency: string,
    pricePerToken: string
  ) => {
    console.log(
      "try to take offer: ",
      secretKey,
      listingId,
      offeror,
      currency,
      pricePerToken
    );
    web3.eth.setProvider(getProvider(dmwChainId));
    const contractAddress = ChainIdMap[dmwChainId].market_contract;
    const contract = new web3.eth.Contract(marketplaceABI, contractAddress);
    const rawdata = contract.methods
      .acceptOffer(listingId, offeror, currency, pricePerToken)
      .encodeABI();
    const tx = {
      from: currentDmwWallet, // Required
      to: contractAddress, // Required (for non contract deployments)
      data: rawdata, // Required
      // gasPrice: "0x02540be400", // Optional
      // gasLimit: "0x9c40", // Optional
      value: web3.utils.toWei("0", "ether"), // Optional
      // nonce: "0x0114", // Optional
    };
    return dmwSendTransaction(tx, secretKey)
      .then((res) => {
        return res;
      })
      .catch((error) => throwTxError(error));
  };

  const dmwCancelDirectListing = async (
    secretKey: string,
    listingId: BigNumber
  ) => {
    web3.eth.setProvider(getProvider(dmwChainId));
    const contractAddress = ChainIdMap[dmwChainId].market_contract;
    const contract = new web3.eth.Contract(marketplaceABI, contractAddress);
    const rawdata = contract.methods.cancelDirectListing(listingId).encodeABI();
    const tx = {
      from: currentDmwWallet, // Required
      to: contractAddress, // Required (for non contract deployments)
      data: rawdata, // Required
      // gasPrice: "0x02540be400", // Optional
      // gasLimit: "0x9c40", // Optional
      value: web3.utils.toWei("0", "ether"), // Optional
      // nonce: "0x0114", // Optional
    };
    return dmwSendTransaction(tx, secretKey)
      .then((res) => {
        return res;
      })
      .catch((error) => throwTxError(error));
  };

  const dmwErc20Approve = (
    secretKey: string,
    tokenAddress: string,
    amount: string
  ) => {
    web3.eth.setProvider(getProvider(dmwChainId));
    const contractAddress = ChainIdMap[dmwChainId].market_contract;
    const contract = new web3.eth.Contract(ERC20ABI, tokenAddress);
    const rawdata = contract.methods
      .approve(contractAddress, amount)
      .encodeABI();
    const tx = {
      from: currentDmwWallet, // Required
      to: tokenAddress, // Required (for non contract deployments)
      data: rawdata, // Required
      // gasPrice: "0x02540be400", // Optional
      // gasLimit: "0x9c40", // Optional
      value: web3.utils.toWei("0", "ether"), // Optional
      // nonce: "0x0114", // Optional
    };
    return dmwSendTransaction(tx, secretKey)
      .then((res) => {
        return res;
      })
      .catch((error) => throwTxError(error));
  };

  const dmwTransfer721NFT = (
    secretKey: string,
    conratctAddress: string,
    tokenId: Number,
    to: string
  ) => {
    web3.eth.setProvider(getProvider(dmwChainId));
    const contract = new web3.eth.Contract(NFT721ABI, conratctAddress);
    const rawdata = contract.methods
      .transferFrom(currentDmwWallet, to, tokenId)
      .encodeABI();
    const tx = {
      from: currentDmwWallet, // Required
      to: conratctAddress, // Required (for non contract deployments)
      data: rawdata, // Required
      // gasPrice: "0x02540be400", // Optional
      // gasLimit: "0x9c40", // Optional
      value: web3.utils.toWei("0", "ether"), // Optional
      // nonce: "0x0114", // Optional
    };

    return dmwSendTransaction(tx, secretKey)
      .then((res) => {
        return res;
      })
      .catch((error) => throwTxError(error));
  };

  const dmwTransfer1155NFT = (
    secretKey: string,
    conratctAddress: string,
    tokenId: Number,
    to: string,
    amount: number
  ) => {
    web3.eth.setProvider(getProvider(dmwChainId));
    const contract = new web3.eth.Contract(NFT1155ABI, conratctAddress);
    const rawdata = contract.methods
      .safeTransferFrom(currentDmwWallet, to, tokenId, amount, [])
      .encodeABI();
    const tx = {
      from: currentDmwWallet, // Required
      to: conratctAddress, // Required (for non contract deployments)
      data: rawdata, // Required
      // gasPrice: "0x02540be400", // Optional
      // gasLimit: "0x9c40", // Optional
      value: web3.utils.toWei("0", "ether"), // Optional
      // nonce: "0x0114", // Optional
    };

    return dmwSendTransaction(tx, secretKey)
      .then((res) => {
        return res;
      })
      .catch((error) => throwTxError(error));
  };

  useEffect(() => {
    AsyncStorage.getItem("@dmw_wallet_list_storage").then(
      (WalletList_encoded) => {
        if (WalletList_encoded) {
          const WalletList = JSON.parse(WalletList_encoded);
          setDmwWalletList(WalletList.walletIndex);
          console.log(WalletList.walletIndex);
        } else {
          console.log("not wallet list from local storage,start to init");
          const WalletList = {
            walletIndex: [],
            walletDict: {},
          };
          try {
            AsyncStorage.setItem(
              "@dmw_wallet_list_storage",
              JSON.stringify(WalletList)
            );
          } catch (e) {}
        }
      }
    );
  }, []);

  useEffect(() => {
    setcurrentDmwWallet(dmwWalletList[dmwWalletList.length - 1]);
    web3.eth.setProvider(getProvider(dmwChainId));
  }, [dmwWalletList]);

  useEffect(() => {
    web3.eth.setProvider(getProvider(dmwChainId));
  }, [dmwChainId, currentDmwWallet]);

  useEffect(() => {
    console.log(
      "transaction:",
      dmwTransactionList[dmwTransactionList.length - 1],
      dmwTransactionMap[dmwTransactionList[dmwTransactionList.length - 1]]
    );
  }, [dmwTransactionList, dmwTransactionMap]);

  return (
    <DmwWalletContext.Provider
      value={{
        dmwBuyNFT,
        loadWalletFromMnemonic,
        loadMnemonicFromStorage,
        newMnemonic,
        dmwChainId,
        setDmwChainId,
        addWalletToAccountStorage,
        getWalletListFromAccountStorage,
        dmwWalletList,
        currentDmwWallet,
        setcurrentDmwWallet,
        dmwTransferNavtive,
        dmwMintWithSignature,
        dmwTransactionList,
        dmwTransactionMap,
        dmwApprovalForAll,
        dmwCreateListing,
        dmwMakeOffer,
        dmwAcceptOffer,
        dmwCancelDirectListing,
        dmwErc20Approve,
        dmwTransfer721NFT,
        dmwTransfer1155NFT,
        addMnemonic,
        dmwTransferToken,
        changeSecretKey,
      }}
    >
      {children}
    </DmwWalletContext.Provider>
  );
};

const useDmwWallet = () => {
  const context = React.useContext(DmwWalletContext);
  if (context === undefined) {
    throw new Error("useDmwWallet must be used within a DmwWalletProvider");
  }
  return context;
};

export { DmwWalletProvider, useDmwWallet };
