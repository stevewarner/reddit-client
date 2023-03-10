import Posts from '@/components/Posts';
import SideMenu from '@/components/SideMenu';

const Home = () => {
  return (
    <div className="ios:min-fill-height hide-scrollbar flex min-h-screen snap-x snap-mandatory overflow-x-scroll">
      <SideMenu />
      <main className="flex min-w-full flex-1 snap-center snap-always items-center justify-center">
        {/* @ts-expect-error Server Component */}
        <Posts />
      </main>
    </div>
  );
};

export default Home;
