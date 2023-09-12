import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { ScrollToTopButton } from '@/features/scrollToTopButton';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';

import cls from './ScrollToolbar.module.scss';

interface ScrollToolbarProps {
	className?: string;
}

export const ScrollToolbar = memo((props: ScrollToolbarProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return (
		<VStack
			justify="center"
			align="center"
			max
			className={classNames(cls.ScrollToolbar, {}, [className])}
		>
			<ScrollToTopButton />
		</VStack>
	);
});
