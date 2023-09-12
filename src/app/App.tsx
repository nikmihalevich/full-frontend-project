import React, { Suspense, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { getUserMounted, initAuthData } from '@/entities/User';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Navbar } from '@/widgets/Navbar';
import { PageLoader } from '@/widgets/PageLoader';
import { Sidebar } from '@/widgets/Sidebar';

import { useAppToolbar } from './lib/useAppToolbar';
import { AppRouter } from './providers/router';

const App = () => {
	const dispatch = useAppDispatch();
	const mounted = useSelector(getUserMounted);
	const toolbar = useAppToolbar();

	useEffect(() => {
		if (!mounted) {
			dispatch(initAuthData());
		}
	}, [dispatch, mounted]);

	if (!mounted) {
		return (
			<ToggleFeatures
				feature="isAppRedesigned"
				on={
					<div
						id="app"
						className={classNames('app_redesigned', {}, [])}
					>
						<AppLoaderLayout />
					</div>
				}
				off={<PageLoader />}
			/>
		);
	}

	return (
		<ToggleFeatures
			feature="isAppRedesigned"
			on={
				<div className={classNames('app_redesigned', {}, [])}>
					<Suspense fallback="">
						<MainLayout
							header={<Navbar />}
							content={<AppRouter />}
							sidebar={<Sidebar />}
							toolbar={toolbar}
						/>
					</Suspense>
				</div>
			}
			off={
				<div className={classNames('app', {}, [])}>
					<Suspense fallback="">
						<Navbar />
						<div className="content-page">
							<Sidebar />
							<AppRouter />
						</div>
					</Suspense>
				</div>
			}
		/>
	);
};

export default App;
