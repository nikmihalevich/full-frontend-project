import { Decorator } from '@storybook/react';
import { Suspense } from 'react';

const SuspenseDecorator = (): Decorator => (Story) => (
    <Suspense fallback="">
        <Story />
    </Suspense>
);

export default SuspenseDecorator;
