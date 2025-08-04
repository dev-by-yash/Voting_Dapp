// src/app/components/WalletButton.jsx
'use client';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function WalletButton() {
  return <WalletMultiButton className="bg-gradient-to-r from-pink-500 via-yellow-500 to-purple-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 border border-white/20 animate-pulse backdrop-blur-md" />

}
