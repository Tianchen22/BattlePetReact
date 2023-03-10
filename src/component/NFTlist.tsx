import { FC, useState } from 'react';
import NFTDetails from './NFTDetails';


export interface INFTPet {
    imageUrl: string;
    name: string;
    tokenId: string;
    balance: number;
}

interface NFTImageListProps {
  nftList: INFTPet[];
}

const NFTImageList: FC<NFTImageListProps> = ({ nftList }) => {
  const [selectedNFT, setSelectedNFT] = useState<INFTPet | null>(null);

  const handleNFTClick = (nft: INFTPet) => {
    setSelectedNFT(nft);
  };

  const handleGoBack = () => {
    setSelectedNFT(null);
  };

  if (selectedNFT) {
    return <NFTDetails nftInfo={selectedNFT} onGoBack={handleGoBack} />;
  }

  return (
    <div>
      <div className="nft-list">
        {nftList.map((nftInfo) => (
          <div key={nftInfo.imageUrl} className = "nft-image">
            <img
              src={nftInfo.imageUrl}
              alt={nftInfo.name}
              onClick={() => handleNFTClick(nftInfo)}
            />
            {nftInfo.balance > 1 && (
              <span >{nftInfo.balance}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NFTImageList;


