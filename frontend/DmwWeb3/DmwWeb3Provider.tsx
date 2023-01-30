import React, { useEffect, useMemo, useState } from "react";
import DmwWeb3Context from "./DmwWeb3context";
import Web3 from "web3";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import getProvider from "../../frontend/constans/rpcProvider";
import NFT1155ABI from "../../frontend/contract/NFT1155.json";
import NFT721ABI from "../../frontend/contract/NFT721.json";
import chainIdMap from "../constans/chainIdMap.json";
import marketplaceABI from "../../frontend/contract/MARKETPLACE.json";
import txGasMap from "../constans/txGasMap.json";
import ERC20ABI from "../contract/ERC20.json";
// import { BigNumber } from "ethers";
import BigNumber from "bignumber.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChainIdMap from "../constans/chainIdMap.json";
import { ethers } from "ethers";
import { resolve } from "path";
import { rejects } from "assert";

const DmwWeb3Provider = ({ children }) => {
  const connector = useWalletConnect();
  const [currentWallet, setCurrentWallet] = useState("");
  const [currentChainId, setCurrenChainId] = useState("137");
  const [connected, setConnected] = useState(false);
  const [lastConnected, setLastConnected] = useState(true);
  const [transactionMap, setTransactionMap] = useState({});
  const [transactionList, setTransactionList] = useState([]);
  const [currentGasPrice, setCurrentGasPrice] = useState("");
  const [memConnectStatus, setMemConnectStatus] = useState({});
  const [nativeToken, setNativeToken] = useState("ETH");
  const [globalError, setGlobalError] = useState([]);
  const [dmwConfig, setDmwConfig] = useState({});
  const GasMap = txGasMap;
  const web3 = new Web3();

  const updateNetwork = (chainId: string) => {
    setCurrenChainId(String(chainId));
  };

  function convertArrayToJson(arr) {
    return arr.reduce((acc, item) => {
      acc[item.chainId] = item;
      return acc;
    }, {});
  }

  const getDmwConfig = () => {
    console.log("getting config");
    fetch(`http://18.142.150.253/index/common/get_network`, {
      method: "GET",
    }).then((res) => {
      res.json().then((result) => {
        if (result && result.data) {
          let jsonConfig = convertArrayToJson(result.data);
          console.log("got config:", jsonConfig);
          setDmwConfig(jsonConfig);
        }
      });
    });
  };

  const contractMap = (): {} => {
    console.log(dmwConfig ? "using online config" : "usesing local config");
    return dmwConfig ? dmwConfig : ChainIdMap;
  };

  const throwTxError = (error) => {
    setGlobalError([...globalError, String(error)]);
  };

  const sendAndSyncTransaction = async (tx) => {
    return new Promise((resolve, rejects) => {
      connector
        .sendTransaction(tx)
        .then((result) => {
          console.log("open third party wallet res:", result);
          syncTransactionSatus(result).then((res) => {
            console.log("sync transaction result:", res);
            resolve(res);
          });
        })
        .catch((error) => {
          throwTxError(error);
          console.error(error);
        });
    });
  };

  useEffect(() => {
    getDmwConfig();
    if (connector.connected) {
      setCurrentWallet(connector.accounts[0]);
      setConnected(true);
      setCurrenChainId(String(connector.chainId));
      console.log("is connected!---,-,-", currentWallet, connector.accounts[0]);
    } else {
      checkConnectSatus().then((res) => {
        if (res.connected) {
          setMemConnectStatus(res);
          setCurrentWallet(res.account);
          setConnected(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    currentChainId && setNativeToken(chainIdMap[currentChainId].nativeToken);

    const interval = setInterval(() => {
      try {
        updateGasPrice();
      } catch (error) {
        clearInterval(interval);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [currentChainId]);

  const updateGasPrice = () => {
    web3.eth.setProvider(getProvider(currentChainId));
    web3.eth.getGasPrice().then((gasPrice) => {
      // console.log(`chain:${currentChainId} current gas price==>${gasPrice}`);
      setCurrentGasPrice(gasPrice);
    });
  };

  const transferToken = (
    to: string,
    amount: string,
    contract: string = null,
    decimals: number
  ) => {
    return contract
      ? transferERC20(contract, to, amount, decimals).then((res) => {
          return res;
        })
      : transferNative(to, amount).then((res) => {
          return res;
        });
  };

  const getNativeBalance = (address) => {
    console.log(getProvider(currentChainId));
    web3.eth.setProvider(getProvider(currentChainId));
    const balance = web3.eth.getBalance(address).then((res) => {
      return web3.utils.fromWei(res, "ether");
    });
    return balance;
  };

  // 本地保存钱包连接状态
  const memoryConnectStatus = async (
    connected: boolean,
    account: string,
    chainId: string,
    lastUpdateTime: number
  ) => {
    const connectStatus = {
      connected: connected,
      account: account,
      chainId: chainId,
      lastUpdateTime: lastUpdateTime,
    };
    await AsyncStorage.setItem(
      "@dmw_wallet_connect_storage",
      JSON.stringify(connectStatus)
    );
  };

  const checkConnectSatus = async () => {
    const strData = await AsyncStorage.getItem("@dmw_wallet_connect_storage");
    console.log(strData, "strdata");
    const status = strData ? JSON.parse(strData) : null;
    return status;
  };

  // 链接第三方钱包
  const connectWallet = async () => {
    console.log("Connecting");
    connector
      .connect()
      .then((res) => {
        console.log(res);
        setConnected(true);
        setCurrentWallet(res.accounts[0]);
        setCurrenChainId(String(res.chainId));
        console.log("loging-------------");
        console.log(String(res.chainId), "login chain id");
        setLastConnected(true);
        web3.eth.setProvider(getProvider(String(res.chainId)));
        web3.eth.getBlockNumber().then((res) => console.log(res));
        memoryConnectStatus(
          true,
          res.accounts[0],
          String(res.chainId),
          Date.now()
        );
        return res;
      })
      .catch((error) => {
        // Error returned when rejected
        console.log(error);
        return error;
      });
  };
  //断开第三方钱包链接
  const disconnectWallet = () => {
    console.log("disonnecting");
    connector.killSession();
    setConnected(false);
    setLastConnected(false);
    memoryConnectStatus(false, currentWallet, currentChainId, Date.now());
    if (!connector.connected) {
      console.log("disconnected");
      setCurrentWallet(null);
      // setCurrenChainId(connector.chainId);
    }
  };

  const transferNative = (to: string, value: string) => {
    const tx = {
      from: currentWallet, // Required
      to: to, // Required (for non contract deployments)
      value: web3.utils.toWei(value, "ether"), // Optional
    };

    return sendAndSyncTransaction(tx).then((res) => {
      return res;
    });
  };

  // 转移erc20 代币
  const transferERC20 = (
    contractAddress: string,
    to: string,
    amount: string,
    decimals: number
  ) => {
    web3.eth.setProvider(getProvider(currentChainId));
    const contract = new web3.eth.Contract(ERC20ABI, contractAddress);
    const rawdata = contract.methods
      .transfer(to, ethers.utils.parseUnits(amount, decimals))
      .encodeABI();
    console.log(currentWallet, to, (Number(amount) * 10 ** decimals).toFixed());
    const tx = {
      from: currentWallet, // Required
      to: contractAddress, // Required (for non contract deployments)
      data: rawdata, // Required
      // gasPrice: "0x02540be400", // Optional
      // gasLimit: "0x9c40", // Optional
      value: web3.utils.toWei("0", "ether"), // Optional
      // nonce: "0x0114", // Optional
    };
    return sendAndSyncTransaction(tx).then((res) => {
      return res;
    });
  };

  const mintNft = () => {
    const contractAddress = contractMap()[currentChainId].nft_contract;

    const contract = new web3.eth.Contract(NFT1155ABI, contractAddress);

    const rawdata = contract.methods
      .mint(
        currentWallet,
        100,
        [],
        "  https://ipfs.moralis.io:2053/ipfs/QmZJxFn8kTwb8HcpHyoNPq1jsDSE2pEqG848FGhtFGU5ES"
      )
      .encodeABI();
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
    return sendAndSyncTransaction(tx).then((res) => {
      return res;
    });
  };
  const mintNftWithSignature = (SignedPayload, Signature) => {
    const contractAddress = contractMap()[currentChainId].nft_contract;

    const contract = new web3.eth.Contract(NFT1155ABI, contractAddress);

    const rawdata = contract.methods
      .mintWithSignature(SignedPayload, Signature)
      .encodeABI();
    console.log(rawdata);
    const tx = {
      from: currentWallet, // Required
      to: contractAddress, // Required (for non contract deployments)
      data: rawdata, // Required
      // gasPrice: "0x02540be400", // Optional
      // gasLimit: "0x9c40", // Optional
      value: web3.utils.toWei("0", "ether"), // Optional
      // nonce: "0x0114", // Optional
    };

    // Send transaction
    return sendAndSyncTransaction(tx).then((res) => {
      return res;
    });
  };

  const getWalletNfts = () => {
    console.log(currentWallet);
    return fetch(
      `https://eth-goerli.g.alchemy.com/nft/v2/S8xDLVufmTFUnjHYkZDOW5NkQtQG8q8J/getNFTs?owner=${currentWallet}&pageSize=10&withMetadata=false`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
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
        // setGlobalError([...globalError, String(error)]);
      });
  };

  // 检测地址：account是否向某地址：operator授权所有NFT地址nftContractAddress，返回bool，true为已授权，false反之
  const checkIsApproveForAll = (
    nftContractAddress: string,
    account: string,
    operator: string,
    contractType: string
  ): boolean => {
    web3.eth.setProvider(getProvider(currentChainId));
    const contract = new web3.eth.Contract(
      contractType == "1155" ? NFT1155ABI : NFT721ABI,
      nftContractAddress
    );
    const isApprovedForAll = contract.methods
      .isApprovedForAll(account, contractMap()[currentChainId].market_contract)
      .call();
    return isApprovedForAll;
  };
  const getBalanceOf1155 = (
    nftContractAddress: string,
    account: string,
    tokenId: number
  ): number => {
    web3.eth.setProvider(getProvider(currentChainId));
    const contract = new web3.eth.Contract(NFT1155ABI, nftContractAddress);
    const balance = contract.methods.balanceOf(account, tokenId).call();
    return balance;
  };

  const syncTransactionSatus = async (txHash: string) => {
    web3.eth.setProvider(getProvider(currentChainId));
    setTransactionList([...transactionList, txHash]);
    setTransactionMap({
      ...transactionMap,
      [txHash]: { payload: null, state: "pending" },
    });
    console.log("syncing tx:", txHash);
    return new Promise((resolve, reject) => {
      let syncInterval = setInterval(() => {
        web3.eth.getTransactionReceipt(txHash).then((res) => {
          // console.log(getProvider('5'))
          res ? console.log(res) : console.log(txHash, "pending");
          if (res) {
            console.log(JSON.stringify(res));
            clearInterval(syncInterval);
            setTransactionMap({
              ...transactionMap,
              [txHash]: {
                payload: res,
                state: res.status ? "comfirmed" : "reversed",
              },
            });
            resolve({
              hash: txHash,
              result: {
                payload: res,
                state: res.status ? "comfirmed" : "reversed",
              },
            });
          }
        });
      }, 5000);
    });
  };

  /* 
        listingId:订单的ID
        buyFor：NFT购买后发送给谁
        quantityToBuy：想要购买的NFT数量
        currency：支付的代币的合约地址（ETH:0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee）
        totalPrice:= NFT单价 * quantityToBuy
    */
  const buyNFT = async (
    listingId: number,
    quantityToBuy: number,
    currency: string,
    decimals: number,
    unitPrice:string,
    
  ) => {
    const totalPrice = String(Number(ethers.utils.parseUnits(unitPrice, decimals)) * quantityToBuy);
    web3.eth.setProvider(getProvider(currentChainId));
    console.log("buy with currency", currency, totalPrice);
    const contractAddress = contractMap()[currentChainId].market_contract;
    const contract = new web3.eth.Contract(marketplaceABI, contractAddress);
    const rawdata = contract.methods
      .buy(
        listingId,
        currentWallet,
        quantityToBuy,
        currency,
        totalPrice
      )
      .encodeABI();
    console.log(rawdata);
    const tx = {
      from: currentWallet, // Required
      to: contractAddress, // Required (for non contract deployments)
      data: rawdata, // Required
      // gasPrice: "0x02540be400", // Optional
      // gasLimit: "0x9c40", // Optional
      value:
        currency == "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
          ? totalPrice
          : web3.utils.toWei("0", "ether"), // Optional
      // nonce: "0x0114", // Optional
    };
    console.log(tx);
    // Send transaction
    return sendAndSyncTransaction(tx).then((res) => {
      return res;
    });
  };

  /* 
        listingId:订单的ID
        quantityWanted：想要购买的NFT数量
        currency：支付的代币的合约地址（ETH:0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee）
        pricePerToken:每个NFT支付多少代币
        expirationTimestamp：过期时间
    */
  const makeOffer = async (
    listingId: number,
    quantityWanted: number,
    currency: string,
    decimals: number,
    pricePerToken: string,
    expirationTimestamp: number
  ) => {
    web3.eth.setProvider(getProvider(currentChainId));
    const contractAddress = contractMap()[currentChainId].market_contract;
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
      from: currentWallet, // Required
      to: contractAddress, // Required (for non contract deployments)
      data: rawdata, // Required
      // gasPrice: "0x02540be400", // Optional
      // gasLimit: "0x9c40", // Optional
      value: web3.utils.toWei("0", "ether"), // Optional
      // nonce: "0x0114", // Optional
    };
    return sendAndSyncTransaction(tx).then((res) => {
      return res;
    });
  };

  /* 
    acceptOffer：
        listingId:订单的ID
        offeror：报价人的钱包地址
        currency：报价人的offer的支付代币的合约地址（USDT（fake）:0x0B99a72bebFE91B14529ea412eb2B1dBEE604c4C
        pricePerToken:每个NFT支付多少代币
    */
  const acceptOffer = async (
    listingId: number,
    offeror: string,
    currency: string,
    pricePerToken: string
  ) => {
    web3.eth.setProvider(getProvider(currentChainId));
    const contractAddress = contractMap()[currentChainId].market_contract;
    const contract = new web3.eth.Contract(marketplaceABI, contractAddress);
    const rawdata = contract.methods
      .acceptOffer(
        listingId,
        offeror,
        currency,
        new BigNumber(pricePerToken).toString()
      )
      .encodeABI();
    const tx = {
      from: currentWallet, // Required
      to: contractAddress, // Required (for non contract deployments)
      data: rawdata, // Required
      // gasPrice: "0x02540be400", // Optional
      // gasLimit: "0x9c40", // Optional
      value: web3.utils.toWei("0", "ether"), // Optional
      // nonce: "0x0114", // Optional
    };
    return sendAndSyncTransaction(tx).then((res) => {
      return res;
    });
  };
  /* 
    cancelDirectListing：取消直接挂单
        listingId:订单的ID
    */
  const cancelDirectListing = async (listingId: string) => {
    web3.eth.setProvider(getProvider(currentChainId));
    const contractAddress = contractMap()[currentChainId].market_contract;
    const contract = new web3.eth.Contract(marketplaceABI, contractAddress);
    const rawdata = contract.methods.cancelDirectListing(listingId).encodeABI();
    const tx = {
      from: currentWallet, // Required
      to: contractAddress, // Required (for non contract deployments)
      data: rawdata, // Required
      // gasPrice: "0x02540be400", // Optional
      // gasLimit: "0x9c40", // Optional
      value: web3.utils.toWei("0", "ether"), // Optional
      // nonce: "0x0114", // Optional
    };
    return sendAndSyncTransaction(tx).then((res) => {
      return res;
    });
  };

  /*
    创建直接出售/拍卖订单：
        assetContract:NFT 合约地址
        tokenId:NFT的ID
        startTime：开始时间十位精确到秒的 unix时间戳
        secondsUntilEndTime：挂单/拍卖持续时间
        quantityToList：挂单/拍卖的NFT数量
        reservePricePerToken：拍卖单个NFT最低价，如果创建直接出售订单则此参数应当与buyoutPricePerToken相同
        buyoutPricePerToken：拍卖单个NFT一口成交价，如果创建直接出售订单，则此为单个NFT出售价格
        listingType：创建订单类型 0为直接出售 1为拍卖
    */

  const createListing = (
    assetContract: string,
    tokenId: number,
    startTime: number,
    secondsUntilEndTime: number,
    quantityToList: number,
    tokenAddress: string,
    tokenDecimals: number,
    reservePricePerToken: string,
    buyoutPricePerToken: string,
    listingType: number
  ) => {
    web3.eth.setProvider(getProvider(currentChainId));
    const contractAddress = contractMap()[currentChainId].market_contract;
    const contract = new web3.eth.Contract(marketplaceABI, contractAddress);
    // console.log(web3.utils.toWei(reservePricePerToken, 'ether'))
    console.log(
      assetContract,
      tokenId,
      startTime,
      secondsUntilEndTime,
      quantityToList,
      tokenAddress,
      ethers.utils.parseUnits(reservePricePerToken, tokenDecimals),
      ethers.utils.parseUnits(buyoutPricePerToken, tokenDecimals),
      listingType
    );
    const rawdata = contract.methods
      .createListing([
        assetContract,
        tokenId,
        startTime,
        secondsUntilEndTime,
        quantityToList,
        tokenAddress,
        ethers.utils.parseUnits(reservePricePerToken, tokenDecimals),
        ethers.utils.parseUnits(buyoutPricePerToken, tokenDecimals),
        listingType,
      ])
      .encodeABI();

    const tx = {
      from: currentWallet, // Required
      to: contractAddress, // Required (for non contract deployments)
      data: rawdata, // Required
      // gasPrice: "0x02540be400", // Optional
      // gasLimit: "0x9c40", // Optional
      value: web3.utils.toWei("0", "ether"), // Optional
      // nonce: "0x0114", // Optional
    };
    console.log(tx);
    return sendAndSyncTransaction(tx).then((res) => {
      return res;
    });
  };
  /*
    授权交易合约转移NFT
    contractAddress：NFT的合约地址
    */
  const ApprovalForAll = (contractAddress: string) => {
    web3.eth.setProvider(getProvider(currentChainId));

    const contract = new web3.eth.Contract(NFT1155ABI, contractAddress);
    const rawdata = contract.methods
      .setApprovalForAll(contractMap()[currentChainId].market_contract, true)
      .encodeABI();
    const tx = {
      from: currentWallet, // Required
      to: contractAddress, // Required (for non contract deployments)
      data: rawdata, // Required
      // gasPrice: "0x02540be400", // Optional
      // gasLimit: "0x9c40", // Optional
      value: web3.utils.toWei("0", "ether"), // Optional
      // nonce: "0x0114", // Optional
    };

    return sendAndSyncTransaction(tx).then((res) => {
      return res;
    });
  };

  /* 
    关闭拍卖：仅当拍卖还未开始或拍卖已结束了才可以关闭
    listingId:要关闭的订单的订单ID
    closeFor:要关闭订单的钱包地址
    */
  const closeAuction = (listingId: string, closeFor: string) => {
    web3.eth.setProvider(getProvider(currentChainId));
    const contractAddress = contractMap()[currentChainId].market_contract;
    const contract = new web3.eth.Contract(marketplaceABI, contractAddress);
    const rawdata = contract.methods
      .closeAuction(listingId, closeFor)
      .encodeABI();
    const tx = {
      from: currentWallet, // Required
      to: contractAddress, // Required (for non contract deployments)
      data: rawdata, // Required
      value: web3.utils.toWei("0", "ether"), // Optional
    };

    return sendAndSyncTransaction(tx).then((res) => {
      return res;
    });
  };

  const getErc20Allowance = (
    tokenAddress: string,
    account: string,
    chainId: string
  ) => {
    web3.eth.setProvider(getProvider(chainId));
    // web3.eth.setProvider(getProvider(currentChainId));
    const contractAddress = contractMap()[currentChainId].market_contract;
    const contract = new web3.eth.Contract(ERC20ABI, tokenAddress);
    const allowance = contract.methods
      .allowance(account, contractAddress)
      .call();
    return allowance;
  };
  const getErc20Balance = (
    tokenAddress: string,
    account: string,
    chainId: string
  ) => {
    web3.eth.setProvider(getProvider(chainId));
    // web3.eth.setProvider(getProvider(currentChainId));
    const contract = new web3.eth.Contract(ERC20ABI, tokenAddress);
    const balance = contract.methods.balanceOf(account).call();
    return balance;
  };

  const erc20Approve = (tokenAddress: string, amount: string) => {
    const contractAddress = contractMap()[currentChainId].market_contract;
    const contract = new web3.eth.Contract(ERC20ABI, tokenAddress);
    const rawdata = contract.methods
      .approve(contractAddress, amount)
      .encodeABI();
    const tx = {
      from: currentWallet, // Required
      to: tokenAddress, // Required (for non contract deployments)
      data: rawdata, // Required
      // gasPrice: "0x02540be400", // Optional
      // gasLimit: "0x9c40", // Optional
      value: web3.utils.toWei("0", "ether"), // Optional
      // nonce: "0x0114", // Optional
    };

    return sendAndSyncTransaction(tx).then((res) => {
      return res;
    });
  };

  const transfer721NFT = (
    conratctAddress: string,
    tokenId: Number,
    to: string
  ) => {
    web3.eth.setProvider(getProvider(currentChainId));
    const contract = new web3.eth.Contract(NFT721ABI, conratctAddress);
    const rawdata = contract.methods
      .transferFrom(currentWallet, to, tokenId)
      .encodeABI();
    const tx = {
      from: currentWallet, // Required
      to: conratctAddress, // Required (for non contract deployments)
      data: rawdata, // Required
      // gasPrice: "0x02540be400", // Optional
      // gasLimit: "0x9c40", // Optional
      value: web3.utils.toWei("0", "ether"), // Optional
      // nonce: "0x0114", // Optional
    };

    return sendAndSyncTransaction(tx).then((res) => {
      return res;
    });
  };

  const transfer1155NFT = (
    conratctAddress: string,
    tokenId: Number,
    to: string,
    amount: number
  ) => {
    web3.eth.setProvider(getProvider(currentChainId));
    const contract = new web3.eth.Contract(NFT1155ABI, conratctAddress);
    const rawdata = contract.methods
      .safeTransferFrom(currentWallet, to, tokenId, amount, [])
      .encodeABI();
    const tx = {
      from: currentWallet, // Required
      to: conratctAddress, // Required (for non contract deployments)
      data: rawdata, // Required
      // gasPrice: "0x02540be400", // Optional
      // gasLimit: "0x9c40", // Optional
      value: web3.utils.toWei("0", "ether"), // Optional
      // nonce: "0x0114", // Optional
    };

    return sendAndSyncTransaction(tx).then((res) => {
      return res;
    });
  };

  return (
    <DmwWeb3Context.Provider
      value={{
        makeOffer,
        transferToken,
        getNativeBalance,
        setTransactionList,
        transactionList,
        transactionMap,
        currentWallet,
        lastConnected,
        connector,
        connected,
        setConnected,
        connectWallet,
        disconnectWallet,
        web3,
        transferNative,
        mintNft,
        mintNftWithSignature,
        getWalletNfts,
        cancelDirectListing,
        checkIsApproveForAll,
        buyNFT,
        getBalanceOf1155,
        ApprovalForAll,
        createListing,
        getErc20Allowance,
        erc20Approve,
        transfer721NFT,
        transfer1155NFT,
        GasMap,
        currentGasPrice,
        memConnectStatus,
        nativeToken,
        globalError,
        setGlobalError,
        setCurrenChainId,
        currentChainId,
        getErc20Balance,
        acceptOffer,
        throwTxError,
        dmwConfig,
        contractMap,
        updateNetwork,
      }}
    >
      {children}
    </DmwWeb3Context.Provider>
  );
};

function useDmwWeb3() {
  const context = React.useContext(DmwWeb3Context);
  if (context === undefined) {
    throw new Error("useDmwWeb3 must be used within a DmwWeb3Provider");
  }
  return context;
}

export { DmwWeb3Provider, useDmwWeb3 };
