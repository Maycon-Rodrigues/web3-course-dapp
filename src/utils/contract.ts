import { client } from '@/app/client';
import { defineChain, getContract } from 'thirdweb';
import { bscTestnet } from 'thirdweb/chains';

// connect to your contract
export const contract = getContract({
  client,
  chain: defineChain(bscTestnet),
  address: process.env.NEXT_PUBLIC_ADRRESS || ''
});
