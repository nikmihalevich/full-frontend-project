import { Fragment, ReactNode, useMemo } from 'react';

import { Listbox as HListBox } from '@headlessui/react';

import ArrowButton from '@/shared/assets/icons/arrow-bottom.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';

import cls from './ListBox.module.scss';
import { HStack } from '../../../../redesigned/Stack';
import { Button } from '../../../Button/Button';
import { Icon } from '../../../Icon';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';

const people = [
	{ id: 1, name: 'Durward Reynolds', unavailable: false },
	{ id: 2, name: 'Kenton Towne', unavailable: false },
	{ id: 3, name: 'Therese Wunsch', unavailable: false },
	{ id: 4, name: 'Benedict Kessler', unavailable: true },
	{ id: 5, name: 'Katelyn Rohan', unavailable: false },
];

export interface ListBoxItem<T extends string> {
	value: string;
	content: ReactNode;
	disabled?: boolean;
}

interface ListBoxProps<T extends string> {
	items?: ListBoxItem<T>[];
	className?: string;
	value?: T;
	defaultValue?: string;
	onChange: (value: T) => void;
	readonly?: boolean;
	direction?: DropdownDirection;
	label?: string;
}

export function ListBox<T extends string>(props: ListBoxProps<T>) {
	const {
		items,
		className,
		value,
		defaultValue,
		onChange,
		readonly,
		direction = 'bottom right',
		label,
	} = props;

	const optionsClasses = [mapDirectionClass[direction], popupCls.menu];

	const selectedItem = useMemo(() => {
		return items?.find((item) => item.value === value);
	}, [items, value]);

	return (
		<HStack gap="4">
			{label && <span>{`${label}>`}</span>}
			<HListBox
				as="div"
				className={classNames(cls.ListBox, {}, [
					className,
					popupCls.popup,
				])}
				value={value}
				onChange={onChange}
				disabled={readonly}
			>
				<HListBox.Button
					aria-disabled={readonly}
					className={popupCls.trigger}
				>
					<Button
						variant="filled"
						disabled={readonly}
						addonRight={<Icon Svg={ArrowButton} />}
					>
						{selectedItem?.content ?? defaultValue}
					</Button>
				</HListBox.Button>
				<HListBox.Options
					className={classNames(cls.options, {}, optionsClasses)}
				>
					{items?.map((item) => (
						<HListBox.Option
							key={item.value}
							value={item.value}
							disabled={item.disabled}
							as={Fragment}
						>
							{({ active, selected }) => (
								<li
									className={classNames(
										cls.item,
										{
											[popupCls.active]: active,
											[popupCls.disabled]: item.disabled,
											[popupCls.selected]: selected,
										},
										[],
									)}
								>
									{selected}
									{item.content}
								</li>
							)}
						</HListBox.Option>
					))}
				</HListBox.Options>
			</HListBox>
		</HStack>
	);
}
