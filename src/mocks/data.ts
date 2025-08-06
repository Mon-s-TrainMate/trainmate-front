import { addDays, formatISO, set } from 'date-fns';

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
  const exercise_name = [
    '숨쉬기 운동',
    '로잉 머신',
    '머신 랫 풀 다운',
    '덤벨 로우',
  ][(Math.random() * 4) | 0];

  const sets = Array.from({ length: (Math.random() * 5 + 1) | 0 }, () =>
    createExerciseRecordSet()
  );

  const set_count = sets.length;
  const total_duration_sec = sets.reduce((sum, set) => sum + set.duration, 0);
  const calories_burned = sets.reduce(
    (sum, set) => sum + set.calories_burned,
    0
  );

  return {
    record_id: exerciseRecordId++,
    date,
    is_trainer,
    exercise_name,
    set_count,
    total_duration_sec,
    calories_burned,
    sets,
  };
}

let exerciseSetId = 0;
function createExerciseRecordSet() {
  const repeat = (Math.random() * 10 + 1) | 0;
  const duration = (Math.random() * 300 + 30) | 0;
  const calories_burned = (Math.random() * 50 + 10) | 0;
  const kg = (Math.random() * 100 + 10) | 0;

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
