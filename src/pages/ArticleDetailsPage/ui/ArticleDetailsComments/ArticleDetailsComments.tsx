import { memo, Suspense, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { CommentList } from '@/entities/Comment';
import { AddCommentForm } from '@/features/addCommentForm';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Loader } from '@/shared/ui/Loader';
import { VStack } from '@/shared/ui/Stack';
import { Text, TextSize } from '@/shared/ui/Text';

import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';

interface ArticleDetailsCommentsProps {
	className?: string;
	id?: string;
}

export const ArticleDetailsComments = memo(
	(props: ArticleDetailsCommentsProps) => {
		const { className, id } = props;
		const { t } = useTranslation();
		const comments = useSelector(getArticleComments.selectAll);
		const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
		const dispatch = useAppDispatch();

		useInitialEffect(() => {
			dispatch(fetchCommentsByArticleId(id));
		});

		const onSendComment = useCallback(
			(text: string) => {
				dispatch(addCommentForArticle(text));
			},
			[dispatch],
		);

		return (
			<VStack gap="16" max className={classNames('', {}, [className])}>
				<Text size={TextSize.L} title={t('Комментарии')} />
				<Suspense fallback={<Loader />}>
					<AddCommentForm onSendComment={onSendComment} />
				</Suspense>
				<CommentList
					comments={comments}
					isLoading={commentsIsLoading}
				/>
			</VStack>
		);
	},
);
