import { HTMLAttributeAnchorTarget, memo } from 'react';

import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import { HStack } from '@/shared/ui/redesigned/Stack';

import cls from './ArticleList.module.scss';
import { ArticleView } from '../../model/consts/articleConsts';
import { Article } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

interface ArticleListProps {
	className?: string;
	articles: Article[];
	isLoading?: boolean;
	view?: ArticleView;
	target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) =>
	new Array(view === ArticleView.SMALL ? 9 : 3)
		.fill(0)
		.map((item, index) => (
			<ArticleListItemSkeleton
				className={cls.card}
				key={index}
				view={view}
			/>
		));

export const ArticleList = memo((props: ArticleListProps) => {
	const {
		className,
		articles,
		view = ArticleView.BIG,
		isLoading,
		target,
	} = props;
	const { t } = useTranslation('articles');

	const renderArticle = (article: Article) => (
		<ArticleListItem
			key={article.id}
			article={article}
			view={view}
			className={cls.card}
			target={target}
		/>
	);

	if (!isLoading && !articles.length) {
		return (
			<div
				className={classNames(cls.ArticleList, {}, [
					className,
					cls[view],
				])}
			>
				<Text size={TextSize.L} title={t('Статьи не найдены')} />
			</div>
		);
	}

	return (
		<ToggleFeatures
			feature="isAppRedesigned"
			on={
				<HStack
					wrap="wrap"
					gap="16"
					className={classNames(cls.ArticleListRedesigned, {}, [])}
					data-testid="ArticleList"
				>
					{articles.length > 0 ? articles.map(renderArticle) : null}
					{isLoading && getSkeletons(view)}
				</HStack>
			}
			off={
				<div
					className={classNames(cls.ArticleList, {}, [
						className,
						cls[view],
					])}
					data-testid="ArticleList"
				>
					{articles.length > 0 ? articles.map(renderArticle) : null}
					{isLoading && getSkeletons(view)}
				</div>
			}
		/>
	);
});
