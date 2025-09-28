import React from 'react';
import { authClient } from '@/lib/auth-client';
import SigninComponent from '@/components/auth/signin';

export default async function Signin() {

  const { data: session } = await authClient.getSession()
  return (
    <>
      <SigninComponent session={session} />
    </>
  );
}