import { useEffect, useState } from "react";
import '../App.css';
import React from "react";
 
const Wallet = () => {
 const [isMetamaskInstalled, setIsMetamaskInstalled] = useState<boolean>(false);
 const [ethereumAccount, setEthereumAccount] = useState<string | null>(null);
 
 useEffect(() => {
   if((window as any).ethereum){
     //check if Metamask wallet is installed
     setIsMetamaskInstalled(true);
   }
 },[]);
 
 //Does the User have an Ethereum wallet/account?
 async function connectMetamaskWallet(): Promise<void> {
   //to get around type checking
   (window as any).ethereum
     .request({
         method: "eth_requestAccounts",
     })
     .then((accounts : string[]) => {
       setEthereumAccount(accounts[0]);
     })
     .catch((error: any) => {
         alert(`Something went wrong: ${error}`);
     });
 }
 
  return (
    <div className="App App-header">
      {
        isMetamaskInstalled ? (
          <div>
          {
            (ethereumAccount === null) ? (
              <button onClick={connectMetamaskWallet}>Connect Your Metamask Wallet</button>
            ) : (
              <p>
                ETH wallet connected
              </p>
            )
          }
          </div>
        ) : (
          <p>Install Your Metamask wallet</p>
        )
      }

    </div>
  );
 
}
 
export default Wallet;