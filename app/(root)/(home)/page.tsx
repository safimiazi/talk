'use client';
import MeetingTypeList from '@/components/MeetingTypeList';
import slide1 from '../../../public/images/slide_1.png';
import slide2 from '../../../public/images/slide_2.png';
import slide3 from '../../../public/images/slide_3.png';
import slide4 from '../../../public/images/slide_4.png';
import slide5 from '../../../public/images/slide_5.png';
import slide6 from '../../../public/images/slide_6.png';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import AiChat from '@/components/AiChat';
const Home = () => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const photos = [slide1, slide2, slide3, slide4, slide5, slide6];
  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1,
    );
  };


  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 4000);
 
    return () => clearInterval(intervalId);
  }, []);
  return (
    <section className="flex size-full flex-col gap-10 text-white">
     <div className='space-y-2'>
     <h1 className="text-3xl font-bold">Home</h1>
      <div className="w-full md:h-60 h-40 rounded-md relative">
        <div className="">
          <Image
            src={photos[currentImageIndex]}
            alt="slider"
            className="min-w-full md:h-60 h-40 opacity-65 rounded-md object-cover"
          />
        </div>
        <div className="absolute bottom-4 left-3">
        </div>
      </div>
     </div>

      <MeetingTypeList />
      <AiChat />
    </section>
  );
};

export default Home;
