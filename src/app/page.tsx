'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/Card';
import { contract } from '@/utils/contract';
import {
  useActiveAccount,
  useReadContract,
  useSendTransaction
} from 'thirdweb/react';
import { prepareContractCall } from 'thirdweb';

export default function Home() {
  const [startId, setStartId] = useState<bigint>(BigInt(1));
  const [qtd, setQtd] = useState<bigint>(BigInt(10));
  const [address, setAddress] = useState('');
  const account = useActiveAccount();

  const { mutate: sendTransaction, failureReason } = useSendTransaction();

  const { data: getActiveCourses, isLoading } = useReadContract({
    contract,
    method:
      'function getActiveCourses(uint256 _startId, uint256 _qtd) view returns ((uint256 courseId, string name, string description, uint256 price, bool isActive)[])',
    params: [startId, qtd]
  });

  const handleByCourse = async (_id: bigint, _price: bigint) => {
    const transaction = prepareContractCall({
      contract,
      method: 'function buyCourse(uint256 _id) payable',
      params: [_id],
      value: _price
    });
    sendTransaction(transaction);
    console.log(transaction);
    console.log(failureReason);
  };

  const { data: myCourses } = useReadContract({
    contract,
    method: 'function getMyCourses(address _buyer) view returns (uint256[])',
    params: [address]
  });

  useEffect(() => {
    if (account?.address) {
      setAddress(account.address);
    }
  }, [account, address]);

  return (
    <main className="pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="my-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!isLoading ? (
            getActiveCourses &&
            getActiveCourses?.map(
              (item, index) =>
                item.name !== '' && (
                  <div key={index}>
                    <Card
                      checkIfBuyed={myCourses?.includes(item.courseId)}
                      checkIfConnected={address.length > 0}
                      name={item.name}
                      description={item.description}
                      image="solidity.svg"
                      price={item.price}
                      onClick={() => handleByCourse(item.courseId, item.price)}
                    />
                  </div>
                )
            )
          ) : (
            <div className="ml-2">Loading...</div>
          )}
        </div>
      </div>
    </main>
  );
}
