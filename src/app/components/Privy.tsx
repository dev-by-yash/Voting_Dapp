'use client';
import React from 'react';
import { usePrivy } from '@privy-io/react-auth';

export function Privy() {
  const { ready, authenticated, user, login, logout } = usePrivy();

  if (!ready) {
    return <div style={{ color: 'black' }}>Loading Privy...</div>;
  }

  if (!authenticated) {
    return (
      <button style={{ color: 'black' }} onClick={login}>
        Login with Wallet or Email
      </button>
    );
  }

  return (
    <div style={{ color: 'black' }}>
      ✅ Authenticated as: <strong>{user?.id}</strong>
      <br />
      <button style={{ color: 'black' }} onClick={logout}>
        Logout
      </button>
    </div>
  );
}
