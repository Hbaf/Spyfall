import * as React from 'react';
import { cn } from '@bem-react/classname';

import './Button.scss';

interface IButtonProps {
	name?: string;
	className?: string;
	mods?: Record<string, string | number | boolean>;
	disabled?: boolean;
	value?: string;
	text?: string;
	onClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
	onSubmit?: (e: React.FormEvent<HTMLInputElement>) => void;
}

const cnButton = cn('Button');

const Button: React.FC<IButtonProps> = ({ name, className, mods, disabled, value, text, onClick, onSubmit, children }) => (
	<button className={cnButton({ ...mods }, [ className ])} type='submit' name={name} value={value} disabled={disabled} onClick={onClick} onSubmit={onSubmit}>
		<span>
			{ text }
		</span>
		{ children }
	</button>
);

export default Button;
