'use client';
import { useSession, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Account = () => {
  const { data: session, status } = useSession();

  if (!session) {
    redirect('/');
  }

  return (
    <div className="ios:fill-height flex h-screen">
      <div className="flex min-w-full flex-col text-slate-900 dark:text-white">
        <Header />
        <div className="mt-4 flex-1 px-4">
          <p>{session?.user?.name}</p>
          <p>status: {status}</p>
          <button
            onClick={() => {
              signOut();
            }}
            type="button"
          >
            Sign Out
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Account;
