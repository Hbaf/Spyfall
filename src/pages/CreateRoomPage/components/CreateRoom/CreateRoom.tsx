import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { cn } from '@bem-react/classname';

import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import { maxUserAmount, minUserAmount } from 'consts/consts';
import { roomCreateDO } from 'api/types/room';
import { roomEndpoint } from 'api';
import { setName } from 'store/actions/room';
import IState from 'store/types';


import './CreateRoom.scss';

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
			<div className={cnCreateRoom()}>
				<span className={cnCreateRoom('Title')}>
					Create room
				</span>
				<form className={cnCreateRoom('Form')} onSubmit={this.handleRoomCreate}>
					<Input
						className={cnCreateRoom('InputItem')}
						value={this.state.userName}
						placeholder='Your name'
						onChange={this.handleNameEnter}
						required
					/>
					<div className={cnCreateRoom('InputItem')}>
						<span className={cnCreateRoom('InputTitle')}>
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
					<Input
						className={cnCreateRoom('InputItem')}
						value={this.state.password}
						placeholder='Password'
						onChange={this.handlePassEnter}
					/>
					<Button className={cnCreateRoom('InputSubmit')} text='Create room' />
				</form>
				<Link className={cnCreateRoom('RedirectButtonContainer')} to='/join'>
					<Button className={cnCreateRoom('RedirectButton')} text='Join room' />
				</Link>
			</div>
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
