import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/deprecated/Card';
import { InputWithCarriage } from '@/shared/ui/deprecated/InputWithCarriage';

import cls from './ArticlesPageFilters.module.scss';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface ArticlesPageFiltersProps {
	className?: string;
}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
	const { className } = props;
	const { t } = useTranslation();

	const {
		sort,
		order,
		search,
		type,
		view,
		onChangeSearch,
		onChangeOrder,
		onChangeView,
		onChangeType,
		onChangeSort,
	} = useArticleFilters();

	return (
		<div className={classNames(cls.ArticlesPageFilters, {}, [className])}>
			<div className={cls.sortWrapper}>
				<ArticleSortSelector
					sort={sort}
					order={order}
					onChangeOrder={onChangeOrder}
					onChangeSort={onChangeSort}
				/>
				<ArticleViewSelector view={view} onViewClick={onChangeView} />
			</div>
			<Card className={cls.search}>
				<InputWithCarriage
					placeholder={t('Поиск')}
					value={search}
					onChange={onChangeSearch}
				/>
			</Card>
			<ArticleTypeTabs
				value={type}
				onChangeType={onChangeType}
				className={cls.tabs}
			/>
		</div>
	);
});
