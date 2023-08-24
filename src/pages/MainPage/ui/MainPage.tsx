import React from 'react';

import { useTranslation } from 'react-i18next';

import { Counter } from '@/entities/Counter';
import { getFeatureFlags } from '@/shared/lib/features';
import { Page } from '@/widgets/Page';

const MainPage = () => {
	const { t } = useTranslation();
	const isCounterEnabled = getFeatureFlags('isCounterEnabled');

	return (
		<Page data-testid="MainPage">
			{t('Главная')}
			{isCounterEnabled && <Counter />}
		</Page>
	);
};

export default MainPage;
