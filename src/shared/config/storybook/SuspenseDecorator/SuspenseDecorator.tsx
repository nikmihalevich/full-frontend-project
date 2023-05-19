import { Suspense } from 'react';
import { Story } from '@storybook/react';

export const SuspenseDecorator = (story: () => Story) => (
    <Suspense fallback="">
        {story()}
    </Suspense>
);
