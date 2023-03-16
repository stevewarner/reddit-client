type IPost = {
  id: string;
  title: string;
  author: string;
  url: string;
  upvotes: number;
  subreddit: string;
  isVideo: boolean;
  media: string;
  src: string;
  thumbnail: string;
  icon: string;
};

type ISub = {
  id: string;
  name: string;
  isSubscribed: boolean;
};
