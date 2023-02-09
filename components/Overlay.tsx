'use client';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';

interface Props {
  id: string;
  title: string;
  author: string;
  subreddit: string;
  upvotes: number;
  src: string;
  icon: string;
  toggleIsFullscreen: Function;
}

const Overlay = ({
  id,
  title,
  author,
  subreddit,
  upvotes,
  src,
  icon,
  toggleIsFullscreen,
}: Props) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleFullscreenToggle = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    toggleIsFullscreen((prev: boolean) => !prev);
  };

  return (
    <div
      className="ios:fill-height absolute grid h-screen min-w-full grid-flow-col grid-cols-4 grid-rows-4 items-center justify-items-center gap-4 p-2 text-white"
      onDoubleClick={handleFullscreenToggle}
    >
      <div className="col-span-4 row-span-1 row-start-1 flex flex-col self-start justify-self-start">
        <h1 className="mb-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          {title}
        </h1>
        <Link
          href={`https://www.reddit.com/r/${subreddit}`}
          className="mb-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] hover:underline"
        >
          <div className="flex flex-nowrap items-center">
            {icon && (
              <Image
                className="mr-1 h-8 w-8 rounded-[50%] bg-black"
                src={icon}
                alt=""
                height={20}
                width={20}
                style={{ objectFit: 'cover' }}
              />
            )}
            <h3>{subreddit}</h3>
          </div>
        </Link>
        <Link
          href={`https://www.reddit.com/user/${author}`}
          className="mb-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] hover:underline"
        >
          <h3>{author}</h3>
        </Link>
      </div>

      <div className="col-span-1 col-start-4 row-span-2 row-start-3 flex h-full flex-col items-center justify-evenly">
        <button onClick={() => console.log('save', id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-8 w-8 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
          >
            <path
              fillRule="evenodd"
              d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <Link
          href={`https://www.reddit.com/r/${subreddit}/comments/${id.substring(
            3
          )}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-8 w-8 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 001.28.53l4.184-4.183a.39.39 0 01.266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0012 2.25zM8.25 8.625a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zm2.625 1.125a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
        <button
          onClick={() => setIsLiked((prev) => !prev)}
          className={`${
            isLiked &&
            'animate-[ping_1s_cubic-bezier(0,0,0.2,1)_1] text-red-500'
          } flex flex-col items-center`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-8 w-8 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
          <p className="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            {upvotes > 999
              ? Math.round((upvotes / 1000) * 10) / 10 + 'K'
              : upvotes}
          </p>
        </button>
      </div>
    </div>
  );
};

export default Overlay;
