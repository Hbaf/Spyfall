import * as React from 'react';
import { Link } from 'react-router-dom';

import { cn } from '@bem-react/classname';

import Input from 'components/Input/Input';
import StoryCard from 'components/StoryCard/StoryCard';

import './GameField.scss';
import PlayerList from 'components/PlayersList/PlayerList';
import GameSettings from 'components/GameSettings/GameSettings';

export interface IGameFieldProps{
	className?: string;
	room?: string;
	gameStarted?: boolean;
	isGM?: boolean;
}

const cnGameField = cn('GameField');

class GameField extends React.Component<IGameFieldProps> {

	onClickCreateHandler = () => {
		console.log('Room created');
	}

	onClickJoinHandler = () => {
		console.log('Room joined');
	}

	prop = {
		location: 'Airplane',
		locationImgUrl: 'https://cdn.vox-cdn.com/thumbor/oDdR6AF3DKIp7R73RYAXdLaC68g=/0x0:1280x720/1200x800/filters:focal(538x258:742x462)/cdn.vox-cdn.com/uploads/chorus_image/image/63621787/jetblue1.0.jpg',
		role: 'Captain',
		roleImgUrl: 'https://thumbs.dreamstime.com/z/airplane-captain-pilot-hat-airplane-captain-pilot-hat-looking-plane-turning-around-globe-concept-global-travelling-116138994.jpg',
		story: 'You were driving',
	}

	render () {
		return (
			<div className={cnGameField(null, [ this.props.className ])}>
				{
					!this.props.room ?
						<div className={cnGameField('Game')}>
							{
								this.props.gameStarted ?
									<StoryCard className={cnGameField('StoryCard')} { ...this.prop } />
									//TODO display in game locations
								:
								<React.Fragment>
									<div className={cnGameField('Start')}></div>
									<Input className={cnGameField('StartButton')} type="submit" value="Start"/>
									{ !this.props.isGM ? <GameSettings className={cnGameField('Settings')} /> : null }
								</React.Fragment>
							}
							<PlayerList className={cnGameField('PlayersList')} />
						</div>
					:
						<div className={cnGameField('ControlPanel')}>
							<span className={cnGameField('Hint')}>Join the room or create a new one</span>
							<Link className={cnGameField('JoinButton')} to="/join">
								<Input type="submit" value="Join room" mods={{ join: true }} onclick={this.onClickJoinHandler} />
							</Link>
							<Link className={cnGameField('CreateButton')} to="/create">
								<Input type="submit" value="Create room" mods={{ create: true }} onclick={this.onClickCreateHandler} />
							</Link>
						</div>			
				}
				<Link className={cnGameField('Faq', { faq: true })} to="/faq">How to play?</Link>
			</div>
		);
	}
}

export default GameField;
