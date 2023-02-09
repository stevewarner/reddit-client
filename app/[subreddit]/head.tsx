export default function Head({ params }: { params: { subreddit: string } }) {
  return (
    <>
      <title>{params.subreddit}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Progressive Web App Reddit Client" />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
