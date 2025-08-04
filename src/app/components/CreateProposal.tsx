// 'use client';
// import { useState } from "react";
// import { useVotingProgram } from "../hooks/useVotingProgram";
// import { useWallet } from "@solana/wallet-adapter-react";
// import { web3 } from "@coral-xyz/anchor";

// export default function CreateProposal() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const program = useVotingProgram();
//   const { publicKey } = useWallet();
//   const [loading, setLoading] = useState(false);

//   const createProposal = async () => {
//     // Redundant check, but good practice
//     if (!program || !publicKey) {
//       alert("Please connect your wallet first.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const proposalKeypair = web3.Keypair.generate();

//       await program.methods
//         .createProposal(title, description)
//         .accounts({
//           proposal: proposalKeypair.publicKey,
//           creator: publicKey,
//           systemProgram: web3.SystemProgram.programId,
//         })
//         .signers([proposalKeypair])
//         .rpc();

//       alert("✅ Proposal created!");
//       setTitle("");
//       setDescription("");
//     } catch (err) {
//       console.error("❌ Error creating proposal:", err);
//       // Provide a more specific error if possible
//       alert(`Error creating proposal: ${err instanceof Error ? err.message : String(err)}`);
//     }
//     setLoading(false);
//   };

//   // ✅ **THE FIX IS HERE**
//   // Instead of returning nothing, we guide the user.
//   if (!publicKey) {
//     return (
//       <div style={{ padding: "2rem", textAlign: "center", border: "1px solid #ccc", margin: "2rem", borderRadius: "8px" }}>
//         <h2>Create a Proposal</h2>
//         <p>Please connect your wallet to get started.</p>
//       </div>
//     );
//   }

//   // Optional: Show a loading state while the program is initializing after the wallet is connected.
//   if (!program) {
//      return (
//       <div style={{ padding: "2rem", textAlign: "center", border: "1px solid #ccc", margin: "2rem", borderRadius: "8px" }}>
//         <h2>Create a Proposal</h2>
//         <p>Loading program...</p>
//       </div>
//     );
//   }


//   // This part will now only render when the wallet is connected and the program is ready.
//   return (
//     <div className="text-black" style={{  padding: "2rem", border: "1px solid ", margin: "2rem", borderRadius: "8px" }}>
//       <h2>Create Proposal</h2>
//       <input
//         type="text"
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         style={{ marginBottom: "1rem", width: "100%", padding: '8px', borderRadius: '4px', border: '1px solid #aaa' }}
//       />
//       <textarea
//         placeholder="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         style={{ marginBottom: "1rem", width: "100%", minHeight: '100px', padding: '8px', borderRadius: '4px', border: '1px solid #aaa' }}
//       />
//       <button onClick={createProposal} disabled={loading || !title || !description} style={{padding: '10px 20px', cursor: 'pointer'}}>
//         {loading ? "Submitting..." : "Submit"}
//       </button>
//     </div>
//   );
// }

'use client';
import { useState } from "react";
import { useVotingProgram } from "../hooks/useVotingProgram";
import { useWallet } from "@solana/wallet-adapter-react";
import { web3 } from "@coral-xyz/anchor";

export default function CreateProposal() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const program = useVotingProgram();
  const { publicKey } = useWallet();
  const [loading, setLoading] = useState(false);

  const createProposal = async () => {
    if (!program || !publicKey) {
      alert("Please connect your wallet first.");
      return;
    }
    setLoading(true);
    try {
      const proposalKeypair = web3.Keypair.generate();

      await program.methods
        .createProposal(title, description)
        .accounts({
          proposal: proposalKeypair.publicKey,
          creator: publicKey,
          systemProgram: web3.SystemProgram.programId,
        })
        .signers([proposalKeypair])
        .rpc();

      alert("✅ Proposal created!");
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("❌ Error creating proposal:", err);
      alert(`Error creating proposal: ${err instanceof Error ? err.message : String(err)}`);
    }
    setLoading(false);
  };

  if (!publicKey) {
    return (
      <div className="max-w-lg mx-auto mt-10 p-6 rounded-xl shadow-md text-center bg-white/80 backdrop-blur">
        <h2 className="text-xl font-semibold mb-2">Create a Proposal</h2>
        <p className="text-gray-700">Please connect your wallet to get started.</p>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="max-w-lg mx-auto mt-10 p-6 rounded-xl shadow-md text-center bg-white/80 backdrop-blur">
        <h2 className="text-xl font-semibold mb-2">Create a Proposal</h2>
        <p className="text-gray-700">Loading program...</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 rounded-xl shadow-lg bg-white/90 backdrop-blur-md border border-gray-200 text-black">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Create Proposal</h2>
      <input
        type="text"
        placeholder="Proposal Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <textarea
        placeholder="Proposal Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-3 mb-4 rounded-md border border-gray-300 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        onClick={createProposal}
        disabled={loading || !title || !description}
        className={`w-full py-3 rounded-md text-white font-semibold transition-all duration-200 ${
          loading || !title || !description
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        {loading ? "Submitting..." : "Submit Proposal"}
      </button>
    </div>
  );
}
