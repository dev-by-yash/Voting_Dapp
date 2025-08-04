'use client';
import React from 'react'
// import Wallet from './components/Wallet';
import dynamic from 'next/dynamic';
import { Privy } from './components/Privy';
import ProposalList from './components/ProposalList';
import AppLayout from './components/AppLayout';

const Wallet = dynamic(() => import('./components/Wallet'), { ssr: false });

export default function Home() {

  // if (!ready) {
  //   return <div>Loading...</div>;
  // }
  return (
    <>
    {/* <Privy /> */}
    <AppLayout >
       <Wallet />
    {/* <CreateProposal/>
    <ProposalList /> */}
    </AppLayout>
    </>
  );
}
