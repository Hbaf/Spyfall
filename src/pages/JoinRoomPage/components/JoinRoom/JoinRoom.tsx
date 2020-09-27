import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { cn } from '@bem-react/classname';

import IState from 'store/types';
import { setName } from 'store/actions/room';
import { roomEndpoint } from 'api';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';

import './JoinRoom.scss';

interface IStatePropsRedux {
	userName: string;
	userId: string;
}

interface IDispatchPropsRedux {
	handleSetName: (name: string) => void;
}

interface IOwnProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	history: any;
}

interface IJoinRoomProps extends IStatePropsRedux, IDispatchPropsRedux, IOwnProps {}

interface IOwnState {
	roomId: string;
	userName: string;
	password: string;
}

const cnJoinRoom = cn('JoinRoom');

class JoinRoom extends React.Component<IJoinRoomProps, IOwnState> {
	constructor(props: IJoinRoomProps) {
		super(props);
		this.state = {
			roomId: '',
			userName: '',
			password: '',
		};
	}

	handleRoomId = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ roomId: event.target.value });
	};

	handleUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ userName: event.target.value });
	};

	handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ password: event.target.value });
	};

	handleRoomJoin = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const { userName, roomId, password } = this.state;
		if (this.props.userName !== userName) {
			this.props.handleSetName(name);
			localStorage.setItem('userName', name);
		}
		roomEndpoint.joinRoom({ roomId, userName, password });
		this.props.history.push('/');
	};

	render() {
		return (
			<div className={cnJoinRoom()}>
				<span className={cnJoinRoom('Title')}>
					Join room
				</span>
				<form className={cnJoinRoom('Form')} onSubmit={this.handleRoomJoin}>
					<Input
						className={cnJoinRoom('InputItem')}
						value={this.state.roomId}
						placeholder='Enter room id'
						onChange={this.handleRoomId}
						required
					/>
					<Input
						className={cnJoinRoom('InputItem')}
						value={this.state.userName}
						placeholder='Enter your name'
						onChange={this.handleUserName}
						required
					/>
					<Input
						className={cnJoinRoom('InputItem')}
						value={this.state.password}
						placeholder='Enter room password'
						onChange={this.handlePassword}
					/>
					<Button
						className={cnJoinRoom('InputSubmit')}
						text='Join'
					/>
				</form>
				<Link className={cnJoinRoom('RedirectButtonContainer')} to='/create'>
					<Button className={cnJoinRoom('RedirectButton')} text='Create room' />
				</Link>
			</div>
		);
	}
}

const mapStateToProps = (state: IState): IStatePropsRedux => ({
	...state.room,
	userName: state.app.userName,
	userId: state.app.userId,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any): IDispatchPropsRedux => (
	{
		handleSetName: (name: string) => {
			dispatch(setName(name));
		},
	}
);

export default withRouter(connect<IStatePropsRedux, IDispatchPropsRedux, IOwnProps>(mapStateToProps, mapDispatchToProps)(JoinRoom));
