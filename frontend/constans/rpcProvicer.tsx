export default function getProvider(ChainId) {


    const providerDict = {
        5: "https://polygon-mumbai.g.alchemy.com/v2/NtYAB0Vu9joiZkUgIUlFSOCoi3LRbGU1",
        1: "https://eth-mainnet.g.alchemy.com/v2/llwX-mdXhLQOZUYWOHg-FvzPzrK_vpaY"
    }


    return providerDict[ChainId]

}