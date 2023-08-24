import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

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

export const Normal = Template.bind({});
Normal.args = {
	comment: {
		id: '1',
		text: 'hello world comment 1',
		user: {
			id: '1',
			username: 'Test User',
		},
	},
};
Normal.decorators = [StoreDecorator({})];

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
Loading.decorators = [StoreDecorator({})];
