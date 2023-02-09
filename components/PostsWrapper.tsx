'use client';
import { useInfiniteQuery } from 'react-query';
import { useRef, useEffect } from 'react';
import Post from './Post';
import { getPosts } from '@/utils/api';
import Loading from './Loading';

interface Props {
  initialSubreddit: string;
  initialPosts: IPost[];
}

const fetchData = async ({
  sub,
  after = null,
}: {
  sub: string;
  after?: string | null;
}) => {
  const data = await getPosts({ sub, after });
  return data;
};

const PostsWrapper = ({ initialSubreddit, initialPosts }: Props) => {
  const lastPostRef = useRef(null);
  let lastPost =
    (initialPosts.length > 0 && initialPosts[initialPosts.length - 1]?.id) ||
    '';

  const { data, isLoading, fetchNextPage, error } = useInfiniteQuery(
    `${initialSubreddit}-posts`,
    async ({ pageParam = lastPost }) =>
      fetchData({ sub: initialSubreddit, after: pageParam }),
    {
      initialData: {
        pageParams: [null],
        pages: [initialPosts],
      },
      getNextPageParam: (prevPosts: IPost[]) => {
        return prevPosts[prevPosts.length - 1]?.id;
      },
      keepPreviousData: true,
      enabled: false,
    }
  );

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        fetchNextPage();
      }
    });
    // check if last post is visible
    const currentElement = lastPostRef.current;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [data?.pages]);

  if (isLoading) return <Loading />;

  if (error) console.error(error);

  // update lastPost
  const currPosts = data?.pages.flat() || initialPosts;
  lastPost = currPosts[currPosts.length - 1]?.id;

  if (!data) return null;

  return (
    <div className="ios:max-fill-height ios:min-fill-height hide-scrollbar grid max-h-screen snap-y snap-mandatory grid-cols-1 overflow-y-scroll">
      {/* <div className="ios:fill-height flex h-screen w-screen snap-center snap-always justify-center">
        <button onClick={() => fetchNextPage()}>Fetch more</button>
      </div> */}
      {data &&
        data.pages.flat().map((post: IPost) => {
          const isRef = post.id === lastPost;

          return (
            <div
              key={post.id}
              id={post.id}
              className="ios:fill-height flex h-screen w-screen snap-center snap-always justify-center"
              {...(isRef
                ? { ref: lastPostRef as React.RefObject<HTMLDivElement> }
                : {})}
            >
              <Post
                id={post.id}
                title={post.title}
                author={post.author}
                subreddit={post.subreddit}
                url={post.url}
                upvotes={post.upvotes}
                src={post.src}
                icon={post.icon}
                isVideo={post.isVideo}
                media={post.media}
                thumbnail={post.thumbnail}
              />
            </div>
          );
        })}
    </div>
  );
};

export default PostsWrapper;
