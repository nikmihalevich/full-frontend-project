import type { Preview } from '@storybook/react';
import '../../src/app/styles/index.scss';
import ThemeDecorator from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '../../src/app/providers/ThemeProvider';
import RouterDecorator from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
import i18nDecorator from '../../src/shared/config/storybook/i18nDecorator/i18nDecorator';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
    decorators: [ThemeDecorator(Theme.LIGHT), RouterDecorator(), i18nDecorator()],
};

export default preview;
