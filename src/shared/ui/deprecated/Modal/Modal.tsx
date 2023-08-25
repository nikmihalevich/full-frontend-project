import React, { ReactNode } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';

import cls from './Modal.module.scss';
import { Overlay } from '../../redesigned/Overlay/Overlay';
import { Portal } from '../../redesigned/Portal/Portal';

interface ModalProps {
	className?: string;
	children: ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
	lazy?: boolean;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Modal = (props: ModalProps) => {
	const { className, children, isOpen, onClose, lazy } = props;

	const { isMounted, isClosing, close } = useModal({
		isOpen,
		onClose,
		animationDelay: 300,
	});

	const mods: Mods = {
		[cls.opened]: isOpen,
		[cls.isClosing]: isClosing,
	};

	if (lazy && !isMounted) {
		return null;
	}

	return (
		<Portal>
			<div className={classNames(cls.Modal, mods, [className])}>
				<Overlay onClick={close} />
				<div className={cls.content}>{children}</div>
			</div>
		</Portal>
	);
};
