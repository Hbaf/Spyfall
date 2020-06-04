import * as React from 'react';
import { cn } from '@bem-react/classname';

import './Button.scss';

interface IButtonProps {
	name?: string;
	className?: string;
	mods?: Record<string, string | number | boolean>;
	disabled?: boolean;
	value?: string;
	onClick?: () => void;
}

const cnButton = cn('Button');

const Button: React.FC<IButtonProps> = ({ name, className, mods, disabled, value, onClick}) => {
	return (
		<input className={cnButton({type: "submit", ...mods}, [ className ])} type="submit" name={name} value={value} disabled={disabled} onClick={onClick}/>
	);
}

export default Button;
