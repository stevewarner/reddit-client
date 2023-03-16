import { getSession } from 'next-auth/react';

type Props = {
  sub: string;
  after?: string | null;
};

export const getPosts = async ({ sub, after = null }: Props) => {
  const res = await fetch(
    `https://www.reddit.com/${sub}.json?after=${after}&raw_json=1&sr_detail=true`,
    { next: { revalidate: false } }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data for subreddit: ' + sub);
  }

  const data = await res.json();
  const posts =
    data?.data?.children ||
    []
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

export const getSubbedPosts = async ({ sub, after = null }: Props) => {
  const session = await getSession();
  const sessionToken = session?.accessToken;
  const res = await fetch(
    `https://oauth.reddit.com/${sub}?after=${after}&sr_detail=true`,
    {
      next: { revalidate: false },
      headers: {
        Authorization: `Bearer ${sessionToken}`,
        'User-Agent': 'test app',
      },
    }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data for subreddit: ' + sub);
  }

  const data = await res.json();
  const posts =
    data?.data?.children ||
    []
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
          icon: post.data.sr_detail?.icon_img.replace(/&amp;/g, '&'),
        };
      });
  return posts;
};

export const getDefaultSubreddits = async () => {
  const res = await fetch(`https://www.reddit.com/subreddits.json?limit=25`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();

  if (!data?.data?.children) return [];

  const subreddits = data.data.children.map((sub: any) => {
    return {
      id: sub.data.name,
      name: sub.data.display_name,
      isSubscribed: sub.data.user_is_subscriber,
    };
  });

  return subreddits;
};

type SubredditsList =
  | {
      id: string;
      name: string;
      isSubscribed: boolean;
    }[]
  | [];

export const getSubreddits = async () => {
  const session = await getSession();
  const sessionToken = session?.accessToken;

  let subreddits = [] as SubredditsList;
  let after = null;

  do {
    let url = 'https://oauth.reddit.com/subreddits/mine/subscriber';

    if (after) {
      url += `?after=${after}`;
    }

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
        'User-Agent': 'myBot/0.0.1',
      },
    });

    const data = await res.json();
    subreddits = subreddits.concat(data?.data?.children);
    after = data.data.after;
  } while (after !== null);

  if (!subreddits) return [];

  const subbedList = subreddits.map((sub: any) => {
    return {
      id: sub.data.name,
      name: sub.data.display_name,
      isSubscribed: sub.data.user_is_subscriber,
    };
  });

  return subbedList;
};
