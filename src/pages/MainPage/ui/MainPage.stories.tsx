import type { Meta, StoryObj } from '@storybook/react';
import ThemeDecorator from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import SuspenseDecorator from 'shared/config/storybook/SuspenseDecorator/SuspenseDecorator';
import MainPage from './MainPage';

const meta: Meta<typeof MainPage> = {
    title: 'pages/MainPage',
    component: MainPage,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MainPage>;

export const Normal: Story = {
    args: {},
    decorators: [SuspenseDecorator()],
};

export const Dark: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK), SuspenseDecorator()],
};
