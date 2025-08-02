import * as React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';

import { cn } from '@bem-react/classname';

import './CreateRoom.scss';

import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import { maxUserAmount, minUserAmount } from 'consts/consts';
import { roomCreateDO } from 'api/types/room';
import { roomEndpoint } from 'api';
import { setName } from 'store/actions/room';
import IState from 'store/types';
import { Dispatch } from 'redux';

type IOwnState = roomCreateDO;

interface IDispatchPropsRedux {
	onSetName: (userName: string) => void;
}

interface IStatePropsRedux {
	userName: string;
	maxPlayers: number;
}

interface ICreateRoomProps extends IStatePropsRedux, IDispatchPropsRedux {}

const cnCreateRoom = cn('CreateRoom');

const CreateRoom: React.FC<ICreateRoomProps> = (props) => {
	const navigate = useNavigate();
	const [state, setState] = React.useState<IOwnState>({
		userName: props.userName,
		maxPlayers: props.maxPlayers,
		password: '',
	});

	const handleRoomCreate = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = state;

		roomEndpoint.createRoom(data);
		const { userName } = data;
		if (props.userName !== userName) {
			props.onSetName(userName);
			localStorage.setItem('userName', userName);
		}
		navigate('/');
	}

	const handleNameEnter = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState(prev => ({ ...prev, userName: event.target.value }));
	}

	const handlePassEnter = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState(prev => ({ ...prev, password: event.target.value }));
	}

	const handleMaxPlayersChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setState(prev => ({ ...prev, maxPlayers: Number(event.target.value) }));
	}

	return (
		<form className={cnCreateRoom()} onSubmit={handleRoomCreate}>
			<div className={cnCreateRoom('Setting', { type: 'name' })}>
				<span>
					Your name
				</span>
				<Input
					className={cn('Input')({ type: 'text' })}
					value={state.userName}
					onChange={handleNameEnter}
					required
				/>
			</div>
			<div className={cnCreateRoom('Setting', { type: 'players-amount' })}>
				<span>
					Max players
				</span>
				{ /* eslint-disable-next-line jsx-a11y/no-onchange */}
				<select
					className={cn('Input')({ type: 'text' })}
					value={state.maxPlayers}
					onChange={handleMaxPlayersChange}
				>
					{
						Array(maxUserAmount - minUserAmount + 1).fill(0)
							.map(
								(item, index) => (
									<option key={index}>
										{minUserAmount + index}
									</option>
								),
							)
					}
				</select>
			</div>
			<div className={cnCreateRoom('Setting', { type: 'password' })}>
				<span>
					Password (Not required)
				</span>
				<Input
					className={cn('Input')({ type: 'text' })}
					type='text'
					value={state.password}
					onChange={handlePassEnter}
				/>
			</div>
			<Button className={cnCreateRoom('Submit')} text='Create room' />
		</form>
	);
}

const mapStateToProps = (state: IState): IStatePropsRedux => ({
	userName: state.app.userName,
	maxPlayers: state.room.maxPlayers,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchPropsRedux => ({
	onSetName: userName => {
		dispatch(setName(userName));
	},
});

export default connect<IStatePropsRedux, IDispatchPropsRedux, ICreateRoomProps>(mapStateToProps, mapDispatchToProps)(CreateRoom);
