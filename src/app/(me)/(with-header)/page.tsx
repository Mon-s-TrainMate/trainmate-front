'use client';

import { useState, useEffect } from 'react';
import MetricsContainer from '../../../components/ui/user-metrics';
import Image from 'next/image';

export default function Home() {
  const backgroundImages: [string, string][] = [
    ['/background-img.png', '광고1'],
    ['/background2-img.jpg', '광고2'],
    ['/background3-img.png', '광고3'],
    ['/background4-img.jpg', '광고4'],
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mr-7.5 mb-17.75 flex flex-col items-end justify-end">
      <MetricsContainer />
      <section className="mt-6 flex items-end gap-8 overflow-hidden">
        <h2 className="sr-only">광고</h2>
        <div className="flex flex-col gap-3.75">
          {backgroundImages.map((_, index) => {
            const isActive = currentIndex === index;
            const isLast = index === backgroundImages.length - 1;
            return (
              <div
                key={index}
                className={
                  isActive
                    ? isLast
                      ? 'mt-10.75 mb-0 w-5 border-2 border-main-2'
                      : 'mt-10.75 mb-10.75 w-5 border-2 border-main-2'
                    : 'w-5 border-1 border-gray-3'
                }
              ></div>
            );
          })}
        </div>

        <div className="relative h-150 w-290 overflow-hidden rounded-lg">
          <div
            className="transition-transform duration-500 ease-in-out"
            style={{
              display: 'flex',
              flexDirection: 'column',
              transform: `translateY(-${currentIndex * 37.5}rem)`,
            }}
          >
            {backgroundImages.map(([src, alt], i) => (
              <Image
                key={i}
                className="h-150 w-290 object-cover"
                src={src}
                alt={alt}
                width={290}
                height={150}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
