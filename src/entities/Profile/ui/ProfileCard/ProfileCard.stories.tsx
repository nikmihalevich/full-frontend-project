import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import AvatarImg from '@/shared/assets/tests/storybook.jpg';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

import { ProfileCard } from './ProfileCard';

export default {
	title: 'entities/ProfileCard',
	component: ProfileCard,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => (
	<ProfileCard {...args} />
);

const profileArgs = {
	data: {
		username: 'admin',
		firstname: 'user',
		lastname: 'user',
		age: 22,
		country: Country.Russia,
		city: 'Moscow',
		currency: Currency.USD,
		avatar: AvatarImg,
	},
};

export const Primary = Template.bind({});
Primary.args = profileArgs;

export const PrimaryRedesigned = Template.bind({});
PrimaryRedesigned.args = profileArgs;
PrimaryRedesigned.decorators = [NewDesignDecorator];

export const withError = Template.bind({});
withError.args = {
	error: 'true',
};

export const Loading = Template.bind({});
Loading.args = {
	isLoading: true,
};
