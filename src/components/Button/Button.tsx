import * as React from 'react';
import { cn } from '@bem-react/classname';

interface IButtonProps {
	name?: string;
	className?: string;
	mods?: Record<string, string | number | boolean>;
	disabled?: boolean;
	value?: string;
	onClick?: any;
}

const cnButton = cn('Button');

const Button: React.FC<IButtonProps> = ({ name, className, mods, disabled, value, onClick }) => {
	return (
		<button className={cnButton({...mods}, [ className ])} name={name} value={value} disabled={disabled} onClick={onClick}></button>
	);
}

export default Button;
