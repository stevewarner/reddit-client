import { getPosts } from '@/utils/api';
import PostsWrapper from './PostsWrapper';

const Posts = async ({ subreddit = 'popular' }: { subreddit: string }) => {
  if (subreddit === '%5Bsubreddit%5D') return null;
  const posts = await getPosts({ sub: subreddit, after: null });

  if (posts.length < 1) return null;

  return <PostsWrapper initialSubreddit={subreddit} initialPosts={posts} />;
};

export default Posts;
