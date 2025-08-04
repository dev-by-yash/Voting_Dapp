import "./globals.css";
import type { Metadata } from "next";
import WalletConnectionProvider from "./components/WalletConnectionProvider"; // adjust the path if needed
// import Providers from "./components/Providers";
// import { Privy } from "./components/Privy";

export const metadata: Metadata = {
  title: "Solana Voting DApp",
  description: "Vote on-chain with Solana",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <Providers> */}
          {/* <Privy /> */}
          <WalletConnectionProvider>{children}</WalletConnectionProvider>
        {/* </Providers> */}
      </body>
    </html>
  );
}
