import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

import { profileActions, profileReducer } from './profileSlice';
import { ValidateProfileError } from '../consts/consts';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { ProfileSchema } from '../types/editableProfileCardSchema';

const data = {
	username: 'admin',
	firstname: 'tester',
	lastname: 'user',
	age: 22,
	country: Country.Russia,
	city: 'Moscow',
	currency: Currency.USD,
};

describe('profileSlice.test', () => {
	test('test set readonly', () => {
		const state: DeepPartial<ProfileSchema> = { readonly: false };
		expect(
			profileReducer(
				state as ProfileSchema,
				profileActions.setReadonly(true),
			),
		).toEqual({ readonly: true });
	});

	test('test cancel edit', () => {
		const state: DeepPartial<ProfileSchema> = {
			data,
			form: { username: '' },
		};
		expect(
			profileReducer(state as ProfileSchema, profileActions.cancelEdit()),
		).toEqual({
			readonly: true,
			validateErrors: undefined,
			data,
			form: data,
		});
	});

	test('test update profile', () => {
		const state: DeepPartial<ProfileSchema> = { form: { username: '' } };
		expect(
			profileReducer(
				state as ProfileSchema,
				profileActions.updateProfile({
					username: 'test',
				}),
			),
		).toEqual({
			form: { username: 'test' },
		});
	});

	test('test update profile services pending', () => {
		const state: DeepPartial<ProfileSchema> = {
			isLoading: false,
			validateErrors: [ValidateProfileError.SERVER_ERROR],
		};
		expect(
			profileReducer(state as ProfileSchema, updateProfileData.pending),
		).toEqual({
			isLoading: true,
			validateErrors: undefined,
		});
	});

	test('test update profile services fulfilled', () => {
		const state: DeepPartial<ProfileSchema> = {
			isLoading: true,
			validateErrors: [ValidateProfileError.SERVER_ERROR],
		};
		expect(
			profileReducer(
				state as ProfileSchema,
				updateProfileData.fulfilled(data, ''),
			),
		).toEqual({
			isLoading: false,
			validateErrors: undefined,
			readonly: true,
			form: data,
			data,
		});
	});
});
