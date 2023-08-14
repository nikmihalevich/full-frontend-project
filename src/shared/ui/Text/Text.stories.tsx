import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { Text, TextSize, TextTheme } from './Text';

export default {
    title: 'shared/Text',
    component: Text,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    title: 'Title lorem ipsum',
    text: 'Description description description description description',
};

export const Dark = Template.bind({});
Dark.args = {
    title: 'Title lorem ipsum',
    text: 'Description description description description description',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Error = Template.bind({});
Error.args = {
    title: 'Title lorem ipsum',
    text: 'Description description description description description',
    theme: TextTheme.ERROR,
};

export const ErrorDark = Template.bind({});
ErrorDark.args = {
    title: 'Title lorem ipsum',
    text: 'Description description description description description',
    theme: TextTheme.ERROR,
};
ErrorDark.decorators = [ThemeDecorator(Theme.DARK)];

export const onlyTitle = Template.bind({});
onlyTitle.args = {
    title: 'Title lorem ipsum',
};

export const onlyTitleDark = Template.bind({});
onlyTitleDark.args = {
    title: 'Title lorem ipsum',
};
onlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const onlyText = Template.bind({});
onlyText.args = {
    text: 'Description description description description description',
};

export const onlyTextDark = Template.bind({});
onlyTextDark.args = {
    text: 'Description description description description description',
};
onlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SizeS = Template.bind({});
SizeS.args = {
    title: 'Title lorem ipsum',
    text: 'Description description description description description',
    size: TextSize.S,
};

export const SizeM = Template.bind({});
SizeM.args = {
    title: 'Title lorem ipsum',
    text: 'Description description description description description',
    size: TextSize.M,
};

export const SizeL = Template.bind({});
SizeL.args = {
    title: 'Title lorem ipsum',
    text: 'Description description description description description',
    size: TextSize.L,
};
