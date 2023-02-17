import { FC, ReactNode, useEffect, useState } from "react";
import { Account } from "./account";

const Layout = () => {
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
          Account.SaveUserAddress(accounts[0]);
        })
        .catch((error: any) => {
            alert(`Something went wrong: ${error}`);
        });
    }

    const handelConnect = () => {
        connectMetamaskWallet();
    };

    return (
        <div className="flex min-h-screen w-full flex-col overflow-hidden">
            <header className="border-b-2 bg-white">
                <div className="container mx-auto flex justify-between py-4 px-4 sm:px-0">
                    <h1 className="flex cursor-pointer items-center font-extrabold">
                        <img src="/opensea.svg" width={36} height={36} alt={""} />
                        <span className="pl-2 text-xl sm:pl-4 sm:text-2xl">
                            Opensea
                        </span>
                    </h1>
                    <button
                        className="max-w-[120px] truncate  rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 py-2 px-5 text-white hover:opacity-80 sm:max-w-[200px]"
                        onClick={handelConnect}
                    >
                        {ethereumAccount ? ethereumAccount : "Connect MetaMask"}
                    </button>
                </div>
            </header>
            <footer className="bg-blue-500">
                <div className="container mx-auto">
                    <p className="py-4 text-center text-white">
                        © YANG Tianchen 2023
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
