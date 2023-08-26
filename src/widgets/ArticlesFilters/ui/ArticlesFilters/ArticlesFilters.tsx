import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { ArticleSortField, ArticleType } from '@/entities/Article';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types/sort';
import { Card } from '@/shared/ui/redesigned/Card';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack';

import cls from './ArticlesFilters.module.scss';

interface ArticlesFiltersProps {
	className?: string;
	sort: ArticleSortField;
	order: SortOrder;
	onChangeOrder: (newOrder: SortOrder) => void;
	onChangeSort: (newSort: ArticleSortField) => void;
	type: ArticleType;
	onChangeType: (type: ArticleType) => void;
	search: string;
	onChangeSearch: (value: string) => void;
}

export const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
	const {
		className,
		type,
		onChangeType,
		onChangeSearch,
		onChangeSort,
		onChangeOrder,
		order,
		search,
		sort,
	} = props;
	const { t } = useTranslation();

	return (
		<Card
			className={classNames(cls.ArticlesFilters, {}, [className])}
			padding="24"
		>
			<VStack gap="32">
				<Input
					placeholder={t('Поиск')}
					value={search}
					onChange={onChangeSearch}
				/>
				<ArticleTypeTabs
					value={type}
					onChangeType={onChangeType}
					className={cls.tabs}
				/>
				<ArticleSortSelector
					sort={sort}
					order={order}
					onChangeOrder={onChangeOrder}
					onChangeSort={onChangeSort}
				/>
			</VStack>
		</Card>
	);
});
