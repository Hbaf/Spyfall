import * as React from 'react';
import { cn } from '@bem-react/classname';

import GameField from 'components/GameField/GameField';

import './MainPage.scss';

const cnMainPage = cn('MainPage');

const MainPage: React.FC = () => (
	<div className={cnMainPage()}>
		<GameField className={cnMainPage('Game')} />
	</div>
);

export default MainPage;
