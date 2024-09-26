import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';
import { Select } from 'components/select';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';
import { useState, FormEventHandler, FC, useRef } from 'react';
import clsx from 'clsx';

import {
	ArticleStateType,
	defaultArticleState,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

import { useOutsideClickClose } from 'components/select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	onSubmit(state: ArticleStateType): void;
	onReset(): void;
}

export const ArticleParamsForm: FC<ArticleParamsFormProps> = ({
	onReset,
	onSubmit,
}) => {
	const asideRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [state, setState] = useState<ArticleStateType>(defaultArticleState);

	const onChangeField =
		(name: keyof ArticleStateType) => (selected: OptionType) =>
			setState((prev) => ({ ...prev, [name]: selected }));

	const onFormReset: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		setState(defaultArticleState);
		onReset();
	};

	const onFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		onSubmit(state);
	};

	const onClickArrowButton = () => setIsOpen((prev) => !prev);

	useOutsideClickClose({
		isOpen,
		onChange: setIsOpen,
		rootRef: asideRef,
	});

	return (
		<div ref={asideRef}>
			<ArrowButton onClick={onClickArrowButton} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onReset={onFormReset}
					onSubmit={onFormSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={state.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={onChangeField('fontFamilyOption')}
					/>
					<RadioGroup
						title='Размер шрифта'
						selected={state.fontSizeOption}
						name='fontSize'
						options={fontSizeOptions}
						onChange={onChangeField('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						selected={state.fontColor}
						options={fontColors}
						onChange={onChangeField('fontColor')}
					/>
					<Separator toneDown />
					<Select
						title='Цвет фона'
						selected={state.backgroundColor}
						options={backgroundColors}
						onChange={onChangeField('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						selected={state.contentWidth}
						options={contentWidthArr}
						onChange={onChangeField('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
