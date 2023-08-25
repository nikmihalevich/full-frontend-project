import React, { ForwardedRef, forwardRef, ReactNode } from 'react';

import { Link, type LinkProps } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './AppLink.module.scss';

export enum AppLinkTheme {
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
	className?: string;
	theme?: AppLinkTheme;
	children?: ReactNode;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const AppLink = forwardRef(
	(props: AppLinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
		const {
			to,
			className,
			children,
			theme = AppLinkTheme.PRIMARY,
			...otherProps
		} = props;

		return (
			<Link
				ref={ref}
				to={to}
				className={classNames(cls.AppLink, {}, [className, cls[theme]])}
				{...otherProps}
			>
				{children}
			</Link>
		);
	},
);
