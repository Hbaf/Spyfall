import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { cn } from '@bem-react/classname';

import './CreateRoom.scss';
import Button from 'components/Button/Button';
import { maxUserAmount, minUserAmount } from 'consts/consts';
import { roomCreate } from 'store/types/room';
import { createRoom } from 'store/actions/room';
import IState from 'store/types';

type IOwnState = roomCreate;

interface IDispatchPropsRedux {
	onRoomCreated: (data: IOwnState) => void;
}

interface IStatePropsRedux {
	readonly name: string;
	readonly players: number;
}

interface IOwnProps {
	history: any
}

interface ICreateRoomProps extends IStatePropsRedux, IDispatchPropsRedux, IOwnProps {}

const cnCreateRoom = cn('CreateRoom');

class CreateRoom extends React.Component<ICreateRoomProps, IOwnState> {
	constructor(props: ICreateRoomProps){
		super(props);
		this.state = {
			name: props.name,
			players: props.players,
			password: '',
		}
	}

	onRoomCreate = () => {
		const { onRoomCreated } = this.props;
		const data = this.state;

		console.log(data);
		//send data to back
		if (true) {
			onRoomCreated(data);
			this.props.history.push('/')
		}
	}

	render (){
		return (
			<div className={cnCreateRoom()}>
				<div className={cnCreateRoom('Setting', { type: 'name' })}>
					<label>Your name</label>
					<input 
						className={cn('Input')({ type: 'text' })}
						type="text"
						value={this.state.name}
						onChange={(e)=>{this.setState({...this.state, name: e.target.value})}}
					/>
				</div>
				<div className={cnCreateRoom('Setting', { type: 'players-amount' })}>
					<label>Max players</label>
					<select
						className={cn('Input')({ type: 'text' }) }
						value={this.state.players}
						onChange={(e)=>{this.setState({...this.state, players: +e.target.value})}}
					>
						{Array(maxUserAmount - minUserAmount + 1).fill(0).map(
							(item, index) => <option key={index}>{minUserAmount + index}</option>)
						}
					</select>
				</div>
				<div className={cnCreateRoom('Setting', { type: 'password' })}>
					<label>Password (Not required)</label>
					<input
						className={cn('Input')({ type: 'text' })}
						type="text"
						value={this.state.password}
						onChange={(e)=>{this.setState({...this.state, password: e.target.value})}}
					/>
				</div>
				<Button className={cnCreateRoom('Submit')} value="Create room" onClick={ this.onRoomCreate }/>
			</div>
		);
	}
}

const mapStateToProps = (state: IState): IStatePropsRedux => {
	return ({
		name: state.room.userName,
		players: state.room.maxPlayers,
	})
}

const mapDispatchToProps = (dispatch: any): IDispatchPropsRedux => {
	return {
		onRoomCreated: (data) => { dispatch(createRoom(data)) }
	}
}

export default withRouter(connect<IStatePropsRedux, IDispatchPropsRedux, IOwnProps>(mapStateToProps, mapDispatchToProps)(CreateRoom));
