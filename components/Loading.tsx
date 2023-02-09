import Spinner from '@/public/Spinner.svg';
import Image from 'next/image';

const Loading = () => (
  <div className="grid grid-cols-1">
    <div className="">
      <Image
        className="animate-spin"
        src={Spinner}
        alt="loading"
        height={30}
        width={30}
      />
    </div>
  </div>
);

export default Loading;
