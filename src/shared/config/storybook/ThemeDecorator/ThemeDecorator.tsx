import { Decorator } from '@storybook/react';

const ThemeDecorator = (theme: string): Decorator => (Story) => (
    <div className={`app ${theme}`}>
        <Story />
    </div>
);

export default ThemeDecorator;
