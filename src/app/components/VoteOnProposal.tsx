'use client';
import { useWallet } from '@solana/wallet-adapter-react';
import { useVotingProgram } from '../hooks/useVotingProgram';
import { web3 } from '@coral-xyz/anchor';
import { useState, useEffect } from 'react';

export default function VoteOnProposal({ proposalPubkey }: { proposalPubkey: web3.PublicKey }) {
  const { publicKey } = useWallet();
  const program = useVotingProgram();
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkIfVoted = async () => {
      if (!program || !publicKey) return;
      try {
        const [voteAccount] = web3.PublicKey.findProgramAddressSync(
          [Buffer.from('vote'), proposalPubkey.toBuffer(), publicKey.toBuffer()],
          program.programId
        );
        const voteData = await program.account.Vote.fetch(voteAccount);
        if (voteData) setHasVoted(true);
      } catch (e) {
        setHasVoted(false); // If not found, user hasn't voted
        console.log(e)
      }
    };
    checkIfVoted();
  }, [program, publicKey, proposalPubkey]);

  const vote = async (voteType: boolean) => {
    if (!program || !publicKey) return;
    setLoading(true);
    try {
      await program.methods
        .voteOnProposal(voteType)
        .accounts({
          proposal: proposalPubkey,
          voter: publicKey,
        })
        .rpc();

      alert('✅ Voted successfully!');
      setHasVoted(true);
    } catch (err) {
      console.error(err);
      alert('❌ Vote failed. Check console.');
    } finally {
      setLoading(false);
    }
  };

  if (!publicKey) return <p className="text-red-500">Connect wallet to vote</p>;

  if (hasVoted) return <p className="text-green-600 font-medium">You’ve already voted on this proposal.</p>;

  return (
    <div className="mt-4 space-x-4">
      <button
        onClick={() => vote(true)}
        disabled={loading}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        👍 Vote Yes
      </button>
      <button
        onClick={() => vote(false)}
        disabled={loading}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        👎 Vote No
      </button>
    </div>
  );
}
