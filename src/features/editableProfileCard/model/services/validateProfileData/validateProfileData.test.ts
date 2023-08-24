import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

import { validateProfileData } from './validateProfileData';
import { ValidateProfileError } from '../../consts/consts';

const data = {
	username: 'admin',
	firstname: 'tester',
	lastname: 'user',
	age: 22,
	country: Country.Russia,
	city: 'Moscow',
	currency: Currency.USD,
};

describe('validateProfileData.test', () => {
	test('success', async () => {
		const result = validateProfileData(data);

		expect(result).toEqual([]);
	});

	test('without first and last name', async () => {
		const result = validateProfileData({
			...data,
			firstname: '',
			lastname: '',
		});

		expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
	});

	test('incorrect age', async () => {
		const result = validateProfileData({ ...data, age: undefined });

		expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
	});

	test('incorrect username', async () => {
		const result = validateProfileData({ ...data, username: '' });

		expect(result).toEqual([ValidateProfileError.INCORRECT_USERNAME]);
	});

	test('incorrect city', async () => {
		const result = validateProfileData({ ...data, city: '' });

		expect(result).toEqual([ValidateProfileError.INCORRECT_CITY]);
	});

	test('incorrect country', async () => {
		const result = validateProfileData({ ...data, country: undefined });

		expect(result).toEqual([ValidateProfileError.INCORRECT_COUNTRY]);
	});

	test('incorrect currency', async () => {
		const result = validateProfileData({ ...data, currency: undefined });

		expect(result).toEqual([ValidateProfileError.INCORRECT_CURRENCY]);
	});

	test('incorrect all profile data', async () => {
		const result = validateProfileData({});

		expect(result).toEqual([
			ValidateProfileError.INCORRECT_USER_DATA,
			ValidateProfileError.INCORRECT_AGE,
			ValidateProfileError.INCORRECT_CITY,
			ValidateProfileError.INCORRECT_COUNTRY,
			ValidateProfileError.INCORRECT_CURRENCY,
			ValidateProfileError.INCORRECT_USERNAME,
		]);
	});
});
