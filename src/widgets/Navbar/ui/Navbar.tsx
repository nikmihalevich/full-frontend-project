import React, { memo, useCallback, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';
import { LoginModal } from '@/features/AuthByUsername';
import { AvatarDropdown } from '@/features/avatarDropdown';
import { NotificationButton } from '@/features/notificationButton';
import { getRouteArticleCreate } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';
import { HStack } from '@/shared/ui/redesigned/Stack';

import cls from './Navbar.module.scss';

interface NavbarProps {
	className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
	const { t } = useTranslation();
	const [isAuthModal, setIsAuthModal] = useState(false);
	const authData = useSelector(getUserAuthData);

	const onOpenModal = useCallback(() => {
		setIsAuthModal(true);
	}, []);

	const onCloseModal = useCallback(() => {
		setIsAuthModal(false);
	}, []);

	if (authData) {
		return (
			<ToggleFeatures
				feature="isAppRedesigned"
				on={
					<header
						className={classNames(cls.NavbarRedesigned, {}, [
							className,
						])}
					>
						<HStack gap="16" className={cls.actions}>
							<NotificationButton />
							<AvatarDropdown />
						</HStack>
					</header>
				}
				off={
					<header className={classNames(cls.Navbar, {}, [className])}>
						<Text
							className={cls.appName}
							title={t('nixxx163 App')}
							theme={TextTheme.INVERTED}
						/>
						<AppLink
							theme={AppLinkTheme.SECONDARY}
							to={getRouteArticleCreate()}
							className={cls.createBtn}
						>
							{t('Создать статью')}
						</AppLink>
						<HStack gap="16" className={cls.actions}>
							<NotificationButton />
							<AvatarDropdown />
						</HStack>
					</header>
				}
			/>
		);
	}

	return (
		<header className={classNames(cls.Navbar, {}, [className])}>
			<Button
				theme={ButtonTheme.CLEAR_INVERTED}
				className={cls.links}
				onClick={onOpenModal}
			>
				{t('Войти')}
			</Button>
			{isAuthModal && (
				<LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
			)}
		</header>
	);
});
