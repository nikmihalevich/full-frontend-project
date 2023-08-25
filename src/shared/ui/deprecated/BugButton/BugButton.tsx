import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { Button } from '../Button/Button';

// Component for test ErrorBoundary
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const BugButton = () => {
	const { t } = useTranslation();
	const [error, setError] = useState(false);

	const onThrow = () => {
		setError(true);
	};

	useEffect(() => {
		if (error) {
			throw new Error();
		}
	}, [error]);

	return <Button onClick={onThrow}>{t('Ошибка!')}</Button>;
};
