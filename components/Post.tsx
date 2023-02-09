'use client';
import Image from 'next/image';
import { useState } from 'react';
import Overlay from './Overlay';

// {...(post.id === lastPost ? { ref: lastPostRef } : {})}

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
  const [isFullscreen, toggleIsFullscreen] = useState(false);

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
      />
    </div>
  );
};

export default Post;
