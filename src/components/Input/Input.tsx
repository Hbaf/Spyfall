import * as React from 'react';
import { cn } from '@bem-react/classname';

import './Input.scss';

export interface IInputProps {
	type?: string;
	className?: string;
	mods?: Record<string, string | number | boolean>;
	value?: string | number | string[];
	name?: string;
	placeHolderText?: string;
	checked?: boolean;
	onfocus?: any;
	onblur?: any;
	onclick?: any;
	onchange?: any;
}

const cnInput = cn('Input');

// TODO Too complicated. Simplify as possible. Keep <input> only?
const TextInput: React.FC<IInputProps> = (props) => {
	const { type = "text", className, mods, value, name, placeHolderText, onfocus, checked, onblur, onclick, onchange, children } = props;
	const [focus, setFocus] = React.useState(false);
	const [filled, setFilled] = React.useState(false);

	const onFocusHandle = () => {
		setFocus(true);
		if (onfocus) onfocus();
	}
	
	const onBlurHandle = (e:any) => {
		setFocus(false);
		if (e.target.value !== '' && type !== 'submit') setFilled(true);
		else setFilled(false);
		if (onblur) onblur();
	}

	return (
		<div className={cnInput({ type: type, focus: focus, filled: filled, ...mods }, [ className ])}>
			<div className={cnInput('Body')}>
				<input className={cnInput("Input")} type={ type } value={value} name={ name } checked={ checked } onFocus={ onFocusHandle } onBlur={ onBlurHandle } onClick={ onclick } onChange={onchange}/>
				{ placeHolderText? <span className={cnInput("Placeholder")}> { placeHolderText } </span> : null}
			</div>
			{ children ? <div className={cnInput("Content")}>
				{ children }
			</div> : null }
		</div>
	);
}

export default TextInput;