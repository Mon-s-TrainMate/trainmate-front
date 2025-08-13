'use client';
import { ChevronLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { formatDuration } from '@/lib/time/format-duration';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { PlusCircleIcon } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface SavedWorkoutSet {
  id: number;
  exerciseName: string;
  durationSec: number;
  calories: number;
  timestamp: number;
}

const sumBy = (sets: SavedWorkoutSet[], key: 'durationSec' | 'calories') =>
  sets.reduce((total, set) => total + set[key], 0);

export function Sidebar() {
  const { memberId } = useParams();
  const queryClient = useQueryClient();

  const { data: savedSets = [] } = useQuery<SavedWorkoutSet[], Error>({
    queryKey: ['savedSets'],
    queryFn: async (): Promise<SavedWorkoutSet[]> => {
      return [];
    },
  });

  const totalTime = sumBy(savedSets, 'durationSec');
  const totalCalories = sumBy(savedSets, 'calories');

  const handleClearAll = () => {
    queryClient.setQueryData(['savedSets'], []);
  };

  return (
    <aside className="bg-white">
      <header className="flex items-center justify-between border-b p-6">
        <Link href={`/members/${memberId}`}>
          <ChevronLeftIcon />
        </Link>
        <div className="flex gap-3">
          <PlusCircleIcon className="h-5 w-5 cursor-pointer text-black" />
          <Trash
            className="h-5 w-5 cursor-pointer text-black"
            onClick={handleClearAll}
          />
        </div>
      </header>
      <div className="flex flex-col gap-3 p-6">
        <section className="flex items-center justify-center text-center">
          <h2 className="sr-only">저장된 운동</h2>
          {savedSets.length === 0 ? (
            <p className="self-center pt-12 pb-12 text-sm text-gray-2">
              등록된 운동이 없습니다.
              <br />
              새로운 운동을 등록해보세요.
            </p>
          ) : (
            <div className="w-full space-y-2">
              {savedSets.map((set) => (
                <div
                  key={set.timestamp}
                  className="mb-5 flex w-full items-center justify-between rounded-md bg-main-5 p-5"
                >
                  <div className="flex items-center gap-2">
                    <div className="size-1 rounded-full bg-main-2"></div>
                    <p className="text-lg font-normal text-black">
                      {set.exerciseName}
                    </p>
                  </div>
                  <p className="text-2xl font-light text-black">
                    {set.calories}{' '}
                    <span className="text-sm font-light text-gray-1">kcal</span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
        <section className="flex justify-between text-base font-light text-gray-2">
          <h2 className="sr-only">총 운동 시간 및 칼로리</h2>
          <p className="flex items-center gap-4">
            time
            <span className="text-2xl text-main-2">
              {formatDuration(totalTime)}
            </span>
          </p>
          <p className="flex items-center gap-4 font-light">
            total
            <span className="text-2xl text-main-2">
              {totalCalories}
              <span className="text-base text-gray-1"> kcal</span>
            </span>
          </p>
        </section>
      </div>
      <div className="pt-3 pr-6 pb-3 pl-6">
        <Button>저장하기</Button>
      </div>
    </aside>
  );
}
