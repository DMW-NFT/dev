import React, { useEffect, useMemo, useState } from 'react';
import DmwWeb3Context from './DmwWeb3context'
import Web3 from "web3";
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import getProvider from '../components/rpcProvider'
import NFT1155ABI from '../contract/NFT1155.json'
import NFT721ABI from '../contract/NFT721.json'
import marketplaceABI from '../contract/MARKETPLACE.json'
import { BigNumber } from 'ethers';


const DmwWeb3Provider = ({ children }) => {
    // const mnemonic = bip39.generateMnemonic()

    const connector = useWalletConnect();
    // ethersProvider.getBlockNumber().then((res => console.log('ether')))
    const [currentWallet, setCurrentWallet] = useState('');
    const [currentChainId, setCurrenChainId] = useState('5');
    const [connected, setConnected] = useState(false);
    const [transactionMap, setTransactionMap] = useState({})
    const [transactionList, setTransactionList] = useState([])
    const web3 = new Web3()

    useEffect(() => {
        (connected && currentChainId) ? web3.eth.setProvider(getProvider(currentChainId)) : null
    }, [currentChainId, connected])

    useEffect(() => {
        console.log(transactionList)
        console.log(transactionMap)
    }, [transactionList, transactionMap])

    // 链接第三方钱包
    const connectWallet = async () => {
        console.log('Connecting')
        connector.connect().then((res) => {
            setConnected(true);
            setCurrentWallet(connector.accounts[0]);
            setCurrenChainId(connector.chainId);
            web3.eth.setProvider(getProvider(currentChainId));
            web3.eth.getBlockNumber().then((res => console.log(res)))
            return res
        }).catch(error => {
            // Error returned when rejected
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

        if (!connector.connected) {
            console.log('disconnected');
            // setCurrentWallet(connector.accounts[0]);
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
    const mintNftWithSignature = () => {
        const contractAddress = "0x0ba15eE8874b930c49c7E65fFdEDf41BE9D0847d"

        const contract = new web3.eth.Contract(NFT1155ABI, contractAddress)

        const rawdata = contract.methods.mintWithSignature(['0xe403E8011CdB251c12ccF6911F44D160699CCC3c', '0x0000000000000000000000000000000000000000', 0, '0x0000000000000000000000000000000000000000', '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', 'https://gateway.ipfscdn.io/ipfs/QmZJ2uN4bM81FTbLzGNHzXeXSSdEF9dJGmvi48V5cWXETd/0', 10, '10000000000000000', '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', 1666072910, 88066072910, '0x6232313062663039663364313431373339303530646365656664356136656131'], '0xc4e4ab356e0bce66fe4e39653a6526b572932c5de5f9221a1c02e292e4ec22d453a03e18cf32b9a8a30239b6b3662f22d409a605c133aad2af306a539d503b331b').encodeABI()
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

        web3.eth.setProvider(getProvider(currentChainId));
        const contract = new web3.eth.Contract((contractType == "1155") ? NFT1155ABI : NFT721ABI, nftContractAddress)
        const isApprovedForAll = contract.methods.isApprovedForAll(account, operator).call().then((res) => {
            // console.log(res)
            // res ? console.log(nftContractAddress, 'is approved to ', operator) : console.log(nftContractAddress, 'is not approved to ', operator)
            return res
        })
        return isApprovedForAll
    }

    const syncTransactionSatus = async (txHash: string) => {
        web3.eth.setProvider(getProvider(currentChainId));
        setTransactionList([...[transactionList, txHash]])
        setTransactionMap({ ...transactionMap, [txHash]: { "payload": null, "state": "pending" } })

        let syncInterval = setInterval(() => {

            web3.eth.getTransactionReceipt(txHash).then((res) => {
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
    const buyNFT = async (listingId: number, buyFor: string, quantityToBuy: number, currency: string, totalPrice: string) => {
        web3.eth.setProvider(getProvider(currentChainId));
        const contractAddress = "0x94bA21689AccF38EAcE5Ef53e1f64F63fB38C3a4"
        const contract = new web3.eth.Contract(marketplaceABI, contractAddress)
        const rawdata = contract.methods.buy(listingId, buyFor, quantityToBuy, currency, web3.utils.toWei(totalPrice, 'ether')).encodeABI()
        console.log(rawdata);
        const tx = {
            from: currentWallet, // Required
            to: contractAddress, // Required (for non contract deployments)
            data: rawdata, // Required
            // gasPrice: "0x02540be400", // Optional
            // gasLimit: "0x9c40", // Optional
            value: (currency == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") ? web3.utils.toWei(totalPrice, 'ether') : web3.utils.toWei("0", 'ether'), // Optional
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
                console.error(error);
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

    
    const createListing = (assetContract:string, tokenId:number, startTime:number, secondsUntilEndTime:number, quantityToList:number, currencyToAccept:string, reservePricePerToken:string, buyoutPricePerToken:string, listingType:number) => {
        web3.eth.setProvider(getProvider(currentChainId));
        const contractAddress = "0x94bA21689AccF38EAcE5Ef53e1f64F63fB38C3a4"
        const contract = new web3.eth.Contract(marketplaceABI, contractAddress)
        const rawdata = contract.methods.createListing([assetContract, tokenId, startTime, secondsUntilEndTime, quantityToList, currencyToAccept, web3.utils.toWei(reservePricePerToken), web3.utils.toWei(buyoutPricePerToken), listingType]).encodeABI()
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

    const ApprovalForAll = (operator: string, approved: boolean) => {
        web3.eth.setProvider(getProvider(currentChainId));
        const contractAddress = "0x94bA21689AccF38EAcE5Ef53e1f64F63fB38C3a4"
        const contract = new web3.eth.Contract(NFT1155ABI, contractAddress)
        const rawdata = contract.methods.setApprovalForAll(operator, approved).encodeABI()
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

        <DmwWeb3Context.Provider value={{ currentWallet, connector, connected, connectWallet, disconnectWallet, web3, tranferNative, mintNft, mintNftWithSignature, getWalletNfts, checkIsApproveForAll, buyNFT }}>
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