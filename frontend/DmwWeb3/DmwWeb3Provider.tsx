import React, { useEffect, useMemo, useState } from 'react';
import DmwWeb3Context from './DmwWeb3context'
import Web3 from "web3";
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import getProvider from '../../frontend/constans/rpcProvicer'
import NFT1155ABI from '../../frontend/contract/NFT1155.json'
import NFT721ABI from '../../frontend/contract/NFT721.json'
import marketplaceABI from '../../frontend/contract/MARKETPLACE.json'
import ERC20ABI from '../contract/ERC20.json'
import { BigNumber } from 'ethers';


const DmwWeb3Provider = ({ children }) => {
    // const mnemonic = bip39.generateMnemonic()

    const connector = useWalletConnect();
    // ethersProvider.getBlockNumber().then((res => console.log('ether')))
    const [currentWallet, setCurrentWallet] = useState('');
    const [currentChainId, setCurrenChainId] = useState('5');
    const [connected, setConnected] = useState(false);
    const [lastConnected, setLastConnected] = useState(true)
    const [transactionMap, setTransactionMap] = useState({})
    const [transactionList, setTransactionList] = useState([])
    const web3 = new Web3()


    useEffect(() => {
        if (connector.connected) {
            setCurrentWallet(connector.accounts[0]);
            setConnected(true);
            setCurrenChainId(String(connector.chainId));
            console.log("is connected!---,-,-", currentWallet, connector.accounts[0])
        }
    }, [])



    useEffect(() => {
        (connected && currentChainId) ? web3.eth.setProvider(getProvider(currentChainId)) : null
    }, [currentChainId, connected])


    // useEffect(() => {
    //     console.log(transactionList)
    //     console.log(transactionMap)
    //     console.log(transactionList[transactionList.length - 1])
    // }, [transactionList, transactionMap])

    // 转移
    const transferERC20 = (to: string, amount: string) => {
        web3.eth.setProvider(getProvider('5'));
        const contractAddress = "0x0B99a72bebFE91B14529ea412eb2B1dBEE604c4C"
        const contract = new web3.eth.Contract(ERC20ABI, contractAddress)
        const rawdata = contract.methods.transferFrom(currentWallet, to, web3.utils.toWei(amount, 'ether')).encodeABI()
        const tx = {
            from: currentWallet, // Required
            to: contractAddress, // Required (for non contract deployments)
            data: rawdata, // Required
            // gasPrice: "0x02540be400", // Optional
            // gasLimit: "0x9c40", // Optional
            value: web3.utils.toWei("0", 'ether'), // Optional
            // nonce: "0x0114", // Optional
        };
        connector
            .sendTransaction(tx)

            .then(result => {
                // Returns transaction id (hash)
                console.log(result);
                syncTransactionSatus(result);
            })
            .catch(error => {
                // Error returned when rejected
                console.error(error);
            });
    }

    const transferToken = (token: string, to: string, amount: string) => {
        if ("USDT" == token) {
            transferERC20(to, amount)
        }
        if ("ETH" == token) {
            tranferNative(to, amount)
        }
    }


    const getNativeBalance = (address) => {
        web3.eth.setProvider(getProvider('5'))
        const balance = web3.eth.getBalance(address).then((res) => {
            return web3.utils.fromWei(res, 'ether')
        })
        return balance
    }

    // 链接第三方钱包
    const connectWallet = async () => {
        console.log('Connecting')
        connector.connect().then((res) => {
            console.log(res);
            setConnected(true);
            setCurrentWallet(res.accounts[0]);
            console.log(res.accounts[0], '????????')
            setCurrenChainId(connector.chainId);
            setLastConnected(true)
            web3.eth.setProvider(getProvider(currentChainId));
            web3.eth.getBlockNumber().then((res => console.log(res)))
            return res
        }).catch(error => {
            // Error returned when rejected
            console.log(error)
            return error
        });;

        // if (connector.connected) {
        //     console.log(connector.accounts[0], 'is connected');
        //     setCurrentWallet(connector.accounts[0]);
        //     setCurrenChainId(connector.chainId);
        //     console.log(currentChainId, getProvider(currentChainId));
        //     web3.eth.setProvider(getProvider(currentChainId));
        //     web3.eth.getBlockNumber().then((res => console.log(res)))
        // }

    }
    //断开第三方钱包链接
    const disconnectWallet = () => {
        console.log('disonnecting');
        connector.killSession();
        setConnected(false);
        setLastConnected(false)
        if (!connector.connected) {
            console.log('disconnected');
            setCurrentWallet(null);
            // setCurrenChainId(connector.chainId);
        }
    }

    const tranferNative = (to: string, value: string) => {

        const tx = {
            from: currentWallet, // Required
            to: to, // Required (for non contract deployments)
            value: web3.utils.toWei(value, 'ether'), // Optional

        };

        connector
            .sendTransaction(tx)
            .then(result => {
                // Returns transaction id (hash)
                console.log(result);
                syncTransactionSatus(result);
            })
            .catch(error => {
                // Error returned when rejected
                console.error(error);
            });

    }

    const mintNft = () => {
        const contractAddress = "0x15Ca27efa25886b830269f614ad2Af473905d09c"

        const contract = new web3.eth.Contract(NFT1155ABI, contractAddress)

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
                syncTransactionSatus(result);
            })
            .catch(error => {
                // Error returned when rejected
                console.error(error);
            });
    }
    const mintNftWithSignature = (SignedPayload, Signature) => {
        const contractAddress = "0x0ba15eE8874b930c49c7E65fFdEDf41BE9D0847d"

        const contract = new web3.eth.Contract(NFT1155ABI, contractAddress)

        const rawdata = contract.methods.mintWithSignature(SignedPayload, Signature).encodeABI()
        console.log(rawdata);
        const tx = {
            from: currentWallet, // Required
            to: contractAddress, // Required (for non contract deployments)
            data: rawdata, // Required
            // gasPrice: "0x02540be400", // Optional
            // gasLimit: "0x9c40", // Optional
            value: web3.utils.toWei('0', 'ether'), // Optional
            // nonce: "0x0114", // Optional
        };

        // Send transaction
        connector
            .sendTransaction(tx)

            .then(result => {
                // Returns transaction id (hash)
                console.log(result);
                syncTransactionSatus(result);
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

    // 检测地址：account是否向某地址：operator授权所有NFT地址nftContractAddress，返回bool，true为已授权，false反之
    const checkIsApproveForAll = (nftContractAddress: string, account: string, operator: string, contractType: string): boolean => {

        web3.eth.setProvider(getProvider('5'));
        const contract = new web3.eth.Contract((contractType == "1155") ? NFT1155ABI : NFT721ABI, nftContractAddress)
        const isApprovedForAll = contract.methods.isApprovedForAll(account, '0x94bA21689AccF38EAcE5Ef53e1f64F63fB38C3a4').call()
        return isApprovedForAll
    }
    const getBalanceOf1155 = (nftContractAddress: string, account: string, tokenId: number): number => {

        web3.eth.setProvider(getProvider('5'));
        const contract = new web3.eth.Contract(NFT1155ABI, nftContractAddress)
        const isApprovedForAll = contract.methods.balanceOf(account, tokenId).call()
        return isApprovedForAll
    }


    const syncTransactionSatus = async (txHash: string) => {
        web3.eth.setProvider(getProvider('5'));
        setTransactionList([...transactionList, txHash])
        setTransactionMap({ ...transactionMap, [txHash]: { "payload": null, "state": "pending" } })

        let syncInterval = setInterval(() => {

            web3.eth.getTransactionReceipt(txHash).then((res) => {
                // console.log(getProvider('5'))
                res ? console.log(res) : console.log(txHash, "pending")
                if (res) {
                    console.log(JSON.stringify(res))
                    clearInterval(syncInterval)
                    setTransactionMap({ ...transactionMap, [txHash]: { "payload": res, "state": res.status ? "comfirmed" : "reversed" } })
                }
            })

        }, 5000)
    }

    /* 
        listingId:订单的ID
        buyFor：NFT购买后发送给谁
        quantityToBuy：想要购买的NFT数量
        currency：支付的代币的合约地址（ETH:0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee）
        totalPrice:= NFT单价 * quantityToBuy
    */
    const buyNFT = async (listingId: number, quantityToBuy: number, currency: string, totalPrice: string) => {
        web3.eth.setProvider(getProvider(currentChainId));
        console.log("buy with currency",currency,totalPrice)
        const contractAddress = "0x94bA21689AccF38EAcE5Ef53e1f64F63fB38C3a4"
        const contract = new web3.eth.Contract(marketplaceABI, contractAddress)
        const rawdata = contract.methods.buy(listingId, currentWallet, quantityToBuy, currency, web3.utils.toWei(totalPrice, 'ether')).encodeABI()
        console.log(rawdata);
        const tx = {
            from: currentWallet, // Required
            to: contractAddress, // Required (for non contract deployments)
            data: rawdata, // Required
            // gasPrice: "0x02540be400", // Optional
            // gasLimit: "0x9c40", // Optional
            value: (currency =="0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE") ? web3.utils.toWei(totalPrice, 'ether') : web3.utils.toWei("0", 'ether'), // Optional
            // nonce: "0x0114", // Optional
        };
        console.log(tx)
        // Send transaction
        connector
            .sendTransaction(tx)

            .then(result => {
                // Returns transaction id (hash)
                console.log(result);
                syncTransactionSatus(result);
            })
            .catch(error => {
                // Error returned when rejected
                // console.error(error);
                throw error
            });
    }

    /* 
        listingId:订单的ID
        quantityWanted：想要购买的NFT数量
        currency：支付的代币的合约地址（ETH:0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee）
        pricePerToken:每个NFT支付多少代币
        expirationTimestamp：过期时间
    */
    const makeOffer = async (listingId: number, quantityWanted: number, currency: string, pricePerToken: string, expirationTimestamp: number) => {
        web3.eth.setProvider(getProvider(currentChainId));
        const contractAddress = "0x94bA21689AccF38EAcE5Ef53e1f64F63fB38C3a4"
        const contract = new web3.eth.Contract(marketplaceABI, contractAddress)
        const rawdata = contract.methods.offer(listingId, quantityWanted, currency, web3.utils.toWei(pricePerToken, 'ether'), expirationTimestamp).encodeABI()
        const tx = {
            from: currentWallet, // Required
            to: contractAddress, // Required (for non contract deployments)
            data: rawdata, // Required
            // gasPrice: "0x02540be400", // Optional
            // gasLimit: "0x9c40", // Optional
            value: web3.utils.toWei("0", 'ether'), // Optional
            // nonce: "0x0114", // Optional
        };
        connector
            .sendTransaction(tx)

            .then(result => {
                // Returns transaction id (hash)
                console.log(result);
                syncTransactionSatus(result);
            })
            .catch(error => {
                // Error returned when rejected
                console.error(error);
            });
    }

    /* 
    acceptOffer：
        listingId:订单的ID
        offeror：报价人的钱包地址
        currency：报价人的offer的支付代币的合约地址（USDT（fake）:0x0B99a72bebFE91B14529ea412eb2B1dBEE604c4C
        pricePerToken:每个NFT支付多少代币
    */
    const acceptOffer = async (listingId: number, offeror: string, currency: string, pricePerToken: string) => {
        web3.eth.setProvider(getProvider(currentChainId));
        const contractAddress = "0x94bA21689AccF38EAcE5Ef53e1f64F63fB38C3a4"
        const contract = new web3.eth.Contract(marketplaceABI, contractAddress)
        const rawdata = contract.methods.acceptOffer(listingId, offeror, currency, web3.utils.toWei(pricePerToken, 'ether')).encodeABI()
        const tx = {
            from: currentWallet, // Required
            to: contractAddress, // Required (for non contract deployments)
            data: rawdata, // Required
            // gasPrice: "0x02540be400", // Optional
            // gasLimit: "0x9c40", // Optional
            value: web3.utils.toWei("0", 'ether'), // Optional
            // nonce: "0x0114", // Optional
        };
        connector
            .sendTransaction(tx)

            .then(result => {
                // Returns transaction id (hash)
                console.log(result);
                syncTransactionSatus(result);
            })
            .catch(error => {
                // Error returned when rejected
                console.error(error);
            });
    }
    /* 
    cancelDirectListing：取消直接挂单
        listingId:订单的ID
    */
    const cancelDirectListing = async (listingId: BigNumber) => {
        web3.eth.setProvider(getProvider(currentChainId));
        const contractAddress = "0x94bA21689AccF38EAcE5Ef53e1f64F63fB38C3a4"
        const contract = new web3.eth.Contract(marketplaceABI, contractAddress)
        const rawdata = contract.methods.cancelDirectListing(listingId).encodeABI()
        const tx = {
            from: currentWallet, // Required
            to: contractAddress, // Required (for non contract deployments)
            data: rawdata, // Required
            // gasPrice: "0x02540be400", // Optional
            // gasLimit: "0x9c40", // Optional
            value: web3.utils.toWei("0", 'ether'), // Optional
            // nonce: "0x0114", // Optional
        };
        connector
            .sendTransaction(tx)

            .then(result => {
                // Returns transaction id (hash)
                console.log(result);
                syncTransactionSatus(result);
            })
            .catch(error => {
                // Error returned when rejected
                console.error(error);
            });
    }

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

    const createListing = (assetContract: string, tokenId: number, startTime: number, secondsUntilEndTime: number, quantityToList: number, reservePricePerToken: string, buyoutPricePerToken: string, listingType: number) => {
        web3.eth.setProvider(getProvider(currentChainId));
        const contractAddress = "0x94bA21689AccF38EAcE5Ef53e1f64F63fB38C3a4"
        const contract = new web3.eth.Contract(marketplaceABI, contractAddress)
        // console.log(web3.utils.toWei(reservePricePerToken, 'ether'))
        console.log(assetContract, tokenId, startTime, secondsUntilEndTime, quantityToList, reservePricePerToken, buyoutPricePerToken, listingType)
        const rawdata = contract.methods.createListing([assetContract, tokenId, startTime, secondsUntilEndTime, quantityToList, '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', web3.utils.toWei(reservePricePerToken, 'ether'), web3.utils.toWei(buyoutPricePerToken, 'ether'), listingType]).encodeABI()

        const tx = {
            from: currentWallet, // Required
            to: contractAddress, // Required (for non contract deployments)
            data: rawdata, // Required
            // gasPrice: "0x02540be400", // Optional
            // gasLimit: "0x9c40", // Optional
            value: web3.utils.toWei("0", 'ether'), // Optional
            // nonce: "0x0114", // Optional
        };
        console.log(tx);
        connector
            .sendTransaction(tx)

            .then(result => {
                // Returns transaction id (hash)
                console.log(result);
                syncTransactionSatus(result);
            })
            .catch(error => {
                // Error returned when rejected
                console.error(error);
            });
    }
    /*
    授权交易合约转移NFT
    contractAddress：NFT的合约地址
    */
    const ApprovalForAll = (contractAddress: string) => {
        web3.eth.setProvider(getProvider(currentChainId));

        const contract = new web3.eth.Contract(NFT1155ABI, contractAddress)
        const rawdata = contract.methods.setApprovalForAll('0x94bA21689AccF38EAcE5Ef53e1f64F63fB38C3a4', true).encodeABI()
        const tx = {
            from: currentWallet, // Required
            to: contractAddress, // Required (for non contract deployments)
            data: rawdata, // Required
            // gasPrice: "0x02540be400", // Optional
            // gasLimit: "0x9c40", // Optional
            value: web3.utils.toWei("0", 'ether'), // Optional
            // nonce: "0x0114", // Optional
        };

        connector
            .sendTransaction(tx)

            .then(result => {
                // Returns transaction id (hash)
                console.log(result);
                syncTransactionSatus(result);
            })
            .catch(error => {
                // Error returned when rejected
                console.error(error);
            });
    }

    /* 
    关闭拍卖：仅当拍卖还未开始或拍卖已结束了才可以关闭
    listingId:要关闭的订单的订单ID
    closeFor:要关闭订单的钱包地址
    */
    const closeAuction = (listingId: string, closeFor: string) => {
        web3.eth.setProvider(getProvider(currentChainId));
        const contractAddress = "0x94bA21689AccF38EAcE5Ef53e1f64F63fB38C3a4"
        const contract = new web3.eth.Contract(marketplaceABI, contractAddress)
        const rawdata = contract.methods.closeAuction(listingId, closeFor).encodeABI()
        const tx = {
            from: currentWallet, // Required
            to: contractAddress, // Required (for non contract deployments)
            data: rawdata, // Required
            value: web3.utils.toWei("0", 'ether'), // Optional
        };

        connector
            .sendTransaction(tx)
            .then(result => {
                // Returns transaction id (hash)
                console.log(result);
                syncTransactionSatus(result);
            })
            .catch(error => {
                // Error returned when rejected
                console.error(error);
            });
    }


    const getErc20Allowance = (tokenAddress: string, account: string) => {
        web3.eth.setProvider(getProvider(currentChainId));
        const contractAddress = "0x94bA21689AccF38EAcE5Ef53e1f64F63fB38C3a4"
        const contract = new web3.eth.Contract(ERC20ABI, tokenAddress)
        const allowance = contract.methods.allowance(account, contractAddress).call()
        return allowance
    }

    const erc20Approve = (tokenAddress: string, amount: string) => {
        web3.eth.setProvider(getProvider(currentChainId));
        const contractAddress = "0x94bA21689AccF38EAcE5Ef53e1f64F63fB38C3a4"
        const contract = new web3.eth.Contract(ERC20ABI, tokenAddress)
        const rawdata = contract.methods.approve(contractAddress, web3.utils.toWei(amount, 'ether')).encodeABI()
        const tx = {
            from: currentWallet, // Required
            to: tokenAddress, // Required (for non contract deployments)
            data: rawdata, // Required
            // gasPrice: "0x02540be400", // Optional
            // gasLimit: "0x9c40", // Optional
            value: web3.utils.toWei("0", 'ether'), // Optional
            // nonce: "0x0114", // Optional
        };

        connector
            .sendTransaction(tx)

            .then(result => {
                // Returns transaction id (hash)
                console.log(result);
                syncTransactionSatus(result);
            })
            .catch(error => {
                // Error returned when rejected
                console.error(error);
            });
    }  

    const transfer721NFT = (conratctAddress:string,tokenId:Number,to:string) =>{
        web3.eth.setProvider(getProvider(currentChainId));
        const contract = new web3.eth.Contract(NFT721ABI, conratctAddress)
        const rawdata = contract.methods.transferFrom(currentWallet, to,tokenId).encodeABI()
        const tx = {
            from: currentWallet, // Required
            to: conratctAddress, // Required (for non contract deployments)
            data: rawdata, // Required
            // gasPrice: "0x02540be400", // Optional
            // gasLimit: "0x9c40", // Optional
            value: web3.utils.toWei("0", 'ether'), // Optional
            // nonce: "0x0114", // Optional
        };

        connector
            .sendTransaction(tx)

            .then(result => {
                // Returns transaction id (hash)
                console.log(result);
                syncTransactionSatus(result);
            })
            .catch(error => {
                // Error returned when rejected
                console.error(error);
            });
    }

    const transfer1155NFT = (conratctAddress:string,tokenId:Number,to:string,amount:number) =>{
        web3.eth.setProvider(getProvider(currentChainId));
        const contract = new web3.eth.Contract(NFT1155ABI, conratctAddress)
        const rawdata = contract.methods.safeTransferFrom(currentWallet, to,tokenId,amount,[]).encodeABI()
        const tx = {
            from: currentWallet, // Required
            to: conratctAddress, // Required (for non contract deployments)
            data: rawdata, // Required
            // gasPrice: "0x02540be400", // Optional
            // gasLimit: "0x9c40", // Optional
            value: web3.utils.toWei("0", 'ether'), // Optional
            // nonce: "0x0114", // Optional
        };

        connector
            .sendTransaction(tx)

            .then(result => {
                // Returns transaction id (hash)
                console.log(result);
                syncTransactionSatus(result);
            })
            .catch(error => {
                // Error returned when rejected
                console.error(error);
            });
    }




    return (
        <DmwWeb3Context.Provider value={{ makeOffer,transferToken, getNativeBalance, setTransactionList, transactionList, transactionMap, currentWallet, lastConnected, connector, connected, setConnected, connectWallet, disconnectWallet, web3, tranferNative, mintNft, mintNftWithSignature, getWalletNfts, checkIsApproveForAll, buyNFT, getBalanceOf1155, ApprovalForAll, createListing, getErc20Allowance,erc20Approve,transfer721NFT,transfer1155NFT }}>
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