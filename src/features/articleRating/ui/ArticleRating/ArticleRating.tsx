import { memo, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { RatingCard } from '@/entities/Rating';
import { getUserAuthData } from '@/entities/User';
import { ToggleFeatures } from '@/shared/lib/features';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';

import {
	useGetArticleRating,
	useRateArticle,
} from '../../api/articleRatingApi';

export interface ArticleRatingProps {
	className?: string;
	articleId: string;
}

const ArticleRating = memo((props: ArticleRatingProps) => {
	const { className, articleId } = props;
	const { t } = useTranslation();
	const userData = useSelector(getUserAuthData);

	const { isLoading, data } = useGetArticleRating({
		articleId,
		userId: userData?.id ?? '',
	});

	const [rateArticleMutation] = useRateArticle();

	const handleRateArticle = useCallback(
		(starsCount: number, feedback?: string) => {
			try {
				rateArticleMutation({
					userId: userData?.id ?? '',
					articleId,
					rate: starsCount,
					feedback,
				});
			} catch (e) {
				console.log(e);
			}
		},
		[articleId, rateArticleMutation, userData?.id],
	);

	const onAccept = useCallback(
		(starsCount: number, feedback?: string) => {
			handleRateArticle(starsCount, feedback);
		},
		[handleRateArticle],
	);

	const onCancel = useCallback(
		(starsCount: number) => {
			handleRateArticle(starsCount);
		},
		[handleRateArticle],
	);

	if (isLoading) {
		return (
			<ToggleFeatures
				feature="isAppRedesigned"
				on={<SkeletonRedesigned width="100%" height={120} />}
				off={<SkeletonDeprecated width="100%" height={120} />}
			/>
		);
	}

	const rating = data?.[0];

	return (
		<RatingCard
			title={t('Оцените статью')}
			feedbackTitle={t(
				'Оставьте свой отзыв о статье, это помогает улучшить качество',
			)}
			hasFeedback
			rate={rating?.rate}
			className={className}
			onAccept={onAccept}
			onCancel={onCancel}
		/>
	);
});

export default ArticleRating;
