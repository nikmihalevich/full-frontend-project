import { memo, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/classNames/classNames';
import {
	DynamicModuleLoader,
	ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { InputWithCarriage as InputDeprecated } from '@/shared/ui/deprecated/InputWithCarriage';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Input } from '@/shared/ui/redesigned/Input';
import { HStack } from '@/shared/ui/redesigned/Stack';

import cls from './AddCommentForm.module.scss';
import {
	getAddCommentFormError,
	getAddCommentFormText,
} from '../../model/selectors/addCommentFormSelector';
import {
	addCommentFormActions,
	addCommentFormReducer,
} from '../../model/slices/addCommentFormSlice';

export interface AddCommentFormProps {
	className?: string;
	onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
	addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
	const { className, onSendComment } = props;
	const { t } = useTranslation();
	const text = useSelector(getAddCommentFormText);
	const error = useSelector(getAddCommentFormError);
	const dispatch = useAppDispatch();

	const onCommentTextChange = useCallback(
		(value: string) => {
			dispatch(addCommentFormActions.setText(value));
		},
		[dispatch],
	);

	const onSendHandler = useCallback(() => {
		onSendComment(text || '');
		onCommentTextChange('');
	}, [onCommentTextChange, onSendComment, text]);

	return (
		<DynamicModuleLoader reducers={reducers}>
			<ToggleFeatures
				feature="isAppRedesigned"
				on={
					<Card padding="24" border="round" max>
						<HStack
							justify="between"
							max
							gap="16"
							className={classNames(
								cls.AddCommentFormRedesigned,
								{},
								[className],
							)}
							data-testid="AddCommentForm"
						>
							<Input
								placeholder={t('Введите текст комментария')}
								value={text}
								onChange={onCommentTextChange}
								className={cls.input}
								data-testid="AddCommentForm.Input"
							/>
							<Button
								onClick={onSendHandler}
								data-testid="AddCommentForm.Button"
							>
								{t('Отправить')}
							</Button>
						</HStack>
					</Card>
				}
				off={
					<HStack
						justify="between"
						max
						className={classNames(cls.AddCommentForm, {}, [
							className,
						])}
						data-testid="AddCommentForm"
					>
						<InputDeprecated
							placeholder={t('Введите текст комментария')}
							value={text}
							onChange={onCommentTextChange}
							className={cls.input}
							data-testid="AddCommentForm.Input"
						/>
						<ButtonDeprecated
							onClick={onSendHandler}
							data-testid="AddCommentForm.Button"
						>
							{t('Отправить')}
						</ButtonDeprecated>
					</HStack>
				}
			/>
		</DynamicModuleLoader>
	);
});

export default AddCommentForm;
