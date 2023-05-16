import type { Meta, StoryObj } from '@storybook/react';
import ThemeDecorator from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import SuspenseDecorator from 'shared/config/storybook/SuspenseDecorator/SuspenseDecorator';
import { NotFoundPage } from './NotFoundPage';

const meta: Meta<typeof NotFoundPage> = {
    title: 'pages/NotFoundPage',
    component: NotFoundPage,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NotFoundPage>;

export const Normal: Story = {
    args: {},
    decorators: [SuspenseDecorator()],
};

export const Dark: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK), SuspenseDecorator()],
};
