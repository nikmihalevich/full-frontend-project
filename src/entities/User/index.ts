export { getUserAuthData } from '@/entities/User/model/selectors/getUserAuthData/getUserAuthData';
export { getUserMounted } from '@/entities/User/model/selectors/getUserMounted/getUserMounted';

export { userReducer, userActions } from './model/slice/userSlice';

export {
	isUserAdmin,
	isUserManager,
	getUserRoles,
} from './model/selectors/roleSelectors';

export type { UserSchema, User } from './model/types/user';
export { UserRole } from './model/consts/userConsts';
export { useJsonSettings } from './model/selectors/jsonSettings';
export { saveJsonSettings } from './model/services/saveJsonSettings';
