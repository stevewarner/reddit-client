type Props = {
  sub: string;
  after?: string | null;
};

export const getPosts = async ({ sub, after = null }: Props) => {
  const res = await fetch(
    `https://www.reddit.com/r/${sub}.json?after=${after}&raw_json=1&sr_detail=true`
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  const posts = data.data.children
    .filter((post: any) => {
      return (
        post.data.url.match(
          /(\.jpg|\.jpeg|\.png|\.gif|\.webp|\.gifv|\.webm|\.mp4)$/
        ) ||
        post.data.preview?.reddit_video_preview?.fallback_url ||
        post.data.media?.reddit_video?.fallback_url
      );
    })
    .map((post: any) => {
      const isVideo =
        !!post.data.preview?.reddit_video_preview?.fallback_url ||
        !!post.data.media?.reddit_video?.fallback_url;
      return {
        id: post.data.name,
        title: post.data.title,
        src: post.data.url,
        author: post.data.author,
        upvotes: post.data.ups - post.data.downs,
        subreddit: post.data.subreddit,
        isVideo,
        media: isVideo
          ? post.data.preview?.reddit_video_preview?.fallback_url ||
            post.data.media?.reddit_video?.fallback_url
          : post.data.url,
        thumbnail: post.data.thumbnail,
        icon: post.data.sr_detail?.icon_img,
      };
    });
  return posts;
};
