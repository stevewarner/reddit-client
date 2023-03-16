import Link from 'next/link';
import { GithubLogo } from './Icons';
import Login from './LogIn';

interface Props {
  className?: string;
}

const Footer: React.FC<Props> = ({}) => {
  return (
    <footer className="flex items-center justify-between bg-white p-4 dark:bg-slate-800">
      <Link
        href="https://github.com/stevewarner/reddit-client"
        className="text-sm text-slate-900 hover:underline dark:text-white"
      >
        <GithubLogo />
      </Link>
      <Login />
    </footer>
  );
};

export default Footer;
