'use client';
import Image from 'next/image';
import { useState, useRef } from 'react';
import Overlay from './Overlay';

const Post = ({
  id,
  title,
  author,
  subreddit,
  upvotes,
  src,
  icon,
  isVideo,
  media,
  thumbnail,
}: IPost) => {
  const videoRef = useRef(null);
  const [isFullscreen, toggleIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="ios:fill-height relative flex h-screen min-w-full justify-center bg-black">
      {isVideo ? (
        <video
          autoPlay
          muted
          loop
          className={`ios:min-fill-height min-h-screen ${
            isFullscreen ? 'object-contain' : 'object-cover'
          }`}
          preload="auto"
          playsInline
          poster={thumbnail}
          ref={videoRef}
          onPlay={() => setIsPlaying(true)}
          onError={(err) => console.log('video error', err)}
        >
          <source src={media} />
        </video>
      ) : (
        <Image
          // unoptimized
          src={media}
          alt={title}
          className={`ios:min-fill-height min-h-screen ${
            isFullscreen ? 'object-contain' : 'object-cover'
          }`}
          fill
          sizes="(max-width: 768px) 100vw"
          quality={20}
        />
      )}
      <Overlay
        id={id}
        title={title}
        author={author}
        subreddit={subreddit}
        upvotes={upvotes}
        src={src}
        icon={icon}
        toggleIsFullscreen={toggleIsFullscreen}
        {...(isVideo
          ? {
              video: videoRef,
              isPlaying,
              setIsPlaying,
            }
          : {})}
      />
    </div>
  );
};

export default Post;
