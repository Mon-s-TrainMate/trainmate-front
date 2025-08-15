import { addDays, formatISO, set } from 'date-fns';

interface CreateExerciseOptions {
  id: number;
  exercise_name: string;
  body_part: string;
  equipment: string;
  measurement_unit?: '회' | 'none';
  weight_unit?: 'kg' | 'none';
  met_value?: number;
  is_active?: boolean;
  created_at?: string;
}

function createExercise(options: CreateExerciseOptions) {
  return {
    id: options.id,
    exercise_name: options.exercise_name,
    body_part: options.body_part,
    equipment: options.equipment,
    measurement_unit: options.measurement_unit ?? 'none',
    weight_unit: options.weight_unit ?? 'none',
    met_value: options.met_value ?? 3.5,
    is_active: options.is_active ?? true,
    created_at: options.created_at ?? '2025-08-01T00:00:00.000Z',
  } as const;
}

export const exercises = [
  createExercise({
    id: 1,
    exercise_name: '푸시업',
    body_part: '가슴',
    equipment: '맨몸',
    measurement_unit: '회',
  }),
  createExercise({
    id: 2,
    exercise_name: '풀업',
    body_part: '등',
    equipment: '맨몸',
    measurement_unit: '회',
  }),
  createExercise({
    id: 3,
    exercise_name: '스쿼트',
    body_part: '하체',
    equipment: '맨몸',
    measurement_unit: '회',
  }),
  createExercise({
    id: 4,
    exercise_name: '데드리프트',
    body_part: '등',
    equipment: '바벨',
    measurement_unit: '회',
    weight_unit: 'kg',
  }),
  createExercise({
    id: 5,
    exercise_name: '벤치프레스',
    body_part: '가슴',
    equipment: '바벨',
    measurement_unit: '회',
    weight_unit: 'kg',
  }),
  createExercise({
    id: 6,
    exercise_name: '숄더프레스',
    body_part: '어깨',
    equipment: '덤벨',
    measurement_unit: '회',
    weight_unit: 'kg',
  }),
  createExercise({
    id: 7,
    exercise_name: '바벨로우',
    body_part: '등',
    equipment: '바벨',
    measurement_unit: '회',
    weight_unit: 'kg',
  }),
  createExercise({
    id: 8,
    exercise_name: '플랭크',
    body_part: '코어',
    equipment: '맨몸',
    measurement_unit: '회',
  }),
  createExercise({
    id: 9,
    exercise_name: '랫풀다운',
    body_part: '등',
    equipment: '머신',
    measurement_unit: '회',
    weight_unit: 'kg',
  }),
  createExercise({
    id: 10,
    exercise_name: '덤벨로우',
    body_part: '등',
    equipment: '덤벨',
    measurement_unit: '회',
    weight_unit: 'kg',
  }),
  createExercise({
    id: 11,
    exercise_name: '러닝머신',
    body_part: '하체',
    equipment: '머신',
  }),
  createExercise({
    id: 12,
    exercise_name: '로잉 머신',
    body_part: '등',
    equipment: '머신',
    measurement_unit: '회',
    weight_unit: 'kg',
  }),
];

function createExerciseRecords() {
  const size = (Math.random() * 3 + 2) | 0;
  const today = addDays(
    set(new Date(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }),
    -size + 1
  );
  return Array.from({ length: size }, (_, i) => {
    const date = formatISO(addDays(today, i), { representation: 'date' });
    const size = (Math.random() * 5) | 0;
    return Array.from({ length: size }).map(() => createExerciseRecord(date));
  }).flat();
}

let exerciseRecordId = 0;
function createExerciseRecord(date: string) {
  const is_trainer = Math.random() < 0.5;
  const selectedExercise = exercises[(Math.random() * exercises.length) | 0];
  const exercise_name = selectedExercise.exercise_name;

  const sets = Array.from({ length: (Math.random() * 5 + 1) | 0 }, () =>
    createExerciseRecordSet()
  );

  return {
    record_id: exerciseRecordId++,
    date,
    is_trainer,
    exercise_name,
    sets,
  };
}

let exerciseSetId = 0;
export function createExerciseRecordSet(
  options?: Partial<{
    repeat: number;
    duration: number;
    calories_burned: number;
    kg: number;
  }>
) {
  const repeat = options?.repeat ?? (Math.random() * 10 + 1) | 0;
  const duration = options?.duration ?? (Math.random() * 300 + 30) | 0;
  const calories_burned =
    options?.calories_burned ?? (Math.random() * 50 + 10) | 0;
  const kg = options?.kg ?? (Math.random() * 100 + 10) | 0;

  return {
    set_id: exerciseSetId++,
    repeat,
    duration,
    calories_burned,
    kg,
  };
}

let userId = 1;
export function createUser(name: string, email: string, user_type: string) {
  const id = userId++;
  return {
    id,
    name,
    email,
    user_type,
    created_at: '2025-08-01',
    profile_image: `https://i.pravatar.cc/150?img=${id}`,
    phone: '010-0000-0000',
    age: (Math.random() * 80) | 0,
    height_cm: (Math.random() * 50 + 150) | 0,
    weight_kg: (Math.random() * 100 + 50) | 0,
    body_fat_percentage: (Math.random() * 50) | 0,
    muscle_mass_kg: (Math.random() * 50) | 0,
    records: createExerciseRecords(),
    updated_at: '2025-08-01',
  };
}

export const users = [
  createUser('홍길동', 'asd@asd.asd', 'trainer'),
  createUser('김철수', 'cheolsu_kim@asd.asd', 'trainer'),
  createUser('나회원', '회원@asd.asd', 'member'),
  createUser('회원둘', '회원둘@asd.asd', 'member'),
];
