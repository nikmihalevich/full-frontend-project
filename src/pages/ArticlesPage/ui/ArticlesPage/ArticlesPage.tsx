import { memo, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { ArticlePageGreeting } from '@/features/articlePageGreeting';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
	DynamicModuleLoader,
	ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Page } from '@/widgets/Page';

import cls from './ArticlesPage.module.scss';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { articlesPageReducer } from '../../model/slices/ArticlesPageSlice';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import { FilterContainer } from '../FilterContainer/FilterContainer';
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer';

interface ArticlesPageProps {
	className?: string;
}

const reducers: ReducersList = {
	articlesPage: articlesPageReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
	const { t } = useTranslation('articles');
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();

	const onLoadNextPart = useCallback(() => {
		dispatch(fetchNextArticlesPage());
	}, [dispatch]);

	useInitialEffect(() => {
		dispatch(initArticlesPage(searchParams));
	});

	const content = (
		<ToggleFeatures
			feature="isAppRedesigned"
			on={
				<StickyContentLayout
					left={<ViewSelectorContainer />}
					right={<FilterContainer />}
					content={
						<Page
							onScrollEnd={onLoadNextPart}
							className={classNames(
								cls.ArticlesPageRedesigned,
								{},
								[className],
							)}
							data-testid="ArticlesPage"
						>
							<ArticleInfiniteList className={cls.list} />
							<ArticlePageGreeting />
						</Page>
					}
				/>
			}
			off={
				<Page
					onScrollEnd={onLoadNextPart}
					className={classNames(cls.ArticlesPage, {}, [className])}
					data-testid="ArticlesPage"
				>
					<ArticlesPageFilters />
					<ArticleInfiniteList className={cls.list} />
					<ArticlePageGreeting />
				</Page>
			}
		/>
	);

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
			{content}
		</DynamicModuleLoader>
	);
};

export default memo(ArticlesPage);
