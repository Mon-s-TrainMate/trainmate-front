'use client';

import MetricsContainer from '../../../components/ui/user-metrics';
import Image from 'next/image';
import background from '../../../../public/background-img.png';

export default function Home() {
  const backgroundImages: [typeof background, string][] = [
    [background, '광고1'],
    [background, '광고2'],
    [background, '광고3'],
    [background, '광고4'],
    [background, '광고5'],
    [background, '광고6'],
    [background, '광고7'],
  ];

  return (
    <div className="mr-7.5 mb-17.75 flex flex-col items-end justify-end">
      <MetricsContainer />

      <section className="flex items-end gap-8">
        <h2 className="sr-only">광고</h2>
        <div className="flex flex-col gap-3.75">
          <div className="w-5 border-1 border-gray-3"></div>
          <div className="mt-10.75 mb-10.75 w-5 border-2 border-main-2"></div>
        </div>
        <Image
          className="h-150 w-290 rounded-lg object-cover"
          src={backgroundImages[0][0]}
          alt={backgroundImages[0][1]}
        />
      </section>
    </div>
  );
}
