import React, { ForwardedRef, forwardRef, ReactNode } from 'react';

import { type LinkProps, NavLink } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './AppLink.module.scss';

export type AppLinkVariant = 'primary' | 'red';

interface AppLinkProps extends LinkProps {
	className?: string;
	variant?: AppLinkVariant;
	children?: ReactNode;
	activeClassName?: string;
}

export const AppLink = forwardRef(
	(props: AppLinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
		const {
			to,
			className,
			children,
			variant = 'primary',
			activeClassName = '',
			...otherProps
		} = props;

		return (
			<NavLink
				ref={ref}
				to={to}
				className={({ isActive }) =>
					classNames('', { [activeClassName]: isActive }, [
						className,
						cls[variant],
					])
				}
				{...otherProps}
			>
				{children}
			</NavLink>
		);
	},
);
