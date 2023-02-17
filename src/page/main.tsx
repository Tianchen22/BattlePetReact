import { Component, useEffect, useState } from "react";
import '../App.css';
import Head from "next/head";
import React from "react";
import Layout from "../component/layout";
import NFTList from "../component/NFTlist";
import { INFTPet } from "../component/NFT/pet";
import { GetNFTInfo } from "../GetOwner";


const Main = () => {    
    const [isMetamaskInstalled, setIsMetamaskInstalled] = useState<boolean>(false);
    const [ethereumAccount, setEthereumAccount] = useState<string | null>(null);    
    const [nftList, setNftList] = useState<INFTPet[]>([]);
    
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

    const handelConnect = () => {
        connectMetamaskWallet();
    };

    useEffect( () => {
        if (!ethereumAccount) {
            return;
        }
        const GetNFT = async () => {
            const data = GetNFTInfo(ethereumAccount);
            return data;
        }

        GetNFT().then((nfts) => {
            const nftArr = nfts.ownedNfts;
            console.log(nftArr);      
            if (Array.isArray(nftArr)) {
            const nftListViewData = nftArr.map((nft) => ({
                imageUrl: nft.media[0].thumbnail || "",
                name: nft.contract.address ? nft.contract.address.toString() : "",
                tokenId: nft.tokenId,
            }));
            setNftList(nftListViewData);
            console.log(nftList);      
            }    
        })
    }, [ethereumAccount]);

    return (
        <div>
            <Head>
                <title>Opensea | Clone</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <button
                        className="max-w-[120px] truncate  rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 py-2 px-5 text-white hover:opacity-80 sm:max-w-[200px]"
                        onClick={handelConnect}
                    >
                        {ethereumAccount ? ethereumAccount : "Connect MetaMask"}
            </button>
            
        
            <section className="relative h-[20vh] min-h-[200px] w-full bg-[url('/banner.avif')] bg-cover bg-center">
                <div className="absolute -bottom-1/2 left-1/2 box-border h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-md border-4 border-slate-300 bg-[url('/Collection.avif')] bg-cover sm:h-40 sm:w-40"></div>
            </section>
            <section>
                <div className="container mx-auto">
                    <div className="py-20 text-center">
                        <h2 className="text-3xl font-bold">BattlePet</h2>
                        <p>
                            <span className="text-md font-bold text-slate-500">
                            </span>
                        </p> 

                        <div>
                        { 
                            nftList.map((nftInfo) => (<img key={nftInfo.imageUrl} src={nftInfo.imageUrl} />))
                        }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Main;
