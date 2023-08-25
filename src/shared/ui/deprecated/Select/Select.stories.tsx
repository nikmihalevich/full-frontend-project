import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Select } from './Select';

export default {
	title: 'shared/Select',
	component: Select,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	label: 'Укажите значение',
	options: [
		{ value: '1', content: '1 point' },
		{ value: '2', content: '2 point' },
		{ value: '3', content: '3 point' },
		{ value: '4', content: '4 point' },
	],
};
