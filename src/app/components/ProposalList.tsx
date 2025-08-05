// 'use client';
// import { useEffect, useState } from 'react';
// import { useVotingProgram } from '../hooks/useVotingProgram';
// import { web3, BN } from '@coral-xyz/anchor';

// interface ProposalAccount {
//   creator: web3.PublicKey;
//   title: string;
//   description: string;
//   yesVotes: BN;
//   noVotes: BN;
// }

// interface Proposal {
//   publicKey: web3.PublicKey;
//   account: ProposalAccount;
// }

// export default function ProposalList() {
//   const program = useVotingProgram();
//   const [proposals, setProposals] = useState<Proposal[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProposals = async () => {
//       if (!program) return;
//       try {
//         const fetchedProposals = await program.account.proposal.all<ProposalAccount>();
//         setProposals(fetchedProposals);
//       } catch (error) {
//         console.error("❌ Error fetching proposals:", error);
//       }
//       setLoading(false);
//     };

//     fetchProposals();
//   }, [program]);

//   if (loading)
//     return (
//       <div className="flex justify-center py-12 text-white text-xl animate-pulse">
//         ⚙️ Loading proposals...
//       </div>
//     );

//   if (proposals.length === 0)
//     return (
//       <div className="flex justify-center py-12 text-gray-300 text-xl italic">
//         No proposals found.
//       </div>
//     );

//   return (
//     <div className="p-8 text-white w-full flex flex-col items-center">
//       <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text mb-8 animate-fade-in-up">
//         🗳️ All Proposals
//       </h2>
//       <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full max-w-7xl">
//         {proposals.map(({ publicKey, account }) => (
//           <li
//             key={publicKey.toBase58()}
//             className="relative p-6 rounded-3xl border border-white/10 backdrop-blur-xl bg-white/10 text-white shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] animate-fade-in-up"
//           >
//             <div className="absolute top-3 right-3 text-xs text-gray-400 font-mono">
//               ID: {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}
//             </div>
//             <h3 className="text-2xl font-semibold mb-3 text-pink-300">{account.title}</h3>
//             <p className="text-sm text-gray-200 mb-4">{account.description}</p>
//             <p className="text-sm text-cyan-300">
//               <span className="font-semibold">🧑 Creator:</span>{' '}
//               {account.creator.toBase58().slice(0, 6)}...{account.creator.toBase58().slice(-4)}
//             </p>
//             <div className="flex justify-between mt-4 text-sm font-semibold">
//               <span className="text-green-400">🟢 Yes: {account.yesVotes.toNumber()}</span>
//               <span className="text-red-400">🔴 No: {account.noVotes.toNumber()}</span>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }'use client';
import { useEffect, useState } from 'react';
import { useVotingProgram } from '../hooks/useVotingProgram';
import { web3, BN } from '@coral-xyz/anchor';
import ProposalDetails from './ProposalDetails';

interface ProposalAccount {
  creator: web3.PublicKey;
  title: string;
  description: string;
  yesVotes: BN;
  noVotes: BN;
}

interface Proposal {
  publicKey: web3.PublicKey;
  account: ProposalAccount;
}

export default function ProposalList() {
  const program = useVotingProgram();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProposal, setSelectedProposal] = useState<web3.PublicKey | null>(null);

  useEffect(() => {
    const fetchProposals = async () => {
      if (!program) return;
      try {
        const fetchedProposals = await program.account.proposal.all<ProposalAccount>();
        setProposals(fetchedProposals);
      } catch (error) {
        console.error("❌ Error fetching proposals:", error);
      }
      setLoading(false);
    };

    fetchProposals();
  }, [program]);

  if (selectedProposal) {
    return <ProposalDetails proposalPubkey={selectedProposal} goBack={() => setSelectedProposal(null)} />;
  }

  if (loading)
    return (
      <div className="flex justify-center py-12 text-white text-xl animate-pulse">
        ⚙️ Loading proposals...
      </div>
    );

  if (proposals.length === 0)
    return (
      <div className="flex justify-center py-12 text-gray-300 text-xl italic">
        No proposals found.
      </div>
    );

  return (
    <div className="p-8 text-white w-full flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text mb-8 animate-fade-in-up">
        All Proposals
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full max-w-7xl">
        {proposals.map(({ publicKey, account }) => (
          <li
            key={publicKey.toBase58()}
            onClick={() => setSelectedProposal(publicKey)}
            className="cursor-pointer relative p-6 rounded-3xl border border-white/10 backdrop-blur-xl bg-white/10 text-white shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] animate-fade-in-up"
          >
            <div className="absolute top-3 right-3 text-xs text-gray-400 font-mono">
              ID: {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-pink-300">{account.title}</h3>
            <p className="text-sm text-gray-200 mb-4">{account.description}</p>
            <p className="text-sm text-cyan-300">
              <span className="font-semibold">🧑 Creator:</span>{' '}
              {account.creator.toBase58().slice(0, 6)}...{account.creator.toBase58().slice(-4)}
            </p>
            <div className="flex justify-between mt-4 text-sm font-semibold">
              <span className="text-green-400">🟢 Yes: {account.yesVotes.toNumber()}</span>
              <span className="text-red-400">🔴 No: {account.noVotes.toNumber()}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
