import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { NotificationList } from './NotificationList';

export default {
	title: 'entities/Notification/NotificationList',
	component: NotificationList,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = (args) => (
	<NotificationList {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
Normal.parameters = {
	mockData: [
		{
			url: `${__API__}/notifications`,
			method: 'GET',
			status: 200,
			response: [
				{
					id: '1',
					title: 'Notify 1',
					description: 'Description',
				},
				{
					id: '2',
					title: 'Notify 2',
					description: 'Description',
				},
				{
					id: '3',
					title: 'Notify 3',
					description: 'Description',
				},
			],
		},
	],
};
