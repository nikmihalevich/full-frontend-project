import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';
import AboutIconDeprecated from '@/shared/assets/icons/about-icon.svg';
import ArticlesIconDeprecated from '@/shared/assets/icons/article-icon.svg';
import ArticlesIcon from '@/shared/assets/icons/article.svg';
import ProfileIcon from '@/shared/assets/icons/avatar.svg';
import MainIcon from '@/shared/assets/icons/home.svg';
import AboutIcon from '@/shared/assets/icons/Info.svg';
import MainIconDeprecated from '@/shared/assets/icons/main-icon.svg';
import ProfileIconDeprecated from '@/shared/assets/icons/profile-icon.svg';
import {
	getRouteAbout,
	getRouteArticles,
	getRouteMain,
	getRouteProfile,
} from '@/shared/const/router';
import { toggleFeatures } from '@/shared/lib/features';

import { SidebarItemType } from '../types/sidebar';

export const useSidebarItems = () => {
	const userData = useSelector(getUserAuthData);
	const sidebarItemsList: SidebarItemType[] = [
		{
			path: getRouteMain(),
			text: 'Главная',
			Icon: toggleFeatures({
				name: 'isAppRedesigned',
				off: () => MainIconDeprecated,
				on: () => MainIcon,
			}),
		},
		{
			path: getRouteAbout(),
			text: 'О сайте',
			Icon: toggleFeatures({
				name: 'isAppRedesigned',
				off: () => AboutIconDeprecated,
				on: () => AboutIcon,
			}),
		},
	];

	if (userData) {
		sidebarItemsList.push(
			{
				path: getRouteProfile(userData.id),
				text: 'Профиль',
				Icon: toggleFeatures({
					name: 'isAppRedesigned',
					off: () => ProfileIconDeprecated,
					on: () => ProfileIcon,
				}),
				authOnly: true,
			},
			{
				path: getRouteArticles(),
				text: 'Статьи',
				Icon: toggleFeatures({
					name: 'isAppRedesigned',
					off: () => ArticlesIconDeprecated,
					on: () => ArticlesIcon,
				}),
				authOnly: true,
			},
		);
	}

	return sidebarItemsList;
};
