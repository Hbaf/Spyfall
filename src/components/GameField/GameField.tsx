import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { cn } from '@bem-react/classname';

import './GameField.scss';

import IState from 'store/types';
import { roomState, player } from 'store/types/room';

import Input from 'components/Input/Input';
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
	userId: string;
	locations: baseLocation[];
	selectedLocationsAmount: number;
	players: player[];
}

interface IDispatchPropsRedux {
	onSetName: (name: string) => void;
	onPlayerReady: (userName: string, userId: string) => void;
	onPlayerNotReady: (userName: string, userId: string) => void;
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

	roomId: HTMLInputElement;

	render() {
		const { className, roomId: id, gameStarted, isGM, selectedLocationsAmount, players } = this.props;

		const startDisabled =
			selectedLocationsAmount < minLocationsAmount ||
			players.length < minUserAmount ||
			!players.reduce((acc, playerItem) => acc && playerItem.ready, true);
		const startDisabledHintText = [];
		if (selectedLocationsAmount < minLocationsAmount) {
			startDisabledHintText.push(`Not enough locations (${ selectedLocationsAmount }/${ minLocationsAmount })`);
		}
		if (players.length < minUserAmount) {
			startDisabledHintText.push(`Not enough players (${ players.length }/${ minUserAmount })`);
		}
		if (!players.reduce((acc, playerItem) => acc && playerItem.ready, true)) {
			startDisabledHintText.push('Not all players are ready');
		}

		const onStart = () => {
			gameEndpoint.startGame({
				locations: this.props.locations
					.map((item, index) => ({ selected: item.selected, index }))
					.filter(item => item.selected)
					.map(item => item.index),
			});
		};

		const onReady = () => {
			const { ready } = this.state;
			const { userName } = this.state;
			const { userId } = this.props;
			if (ready) {
				roomEndpoint.notReady({ userName, userId });
				this.props.onPlayerNotReady(userName, userId);
			} else {
				roomEndpoint.ready({ userName, userId });
				this.props.onPlayerReady(userName, userId);
			}
			this.setState({ ready: !ready });
		};

		const onRoomId = (event: React.ChangeEvent<HTMLInputElement>) => {
			this.setState({ roomId: event.target.value });
		};

		const onUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
			this.setState({ userName: event.target.value });
		};

		const onPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
			this.setState({ password: event.target.value });
		};

		const onRoomJoinHandler = (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			const { userName, roomId, password } = this.state;
			if (this.props.userName !== userName) {
				this.props.onSetName(name);
				localStorage.setItem('userName', name);
			}
			roomEndpoint.joinRoom({ roomId, userName, password });
		};

		const copyRoomId = () => {
			const textArea = document.createElement('textarea');
			textArea.value = id;
			document.body.appendChild(textArea);
			textArea.select();

			try {
				document.execCommand('copy');
			} catch (err) {
				// eslint-disable-next-line no-console
				console.error('Copy error');
			}

			document.body.removeChild(textArea);
		};

		const endGame = () => {
			gameEndpoint.resetGame();
		};

		return (
			<div className={cnGameField(null, [ className ])}>
				{
					id ?
						<div className={cnGameField('Content')}>
							<PlayerList className={cnGameField('PlayersList')} />
							<div className={cnGameField('Game')}>
								{
									gameStarted ?
										<StoryCard className={cnGameField('StoryCard')} />										:
										<>
											<div className={cnGameField('Start')} />
											<div className={cnGameField('StartHint')}>
												<Button
													className={cnGameField('RoomId')}
													text={`Room: ${ id }`}
													onClick={copyRoomId}
												>
													<Tooltip
														className={cnGameField('RoomIdTooltip')}
														text={[ 'Click to copy' ]}
														type='bottom'
													/>
												</Button>
												{
													isGM ?
														<Button
															className={cnGameField('StartButton')}
															text='Start'
															disabled={startDisabled}
															onClick={onStart}
														>
															{
																startDisabledHintText.length ?
																	<Tooltip
																		className={cnGameField('StartButtonTooltip')}
																		text={startDisabledHintText}
																		type='bottom'
																	/> :
																	null
															}
														</Button> :
														null
												}
												<Button
													className={cnGameField('StartButton')}
													text={this.state.ready ? 'Not Ready' : 'Ready'}
													onClick={onReady}
												/>
											</div>
										</>
								}
								{
									gameStarted && isGM ?
										<Button
											className={cnGameField('GameEndButton')}
											text='End game'
											onClick={endGame}
										/> :
										null
								}
							</div>
							{
								isGM ?
									(
										gameStarted ?
											<InGameLocations className={cnGameField('Locations')} /> :
											<ControlPanel className={cnGameField('Settings')} />
									) :
									<InGameLocations className={cnGameField('Locations')} />
							}
						</div> :
						<div className={cnGameField('Control')}>
							<span className={cnGameField('Hint')}>
								Join the room or create a new one
							</span>
							{
								this.state.joining ?
									<form className={cnGameField('JoinInput')} onSubmit={onRoomJoinHandler}>
										<Input
											className={cnGameField('JoinInputItem')}
											value={this.state.roomId}
											placeholder='Enter room id'
											onChange={onRoomId}
											required
										/>
										<Input
											className={cnGameField('JoinInputItem')}
											value={this.state.userName}
											placeholder='Enter your name'
											onChange={onUserName}
											required
										/>
										<Input
											className={cnGameField('JoinInputItem')}
											value={this.state.password}
											placeholder='Enter room password'
											onChange={onPassword}
										/>
										<Button
											className={cnGameField('JoinInputSubmit')}
											text='Join'
										/>
									</form>									:
									<div className={cnGameField('JoinButtonContainer')}>
										<Button
											className={cnGameField('JoinButton')}
											text='Join room'
											onClick={() => this.setState({ joining: true })}
										/>
									</div>
							}
							<Link className={cnGameField('CreateLink')} to='/create'>
								<Button className={cnGameField('CreateButton')} text='Create room' />
							</Link>
						</div>
				}
				<Link className={cnGameField('Faq', { faq: true })} to='/faq'>
					How to play?
				</Link>
			</div>
		);
	}
}

const mapStateToProps = (state: IState): IStatePropsRedux => ({
	...state.room,
	gameStarted: state.game.gameStarted,
	locations: state.app.locations,
	userName: state.app.userName,
	userId: state.app.userId,
	selectedLocationsAmount: state.app.selectedLocationsAmount,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any): IDispatchPropsRedux => (
	{
		onSetName: (name: string) => {
			dispatch(setName(name));
		},
		onPlayerReady: (userName: string, userId: string) => {
			dispatch(playerReady({ userName, userId }));
		},
		onPlayerNotReady: (userName: string, userId: string) => {
			dispatch(playerNotReady({ userName, userId }));
		},
	}
);

export default connect<IStatePropsRedux, IDispatchPropsRedux, IOwnProps>(mapStateToProps, mapDispatchToProps)(GameField);
