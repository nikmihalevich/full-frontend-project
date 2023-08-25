import { memo, useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ListBox } from '@/shared/ui/deprecated/Popups';

import { Country } from '../model/types/country';

interface CountrySelectProps {
	className?: string;
	value?: Country;
	readonly?: boolean;
	onChange?: (country: Country) => void;
}

const options = [
	{ value: Country.Russia, content: Country.Russia },
	{ value: Country.Belarus, content: Country.Belarus },
	{ value: Country.Kazakhstan, content: Country.Kazakhstan },
	{ value: Country.Armenia, content: Country.Armenia },
];

export const CountrySelect = memo((props: CountrySelectProps) => {
	const { t } = useTranslation();
	const { className, value, onChange, readonly } = props;

	const onChangeHandler = useCallback(
		(value: string) => {
			onChange?.(value as Country);
		},
		[onChange],
	);

	return (
		<ListBox
			className={classNames('', {}, [className])}
			onChange={onChangeHandler}
			readonly={readonly}
			items={options}
			defaultValue={t('Укажите страну')}
			value={value}
			direction="top right"
			label={t('Страна')}
		/>
	);
});
