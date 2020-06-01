import * as React from 'react';
import { cn } from '@bem-react/classname';

import './Auth.scss';
import Input from 'components/Input/Input';

const cnAuth = cn('Auth');
const cnInput = cn('Input');


const Auth: React.FC = () => {
	const [login, setLogin] = React.useState(true);

	// TODO add display pass feature
	const [displayPass, setdisplayPass] = React.useState(false);

	const onChangeHandler = (e:any) => {
		setLogin(e.target.id === 'in')
	
	}

	return (
		<div className={cnAuth()}>
			<div className={cnAuth("Tabs")}>
				<div className={cnAuth("Tab")}>
					<label className={cnInput("Placeholder", { permanent: true })}>Sign In</label>
					<input className={cnInput({type: "radio"})} type="radio" name="type" id="in" onChange={ onChangeHandler } checked={ login } />
				</div>
				<div className={cnAuth("Tab")}>
					<label className={cnInput("Placeholder", { permanent: true })}>Sign Up</label>
					<input className={cnInput({type: "radio"})} type="radio" name="type" id="up" onChange={ onChangeHandler } checked={ !login } />
				</div>
				
			</div>
			{
				!login ?
					<React.Fragment>
						<Input className={cnAuth("TextInput")} mods={{type: "email"}} placeHolderText={"Email"}/>
						<Input className={cnAuth("TextInput")} mods={{type: "email-repeat"}} placeHolderText={"Repeat email"}/>
					</React.Fragment>
				: null
			}
			<Input className={cnAuth("TextInput")} mods={{type: "username"}} placeHolderText={"Username"}/>
			<Input className={cnAuth("TextInput")} type={ displayPass ? "text" : "password"} placeHolderText={"Password"}/>
			<Input className={cnAuth("Input")} type="submit" value="Submit" />
		</div>
	);
}

export default Auth;