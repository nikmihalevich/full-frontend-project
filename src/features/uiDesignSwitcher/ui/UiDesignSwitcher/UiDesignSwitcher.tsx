import { memo, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';
import { getFeatureFlags, updateFeatureFlag } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface UiDesignSwitcherProps {
	className?: string;
}

export const UiDesignSwitcher = memo((props: UiDesignSwitcherProps) => {
	const { className } = props;
	const { t } = useTranslation();
	const isAppRedesigned = getFeatureFlags('isAppRedesigned');
	const dispatch = useAppDispatch();
	const authData = useSelector(getUserAuthData);
	const [isLoading, setIsLoading] = useState(false);

	const items = [
		{
			content: t('Новый'),
			value: 'new',
		},
		{
			content: t('Старый'),
			value: 'old',
		},
	];

	const onChange = async (value: string) => {
		if (authData) {
			setIsLoading(true);
			await dispatch(
				updateFeatureFlag({
					newFeatures: {
						isAppRedesigned: value === 'new',
					},
					userId: authData.id,
				}),
			).unwrap();
			setIsLoading(false);
		}
	};

	return (
		<HStack>
			<Text text={t('Вид интерфейса')} />
			{isLoading ? (
				<Skeleton width={100} height={40} />
			) : (
				<ListBox
					onChange={onChange}
					items={items}
					value={isAppRedesigned ? 'new' : 'old'}
					className={className}
				/>
			)}
		</HStack>
	);
});
