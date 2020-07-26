import * as React from 'react';
import { connect } from 'react-redux';
import { cn } from '@bem-react/classname';

import './GameField.scss';

import IState from 'store/types';
import { roomState, player } from 'store/types/room';
import { baseLocation } from 'store/types/app';
import { setName, playerReady, playerNotReady } from 'store/actions/room';
import { roomEndpoint, gameEndpoint } from 'api';
import { minLocationsAmount, minUserAmount } from 'consts/consts';
import Button from 'components/Button/Button';
import Tooltip from 'components/Tooltip/Tooltip';
import StoryCard from 'components/StoryCard/StoryCard';
import PlayerList from 'components/PlayersList/PlayerList';
import LocationsChecker from 'components/LocationsChecker/LocationsChecker';
import LocationsList from 'components/LocationsList/LocationsList';
import LocationsFlipper from 'components/LocationsFlipper/LocationsFlipper';

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
	ready: boolean;
}

interface IGameFieldProps extends IStatePropsRedux, IDispatchPropsRedux, IOwnProps {}


const cnGameField = cn('GameField');


class GameField extends React.Component<IGameFieldProps, IOwnState> {
	constructor(props: IGameFieldProps) {
		super(props);
		this.state = { ready: false };
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
			const { userId, userName } = this.props;
			if (ready) {
				roomEndpoint.notReady({ userName, userId });
				this.props.onPlayerNotReady(userName, userId);
			} else {
				roomEndpoint.ready({ userName, userId });
				this.props.onPlayerReady(userName, userId);
			}
			this.setState({ ready: !ready });
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

		const leaveRoom = () => {
			// eslint-disable-next-line
			console.log('Leave');
		};

		return (
			<div className={cnGameField(null, [ className ])}>
				<PlayerList className={cnGameField('PlayersList')} />
				{
					gameStarted ?
						<>
							<div className={cnGameField('MainPart')}>
								<LocationsFlipper className={cnGameField('LocationsFlipper')} />
								<Button
									className={cnGameField('GameEndButton')}
									text='Leave room'
									onClick={leaveRoom}
								/>
								{
									isGM ?
										<Button
											className={cnGameField('GameEndButton')}
											text='End game'
											onClick={endGame}
										/> :
										null
								}
							</div>
							<StoryCard className={cnGameField('StoryCard')} />
						</> :
						<>
							<div className={cnGameField('MainPart')}>
								<div className={cnGameField('StartImage')} />
								<div className={cnGameField('StartControls')}>
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
							</div>
							{
								isGM ?
									<LocationsChecker className={cnGameField('LocationsChecker')} /> :
									<LocationsList className={cnGameField('LocationsList')} />
							}
						</>
				}
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
