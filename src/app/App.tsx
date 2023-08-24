import React, { Suspense, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { getUserMounted, userActions } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';

import { AppRouter } from './providers/router';

const App = () => {
	const dispatch = useDispatch();
	const mounted = useSelector(getUserMounted);

	useEffect(() => {
		dispatch(userActions.initAuthData());
	}, [dispatch]);

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
