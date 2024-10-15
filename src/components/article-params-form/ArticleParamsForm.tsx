import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';
import { Select } from 'components/select';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';
import {
	useState,
	FormEventHandler,
	FC,
	useRef,
	Dispatch,
	SetStateAction,
} from 'react';
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
	setArticleState: Dispatch<SetStateAction<ArticleStateType>>;
}

export const ArticleParamsForm: FC<ArticleParamsFormProps> = ({
	setArticleState,
}) => {
	const asideRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [articleParamsState, setArticleParamsState] =
		useState<ArticleStateType>(defaultArticleState);

	const onChangeField =
		(name: keyof ArticleStateType) => (selected: OptionType) =>
			setArticleParamsState((prev) => ({ ...prev, [name]: selected }));

	const onFormReset: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		setArticleParamsState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	const onFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		setArticleState(articleParamsState);
	};

	const onClickArrowButton = () => setIsOpen((prev) => !prev);

	useOutsideClickClose({
		isOpen,
		onChange: setIsOpen,
		rootRef: asideRef,
	});

	return (
		<>
			<ArrowButton onClick={onClickArrowButton} isOpen={isOpen} />
			<aside
				ref={asideRef}
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
						selected={articleParamsState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={onChangeField('fontFamilyOption')}
					/>
					<RadioGroup
						title='Размер шрифта'
						selected={articleParamsState.fontSizeOption}
						name='fontSize'
						options={fontSizeOptions}
						onChange={onChangeField('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						selected={articleParamsState.fontColor}
						options={fontColors}
						onChange={onChangeField('fontColor')}
					/>
					<Separator toneDown />
					<Select
						title='Цвет фона'
						selected={articleParamsState.backgroundColor}
						options={backgroundColors}
						onChange={onChangeField('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						selected={articleParamsState.contentWidth}
						options={contentWidthArr}
						onChange={onChangeField('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
