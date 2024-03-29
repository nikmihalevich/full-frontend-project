import { loginActions, loginReducer } from './loginSlice';
import { LoginSchema } from '../types/LoginSchema';

describe('loginSlice.test', () => {
	test('test set username', () => {
		const state: DeepPartial<LoginSchema> = { username: '123' };
		expect(
			loginReducer(state as LoginSchema, loginActions.setUsername('312')),
		).toEqual({ username: '312' });
	});
	test('test set password', () => {
		const state: DeepPartial<LoginSchema> = { password: '123' };
		expect(
			loginReducer(state as LoginSchema, loginActions.setPassword('321')),
		).toEqual({ password: '321' });
	});
});
