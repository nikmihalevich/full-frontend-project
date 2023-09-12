import { memo, useCallback, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/classNames/classNames';
import {
	DynamicModuleLoader,
	ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import {
	Button as ButtonDeprecated,
	ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { InputWithCarriage as InputDeprecated } from '@/shared/ui/deprecated/InputWithCarriage';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import cls from './LoginForm.module.scss';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';

export interface LoginFormProps {
	className?: string;
	onSuccess: () => void;
}

const initialReducers: ReducersList = {
	loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const username = useSelector(getLoginUsername);
	const password = useSelector(getLoginPassword);
	const isLoading = useSelector(getLoginIsLoading);
	const error = useSelector(getLoginError);
	const forceUpdate = useForceUpdate();

	const onChangeUsername = useCallback(
		(value: string) => {
			dispatch(loginActions.setUsername(value));
		},
		[dispatch],
	);

	const onChangePassword = useCallback(
		(value: string) => {
			dispatch(loginActions.setPassword(value));
		},
		[dispatch],
	);

	const onLoginClick = useCallback(async () => {
		const result = await dispatch(loginByUsername({ username, password }));
		if (result.meta.requestStatus === 'fulfilled') {
			onSuccess();
			forceUpdate();
		}
	}, [dispatch, forceUpdate, onSuccess, password, username]);

	const onKeyDown = useCallback(
		async (e: KeyboardEvent) => {
			if (e.key === 'Enter') {
				await onLoginClick();
			}
		},
		[onLoginClick],
	);

	useEffect(() => {
		window.addEventListener('keydown', onKeyDown);

		return () => {
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [onKeyDown]);

	return (
		<DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
			<ToggleFeatures
				feature="isAppRedesigned"
				on={
					<VStack
						gap="16"
						className={classNames(cls.LoginForm, {}, [className])}
					>
						<Text title={t('Форма авторизации')} />
						{error && (
							<Text
								text={t('Вы ввели неверный логин или пароль')}
								variant="error"
							/>
						)}
						<Input
							type="text"
							className={cls.input}
							placeholder={t('Введите username')}
							autofocus
							onChange={onChangeUsername}
							value={username}
						/>
						<Input
							type="text"
							className={cls.input}
							placeholder={t('Введите пароль')}
							onChange={onChangePassword}
							value={password}
						/>
						<Button
							variant="outline"
							className={cls.loginBtn}
							onClick={onLoginClick}
							disabled={isLoading}
						>
							{t('Войти')}
						</Button>
					</VStack>
				}
				off={
					<div className={classNames(cls.LoginForm, {}, [className])}>
						<TextDeprecated title={t('Форма авторизации')} />
						{error && (
							<TextDeprecated
								text={t('Вы ввели неверный логин или пароль')}
								theme={TextTheme.ERROR}
							/>
						)}
						<InputDeprecated
							type="text"
							className={cls.input}
							placeholder={t('Введите username')}
							autofocus
							onChange={onChangeUsername}
							value={username}
						/>
						<InputDeprecated
							type="text"
							className={cls.input}
							placeholder={t('Введите пароль')}
							onChange={onChangePassword}
							value={password}
						/>
						<ButtonDeprecated
							theme={ButtonTheme.OUTLINE}
							className={cls.loginBtn}
							onClick={onLoginClick}
							disabled={isLoading}
						>
							{t('Войти')}
						</ButtonDeprecated>
					</div>
				}
			/>
		</DynamicModuleLoader>
	);
});

export default LoginForm;
