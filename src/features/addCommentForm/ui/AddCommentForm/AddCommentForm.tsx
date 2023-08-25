import { memo, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/classNames/classNames';
import {
	DynamicModuleLoader,
	ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from '@/shared/ui/deprecated/Button';
import { InputWithCarriage } from '@/shared/ui/deprecated/InputWithCarriage';
import { HStack } from '@/shared/ui/deprecated/Stack';

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
			<HStack
				justify="between"
				max
				className={classNames(cls.AddCommentForm, {}, [className])}
				data-testid="AddCommentForm"
			>
				<InputWithCarriage
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
		</DynamicModuleLoader>
	);
});

export default AddCommentForm;
