import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { cn } from '@bem-react/classname';

import IState from 'store/types';
import { createRoom, joinRoom } from 'store/actions/room';
import { roomState } from 'store/types/room';

import Input from 'components/Input/Input';
import StoryCard from 'components/StoryCard/StoryCard';
import PlayerList from 'components/PlayersList/PlayerList';
import ControlPanel from 'components/ControlPanel/ControlPanel';
import InGameLocations from 'components/InGameLocations/InGameLocations';


import './GameField.scss';

interface IStatePropsRedux extends roomState {}

interface IDispatchPropsRedux {
	onRoomJoin: (id: string) => void;
}

interface IOwnProps {
	className: string;
}

interface IOwnState {
	joining: boolean;
	roomId: string;
}

interface IGameFieldProps extends IStatePropsRedux, IDispatchPropsRedux, IOwnProps {}


const cnGameField = cn('GameField');


class GameField extends React.Component<IGameFieldProps, IOwnState> {

	constructor(props: IGameFieldProps) {
		super(props);
		this.state = {
			joining: false,
			roomId: '',
		};
	}

	render () {
		const { className, id, gameStarted, isGM, ...props } = this.props;

		const onRoomId = (e: any) => {
			this.setState({ roomId: e.target.value })
		}

		return (
			<div className={cnGameField(null, [ className ])}>
				{
					id ?
						<div className={cnGameField('Game')}>
							{
								gameStarted ?
									<React.Fragment>
										<StoryCard className={cnGameField('StoryCard')} { ...props } />
										<InGameLocations className={cnGameField('Locations')}/>
									</React.Fragment>
								:
									<React.Fragment>
										<div className={cnGameField('Start')}></div>
										<Input className={cnGameField('StartButton')} type="submit" value="Start"/>
										{ isGM ? <ControlPanel className={cnGameField('Settings')} /> : null }
									</React.Fragment>
							}
							<PlayerList className={cnGameField('PlayersList')} />
						</div>
					:
						<div className={cnGameField('Control')}>
							<span className={cnGameField('Hint')}>Join the room or create a new one</span>
							{
								this.state.joining ?
									<div className={cnGameField('JoinInput')}>
										<input className={cn('Input')({ type: 'text' })} type="text" value={this.state.roomId} placeholder="Enter room id" onChange={onRoomId}/>
										<input className={cn('Input')({ type: 'submit' })} type="submit" value="Join" />
									</div>
									:
									<div className={cnGameField('JoinButton', { join: true })} >
										<input className={cn('Input')({ type: 'submit' })}  type="submit" value="Join room" onClick={() => this.setState({ joining: true })}/>
									</div>
							}
							<Link className={cnGameField('CreateButton', { create: true })} to="/create">
								<input className={cn('Input')({ type: 'submit' })} type="submit" value="Create room" />
							</Link>
						</div>			
				}
				<Link className={cnGameField('Faq', { faq: true })} to="/faq">How to play?</Link>
			</div>
		);
	}
}

const mapStateToProps = (state: IState): IStatePropsRedux => {
	return state.room;
}

const mapDispatchToProps = (dispatch: any): IDispatchPropsRedux => {
	return {
		onRoomJoin: (e:any) => {
			dispatch(joinRoom(''));
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GameField);
