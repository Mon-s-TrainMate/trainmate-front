import { mswMemberList } from './handlers/api/members/member-list';
import {
  mswMyProfile,
  mswPatchMyProfile,
  mswUpdateMyProfile,
} from './handlers/api/members/my-profile';
import { mswMemberProfile } from './handlers/api/members/profile';
import { mswExercises } from './handlers/api/workouts/exercises';
import { mswMemberRecord } from './handlers/api/workouts/record';
import { mswMemberRecords } from './handlers/api/workouts/records';
import { mswCreateWorkoutSet } from './handlers/api/workouts/sets/create-workout-set';
import { mswDeleteWorkoutSet } from './handlers/api/workouts/sets/delete-workout-set';
import { mswUpdateWorkoutSet } from './handlers/api/workouts/sets/update-workout-set';
import { mswCreateNewWorkoutSet } from './handlers/api/workouts/workout-sets';
import { mswLogin } from './handlers/auth/login';
import { mswRefresh } from './handlers/auth/refresh';
import { mswSignup } from './handlers/auth/signup';
import { mswLogger } from './handlers/logger';

export const handlers = [
  mswLogger,
  mswLogin,
  mswSignup,
  mswRefresh,
  mswMyProfile,
  mswUpdateMyProfile,
  mswPatchMyProfile,
  mswMemberProfile,
  mswMemberList,
  mswMemberRecord,
  mswMemberRecords,
  mswCreateWorkoutSet,
  mswUpdateWorkoutSet,
  mswDeleteWorkoutSet,
  mswCreateNewWorkoutSet,
  mswExercises,
];
