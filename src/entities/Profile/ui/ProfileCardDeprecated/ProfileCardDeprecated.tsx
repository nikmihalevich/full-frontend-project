import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { InputWithCarriage } from '@/shared/ui/deprecated/InputWithCarriage';
import { Loader as LoaderDeprecated } from '@/shared/ui/deprecated/Loader';
import {
	Text as TextDeprecated,
	TextAlign,
	TextTheme,
} from '@/shared/ui/deprecated/Text';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

import cls from './ProfileCardDeprecated.module.scss';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';

export const ProfileCardDeprecatedError = () => {
	const { t } = useTranslation('profile');
	return (
		<HStack
			justify="center"
			max
			className={classNames(cls.ProfileCard, {}, [cls.error])}
		>
			<TextDeprecated
				theme={TextTheme.ERROR}
				title={t('Произошла ошибка при загрузке профиля')}
				text={t('Попробуйте обновить страницу')}
				align={TextAlign.CENTER}
			/>
		</HStack>
	);
};

export const ProfileCardDeprecatedLoader = () => {
	return (
		<HStack
			justify="center"
			max
			className={classNames(cls.ProfileCard, { [cls.loading]: true })}
		>
			<LoaderDeprecated />
		</HStack>
	);
};

export const ProfileCardDeprecated = memo((props: ProfileCardProps) => {
	const { t } = useTranslation('profile');
	const {
		className,
		data,
		readonly,
		onChangeFirstname,
		onChangeLastname,
		onChangeAge,
		onChangeCity,
		onChangeUsername,
		onChangeAvatar,
		onChangeCurrency,
		onChangeCountry,
	} = props;

	const mods: Mods = {
		[cls.editing]: !readonly,
	};

	return (
		<VStack
			gap="16"
			max
			className={classNames(cls.ProfileCard, mods, [className])}
		>
			{data?.avatar && (
				<HStack justify="center" max>
					<AvatarDeprecated src={data?.avatar} />
				</HStack>
			)}
			<InputWithCarriage
				value={data?.firstname}
				placeholder={t('Ваше имя')}
				className={cls.input}
				onChange={onChangeFirstname}
				readonly={readonly}
				data-testid="ProfileCard.firstname"
			/>
			<InputWithCarriage
				value={data?.lastname}
				placeholder={t('Ваша фамилия')}
				className={cls.input}
				onChange={onChangeLastname}
				readonly={readonly}
				data-testid="ProfileCard.lastname"
			/>
			<InputWithCarriage
				value={data?.age}
				placeholder={t('Ваш возраст')}
				className={cls.input}
				onChange={onChangeAge}
				readonly={readonly}
			/>
			<InputWithCarriage
				value={data?.city}
				placeholder={t('Город')}
				className={cls.input}
				onChange={onChangeCity}
				readonly={readonly}
			/>
			<InputWithCarriage
				value={data?.username}
				placeholder={t('Имя пользователя')}
				className={cls.input}
				onChange={onChangeUsername}
				readonly={readonly}
			/>
			<InputWithCarriage
				value={data?.avatar}
				placeholder={t('Ссылка на аватар')}
				className={cls.input}
				onChange={onChangeAvatar}
				readonly={readonly}
			/>
			<CurrencySelect
				className={cls.input}
				value={data?.currency}
				onChange={onChangeCurrency}
				readonly={readonly}
			/>
			<CountrySelect
				className={cls.input}
				value={data?.country}
				onChange={onChangeCountry}
				readonly={readonly}
			/>
		</VStack>
	);
});
