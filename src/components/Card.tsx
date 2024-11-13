import { ethers } from 'ethers';
import Image from 'next/image';
import React from 'react';

interface CardProps {
  name: string;
  description: string;
  image: string;
  price: bigint;
  checkIfBuyed?: boolean;
  checkIfConnected: boolean;
  onClick: () => void;
}

export const Card: React.FC<CardProps> = ({
  name,
  description,
  image,
  price,
  checkIfBuyed,
  checkIfConnected,
  onClick
}) => {
  return (
    <div className="w-64 h-96 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-500 ease-in-out transform relative">
      {!checkIfBuyed ? (
        checkIfConnected && (
          <div className="flex items-center justify-center z-5 w-10 h-10 rounded-full bg-violet-600 absolute -top-2 -right-2 cursor-pointer hover:bg-violet-500 shadow-sm shadow-violet-800">
            <button type="button" className="font-bold" onClick={onClick}>
              Buy
            </button>
          </div>
        )
      ) : (
        <div className="flex items-center justify-center z-5 w-64 h-10 bg-black/90 absolute bottom-2 right-30">
          <span className="font-bold text-white">Buyed</span>
        </div>
      )}
      <div className="w-full h-full rounded overflow-hidden shadow-lg shadow-violet-500/50 bg-white flex flex-col">
        <Image
          width={240}
          height={240}
          className="w-full h-40 mt-2 rounded"
          src={image ? image : 'thirdweb.svg'}
          loading='lazy'
          alt={`${name}'s image`}
        />
        <div className="px-6 py-4 flex flex-col justify-between flex-grow">
          <div>
            <div className="font-bold text-xl text-gray-600 mb-4 truncate">
              {name}
            </div>
            <p className="text-gray-700 text-sm mb-2 line-clamp-3">
              {description}
            </p>
          </div>
          <div className={checkIfBuyed ? "text-gray-400 text-left text-sm" : "text-gray-800 text-left text-sm"}>
            {`BNB: ${ethers.utils.formatEther(price)}`}
          </div>
        </div>
      </div>
    </div>
  );
};
