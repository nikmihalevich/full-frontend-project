import { screen } from '@testing-library/react';

import { UserRole } from '@/entities/User';
import { getRouteAbout, getRouteAdmin, getRouteProfile } from '@/shared/const/router';
import { componentRender } from '@/shared/lib/test/componentRender/componentRender';

import AppRouter from './AppRouter';

describe('app/router/AppRouter', () => {
    test('Page should be rendered', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAbout(),
        });

        const page = await screen.findByTestId('AboutPage');
        expect(page).toBeInTheDocument();
    });

    test('Page not found', async () => {
        componentRender(<AppRouter />, {
            route: '/asdf',
        });

        const page = await screen.findByTestId('NotFoundPage');
        expect(page).toBeInTheDocument();
    });

    test('Unauthorized redirect to main page', async () => {
        componentRender(<AppRouter />, {
            route: getRouteProfile('1'),
        });

        const page = await screen.findByTestId('MainPage');
        expect(page).toBeInTheDocument();
    });

    test('Access to close page for authorized user', async () => {
        componentRender(<AppRouter />, {
            route: getRouteProfile('1'),
            initialState: {
                // @ts-ignore
                user: { _inited: true, authData: { } },
            },
        });

        const page = await screen.findByTestId('ProfilePage');
        expect(page).toBeInTheDocument();
    });

    test('Access denied (haven`t role)', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAdmin(),
            initialState: {
                // @ts-ignore
                user: { _inited: true, authData: { } },
            },
        });

        const page = await screen.findByTestId('ForbiddenPage');
        expect(page).toBeInTheDocument();
    });

    test('Access allowed (have role)', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAdmin(),
            initialState: {
                // @ts-ignore
                user: { _inited: true, authData: { roles: [UserRole.ADMIN] } },
            },
        });

        const page = await screen.findByTestId('AdminPanelPage');
        expect(page).toBeInTheDocument();
    });
});
