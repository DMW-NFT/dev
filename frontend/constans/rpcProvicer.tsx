export default function getProvider(ChainId) {


    const providerDict = {
        5: "https://eth-goerli.g.alchemy.com/v2/S8xDLVufmTFUnjHYkZDOW5NkQtQG8q8J",
        1: "https://eth-mainnet.g.alchemy.com/v2/llwX-mdXhLQOZUYWOHg-FvzPzrK_vpaY",
        80001:"https://matic-testnet-archive-rpc.bwarelabs.com",
        97:"https://data-seed-prebsc-2-s1.binance.org:8545"
    }


    return providerDict[ChainId]

}