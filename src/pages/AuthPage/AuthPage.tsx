import * as React from 'react';
import { Redirect } from 'react-router-dom';

import Auth from 'components/Auth/Auth';

import './AuthPage.scss';

export interface IAuthProps {
	isUserLogged: boolean
}

const AuthPage: React.FC<IAuthProps> = props => {
	const { isUserLogged } = props;

	return (
		isUserLogged ?
			<Redirect to='/' /> :
			<Auth />
	);
};

export default AuthPage;
