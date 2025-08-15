'use client';

import { useIsSm } from '@/lib/hooks/use-is-mobile';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import MetricsContainer from '../../../components/ui/user-metrics';

export default function Home() {
  const images = [
    { src: '/background-img.png', alt: '광고1' },
    { src: '/background2-img.jpg', alt: '광고2' },
    { src: '/background3-img.png', alt: '광고3' },
    { src: '/background4-img.jpg', alt: '광고4' },
  ];

  return (
    <div className="flex flex-col items-end justify-end px-7.5 pb-17.75">
      <MetricsContainer />
      <section className="mt-6">
        <h2 className="sr-only">광고</h2>
        <Carousel images={images} />
      </section>
    </div>
  );
}

interface CarouselProps {
  images: { src: string; alt: string }[];
}
function Carousel({ images }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [forceUpdate, setForceUpdate] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length, forceUpdate]);

  let y = 0;
  const items = Array.from({ length: images.length + 2 }).map(
    (_, reversedIndex, items) => {
      const index = items.length - reversedIndex - 2;
      const isActive = currentIndex === index;
      const wasActive = currentIndex === index + 1;
      const isLast = reversedIndex === 0;
      const isFirst = reversedIndex === items.length - 1;

      y -= wasActive || (isActive && !isLast) ? 4 : 1;

      return {
        index,
        isActive,
        y,
        isFirst,
        isLast,
      };
    }
  );
  const isSm = useIsSm();

  return (
    <div className="flex items-end gap-x-8">
      <div className="relative flex h-0 w-5 flex-col">
        {items.map(({ index, isActive, y, isFirst, isLast }) => {
          return (
            <button
              key={index}
              className={cn(
                'absolute w-full rounded-full transition-all duration-500 ease-out',
                {
                  'h-1 bg-primary': isActive,
                  'h-0.5 bg-gray-3': !isActive,
                  'hover:h-1 hover:bg-primary': !isFirst && !isLast,
                }
              )}
              style={{
                transform: `translateY(${y * (isSm ? 1 : 0.5)}rem)`,
              }}
              onClick={() => {
                setCurrentIndex(index);
                setForceUpdate({});
              }}
              disabled={isFirst || isLast}
            >
              <div className="absolute -top-2 h-5 w-[200%] bg-transparent" />
            </button>
          );
        })}
      </div>
      <div className="aspect-[290/150] w-full overflow-hidden rounded-lg">
        <div
          className="transition-transform duration-500 ease-in-out"
          style={{
            display: 'flex',
            flexDirection: 'column',
            transform: `translateY(-${(currentIndex * 100) / images.length}%)`,
          }}
        >
          {images.map(({ src, alt }, i) => (
            <Image
              key={i}
              className="aspect-[290/150] w-full object-cover"
              src={src}
              alt={alt}
              width={1160}
              height={600}
              loading="eager"
              objectFit="cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
