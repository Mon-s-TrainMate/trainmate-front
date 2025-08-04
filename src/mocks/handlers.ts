import { mswLogin } from './handlers/api/accounts/login';
import { mswSignup } from './handlers/api/accounts/signup';
import { mswMemberList } from './handlers/api/members/member-list';
import {
  mswMyProfile,
  mswUpdateMyProfile,
  mswPatchMyProfile,
} from './handlers/api/members/my-profile';
import { mswMemberProfile } from './handlers/api/members/profile';
import { mswMemberRecords } from './handlers/api/members/records';
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
];
