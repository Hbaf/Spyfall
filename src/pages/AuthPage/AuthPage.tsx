import * as React from 'react';
import Auth from 'components/Auth/Auth';

import './AuthPage.scss';

export interface IAuthProps {
	isUserLogged?: boolean
}

const AuthPage: React.FC<IAuthProps> = props => {
	const { isUserLogged } = props;

	return (
		isUserLogged
			? <Auth />
			: <Auth />
	);
};

export default AuthPage;
