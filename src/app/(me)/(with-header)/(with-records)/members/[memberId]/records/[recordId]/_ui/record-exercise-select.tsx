'use client';

import { SelectBox } from '@/components/ui/select';
import { useExercises } from '@/features/exercise/hooks/use-exercises';
import { PlusCircleIcon, SearchIcon } from 'lucide-react';
import { memo, useEffect, useState } from 'react';

interface SearchFieldProps {
  placeholder: string;
  selectedExercise: string;
  onExerciseSelect: (exerciseId: string) => void;
  className?: string;
}
function SearchField({
  placeholder,
  selectedExercise,
  onExerciseSelect,
  className,
}: SearchFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onExerciseSelect(e.target.value);
  };

  return (
    <div
      className={`flex w-80 items-center gap-2.5 rounded-xl bg-gray-5 px-5 py-3.5 ${className || ''}`}
    >
      <SearchIcon className="h-5 w-5 text-gray-2" />
      <input
        type="text"
        placeholder={placeholder}
        value={selectedExercise}
        onChange={handleChange}
        className="flex-1 bg-transparent text-sm text-black placeholder-gray-2 outline-none"
      />
    </div>
  );
}

interface ExerciseSelectProps {
  selectedExercise: string;
  onExerciseChange: (exercise: string) => void;
}

export const ExerciseSelect = memo(function ExerciseSelect({
  selectedExercise,
  onExerciseChange,
}: ExerciseSelectProps) {
  const { data: exercises = [], isLoading, error } = useExercises();
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [selectedMachine, setSelectedMachine] = useState('');
  useEffect(() => {
    if (selectedExercise && exercises.length > 0) {
      const matchingExercise = exercises.find(
        (exercise) => exercise.exerciseName === selectedExercise
      );

      if (matchingExercise) {
        setSelectedBodyPart(matchingExercise.bodyPart);
        setSelectedMachine(matchingExercise.equipment);
      }
    } else {
      setSelectedBodyPart('');
      setSelectedMachine('');
    }
  }, [selectedExercise, exercises]);
  const uniqueBodyParts = Array.from(
    new Set(exercises.map((exercise) => exercise.bodyPart))
  ).map((bodyPart) => ({
    label: bodyPart,
    value: bodyPart,
  }));

  const uniqueEquipment = Array.from(
    new Set(
      exercises
        .filter(
          (exercise) =>
            !selectedBodyPart || exercise.bodyPart === selectedBodyPart
        )
        .map((exercise) => exercise.equipment)
    )
  ).map((equipment) => ({
    label: equipment,
    value: equipment,
  }));
  const filteredExercises = exercises.filter((exercise) => {
    const matchesBodyPart =
      !selectedBodyPart || exercise.bodyPart === selectedBodyPart;
    const matchesEquipment =
      !selectedMachine || exercise.equipment === selectedMachine;
    return matchesBodyPart && matchesEquipment && exercise.isActive;
  });

  const exerciseOptions = filteredExercises.map((exercise) => ({
    label: exercise.exerciseName,
    value: exercise.exerciseName,
  }));

  if (error) {
    return (
      <div className="shadow-sm rounded-xl bg-white p-6">
        <div className="text-red-600 text-center">
          운동 목록을 불러오는 중 오류가 발생했습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="shadow-sm rounded-xl bg-white p-6">
      <div className="flex flex-col items-end gap-y-6">
        <div className="flex w-full items-center justify-between">
          <SearchField
            placeholder="운동 이름을 검색해보세요."
            selectedExercise={selectedExercise}
            onExerciseSelect={onExerciseChange}
          />
          <div className="flex items-center gap-x-2">
            <PlusCircleIcon className="h-6 w-6 text-black" />
            <span className="text-base text-black">추천 운동루틴 불러오기</span>
          </div>
        </div>
        <div className="flex w-full flex-col gap-y-3">
          <div className="text-sm text-black">진행할 운동을 선택해주세요.</div>
          <div className="flex w-full items-center gap-x-3">
            <SelectBox
              items={uniqueBodyParts}
              placeholder="부위"
              value={selectedBodyPart}
              onValueChange={setSelectedBodyPart}
              disabled={isLoading}
              className="flex-1"
            />
            <SelectBox
              items={uniqueEquipment}
              placeholder="도구"
              value={selectedMachine}
              onValueChange={setSelectedMachine}
              disabled={isLoading}
              className="flex-1"
            />
            <SelectBox
              items={exerciseOptions}
              placeholder="운동을 선택해주세요"
              value={selectedExercise}
              onValueChange={onExerciseChange}
              disabled={isLoading}
              className="w-80"
            />
          </div>
        </div>
      </div>
    </div>
  );
});
