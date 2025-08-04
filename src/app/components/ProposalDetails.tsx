// 'use client';
// import { useVotingProgram } from '../hooks/useVotingProgram';
// import { web3 } from '@coral-xyz/anchor';
// import { useEffect, useState } from 'react';
// import { useWallet } from '@solana/wallet-adapter-react';
// import VoteOnProposal from './VoteOnProposal';

// export default function ProposalDetails({
//   proposalPubkey,
//   goBack,
// }: {
//   proposalPubkey: web3.PublicKey;
//   goBack: () => void;
// }) {
//   const program = useVotingProgram();
//   const wallet = useWallet();
//   const [proposal, setProposal] = useState<any>(null);

//   useEffect(() => {
//     const fetchProposal = async () => {
//       if (!program || !proposalPubkey) return;
//       const fetched = await program.account.proposal.fetch(proposalPubkey);
//       setProposal(fetched);
//     };
//     fetchProposal();
//   }, [program, proposalPubkey]);

//   const isCreator =
//     proposal &&
//     wallet.publicKey &&
//     proposal.creator.toBase58() === wallet.publicKey.toBase58();

//   if (!proposal) return <div className="text-black p-6">Loading...</div>;

//   return (
//     <div className="p-6 text-black">
//       <button
//         onClick={goBack}
//         className="text-blue-500 underline mb-4 hover:text-blue-700"
//       >
//         ← Back to Proposals
//       </button>

//       <h2 className="text-2xl font-bold mb-2">{proposal.title}</h2>
//       <p className="text-gray-700 mb-2">{proposal.description}</p>
//       <p className="text-sm text-gray-500 mb-4">
//         Created by: {proposal.creator.toBase58()}
//       </p>

//       <p className="mb-4">
//         ✅ Yes Votes: {proposal.yesVotes.toString()}<br />
//         ❌ No Votes: {proposal.noVotes.toString()}
//       </p>

//       {!isCreator ? (
//         <VoteOnProposal proposalPubkey={proposalPubkey} />
//       ) : (
//         <p className="text-red-500 font-semibold">
//           You cannot vote on your own proposal.
//         </p>
//       )}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { web3, BN } from "@coral-xyz/anchor";
import { useVotingProgram } from "../hooks/useVotingProgram";
import VoteOnProposal from "./VoteOnProposal";

interface ProposalAccount {
  creator: web3.PublicKey;
  title: string;
  description: string;
  yesVotes: BN;
  noVotes: BN;
}

export default function ProposalDetails({
  proposalPubkey,
  goBack,
}: {
  proposalPubkey: web3.PublicKey;
  goBack: () => void;
}) {
  const program = useVotingProgram();
  const wallet = useWallet();
  const [proposal, setProposal] = useState<ProposalAccount | null>(null);

  useEffect(() => {
    const fetchProposal = async () => {
      if (!program || !proposalPubkey) return;
      const fetched = await program.account.proposal.fetch(proposalPubkey);
      setProposal(fetched as ProposalAccount);
    };
    fetchProposal();
  }, [program, proposalPubkey]);

  const isCreator =
    proposal &&
    wallet.publicKey &&
    proposal.creator.toBase58() === wallet.publicKey.toBase58();

  if (!proposal) {
    return <div className="text-black p-6">Loading...</div>;
  }

  return (
    <div className="p-6 text-black">
      <button
        onClick={goBack}
        className="text-blue-500 underline mb-4 hover:text-blue-700"
      >
        ← Back to Proposals
      </button>

      <h2 className="text-2xl font-bold mb-2">{proposal.title}</h2>
      <p className="text-gray-700 mb-2">{proposal.description}</p>
      <p className="text-sm text-gray-500 mb-4">
        Created by: {proposal.creator.toBase58()}
      </p>

      <p className="mb-4">
        ✅ Yes Votes: {proposal.yesVotes.toString()}
        <br />❌ No Votes: {proposal.noVotes.toString()}
      </p>

      {!isCreator ? (
        <VoteOnProposal proposalPubkey={proposalPubkey} />
      ) : (
        <p className="text-red-500 font-semibold">
          You cannot vote on your own proposal.
        </p>
      )}
    </div>
  );
}
