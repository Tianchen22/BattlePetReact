// Setup: npm install alchemy-sdk
import { Alchemy, Network } from "alchemy-sdk";

// Alchemy Setting
const config = {
  apiKey: "8zmSVVg5gWwYQaoHcIeDVTuWaMhq_0qs", 
  network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(config);

export let instance = "";
export let Account = {
    SaveUserAddress: function(address) {
        console.log(instance);
        instance = address;
        console.log(instance);
    },
    GetUserAddress: function() {
        console.log(instance);
        return instance;
    }
  };


/*
export function SaveUserAddress(address) {
    console.log("SaveUserAddress");
    instance = address;
    GetUserAddress();
    console.log(instance);
}

export function GetUserAddress(){
    console.log("GetUserAddress");
    console.log(instance);
    if (instance) {
        return instance;
    } else {
        return console.error("The user address");
    }
  }

  */