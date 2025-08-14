import MetricsContainer from '../../../components/ui/user-metrics';
import Image from 'next/image';
import background from '../../../../public/background-img.png';

export default function Home() {
  return (
    <div>
      <MetricsContainer></MetricsContainer>
      <Image src={background} alt="" />
    </div>
  );
}
