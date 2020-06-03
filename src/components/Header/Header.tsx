import * as React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@bem-react/classname';

import './Header.scss';

export interface IHeaderProps {
	isUserLogged: boolean
}

const cnHeader = cn('Header');

const Header: React.FC<IHeaderProps> = ({ isUserLogged }) => (
	<nav className={cnHeader()}>
		<Link className={cnHeader('Logo')} to="/" >
			<div className={cnHeader('Icon')} />
			<span className={cnHeader('Title')}>Spyfall</span>
		</Link>
		{
			isUserLogged ?
				(
					<div className={cnHeader('Links')}>
						<Link className={cnHeader('Profile')} to="/profile">Profile</Link>
						<Link className={cnHeader('SignOut')} to="/">Sign Out</Link>
					</div>
				) :
				(
					<div className={cnHeader('Links')}>
						<Link className={cnHeader('SignIn')} to="/auth">Sign In</Link>
					</div>
				)
		}
	</nav>
)

export default Header;
