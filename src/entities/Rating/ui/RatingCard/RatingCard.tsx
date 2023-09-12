import { memo, useCallback, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { ToggleFeatures } from '@/shared/lib/features';
import { useDevice } from '@/shared/lib/hooks/useDevice/useDevice';
import {
	Button as ButtonDeprecated,
	ButtonSize,
	ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { InputWithCarriage as InputDeprecated } from '@/shared/ui/deprecated/InputWithCarriage';
import { StarRating } from '@/shared/ui/deprecated/StarRating';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { Input } from '@/shared/ui/redesigned/Input';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface RatingCardProps {
	className?: string;
	title?: string;
	hasFeedback?: boolean;
	feedbackTitle?: string;
	onCancel?: (starsCount: number) => void;
	onAccept?: (starsCount: number, feedback?: string) => void;
	rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
	const {
		className,
		title,
		hasFeedback,
		feedbackTitle,
		onCancel,
		onAccept,
		rate = 0,
	} = props;
	const { t } = useTranslation();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [starsCount, setStarsCount] = useState(rate);
	const [feedback, setFeedback] = useState('');
	const isMobile = useDevice();

	const onSelectStars = useCallback(
		(selectedStarsCount: number) => {
			setStarsCount(selectedStarsCount);
			if (hasFeedback) {
				setIsModalOpen(true);
			} else {
				onAccept?.(selectedStarsCount);
			}
		},
		[hasFeedback, onAccept],
	);

	const acceptHandler = useCallback(() => {
		setIsModalOpen(false);
		onAccept?.(starsCount, feedback);
	}, [feedback, onAccept, starsCount]);

	const cancelHandler = useCallback(() => {
		setIsModalOpen(false);
		onCancel?.(starsCount);
	}, [onCancel, starsCount]);

	const modalContent = (
		<ToggleFeatures
			feature="isAppRedesigned"
			on={
				<>
					<Text title={feedbackTitle} />
					<Input
						value={feedback}
						onChange={setFeedback}
						placeholder={t('Ваш отзыв')}
						data-testid="RatingCard.Input"
					/>
				</>
			}
			off={
				<>
					<TextDeprecated title={feedbackTitle} />
					<InputDeprecated
						value={feedback}
						onChange={setFeedback}
						placeholder={t('Ваш отзыв')}
						data-testid="RatingCard.Input"
					/>
				</>
			}
		/>
	);

	const content = (
		<>
			<VStack gap="8" align="center">
				<ToggleFeatures
					feature="isAppRedesigned"
					on={
						<Text
							title={
								starsCount ? t('Спасибо за ваш отзыв!') : title
							}
						/>
					}
					off={
						<TextDeprecated
							title={
								starsCount ? t('Спасибо за ваш отзыв!') : title
							}
						/>
					}
				/>

				<StarRating
					size={40}
					onSelect={onSelectStars}
					selectedStars={starsCount}
				/>
			</VStack>
			{isMobile ? (
				<Drawer isOpen={isModalOpen} onClose={cancelHandler} lazy>
					<VStack gap="32">
						{modalContent}
						<ToggleFeatures
							feature="isAppRedesigned"
							on={
								<Button
									onClick={acceptHandler}
									size="l"
									fullWidth
								>
									{t('Отправить')}
								</Button>
							}
							off={
								<ButtonDeprecated
									onClick={acceptHandler}
									size={ButtonSize.L}
									fullWidth
								>
									{t('Отправить')}
								</ButtonDeprecated>
							}
						/>
					</VStack>
				</Drawer>
			) : (
				<Modal isOpen={isModalOpen} lazy>
					<VStack gap="32" max>
						{modalContent}
						<ToggleFeatures
							feature="isAppRedesigned"
							on={
								<HStack gap="16" max justify="end">
									<Button
										onClick={cancelHandler}
										variant="outline"
										data-testid="RatingCard.Close"
									>
										{t('Закрыть')}
									</Button>
									<Button
										onClick={acceptHandler}
										data-testid="RatingCard.Send"
									>
										{t('Отправить')}
									</Button>
								</HStack>
							}
							off={
								<HStack gap="16" max justify="end">
									<ButtonDeprecated
										onClick={cancelHandler}
										theme={ButtonTheme.OUTLINE_RED}
										data-testid="RatingCard.Close"
									>
										{t('Закрыть')}
									</ButtonDeprecated>
									<ButtonDeprecated
										onClick={acceptHandler}
										data-testid="RatingCard.Send"
									>
										{t('Отправить')}
									</ButtonDeprecated>
								</HStack>
							}
						/>
					</VStack>
				</Modal>
			)}
		</>
	);

	return (
		<ToggleFeatures
			feature="isAppRedesigned"
			on={
				<Card
					padding="24"
					border="partial"
					max
					className={className}
					data-testid="RatingCard"
				>
					{content}
				</Card>
			}
			off={
				<CardDeprecated
					max
					className={className}
					data-testid="RatingCard"
				>
					{content}
				</CardDeprecated>
			}
		/>
	);
});
