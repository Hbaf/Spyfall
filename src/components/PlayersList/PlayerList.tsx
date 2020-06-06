import * as React from 'react';

import { cn } from '@bem-react/classname';

import './PlayerList.scss';
import { player } from 'store/types/room';
import IState from 'store/types';
import { connect } from 'react-redux';

interface IStatePropsRedux {
	players: player[];
}

interface IOwnProps {
	className: string;
}

interface IPlayerListProps extends IStatePropsRedux, IOwnProps {}

const cnPlayerList = cn('PlayerList');

const PlayerList: React.FC<IPlayerListProps> = ({ className, players = [] }) => {
	return (
		<div className={ cnPlayerList(null, [className]) }>
			{ players.map((player, ind) => <div className={ cnPlayerList('Player', { ready: player.ready}) } key={ ind }>{ player.userName }</div>) }
		</div>
	)
}

const mapStateToProps = (state: IState): IStatePropsRedux => (
	{
		players: state.room.players,
	}
)

export default connect(mapStateToProps)(PlayerList);
