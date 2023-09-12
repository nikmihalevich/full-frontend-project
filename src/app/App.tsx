import React, { Suspense, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { getUserMounted, initAuthData } from '@/entities/User';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Navbar } from '@/widgets/Navbar';
import { PageLoader } from '@/widgets/PageLoader';
import { Sidebar } from '@/widgets/Sidebar';

import { AppRouter } from './providers/router';

const App = () => {
	const dispatch = useAppDispatch();
	const mounted = useSelector(getUserMounted);

	useEffect(() => {
		dispatch(initAuthData());
	}, [dispatch]);

	if (!mounted) {
		return <PageLoader />;
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
							toolbar={<></>}
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
