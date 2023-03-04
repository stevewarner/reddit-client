import Link from 'next/link';
import { ScrollitLogo } from './Icons';

const Header = () => {
  return (
    <header className="flex items-center justify-center bg-white py-2 dark:bg-slate-800">
      <Link
        href="/"
        className="rounded-md px-2 py-1 text-sm font-medium text-slate-900 hover:underline dark:text-white"
      >
        <h1 className="mt-4 flex items-center text-2xl font-medium text-slate-900 dark:text-white">
          <ScrollitLogo />
        </h1>
      </Link>
    </header>
  );
};

export default Header;
