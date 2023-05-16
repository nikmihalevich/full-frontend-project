import { Decorator } from '@storybook/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'shared/config/i18n/i18nForStorybook';

const i18nDecorator = (): Decorator => (Story) => (
    <I18nextProvider i18n={i18n}>
        <Story />
    </I18nextProvider>
);

export default i18nDecorator;
