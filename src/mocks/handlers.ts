import { mswLogin } from './handlers/auth/login';
import { mswSignup } from './handlers/auth/signup';
import { mswMemberList } from './handlers/api/members/member-list';
import {
  mswMyProfile,
  mswUpdateMyProfile,
  mswPatchMyProfile,
} from './handlers/api/members/my-profile';
import { mswMemberProfile } from './handlers/api/members/profile';
import { mswMemberRecords } from './handlers/api/members/records';
import { mswCreateWorkoutSet } from './handlers/api/members/workout-sets';
import { mswExercises } from './handlers/api/workouts/exercises';
import { mswLogger } from './handlers/logger';

export const handlers = [
  mswLogger,
  mswLogin,
  mswSignup,
  mswMyProfile,
  mswUpdateMyProfile,
  mswPatchMyProfile,
  mswMemberProfile,
  mswMemberList,
  mswMemberRecords,
  mswCreateWorkoutSet,
  mswExercises,
];
