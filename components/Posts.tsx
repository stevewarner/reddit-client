import { getPosts } from '@/utils/api';
import PostsWrapper from './PostsWrapper';

const Posts = async ({ subreddit = 'popular' }: { subreddit: string }) => {
  const posts = await getPosts({ sub: subreddit, after: null });

  return <PostsWrapper initialSubreddit={subreddit} initialPosts={posts} />;
};

export default Posts;
