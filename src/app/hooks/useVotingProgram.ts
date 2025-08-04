import { Idl, Program, AnchorProvider } from "@coral-xyz/anchor";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import idlJson from "../idl/voting.json";
// import { PublicKey } from "@solana/web3.js";
import { useMemo } from "react";
console.log("Using IDL:", idlJson);
// const PROGRAM_ID = new PublicKey("4CKofaywWaBuWYv5GDJ25fbAsTyxDzm1weZx5aZmvRkJ");

export const useVotingProgram = () => {
  const { connection } = useConnection();
  const wallet = useWallet();

  const program = useMemo(() => {
    if (
      !wallet.publicKey ||
      typeof wallet.signTransaction !== "function" ||
      typeof wallet.signAllTransactions !== "function"
    ) {
      return null;
    }

    const anchorWallet = {
      publicKey: wallet.publicKey,
      signTransaction: wallet.signTransaction,
      signAllTransactions: wallet.signAllTransactions,
    };

    try {
      const provider = new AnchorProvider(connection, anchorWallet, {
        commitment: "confirmed",
        preflightCommitment: "processed",
      });

      const idl = idlJson as Idl;

      return new Program(idl,  provider);
    } catch (err) {
      console.error("❌ Failed to create Program:", err);
      return null;
    }
  }, [
    wallet.publicKey,
    wallet.signTransaction,
    wallet.signAllTransactions,
    connection,
  ]);

  return program;
};
