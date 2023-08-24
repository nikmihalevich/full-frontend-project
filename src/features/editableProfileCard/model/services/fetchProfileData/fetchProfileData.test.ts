import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { TestAsyncThunk } from '@/shared/lib/test/TestAsyncThunk/TestAsyncThunk';

import { fetchProfileData } from './fetchProfileData';

const data = {
	username: 'admin',
	firstname: 'tester',
	lastname: 'user',
	age: 22,
	country: Country.Russia,
	city: 'Moscow',
	currency: Currency.USD,
};

describe('fetchProfileData.test', () => {
	test('success', async () => {
		const thunk = new TestAsyncThunk(fetchProfileData);
		thunk.api.get.mockReturnValue(Promise.resolve({ data }));

		const result = await thunk.callThunk('1');

		expect(thunk.api.get).toHaveBeenCalled();
		expect(result.meta.requestStatus).toBe('fulfilled');
		expect(result.payload).toEqual(data);
	});

	test('error', async () => {
		const thunk = new TestAsyncThunk(fetchProfileData);
		thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
		const result = await thunk.callThunk('1');

		expect(result.meta.requestStatus).toBe('rejected');
	});
});
