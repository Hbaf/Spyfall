import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { cn } from '@bem-react/classname';

import IState from 'store/types';
import GameField from 'components/GameField/GameField';
import Button from 'components/Button/Button';
import { roomBase } from 'store/types/room';

import './MainPage.scss';

interface IStatePropsRedux extends roomBase {}

const cnMainPage = cn('MainPage');

const MainPage: React.FC<IStatePropsRedux> = (props: IStatePropsRedux) => (
	<div className={cnMainPage()}>
		{
			props.roomId ?
				<GameField className={cnMainPage('Game')} /> :
				<div className={cnMainPage('Control')}>
					<span className={cnMainPage('Hint')}>
						Join the room or create a new one
					</span>
					<Link className={cnMainPage('JoinButtonContainer')} to='/join'>
						<Button className={cnMainPage('JoinButton')} text='Join room' />
					</Link>
					<Link className={cnMainPage('CreateButtonContainer')} to='/create'>
						<Button className={cnMainPage('CreateButton')} text='Create room' />
					</Link>
				</div>
		}
	</div>
);

const mapStateToProps = (state: IState): IStatePropsRedux => ({ roomId: state.room.roomId });

export default connect<IStatePropsRedux, unknown, unknown>(mapStateToProps)(MainPage);
