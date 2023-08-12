export { getUserAuthData } from 'entities/User/model/selectors/getUserAuthData/getUserAuthData';
export { getUserMounted } from 'entities/User/model/selectors/getUserMounted/getUserMounted';

export {
    userReducer,
    userActions,
} from './model/slice/userSlice';

export {
    UserSchema,
    User,
    UserRole,
} from './model/types/user';

export {
    isUserAdmin,
    isUserManager,
    getUserRoles,
} from './model/selectors/roleSelectors';
