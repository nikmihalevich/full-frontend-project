import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { ArticlesFilters } from '@/widgets/ArticlesFilters';

import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface FilterContainerProps {
	className?: string;
}

export const FilterContainer = memo((props: FilterContainerProps) => {
	const { className } = props;
	const { t } = useTranslation();

	const {
		sort,
		order,
		search,
		type,
		onChangeSearch,
		onChangeOrder,
		onChangeType,
		onChangeSort,
	} = useArticleFilters();

	return (
		<ArticlesFilters
			sort={sort}
			order={order}
			search={search}
			type={type}
			onChangeSearch={onChangeSearch}
			onChangeOrder={onChangeOrder}
			onChangeType={onChangeType}
			onChangeSort={onChangeSort}
			className={className}
		/>
	);
});
