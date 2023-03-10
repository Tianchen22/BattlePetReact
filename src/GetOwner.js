// Setup: npm install alchemy-sdk
import { Alchemy, Network } from "alchemy-sdk";

// Alchemy Setting
const config_GOERLI = {
  apiKey: "8zmSVVg5gWwYQaoHcIeDVTuWaMhq_0qs", 
  network: Network.ETH_GOERLI,
};
const alchemy_GOERLI = new Alchemy(config_GOERLI);


// Alchemy Setting
const config_SEPOLIA = {
  apiKey: "8zmSVVg5gWwYQaoHcIeDVTuWaMhq_0qs", 
  network: Network.ETH_SEPOLIA,
};
const alchemy_SEPOLIA = new Alchemy(config_SEPOLIA);

export const ADDRESS_NFT = "0xe7eee2f6f162355013bd4eabc1a69f4f85621cf9";
export const ADDRESS_ITEM = "0x8a9cf0637246c6b256e7e044aac94a36e7f8dad7";


let instance = null;

export async function GetNFTInfo(address) {
  
  if (!instance &&  address != "") {
    instance = await alchemy_GOERLI.nft.getNftsForOwner(address);
    console.log(instance);
  }

  return instance;
}