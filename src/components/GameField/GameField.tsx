import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { cn } from '@bem-react/classname';

import './GameField.scss';

import IState from 'store/types';
import { roomState } from 'store/types/room';

import Popup from 'components/Popup/Popup';
import Button from 'components/Button/Button';
import StoryCard from 'components/StoryCard/StoryCard';
import PlayerList from 'components/PlayersList/PlayerList';
import ControlPanel from 'components/ControlPanel/ControlPanel';
import InGameLocations from 'components/InGameLocations/InGameLocations';

import { setName } from 'store/actions/room';
import { roomEndpoint, gameEndpoint } from 'api';
import { baseLocation } from 'store/types/app';

interface IStatePropsRedux extends roomState {
	gameStarted: boolean;
	userName: string;
	locations: baseLocation[];
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
	ready: boolean;
}

interface IGameFieldProps extends IStatePropsRedux, IDispatchPropsRedux, IOwnProps {}


const cnGameField = cn('GameField');


class GameField extends React.Component<IGameFieldProps, IOwnState> {

	roomId: HTMLInputElement;

	constructor(props: IGameFieldProps) {
		super(props);
		this.state = {
			phase: '',
			roomId: '',
			name: props.userName,
			ready: false,
		};
	}

	render() {
		const { className, roomId: id, gameStarted, isGM } = this.props;

		const onStart = () => {
			gameEndpoint.startGame({locations: this.props.locations
				.map((item, index) => ({selected: item.selected, index}))
				.filter(item => item.selected)
				.map(item => item.index)});
		}

		const onReady = () => {
			const ready = this.state.ready;
			if (ready)
				roomEndpoint.notReady({userName: this.state.name});
			else
				roomEndpoint.ready({userName: this.state.name});
			this.setState({ready: !ready});
		}

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
			roomEndpoint.joinRoom({ roomId, userName: name})
		}

		const onName = (e: any) => {
			this.setState({name: e.target.value});
		}

		const copyRoomId = () => {
			const textArea = document.createElement('textarea');
			textArea.value = id;
			document.body.appendChild(textArea);
			textArea.select();

			try {
				document.execCommand('copy');
			} catch (err) {
			}

			document.body.removeChild(textArea);
		}

		return (
			<div className={cnGameField(null, [ className ])}>
				{
					id ?
						<div className={cnGameField('Content')}>
							<PlayerList className={cnGameField('PlayersList')} />
							<div className={cnGameField('Game')}>
								{
									gameStarted ?
										<React.Fragment>
											<StoryCard className={cnGameField('StoryCard')} />
										</React.Fragment>
									:
										<React.Fragment>
											<div className={cnGameField('Start')}></div>
											<div className={cnGameField('StartHint')}>
												<Button className={cnGameField('RoomId')} value={`Room Id: ${ id }`} onClick={copyRoomId} />
												{ isGM ? <Button className={cnGameField('StartButton')} value="Start" onClick={onStart} /> : null }
												<Button className={cnGameField('StartButton')} value={ !this.state.ready ? 'Ready' : 'Not Ready'} onClick={onReady} />
											</div>
										</React.Fragment>
								}
							</div>
							{ gameStarted ?
								<InGameLocations className={cnGameField('Locations')}/>
							: isGM ? <ControlPanel className={cnGameField('Settings')} /> : <div className={cnGameField('Locations')} /> }
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
				{
					this.state.phase === 'password' ? 
						<Popup>
							<div className={cnGameField('JoinPass')}>
								<div className={cnGameField('JoinPassHint')} >Enter password</div>
								<input type="text" className={cnGameField('JoinPassInput', { type: "text" })} />
								<Button className={cnGameField('JoinPassInput')} value="Submit"/>
							</div>
						</Popup> 
					: null
				}
				{
					this.state.phase === 'name' ?
						<Popup>
							<div className={cnGameField('JoinName')}>
								<div className={cnGameField('JoinNameHint')} >Enter your name</div>
								<input type="text" className={cnGameField('JoinNameInput', { type: "text" })} value={this.state.name} onChange={onName} />
								<Button className={cnGameField('JoinNameInput')} value="Submit" onClick={onNameEnterHandler}/>
							</div>
						</Popup>
					: null
				}
			</div>
		);
	}
}

const mapStateToProps = (state: IState): IStatePropsRedux => {
	return {
		...state.room,
		gameStarted: state.game.gameStarted,
		locations: state.app.locations,
		userName: state.app.userName,
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
