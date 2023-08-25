import { memo, useCallback, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import CalendarIcon from '@/shared/assets/icons/calendar-icon.svg';
import EyeIcon from '@/shared/assets/icons/eye-icon.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
	DynamicModuleLoader,
	ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { HStack, VStack } from '@/shared/ui/deprecated/Stack';
import {
	Text,
	TextAlign,
	TextSize,
	TextTheme,
} from '@/shared/ui/deprecated/Text';

import cls from './ArticleDetails.module.scss';
import { ArticleBlockType } from '../../model/consts/articleConsts';
import {
	getArticleDetailsData,
	getArticleDetailsError,
	getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { ArticleBlock } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticleDetailsProps {
	className?: string;
	id?: string;
}

const reducers: ReducersList = {
	articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
	const { className, id } = props;
	const { t } = useTranslation('articles-details');
	const dispatch = useAppDispatch();
	const isLoading = useSelector(getArticleDetailsIsLoading);
	const article = useSelector(getArticleDetailsData);
	const error = useSelector(getArticleDetailsError);

	const renderBlock = useCallback((block: ArticleBlock) => {
		switch (block.type) {
			case ArticleBlockType.TEXT:
				return (
					<ArticleTextBlockComponent
						key={block.id}
						block={block}
						className={cls.block}
					/>
				);
			case ArticleBlockType.IMAGE:
				return (
					<ArticleImageBlockComponent
						key={block.id}
						block={block}
						className={cls.block}
					/>
				);
			case ArticleBlockType.CODE:
				return (
					<ArticleCodeBlockComponent
						key={block.id}
						block={block}
						className={cls.block}
					/>
				);

			default:
				return null;
		}
	}, []);

	useEffect(() => {
		if (__PROJECT__ !== 'storybook') {
			dispatch(fetchArticleById(id));
		}
	}, [dispatch, id]);

	let content;

	if (isLoading) {
		content = (
			<>
				<Skeleton
					className={cls.avatar}
					width={200}
					height={200}
					border="50%"
				/>
				<Skeleton className={cls.title} width={300} height={32} />
				<Skeleton className={cls.skeleton} width={600} height={24} />
				<Skeleton className={cls.skeleton} width="100%" height={200} />
				<Skeleton className={cls.skeleton} width="100%" height={200} />
			</>
		);
	} else if (error) {
		content = (
			<Text
				align={TextAlign.CENTER}
				title={t('Произошла ошибка при загрузке статьи')}
				theme={TextTheme.ERROR}
			/>
		);
	} else {
		content = (
			<>
				<HStack justify="center" max>
					<Avatar
						size={200}
						src={article?.img}
						className={cls.avatar}
					/>
				</HStack>
				<VStack gap="4" max data-testid="ArticleDetails.Info">
					<Text
						className={cls.title}
						title={article?.title}
						text={article?.subtitle}
						size={TextSize.L}
					/>
					<HStack gap="8">
						<Icon Svg={EyeIcon} className={cls.icon} />
						<Text text={String(article?.views)} />
					</HStack>
					<HStack gap="8">
						<Icon Svg={CalendarIcon} className={cls.icon} />
						<Text text={article?.createdAt} />
					</HStack>
				</VStack>
				{article?.blocks.map(renderBlock)}
			</>
		);
	}

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<VStack
				gap="16"
				max
				className={classNames(cls.ArticleDetails, {}, [className])}
			>
				{content}
			</VStack>
		</DynamicModuleLoader>
	);
});
