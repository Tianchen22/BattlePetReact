import type { FC, SyntheticEvent } from "react";
import { useState } from "react";
import Link from "next/link";

export interface INFTPet {
    imageUrl: string;
    name: string;
    tokenId: string;
    balance: number;
}

const NFTPet: FC<INFTPet> = ({ imageUrl, name, tokenId, balance }) => {
    const [showBuyButton, setShowBuyButton] = useState(false);

    return (
        <Link href={`/detail/${tokenId}`}>
            <div
                className="cursor-pointer overflow-hidden rounded-md border border-slate-300 shadow"
                onMouseEnter={() => setShowBuyButton(true)}
                onMouseLeave={() => setShowBuyButton(false)}
            >
                <div className="h-[280px] overflow-hidden ">
                    <div
                        className={`h-full bg-cover bg-center transition-all ${
                            showBuyButton ? "scale-110" : "scale-100"
                        }`}
                        style={{
                            backgroundImage: `urL(${imageUrl})`,
                        }}
                    />
                </div>

                
            </div>
        </Link>
    );
};

export default NFTPet;
