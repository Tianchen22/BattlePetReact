import { FC, useState } from 'react';
import NFTDetails from './NFTDetails';


export interface INFTPet {
    imageUrl: string;
    name: string;
    tokenId: string;
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
          <img
            key={nftInfo.imageUrl}
            src={nftInfo.imageUrl}
            alt={nftInfo.name}
            onClick={() => handleNFTClick(nftInfo)}
          />
        ))}
      </div>
    </div>
  );
};

export default NFTImageList;


