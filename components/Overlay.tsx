'use client';
import Link from 'next/link';
import Image from 'next/image';
import React, { MutableRefObject, useState, useEffect } from 'react';
import { Play, Pause, BookmarkIcon, CommentIcon, HeartIcon } from './Icons';

interface Props {
  id: string;
  title: string;
  author: string;
  subreddit: string;
  upvotes: number;
  src: string;
  icon: string;
  toggleIsFullscreen: Function;
  video?: MutableRefObject<HTMLVideoElement | null> | undefined;
  isPlaying?: boolean;
  setIsPlaying?: Function;
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
  video,
  isPlaying,
  setIsPlaying,
}: Props) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

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

      {video && setIsPlaying && (
        <div className="absolute">
          <button
            className="rounded-full bg-slate-600 p-4 text-white opacity-40"
            onClick={() => {
              if (video.current?.paused) {
                video.current?.play();
                setIsPlaying(true);
              } else {
                video.current?.pause();
                setIsPlaying(false);
              }
            }}
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>
        </div>
      )}

      <div className="col-span-1 col-start-4 row-span-2 row-start-3 flex h-full flex-col items-center justify-evenly">
        <button
          onClick={() => {
            setIsSaved((prev) => !prev);
          }}
          className={`${
            isSaved &&
            'animate-[ping_1s_cubic-bezier(0,0,0.2,1)_1] text-blue-400'
          }`}
        >
          <BookmarkIcon />
        </button>
        <Link
          href={`https://www.reddit.com/r/${subreddit}/comments/${
            id && id.substring(3)
          }`}
        >
          <CommentIcon />
        </Link>
        <button
          onClick={() => setIsLiked((prev) => !prev)}
          className={`${
            isLiked &&
            'animate-[ping_1s_cubic-bezier(0,0,0.2,1)_1] text-red-500'
          } flex flex-col items-center`}
        >
          <HeartIcon />
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
