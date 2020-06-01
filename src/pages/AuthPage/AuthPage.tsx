import * as React from 'react';
import { Redirect } from 'react-router-dom';
import Auth from 'components/Auth/Auth';

import './AuthPage.scss';

export interface IAuthProps {
	isUserLogged: boolean
}

class AuthPage extends React.Component<IAuthProps> {
	render() {
		const { isUserLogged } = this.props;
		return (
			isUserLogged ? <Redirect to="/"/> :
			<Auth />
		);
	}
}

export default AuthPage;
