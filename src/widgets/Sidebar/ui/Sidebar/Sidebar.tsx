import React, { memo, useMemo, useState } from 'react';

import { useSelector } from 'react-redux';

import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLogo } from '@/shared/ui/deprecated/AppLogo';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { VStack } from '@/shared/ui/deprecated/Stack';

import cls from './Sidebar.module.scss';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';

interface SidebarProps {
	className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
	const [collapsed, setCollapsed] = useState(false);
	const sidebarItemsList = useSelector(getSidebarItems);

	const onToggle = () => {
		setCollapsed((prev) => !prev);
	};

	const itemsList = useMemo(
		() =>
			sidebarItemsList.map((item) => (
				<SidebarItem
					key={item.path}
					item={item}
					collapsed={collapsed}
				/>
			)),
		[collapsed, sidebarItemsList],
	);

	return (
		<ToggleFeatures
			feature="isAppRedesigned"
			on={
				<aside
					data-testid="sidebar"
					className={classNames(
						cls.SidebarRedesigned,
						{ [cls.collapsed]: collapsed },
						[className],
					)}
				>
					<AppLogo className={cls.appLogo} />
				</aside>
			}
			off={
				<aside
					data-testid="sidebar"
					className={classNames(
						cls.Sidebar,
						{ [cls.collapsed]: collapsed },
						[className],
					)}
				>
					<Button
						data-testid="sidebar-toggle"
						onClick={onToggle}
						className={cls.collapseBtn}
						theme={ButtonTheme.BACKGROUND_INVERTED}
						size={ButtonSize.L}
						square
					>
						{collapsed ? '>' : '<'}
					</Button>
					<VStack role="navigation" gap="8" className={cls.items}>
						{itemsList}
					</VStack>
					<div className={cls.switchers}>
						<ThemeSwitcher />
						<LangSwitcher short={collapsed} className={cls.lang} />
					</div>
				</aside>
			}
		/>
	);
});
