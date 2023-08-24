import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { Profile } from '@/entities/Profile';
import { $api } from '@/shared/api/api';

import { EditableProfileCard } from './EditableProfileCard';
import { componentRender } from '../../../../shared/lib/test/componentRender/componentRender';
import { profileReducer } from '../../model/slice/profileSlice';

const profile: Profile = {
	id: '1',
	firstname: 'admin',
	lastname: 'admin',
	age: 24,
	currency: Currency.USD,
	country: Country.Kazakhstan,
	city: 'Moscow',
	username: 'admin123',
};

const options = {
	initialState: {
		profile: {
			readonly: true,
			data: profile,
			form: profile,
		},
		user: {
			authData: {
				id: '1',
				username: 'admin123',
			},
		},
	},
	asyncReducers: {
		profile: profileReducer,
	},
};

describe('features/EditableProfileCard', () => {
	test('Turn readonly mode', async () => {
		componentRender(<EditableProfileCard id="1" />, options);
		await userEvent.click(
			screen.getByTestId('EditableProfileCard.Header.EditButton'),
		);
		expect(
			screen.getByTestId('EditableProfileCard.Header.CancelButton'),
		).toBeInTheDocument();
	});

	test('Cancel all changes', async () => {
		componentRender(<EditableProfileCard id="1" />, options);
		await userEvent.click(
			screen.getByTestId('EditableProfileCard.Header.EditButton'),
		);

		await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
		await userEvent.clear(screen.getByTestId('ProfileCard.lastname'));

		await userEvent.type(
			screen.getByTestId('ProfileCard.firstname'),
			'asd123',
		);
		await userEvent.type(
			screen.getByTestId('ProfileCard.lastname'),
			'asd123',
		);

		expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue(
			'asd123',
		);
		expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue(
			'asd123',
		);

		await userEvent.click(
			screen.getByTestId('EditableProfileCard.Header.CancelButton'),
		);

		expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue(
			'admin',
		);
		expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('admin');
	});

	test('Should get error', async () => {
		componentRender(<EditableProfileCard id="1" />, options);
		await userEvent.click(
			screen.getByTestId('EditableProfileCard.Header.EditButton'),
		);

		await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));

		await userEvent.click(
			screen.getByTestId('EditableProfileCard.Header.SaveButton'),
		);

		expect(
			screen.getByTestId('EditableProfileCard.Error.Paragraph'),
		).toBeInTheDocument();
	});

	test('if havent validation errors, then PUT request should be sent on server', async () => {
		const mockPutReq = jest.spyOn($api, 'put');
		componentRender(<EditableProfileCard id="1" />, options);
		await userEvent.click(
			screen.getByTestId('EditableProfileCard.Header.EditButton'),
		);

		await userEvent.type(
			screen.getByTestId('ProfileCard.firstname'),
			'asd123',
		);

		await userEvent.click(
			screen.getByTestId('EditableProfileCard.Header.SaveButton'),
		);

		expect(mockPutReq).toHaveBeenCalled();
	});
});
