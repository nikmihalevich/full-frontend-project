import { memo } from 'react';

import { ArticleView } from '@/entities/Article';
import ListIcon from '@/shared/assets/icons/burger.svg';
import ListIconDeprecated from '@/shared/assets/icons/list-icon.svg';
import TiledIcon from '@/shared/assets/icons/tile.svg';
import TiledIconDeprecated from '@/shared/assets/icons/tiled-icon.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import {
	Button as ButtonDeprecated,
	ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { HStack } from '@/shared/ui/redesigned/Stack';

import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
	className?: string;
	view: ArticleView;
	onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
	{
		view: ArticleView.SMALL,
		icon: toggleFeatures({
			name: 'isAppRedesigned',
			on: () => TiledIcon,
			off: () => TiledIconDeprecated,
		}),
	},
	{
		view: ArticleView.BIG,
		icon: toggleFeatures({
			name: 'isAppRedesigned',
			on: () => ListIcon,
			off: () => ListIconDeprecated,
		}),
	},
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
	const { className, view, onViewClick } = props;

	const onClick = (newView: ArticleView) => () => {
		onViewClick?.(newView);
	};

	return (
		<ToggleFeatures
			feature="isAppRedesigned"
			on={
				<Card
					border="round"
					className={classNames(
						cls.ArticleViewSelectorRedesigned,
						{},
						[className],
					)}
				>
					<HStack gap="8">
						{viewTypes.map((viewType) => (
							<Icon
								key={viewType.view}
								Svg={viewType.icon}
								clickable
								onClick={onClick(viewType.view)}
								className={classNames(
									'',
									{
										[cls.notSelected]:
											viewType.view !== view,
									},
									[],
								)}
							/>
						))}
					</HStack>
				</Card>
			}
			off={
				<div
					className={classNames(cls.ArticleViewSelector, {}, [
						className,
					])}
				>
					{viewTypes.map((viewType) => (
						<ButtonDeprecated
							theme={ButtonTheme.CLEAR}
							onClick={onClick(viewType.view)}
							key={viewType.view}
						>
							<IconDeprecated
								Svg={viewType.icon}
								width={32}
								height={32}
								className={classNames(
									'',
									{
										[cls.notSelected]:
											viewType.view !== view,
									},
									[],
								)}
							/>
						</ButtonDeprecated>
					))}
				</div>
			}
		/>
	);
});
