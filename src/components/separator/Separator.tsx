import styles from './index.module.scss';
import { FC } from 'react';
import clsx from 'clsx';

export interface SeparatorProps {
	toneDown?: boolean;
}

export const Separator: FC<SeparatorProps> = ({ toneDown }) => (
	<div
		className={clsx(styles.separator, {
			[styles.toneDown]: toneDown,
		})}
	/>
);
