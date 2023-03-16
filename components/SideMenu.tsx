'use client';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { getSubreddits, getDefaultSubreddits } from '@/utils/api';
import { useQuery } from 'react-query';
import { useSession } from 'next-auth/react';
import Loading from './Loading';

const SideMenu = () => {
  const { data: session } = useSession();

  const {
    data: subredditList,
    isLoading,
    isError,
  } = useQuery(
    session ? 'mySubreddits' : 'subreddits',
    session ? getSubreddits : getDefaultSubreddits
  );

  return (
    <div className="ios:fill-height flex h-screen min-w-[50%] snap-center snap-always">
      <div className="flex min-w-full flex-col text-slate-900 dark:text-white">
        <Header />
        <div className="flex-1 overflow-scroll">
          {isLoading && (
            <div className="flex min-h-full items-center justify-center">
              <Loading />
            </div>
          )}
          {(isError || subredditList?.length === 0) && (
            <div className="flex min-h-full items-center justify-center">
              <p>No subreddits</p>
            </div>
          )}
          {subredditList &&
            subredditList.length > 0 &&
            subredditList.map((sub: ISub) => (
              <div key={sub.id} className="border-b border-slate-500 px-2 py-4">
                <Link href={`/${sub.name}`}>{sub.name}</Link>
              </div>
            ))}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default SideMenu;
