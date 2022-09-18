import NFT1155 from './NFT1155.json'


export default function abiProvider(contractType) {


    const abi = (contractType === "1155") ? NFT1155 : null

    return abi

}