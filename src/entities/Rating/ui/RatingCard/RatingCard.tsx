import { memo, useCallback, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useDevice } from '@/shared/lib/hooks/useDevice/useDevice';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Drawer } from '@/shared/ui/Drawer';
import { InputWithCarriage } from '@/shared/ui/InputWithCarriage';
import { Modal } from '@/shared/ui/Modal';
import { HStack, VStack } from '@/shared/ui/Stack';
import { StarRating } from '@/shared/ui/StarRating';
import { Text } from '@/shared/ui/Text';

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

    const onSelectStars = useCallback((selectedStarsCount: number) => {
        setStarsCount(selectedStarsCount);
        if (hasFeedback) {
            setIsModalOpen(true);
        } else {
            onAccept?.(selectedStarsCount);
        }
    }, [hasFeedback, onAccept]);

    const acceptHandler = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const cancelHandler = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const modalContent = (
        <>
            <Text
                title={feedbackTitle}
            />
            <InputWithCarriage
                value={feedback}
                onChange={setFeedback}
                placeholder={t('Ваш отзыв')}
            />
        </>
    );

    return (
        <Card className={className} max>
            <VStack gap="8" align="center">
                <Text title={starsCount ? t('Спасибо за ваш отзыв!') : title} />
                <StarRating size={40} onSelect={onSelectStars} selectedStars={starsCount} />
            </VStack>
            {
                isMobile
                    ? (
                        <Drawer isOpen={isModalOpen} onClose={cancelHandler} lazy>
                            <VStack gap="32">
                                {modalContent}
                                <Button onClick={acceptHandler} size={ButtonSize.L} fullWidth>
                                    {t('Отправить')}
                                </Button>
                            </VStack>
                        </Drawer>
                    )
                    : (
                        <Modal isOpen={isModalOpen} lazy>
                            <VStack gap="32" max>
                                {modalContent}
                                <HStack gap="16" max justify="end">
                                    <Button onClick={cancelHandler} theme={ButtonTheme.OUTLINE_RED}>
                                        {t('Закрыть')}
                                    </Button>
                                    <Button onClick={acceptHandler}>
                                        {t('Отправить')}
                                    </Button>
                                </HStack>
                            </VStack>
                        </Modal>
                    )
            }
        </Card>
    );
});
