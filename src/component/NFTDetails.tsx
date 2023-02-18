import { FC } from 'react';
import  { INFTPet}  from './NFTlist';

interface NFTDetailsProps {
  nftInfo: INFTPet;
  onGoBack: () => void;
}

const NFTDetails: FC<NFTDetailsProps> = ({ nftInfo, onGoBack }) => {
  return (
    <div className="nft-list">
      <img src={nftInfo.imageUrl} alt={nftInfo.name} />
      <h2>{nftInfo.name}</h2>
      <p>Token ID: {nftInfo.tokenId}</p>
      <button onClick={onGoBack}>Go Back</button>
    </div>
  );
};

export default NFTDetails;