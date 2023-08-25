import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { VStack } from '@/shared/ui/redesigned/Stack';

import cls from './NotificationList.module.scss';
import { useNotifications } from '../../api/notificationApi';
import { NotificationItem } from '../NotificationItem/NotificationItem';

interface NotificationListProps {
	className?: string;
}

export const NotificationList = memo((props: NotificationListProps) => {
	const { className } = props;
	const { t } = useTranslation();
	const { isLoading, data: notifications } = useNotifications(null, {
		pollingInterval: 5000,
	});

	if (isLoading) {
		return (
			<VStack
				gap="16"
				max
				className={classNames(cls.NotificationList, {}, [className])}
			>
				<Skeleton width="100%" border="8px" height="80px" />
				<Skeleton width="100%" border="8px" height="80px" />
				<Skeleton width="100%" border="8px" height="80px" />
			</VStack>
		);
	}

	return (
		<VStack
			gap="16"
			max
			className={classNames(cls.NotificationList, {}, [className])}
		>
			{notifications?.map((item) => (
				<NotificationItem key={item.id} item={item} />
			))}
		</VStack>
	);
});
