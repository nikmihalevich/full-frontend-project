import { memo } from 'react';

import { ArticleView } from '@/entities/Article';
import ListIcon from '@/shared/assets/icons/list-icon.svg';
import TiledIcon from '@/shared/assets/icons/tiled-icon.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Icon } from '@/shared/ui/deprecated/Icon';

import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
	className?: string;
	view: ArticleView;
	onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
	{
		view: ArticleView.SMALL,
		icon: TiledIcon,
	},
	{
		view: ArticleView.BIG,
		icon: ListIcon,
	},
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
	const { className, view, onViewClick } = props;

	const onClick = (newView: ArticleView) => () => {
		onViewClick?.(newView);
	};

	return (
		<div className={classNames(cls.ArticleViewSelector, {}, [className])}>
			{viewTypes.map((viewType) => (
				<Button
					theme={ButtonTheme.CLEAR}
					onClick={onClick(viewType.view)}
					key={viewType.view}
				>
					<Icon
						Svg={viewType.icon}
						width={32}
						height={32}
						className={classNames(
							'',
							{ [cls.notSelected]: viewType.view !== view },
							[],
						)}
					/>
				</Button>
			))}
		</div>
	);
});
