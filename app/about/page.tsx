import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => (
  <div className="ios:fill-height flex h-screen">
    <div className="flex min-w-full flex-col text-slate-900 dark:text-white">
      <Header />
      <div className="mt-4 flex-1 px-4">
        <p>
          I made this to try out next 13 and tailwind. I tried to make it feel
          like a mobile native app instead of a webpage.
        </p>
        <br />
        <p>
          Data is fetched server side then uses React Query useInfiniteQuery to
          make additional calls. Every time posts are updated, I keep track of
          the last post. Then when the last post is visible to the user, it will
          fetch additional posts.
        </p>
      </div>
      <Footer />
    </div>
  </div>
);

export default About;
