import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { cn } from '@bem-react/classname';

import './GameField.scss';

import IState from 'store/types';
import { roomState, player } from 'store/types/room';

import Popup from 'components/Popup/Popup';
import Button from 'components/Button/Button';
import StoryCard from 'components/StoryCard/StoryCard';
import PlayerList from 'components/PlayersList/PlayerList';
import ControlPanel from 'components/ControlPanel/ControlPanel';
import InGameLocations from 'components/InGameLocations/InGameLocations';

import { setName, playerReady, playerNotReady } from 'store/actions/room';
import { roomEndpoint, gameEndpoint } from 'api';
import { baseLocation } from 'store/types/app';
import { minLocationsAmount, minUserAmount } from 'consts/consts';
import Tooltip from 'components/Tooltip/Tooltip';

interface IStatePropsRedux extends roomState {
	gameStarted: boolean;
	userName: string;
	locations: baseLocation[];
	selectedLocationsAmount: number;
	players: player[];
}

interface IDispatchPropsRedux {
	onNameSet: (name: string) => void;
	onPlayerReady: (name: string) => void;
	onPlayerNotReady: (name: string) => void;
}

interface IOwnProps {
	className: string;
}

interface IOwnState {
	joining: boolean;
	roomId: string;
	userName: string;
	password: string;
	ready: boolean;
}

interface IGameFieldProps extends IStatePropsRedux, IDispatchPropsRedux, IOwnProps {}


const cnGameField = cn('GameField');


class GameField extends React.Component<IGameFieldProps, IOwnState> {

	roomId: HTMLInputElement;

	constructor(props: IGameFieldProps) {
		super(props);
		this.state = {
			joining: false,
			roomId: '',
			userName: props.userName,
			password: '',
			ready: false,
		};
	}

	render() {
		const { className, roomId: id, gameStarted, isGM, selectedLocationsAmount, players } = this.props;

		const startDisabled =
			selectedLocationsAmount < minLocationsAmount
			|| players.length < minUserAmount
			|| !players.reduce((acc, player) => acc && player.ready, true);
		const startDisabledHintText = [
			(selectedLocationsAmount < minLocationsAmount) ? `Select at least ${minLocationsAmount} locations` : '',
			(players.length < minUserAmount) ? `Not enough players (${players.length}/${minUserAmount})` : '',
			(!players.reduce((acc, player) => acc && player.ready, true)) ? 'Not all players are ready' : '',
		];

		const onStart = () => {
			gameEndpoint.startGame({locations: this.props.locations
				.map((item, index) => ({selected: item.selected, index}))
				.filter(item => item.selected)
				.map(item => item.index)});
		}

		const onReady = () => {
			const ready = this.state.ready;
			const userName = this.state.userName
			if (ready) {
				roomEndpoint.notReady({ userName });
				this.props.onPlayerNotReady(userName);
			} else {
				roomEndpoint.ready({ userName });
				this.props.onPlayerReady(userName)
			}
			this.setState({ready: !ready});
		}

		const onRoomId = (e: any) => {
			this.setState({ roomId: e.target.value })
		}

		const onUserName = (e: any) => {
			this.setState({userName: e.target.value});
		}

		const onPassword = (e: any) => {
			this.setState({password: e.target.value});
		}

		const onRoomJoinHandler = () => {
			const { userName, roomId, password } = this.state;
			if (this.props.userName !== userName) {
				this.props.onNameSet(name);
			}
			roomEndpoint.joinRoom({ roomId, userName, password });
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
												<Button
													className={cnGameField('RoomId')}
													text={`Room: ${ id }`}
													onClick={copyRoomId}
												>
													<Tooltip
														className={cnGameField('RoomIdTooltip')}
														text={['Click to copy']}
														type="bottom"
													/>
												</Button>
												{ isGM ?
													<React.Fragment>
														<Button
															className={cnGameField('StartButton')}
															text="Start"
															disabled={startDisabled}
															onClick={onStart}
														>
															<Tooltip
																className={cnGameField('StartButtonTooltip')}
																text={startDisabledHintText}
																type="bottom"
															/>
														</Button>
													</React.Fragment> : null
												}
												<Button
													className={cnGameField('StartButton')}
													text={ !this.state.ready ? 'Ready' : 'Not Ready'}
													onClick={onReady}
												/>
											</div>
										</React.Fragment>
								}
							</div>
							{
								isGM ?
									gameStarted ?
										<InGameLocations className={cnGameField('Locations')} />
									:
										<ControlPanel className={cnGameField('Settings')} />
								:
									<InGameLocations className={cnGameField('Locations')} />
							}
						</div>
					:
						<div className={cnGameField('Control')}>
							<span className={cnGameField('Hint')}>Join the room or create a new one</span>
							{
								this.state.joining ?
									<div className={cnGameField('JoinInput')}>
										<input
											type="text"
											className={cn('Input')({ type: 'text' })}
											value={this.state.roomId}
											placeholder="Enter room id"
											onChange={onRoomId}
										/>
										<input
											type="text"
											className={cn('Input')({ type: 'text' })}
											value={this.state.userName}
											placeholder="Enter your name"
											onChange={onUserName}
										/>
										<input
											type="text"
											className={cn('Input')({ type: 'text' })}
											value={this.state.password}
											placeholder="Enter room password"
											onChange={onPassword}
										/>
										<Button
											className={cn('Input')({ type: 'submit' })}
											text="Join"
											onClick={onRoomJoinHandler}
										/>
									</div>
									:
									<div className={cnGameField('JoinButton', { join: true })} >
										<Button
											className={cn('Input')({ type: 'submit' })}
											text="Join room"
											onClick={() => this.setState({ joining: true })}
										/>
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
	return {
		...state.room,
		gameStarted: state.game.gameStarted,
		locations: state.app.locations,
		userName: state.app.userName,
		selectedLocationsAmount: state.app.selectedLocationsAmount,
	};
}

const mapDispatchToProps = (dispatch: any): IDispatchPropsRedux => (
	{
		onNameSet: (name: string) => {
			dispatch(setName(name));
		},
		onPlayerReady: (name: string) => {
			dispatch(playerReady({userName: name}));
		},
		onPlayerNotReady: (name: string) => {
			dispatch(playerNotReady({userName: name}));
		}
	}
)

export default connect(mapStateToProps, mapDispatchToProps)(GameField);
