import Link from 'next/link';

interface Props {
  className?: string;
}

const Footer: React.FC<Props> = ({}) => {
  return (
    <footer className="flex items-center justify-between bg-white p-4 dark:bg-slate-800">
      <p className="text-sm">v1.0.0</p>
      <Link
        href="https://github.com/stevewarner/reddit-client"
        className="text-sm text-slate-900 hover:underline dark:text-white"
      >
        View on GitHub
      </Link>
    </footer>
  );
};

export default Footer;
