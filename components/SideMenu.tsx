'use client';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SideMenu = () => {
  const subreddits = [
    'sanfrancisco',
    'seinfeld',
    'gratefuldead',
    'cats',
    'funny',
    'pics',
    'gaming',
  ];

  return (
    <div className="ios:fill-height flex h-screen min-w-[50%] snap-center snap-always">
      <div className="flex min-w-full flex-col text-slate-900 dark:text-white">
        <Header />
        <div className="flex-1 ">
          {subreddits.map((sub) => (
            <div key={sub} className="border-b border-slate-500 px-2 py-4">
              <Link href={`/${sub}`}>{sub}</Link>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default SideMenu;
