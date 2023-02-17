// Setup: npm install alchemy-sdk
import { Alchemy, Network } from "alchemy-sdk";

// Alchemy Setting
const config = {
  apiKey: "8zmSVVg5gWwYQaoHcIeDVTuWaMhq_0qs", 
  network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(config);

let instance = null;

export async function GetNFTInfo(address) {
  
  if (!instance &&  address != "") {
    instance = await alchemy.nft.getNftsForOwner(address);
  }

  return instance;
}