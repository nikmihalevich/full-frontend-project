import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { InputWithCarriage } from './InputWithCarriage';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'shared/InputWithCarriage',
    component: InputWithCarriage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof InputWithCarriage>;

const Template: ComponentStory<typeof InputWithCarriage> = (args) => <InputWithCarriage {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    placeholder: 'Type text',
    value: '123123',
};

export const Dark = Template.bind({});
Dark.args = {
    placeholder: 'Type text',
    value: '123123',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
