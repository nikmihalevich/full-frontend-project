import { CSSProperties, memo, useMemo } from 'react';

import cls from './Avatar.module.scss';
import AvatarIcon from '../../../assets/icons/avatar-icon.svg';
import { Mods, classNames } from '../../../lib/classNames/classNames';
import { AppImage } from '../AppImage';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';

interface AvatarProps {
	className?: string;
	src?: string;
	size?: number;
	alt?: string;
	fallbackInverted?: boolean;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Avatar = memo((props: AvatarProps) => {
	const { className, src, size = 100, alt = '', fallbackInverted } = props;

	const mods: Mods = {};

	const styles = useMemo<CSSProperties>(
		() => ({
			width: size,
			height: size,
		}),
		[size],
	);

	const fallback = <Skeleton border="50%" height={size} width={size} />;
	const errorFallback = (
		<Icon
			inverted={fallbackInverted}
			width={size}
			height={size}
			Svg={AvatarIcon}
		/>
	);

	return (
		<AppImage
			fallback={fallback}
			errorFallback={errorFallback}
			src={src}
			style={styles}
			className={classNames(cls.Avatar, mods, [className])}
			alt={alt}
		/>
	);
});
