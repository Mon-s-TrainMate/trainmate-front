import { API_HOST } from '@/lib/consts';
import { exercises } from '@/mocks/data';
import { withAuthorization } from '@/mocks/utils';
import { http, HttpResponse } from 'msw';

export const mswExercises = http.get(
  API_HOST + '/api/workouts/exercises',
  async ({ request }) => {
    await withAuthorization(request);
    return HttpResponse.json({
      success: true,
      data: exercises.reduce(
        (acc, exercise) => {
          const arr = acc[exercise.body_part] ?? [];
          arr.push({
            id: exercise.id,
            equipment: exercise.equipment,
            exercise_name: exercise.exercise_name,
            measurement_unit: exercise.measurement_unit,
            weight_unit: exercise.weight_unit,
          });
          acc[exercise.body_part] = arr;

          return acc;
        },
        {} as Record<
          string,
          {
            id: number;
            equipment: string;
            exercise_name: string;
            measurement_unit: string;
            weight_unit: string;
          }[]
        >
      ),
      exercises: exercises.map((exercise) => ({
        id: exercise.id,
        exercise_name: exercise.exercise_name,
        body_part: exercise.body_part,
        equipment: exercise.equipment,
        measurement_unit: exercise.measurement_unit,
        weight_unit: exercise.weight_unit,
        met_value: exercise.met_value,
        is_active: exercise.is_active,
        created_at: exercise.created_at,
      })),
    });
  }
);
