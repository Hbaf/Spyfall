import * as React from 'react';
import { cn } from '@bem-react/classname';

import './Input.scss';

export interface IInputProps {
	type?: string;
	className?: string;
	mods?: Record<string, string | number | boolean>;
	value?: string | number | string[];
	name?: string;
	checked?: boolean;
	placeholder?: string;
	onFocus?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onClick?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
}

const cnInput = cn('Input');

const TextInput: React.FC<IInputProps> = props => {
	const { type = 'text', className, mods, value, name, checked, placeholder, onFocus, onBlur, onClick, onChange, required } = props;
	const [focus, setFocus] = React.useState(false);
	const [filled, setFilled] = React.useState(value !== '');

	const onFocusHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFocus(true);
		if (onFocus) {
			onFocus(event);
		}
	};

	const onBlurHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFocus(false);
		if (event.target.value === '') {
			setFilled(false);
		} else {
			setFilled(true);
		}
		if (onBlur) {
			onBlur(event);
		}
	};

	return (
		<input
			className={cnInput({ type, focus, filled, ...mods }, [ className ])}
			type={type}
			value={value}
			name={name}
			checked={checked}
			placeholder={placeholder}
			onFocus={onFocusHandle}
			onBlur={onBlurHandle}
			onClick={onClick}
			onChange={onChange}
			required={required}
		/>
	);
};

export default TextInput;
