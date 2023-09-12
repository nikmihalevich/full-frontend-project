import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AppLoaderLayout } from './AppLoaderLayout';

export default {
	title: 'shared/Layouts/AppLoaderLayout',
	component: AppLoaderLayout,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof AppLoaderLayout>;

const Template: ComponentStory<typeof AppLoaderLayout> = () => (
	<AppLoaderLayout />
);

export const Normal = Template.bind({});
Normal.args = {};
