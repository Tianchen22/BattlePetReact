import { Component, useEffect, useState } from "react";
import '../App.css';
import Head from "next/head";
import React from "react";
import Layout from "../component/layout";
import NFTList from "../component/NFTlist";
import { INFTPet } from "../component/NFT/pet";
import { GetNFTInfo, ADDRESS_NFT, ADDRESS_ITEM } from "../GetOwner";
import NFTImageList from "../component/NFTlist";
import { id } from "alchemy-sdk/dist/src/api/utils";
import { isTypeAliasDeclaration } from "typescript";


const Main = () => {    
    const [isMetamaskInstalled, setIsMetamaskInstalled] = useState<boolean>(false);
    const [ethereumAccount, setEthereumAccount] = useState<string | null>(null);    
    const [nftList, setNftList] = useState<INFTPet[]>([]);     
    const [switchList, setSwitchList] = useState<Number>(0);     


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

    function GetNFTLists() {
        const GetNFT = async () => {
            const data = GetNFTInfo(ethereumAccount);
            return data;
        }

        GetNFT().then((nfts) => {
                const nftArr = nfts.ownedNfts;
                console.log(nftArr);    
                const nftListViewData: any = [];
                nftArr.forEach((nft: any) => {
                    try {
                        if (nft.contract.address == ADDRESS_NFT) {
                            const imageUrl = nft.media[0].thumbnail || "";
                            const name = nft.contract.name ? nft.contract.name.toString() : "";
                            const tokenId = nft.tokenId;
                            const balance = 1;
                            nftListViewData.push({ imageUrl, name, tokenId, balance });
                        }
                    } catch (error) {
                        console.log(error);
                    }
                });
            setNftList(nftListViewData);
            console.log(nftList);   
            }
        )
    }  

    function GetItemLists() {
        const GetNFT = async () => {
            const data = GetNFTInfo(ethereumAccount);
            return data;
        }

        GetNFT().then((nfts) => {
                const nftArr = nfts.ownedNfts;
                console.log(nftArr);    
                const nftListViewData: any = [];
                nftArr.forEach((nft: any) => {
                    try {
                        if (nft.contract.address == ADDRESS_ITEM) {
                            const imageUrl = nft.media[0].gateway || "";
                            const name = nft.title ? nft.title.toString() : "";
                            const tokenId = nft.tokenId;
                            const balance = nft.balance;
                            nftListViewData.push({ imageUrl, name, tokenId, balance });
                        }
                    } catch (error) {
                        console.log(error);
                    }
                });
            setNftList(nftListViewData);
            console.log(nftList);   
            }
        )
    }  

    
    useEffect( () => {
        if (!ethereumAccount) {
            return;
        }
        
        GetNFTLists();       
    }, [ethereumAccount]);

    const handleLists = (val: number) => {
        console.log("HANDLE NFT LISTS" + val);
        if (val == 1) {
            GetNFTLists();
        }

        if (val == 2) {
            GetItemLists();
        }
    };


    return (
        
        <div>
            <Head>
                <title>Opensea | Clone</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="/styles.css" type="text/css" />
            </Head>
            
            
            <button
                onClick={handelConnect}
                style={{ position: 'fixed', top: 0, right: 0 , zIndex: 1 }}
            >
                {ethereumAccount ? 'Connected' : 'Connect MetaMask'}
            </button>
        
             <section>
                <div className="container mx-auto">
                    <div className="py-20 text-center">
                        <button
                            onClick={() => handleLists(1)}
                            style={{ position: 'fixed', top: 0, left: 0 , zIndex: 1 }}
                        >
                            NFTs
                        </button>
                        <button
                            onClick={() => handleLists(2)}
                            style={{ position: 'fixed', top: 0, left: 75 , zIndex: 1 }}
                        >
                            Items
                        </button>

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
