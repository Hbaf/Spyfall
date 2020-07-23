import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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

interface IOwnProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	history: any;
}

interface ICreateRoomProps extends IStatePropsRedux, IDispatchPropsRedux, IOwnProps {}

const cnCreateRoom = cn('CreateRoom');

class CreateRoom extends React.Component<ICreateRoomProps, IOwnState> {
	constructor(props: ICreateRoomProps) {
		super(props);
		this.state = {
			userName: props.userName,
			maxPlayers: props.maxPlayers,
			password: '',
		};
	}

	handleRoomCreate = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = this.state;

		roomEndpoint.createRoom(data);
		const { userName } = data;
		if (this.props.userName !== userName) {
			this.props.onSetName(userName);
			localStorage.setItem('userName', userName);
		}
		this.props.history.push('/');
	}

	handleNameEnter = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ userName: event.target.value });
	}

	handlePassEnter = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ password: event.target.value });
	}

	render() {
		return (
			<form className={cnCreateRoom()} onSubmit={this.handleRoomCreate}>
				<div className={cnCreateRoom('Setting', { type: 'name' })}>
					<span>
						Your name
					</span>
					<Input
						className={cn('Input')({ type: 'text' })}
						value={this.state.userName}
						onChange={this.handleNameEnter}
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
						value={this.state.maxPlayers}
						onChange={
							(event: React.ChangeEvent<HTMLSelectElement>) => {
								this.setState({ maxPlayers: Number(event.target.value) });
							}
						}
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
						value={this.state.password}
						onChange={this.handlePassEnter}
					/>
				</div>
				<Button className={cnCreateRoom('Submit')} text='Create room' />
			</form>
		);
	}
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

export default withRouter(connect<IStatePropsRedux, IDispatchPropsRedux, IOwnProps>(mapStateToProps, mapDispatchToProps)(CreateRoom));
