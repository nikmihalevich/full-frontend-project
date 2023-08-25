import React, { Suspense, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { getUserMounted, initAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
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
		<div className={classNames('app', {}, [])}>
			<Suspense fallback="">
				<Navbar />
				<div className="content-page">
					<Sidebar />
					{mounted && <AppRouter />}
				</div>
			</Suspense>
		</div>
	);
};

export default App;
