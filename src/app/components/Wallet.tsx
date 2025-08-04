'use client';

import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import CreateProposal from './CreateProposal';
import AllProposals from './ProposalList';
import dynamic from 'next/dynamic';
// import { PublicKey } from '@solana/web3.js';

// Dynamically import wallet button to avoid SSR issues
const WalletMultiButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton),
  { ssr: false }
);

export default function Wallet() {
  const { connected, } = useWallet();

  return (
    <main className="flex flex-col items-center justify-start min-h-screen py-16 px-4">
      {!connected ? (
        <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-white/20 w-[90%] max-w-xl animate-fade-in-down text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
            Solana Voting DApp
          </h1>
          <p className="text-md md:text-lg text-gray-200 mb-6">
            Connect your wallet to start voting and be a part of the decentralized revolution.
          </p>
          <p className="text-sm text-gray-400 italic mb-4">
             &quot;Your vote on the chain matters.
          </p>
          <WalletMultiButton />
        </div>
      ) : (
        <>
          <div className="flex items-center gap-4 mb-6">
            <WalletMultiButton />
            {/* <span className="text-white bg-purple-600 rounded px-3 py-1 text-sm">
              {publicKey?.toBase58().slice(0, 4)}...{publicKey?.toBase58().slice(-4)}
            </span> */}
          </div>

          <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
            Welcome Voter 🎉
          </h1>

          <CreateProposal />
          <div className="my-10" />
          <AllProposals />
        </>
      )}
    </main>
  );
}
