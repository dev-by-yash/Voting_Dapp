'use client';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white">
      {/* Floating animated blobs */}
      <div className="absolute w-[500px] h-[500px] bg-pink-500 rounded-full opacity-20 blur-3xl animate-pulse -top-24 -left-32 pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] bg-indigo-500 rounded-full opacity-20 blur-2xl animate-ping top-20 right-20 pointer-events-none" />

      {/* Page content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
