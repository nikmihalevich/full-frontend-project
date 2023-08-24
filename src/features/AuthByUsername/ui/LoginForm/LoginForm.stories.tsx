import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

import LoginForm from './LoginForm';

export default {
	title: 'features/LoginForm',
	component: LoginForm,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => (
	<LoginForm {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [
	StoreDecorator({
		loginForm: {
			username: 'user',
			password: 'password',
		},
	}),
];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
	ThemeDecorator(Theme.DARK),
	StoreDecorator({
		loginForm: {
			username: 'user',
			password: 'password',
		},
	}),
];

export const withError = Template.bind({});
withError.args = {};
withError.decorators = [
	StoreDecorator({
		loginForm: {
			username: 'user',
			password: 'password',
			error: 'Error',
		},
	}),
];

export const Loading = Template.bind({});
Loading.args = {};
Loading.decorators = [
	StoreDecorator({
		loginForm: {
			isLoading: true,
		},
	}),
];
