import React, { memo, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
	getUserAuthData,
	isUserAdmin,
	isUserManager,
	userActions,
} from '@/entities/User';
import { getRouteAdmin, getRouteProfile } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Dropdown } from '@/shared/ui/deprecated/Popups';

interface AvatarDropdownProps {
	className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
	const { className } = props;
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const authData = useSelector(getUserAuthData);
	const isAdmin = useSelector(isUserAdmin);
	const isManager = useSelector(isUserManager);

	const onLogout = useCallback(() => {
		dispatch(userActions.logout());
	}, [dispatch]);

	const isAdminPanelAvailable = isAdmin || isManager;

	if (!authData) {
		return null;
	}

	return (
		<Dropdown
			className={classNames('', {}, [className])}
			direction="bottom left"
			items={[
				...(isAdminPanelAvailable
					? [
							{
								content: t('Админ'),
								href: getRouteAdmin(),
							},
					  ]
					: []),
				{
					content: t('Профиль'),
					href: getRouteProfile(authData.id),
				},
				{
					content: t('Выйти'),
					onClick: onLogout,
				},
			]}
			trigger={
				<Avatar fallbackInverted size={30} src={authData.avatar} />
			}
		/>
	);
});
