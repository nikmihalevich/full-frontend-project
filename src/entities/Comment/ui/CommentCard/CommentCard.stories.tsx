import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FeaturesFlagsDecorator } from '@/shared/config/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator';

import { CommentCard } from './CommentCard';

export default {
	title: 'entities/Comment/CommentCard',
	component: CommentCard,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => (
	<CommentCard {...args} />
);

const normalArgs = {
	comment: {
		id: '1',
		text: 'hello world comment 1',
		user: {
			id: '1',
			username: 'Test User',
		},
	},
};

export const Normal = Template.bind({});
Normal.args = normalArgs;

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = normalArgs;
NormalRedesigned.decorators = [
	FeaturesFlagsDecorator({ isAppRedesigned: true }),
];

export const Loading = Template.bind({});
Loading.args = {
	comment: {
		id: '1',
		text: 'hello world comment 1',
		user: {
			id: '1',
			username: 'Test User',
		},
	},
	isLoading: true,
};
