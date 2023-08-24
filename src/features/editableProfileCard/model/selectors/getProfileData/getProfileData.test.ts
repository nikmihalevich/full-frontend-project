import { StateSchema } from '@/app/providers/StoreProvider';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

import { getProfileData } from './getProfileData';

describe('getProfileData.test', () => {
	test('should work with filled state', () => {
		const data = {
			username: 'admin',
			firstname: 'tester',
			lastname: 'user',
			age: 22,
			country: Country.Russia,
			city: 'Moscow',
			currency: Currency.USD,
		};

		const state: DeepPartial<StateSchema> = {
			profile: {
				data,
			},
		};
		expect(getProfileData(state as StateSchema)).toEqual(data);
	});
	test('should work with empty state', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getProfileData(state as StateSchema)).toEqual(undefined);
	});
});
