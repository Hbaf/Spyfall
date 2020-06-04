import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { cn } from '@bem-react/classname';

import './GameField.scss';

import IState from 'store/types';
import { roomState } from 'store/types/room';

import Popup from 'components/Popup/Popup';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import StoryCard from 'components/StoryCard/StoryCard';
import PlayerList from 'components/PlayersList/PlayerList';
import ControlPanel from 'components/ControlPanel/ControlPanel';
import InGameLocations from 'components/InGameLocations/InGameLocations';

import { setName } from 'store/actions/room';
import { roomEndpoint } from 'api';

interface IStatePropsRedux extends roomState {
	gameStarted: boolean;
	userName: string;
}

interface IDispatchPropsRedux {
	onNameEnter: (name: string) => void;
}

interface IOwnProps {
	className: string;
}

interface IOwnState {
	phase: string;
	roomId: string;
	name: string;
}

interface IGameFieldProps extends IStatePropsRedux, IDispatchPropsRedux, IOwnProps {}


const cnGameField = cn('GameField');


class GameField extends React.Component<IGameFieldProps, IOwnState> {

	constructor(props: IGameFieldProps) {
		super(props);
		this.state = {
			phase: '',
			roomId: '',
			name: props.userName,
		};
	}

	render() {
		const { className, id, gameStarted, isGM } = this.props;

		const onRoomId = (e: any) => {
			this.setState({ roomId: e.target.value })
		}

		const onRoomJoinHandler = () => {
			this.setState({ phase: 'name'});
			// roomEndpoint.joinRoom({ id: this.state.roomId, name: this.state.name });
		}

		const onNameEnterHandler = () => {
			const { name, roomId } = this.state;
			this.setState({phase: ''});
			this.props.onNameEnter(name);
			roomEndpoint.joinRoom({id: roomId, name})
		}

		const onName = (e: any) => {
			this.setState({name: e.target.value});
		}

		return (
			<div className={cnGameField(null, [ className ])}>
				{
					id ?
						<div className={cnGameField('Game')}>
							<div className={cnGameField('RoomId')} >
								<div className={cnGameField('RoomId-Hint')}>Room id:</div>
								<div className={cnGameField('RoomId-Id')}>{ id }</div>
							</div>
							{
								gameStarted ?
									<React.Fragment>
										<StoryCard className={cnGameField('StoryCard')} />
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
								this.state.phase === 'joining' ?
									<div className={cnGameField('JoinInput')}>
										<input className={cn('Input')({ type: 'text' })} type="text" value={this.state.roomId} placeholder="Enter room id" onChange={onRoomId}/>
										<input className={cn('Input')({ type: 'submit' })} type="submit" value="Join" onClick={onRoomJoinHandler}/>
									</div>
									:
									<div className={cnGameField('JoinButton', { join: true })} >
										<input className={cn('Input')({ type: 'submit' })}  type="submit" value="Join room" onClick={() => this.setState({ phase: 'joining' })}/>
									</div>
							}
							<Link className={cnGameField('CreateButton', { create: true })} to="/create">
								<input className={cn('Input')({ type: 'submit' })} type="submit" value="Create room" />
							</Link>
						</div>			
				}
				<Link className={cnGameField('Faq', { faq: true })} to="/faq">How to play?</Link>
				{this.state.phase === 'password' ? <Popup>
					<div className={cnGameField('JoinPass')}>
						<div className={cnGameField('JoinPassHint')} >Enter password</div>
						<input type="text" className={cnGameField('JoinPassInput', { type: "text" })} />
						<Button className={cnGameField('JoinPassInput')} value="Submit"/>
					</div>
				</Popup> : null}
				{this.state.phase === 'name' ? <Popup>
					<div className={cnGameField('JoinName')}>
						<div className={cnGameField('JoinNameHint')} >Enter your name</div>
						<input type="text" className={cnGameField('JoinNameInput', { type: "text" })} value={this.state.name} onChange={onName} />
						<Button className={cnGameField('JoinNameInput')} value="Submit" onClick={onNameEnterHandler}/>
					</div>
				</Popup> : null}
			</div>
		);
	}
}

const mapStateToProps = (state: IState): IStatePropsRedux => {
	return {
		...state.room,
		gameStarted: state.game.gameStarted,
	};
}

const mapDispatchToProps = (dispatch: any): IDispatchPropsRedux => (
	{
		onNameEnter: (name: string) => {
			dispatch(setName(name));
		},
	}
)

export default connect(mapStateToProps, mapDispatchToProps)(GameField);
