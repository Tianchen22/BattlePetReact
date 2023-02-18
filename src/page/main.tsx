import { Component, useEffect, useState } from "react";
import '../App.css';
import Head from "next/head";
import React from "react";
import Layout from "../component/layout";
import NFTList from "../component/NFTlist";
import { INFTPet } from "../component/NFT/pet";
import { GetNFTInfo } from "../GetOwner";
import NFTImageList from "../component/NFTlist";


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

    
    const handleBattle = () => {
    };

    return (
        
        <div>
            <Head>
                <title>Opensea | Clone</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="/styles.css" type="text/css" />
            </Head>
            
            <button
                onClick={handleBattle}
                style={{ position: 'fixed', top: 0, right: 0 , zIndex: 1 }}
            >
                Go Battle
            </button>

            <button
                onClick={handelConnect}
                style={{ position: 'fixed', top: 0, left: 0 , zIndex: 1 }}
            >
                {ethereumAccount ? 'Connected' : 'Connect MetaMask'}
            </button>
        
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
                           <NFTImageList nftList={nftList} />
                        }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Main;
