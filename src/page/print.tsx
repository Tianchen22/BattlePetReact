import '../App.css';
import React, { useEffect, useState } from "react";
import {GetNFTInfo} from "../GetOwner";
import NFTPet, { INFTPet } from '../component/NFT/pet';
 
const Test: React.FC = () => {
const [nftList, setNftList] = useState<INFTPet[]>([]);

useEffect( () => {
  const GetNFT = async () => {
    const data = GetNFTInfo("0xF0094D05Bf14B91C3B1985c4508928D43a33D58A");
    return data;
  }

  GetNFT().then((nfts) => {
    const nftArr = nfts.ownedNfts;
    console.log(nftArr);      
    if (Array.isArray(nftArr)) {
      console.log("HERE");
      const nftListViewData = nftArr.map((nft) => ({
          imageUrl: nft.media[0].thumbnail || "",
          name: nft.contract.address ? nft.contract.address.toString() : "",
          tokenId: nft.tokenId,
      }));
      setNftList(nftListViewData);
      console.log(nftList);      
    }    
  })
}, []);


return (
  <div className="App">
    <header className="App-header">
    <div>
      { //we did it !
        nftList.map((nftInfo) => (<img key={nftInfo.imageUrl} src={nftInfo.imageUrl} />))
      }
      </div>
        
      
    </header>
  </div>
);
}
 
export default Test;