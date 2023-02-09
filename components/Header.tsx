import Link from 'next/link';

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-white py-4 dark:bg-slate-800">
      <Link
        href="/"
        className="rounded-md px-2 py-1 text-sm font-medium text-slate-900 hover:underline dark:text-white"
      >
        <h1 className="text-2xl font-medium text-slate-900 dark:text-white">
          Reddit Client
        </h1>
      </Link>
      <nav>
        <Link
          href="/"
          className="rounded-md px-2 py-1 text-sm font-medium text-slate-900 hover:underline dark:text-white"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="rounded-md px-2 py-1 text-sm font-medium text-slate-900 hover:underline dark:text-white"
        >
          About
        </Link>
      </nav>
    </header>
  );
};

export default Header;
