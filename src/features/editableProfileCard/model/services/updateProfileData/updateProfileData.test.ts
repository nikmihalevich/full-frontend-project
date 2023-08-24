import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { TestAsyncThunk } from '@/shared/lib/test/TestAsyncThunk/TestAsyncThunk';

import { updateProfileData } from './updateProfileData';
import { ValidateProfileError } from '../../consts/consts';

const data = {
	username: 'admin',
	firstname: 'tester',
	lastname: 'user',
	age: 22,
	country: Country.Russia,
	city: 'Moscow',
	currency: Currency.USD,
	id: '1',
};

describe('updateProfileData.test', () => {
	test('success', async () => {
		const thunk = new TestAsyncThunk(updateProfileData, {
			profile: {
				form: data,
				isLoading: false,
				readonly: true,
			},
		});

		thunk.api.put.mockReturnValue(Promise.resolve({ data }));

		const result = await thunk.callThunk();

		expect(thunk.api.put).toHaveBeenCalled();
		expect(result.meta.requestStatus).toBe('fulfilled');
		expect(result.payload).toEqual(data);
	});

	test('error', async () => {
		const thunk = new TestAsyncThunk(updateProfileData, {
			profile: {
				form: data,
				isLoading: false,
				readonly: true,
			},
		});

		thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));

		const result = await thunk.callThunk();

		expect(result.meta.requestStatus).toBe('rejected');
		expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR]);
	});

	test('validate error', async () => {
		const thunk = new TestAsyncThunk(updateProfileData, {
			profile: {
				form: { ...data, firstname: '' },
				isLoading: false,
				readonly: true,
			},
		});

		const result = await thunk.callThunk();

		expect(result.meta.requestStatus).toBe('rejected');
		expect(result.payload).toEqual([
			ValidateProfileError.INCORRECT_USER_DATA,
		]);
	});
});
