'use client'; // Error components must be Client components

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-w-full flex-col text-slate-900 dark:text-white">
      <div className="mt-4 flex-1 px-4">
        <h2>Something went wrong!</h2>
        <Link href="/">Go Home</Link>
      </div>
    </div>
  );
}
