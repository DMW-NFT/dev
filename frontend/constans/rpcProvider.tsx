export default function getLocalProvider(ChainId) {


    const providerDict = {
        5: "https://eth-goerli.g.alchemy.com/v2/S8xDLVufmTFUnjHYkZDOW5NkQtQG8q8J",
        1: "https://eth-mainnet.g.alchemy.com/v2/llwX-mdXhLQOZUYWOHg-FvzPzrK_vpaY",
        80001:"https://matic-testnet-archive-rpc.bwarelabs.com",
        97:"https://data-seed-prebsc-2-s1.binance.org:8545",
        56:"https://bsc-dataseed.binance.org",
        137:"https://polygon-mainnet.g.alchemy.com/v2/CvOPnjeuXiszPeQeBjpy3J7jT1exLH-n"
    }


    return providerDict[ChainId]

}