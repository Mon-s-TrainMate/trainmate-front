import { http, HttpResponse } from 'msw';
import { API_HOST } from '@/lib/consts';
import { exercises } from '@/mocks/data';

export const mswExercises = http.get(API_HOST + '/api/exercises', async () => {
  return HttpResponse.json({
    success: true,
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
});
