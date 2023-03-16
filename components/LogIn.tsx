'use client';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';

const Login = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <Link
        href="/account"
        className="text-sm text-slate-900 hover:underline dark:text-white"
      >
        Account
      </Link>
    );
  } else {
    return (
      <Link
        href="#"
        onClick={(e) => {
          e.preventDefault();
          signIn();
        }}
        className="text-sm text-slate-900 hover:underline dark:text-white"
      >
        Sign in
      </Link>
    );
  }
};

export default Login;
