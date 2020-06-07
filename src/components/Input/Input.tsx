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
	onFocus?: any;
	onBlur?: any;
	onClick?: any;
	onChange?: any;
	required?: boolean;
}

const cnInput = cn('Input');

const TextInput: React.FC<IInputProps> = (props) => {
	const { type='text', className, mods, value, name, checked, placeholder, onFocus, onBlur, onClick, onChange,required } = props;
	const [focus, setFocus] = React.useState(false);
	const [filled, setFilled] = React.useState(value !== '');

	const onFocusHandle = () => {
		setFocus(true);
		if (onFocus) onFocus();
	}

	const onBlurHandle = (e:any) => {
		setFocus(false);
		if (e.target.value !== '')
			setFilled(true);
		else
			setFilled(false);
		if (onBlur) onBlur();
	}

	return (
		<input
			className={cnInput({ type: type, focus: focus, filled: filled, ...mods }, [ className ])}
			type = { type }
			value={ value }
			name={ name }
			checked={ checked }
			placeholder = { placeholder }
			onFocus={ onFocusHandle }
			onBlur={ onBlurHandle }
			onClick={ onClick }
			onChange={ onChange }
			required={ required }
		/>
	);
}

export default TextInput;