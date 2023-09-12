import { memo } from 'react';

import { getRouteProfile } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import cls from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';

interface CommentCardProps {
	className?: string;
	comment?: Comment;
	isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
	const { className, comment, isLoading } = props;

	const Skeleton = toggleFeatures({
		name: 'isAppRedesigned',
		on: () => SkeletonRedesigned,
		off: () => SkeletonDeprecated,
	});

	if (isLoading) {
		return (
			<VStack
				gap="8"
				max
				className={classNames(cls.CommentCard, {}, [
					className,
					cls.loading,
				])}
				data-testid="CommentCard.Loading"
			>
				<div className={cls.header}>
					<Skeleton border="50%" width={30} height={30} />
					<Skeleton
						width={100}
						height={16}
						className={cls.username}
					/>
				</div>
				<Skeleton width="100%" height={50} className={cls.text} />
			</VStack>
		);
	}

	if (!comment) {
		return null;
	}

	return (
		<ToggleFeatures
			feature="isAppRedesigned"
			on={
				<Card padding="24" border="round" max>
					<VStack
						gap="8"
						max
						className={classNames(cls.CommentCardRedesigned, {}, [
							className,
						])}
						data-testid="CommentCard.Content"
					>
						<AppLink to={getRouteProfile(comment.user.id)}>
							<HStack gap="8">
								{comment.user.avatar ? (
									<Avatar
										src={comment.user.avatar}
										size={30}
									/>
								) : null}
								<Text text={comment.user.username} bold />
							</HStack>
						</AppLink>
						<Text text={comment.text} />
					</VStack>
				</Card>
			}
			off={
				<VStack
					gap="8"
					max
					className={classNames(cls.CommentCard, {}, [className])}
					data-testid="CommentCard.Content"
				>
					<AppLinkDeprecated
						to={getRouteProfile(comment.user.id)}
						className={cls.header}
					>
						{comment.user.avatar ? (
							<AvatarDeprecated
								src={comment.user.avatar}
								size={30}
							/>
						) : null}
						<TextDeprecated
							title={comment.user.username}
							className={cls.username}
						/>
					</AppLinkDeprecated>
					<TextDeprecated text={comment.text} className={cls.text} />
				</VStack>
			}
		/>
	);
});
