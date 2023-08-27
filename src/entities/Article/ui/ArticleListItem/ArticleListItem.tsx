import { memo } from 'react';

import { ToggleFeatures } from '@/shared/lib/features';

import { ArticleListItemDeprecated } from './ArticleListItemDeprecated/ArticleListItemDeprecated';
import { ArticleListItemProps } from './ArticleListItemProps';
import { ArticleListItemRedesigned } from './ArticleListItemRedesigned/ArticleListItemRedesigned';

export const ArticleListItem = memo((props: ArticleListItemProps) => {
	return (
		<ToggleFeatures
			feature="isAppRedesigned"
			on={<ArticleListItemRedesigned {...props} />}
			off={<ArticleListItemDeprecated {...props} />}
		/>
	);
});
