'use client';

import React, { useEffect, useState } from 'react';
import {
  ConnectButton,
  useActiveAccount,
  useReadContract,
  useSendTransaction
} from 'thirdweb/react';
import Image from 'next/image';
import { client } from '../app/client';
import Modal from './Modal';
import { prepareContractCall, resolveMethod } from 'thirdweb';
import { contract } from '@/utils/contract';
import { ethers } from 'ethers';
import { Button } from './Button';
import { bscTestnet } from 'thirdweb/chains';

type Course = {
  name: string;
  description: string;
  price: number;
};

export const Header: React.FC = () => {
  const { mutate: sendTransaction, isError } = useSendTransaction();
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState('');
  const account = useActiveAccount();

  const [course, setCourse] = useState<Course>({
    name: '',
    description: '',
    price: 0.0
  });

  const { data: owner, isLoading: isLoadingOwner } = useReadContract({
    contract,
    method: 'function owner() view returns (address)',
    params: []
  });

  useEffect(() => {
    if (account?.address) {
      setAddress(account.address);
    }
  }, [account]);

  const call = async () => {
    const price = ethers.utils.parseEther(course.price.toString());
    const transaction = prepareContractCall({
      contract,
      method: resolveMethod('createCourse'),
      params: [course.name, course.description, price]
    });
    sendTransaction(transaction);
  };

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();

    if (isError) {
      console.error(isError);
    }
    call();

    handleCloseModal();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCourse((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value
    }));
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCourse({
      name: '',
      description: '',
      price: 0.0
    });
  };

  const hadleDisconnect = () => {
    setAddress('');
    window.location.reload();
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full shadow-md shadow-violet-950 bg-black z-50 h-20 flex items-center">
        <div className="flex justify-between items-center p-4 w-full">
          <div className="flex items-center">
            <Image
              alt="Logo thirdweb"
              src="/thirdweb.svg"
              width={50}
              height={50}
            />
          </div>
          <div className="flex items-center">
            {address && (
              <div className="mr-2">
                {owner === address && (
                  <Button
                    buttonName="Create Course"
                    onClick={handleOpenModal}
                  />
                )}
              </div>
            )}

            <ConnectButton
              chain={bscTestnet}
              onDisconnect={hadleDisconnect}
              client={client}
              appMetadata={{
                name: 'Web3 Courses',
                url: 'https://example.com'
              }}
            />
          </div>
        </div>
      </header>

      <Modal show={showModal} onClose={handleCloseModal}>
        <h2 className="text-2xl text-gray-600 font-bold mb-4">
          Create a New Course
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleCreateCourse}>
          <div>
            <label className="block text-gray-700">Course Name</label>
            <input
              name="name"
              value={course.name}
              onChange={handleInputChange}
              type="text"
              className="w-full p-2 border border-gray-300 text-gray-500 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={course.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 text-gray-500 rounded"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700">Price</label>
            <input
              name="price"
              min={0}
              step={0.1}
              value={
                typeof course.price === 'number'
                  ? course.price.toFixed(1)
                  : course.price
              }
              onChange={handleInputChange}
              type="number"
              className="w-full p-2 border border-gray-300 text-gray-500 rounded"
            ></input>
          </div>
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="bg-fuchsia-500 text-white p-2 rounded hover:bg-fuchsia-600"
            >
              Create
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
