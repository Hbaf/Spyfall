import * as React from 'react';
import { cn } from '@bem-react/classname';

import './MainPage.scss';
import GameField from 'components/GameField/GameField';

const cnMainPage = cn('MainPage');

class MainPage extends React.Component {
	render() {

		return (
			<div className={cnMainPage()}>
				<GameField className={cnMainPage('Game')}></GameField>
			</div>
		);
	}
}

export default MainPage;
