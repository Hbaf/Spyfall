import * as React from 'react';
import { cn } from '@bem-react/classname';

import './Input.scss';

export interface IInputProps {
	type?: string;
	className?: string;
	mods?: Record<string, string | number | boolean>;
	value?: string;
	placeHolderText?: string;
	onFocus?: any;
	onBlur?: any;
}

const cnInput = cn('Input');

const TextInput: React.FC<IInputProps> = (props) => {
	const { type = "text", className, mods, value, placeHolderText, onFocus, onBlur } = props;
	const [focus, setFocus] = React.useState(false);
	const [filled, setFilled] = React.useState(false);

	const onFocusHandle = () => {
		setFocus(true);
		if (onFocus) onFocus();
	}
	
	const onBlurHandle = (e:any) => {
		setFocus(false);
		if (e.target.value !== '') setFilled(true);
		else setFilled(false);
		if (onBlur) onBlur();
	}

	return (
		<div className={cnInput({ type: type, focus: focus, filled: filled, ...mods}, [ className ])} onFocus={ onFocusHandle } onBlur={ onBlurHandle }>
			<input className={cnInput("Input")} type={ type } value={value}/>
			{ placeHolderText? <span className={cnInput("Placeholder")} data-placeholder={ placeHolderText } /> : null}
		</div>
	);
}

export default TextInput;