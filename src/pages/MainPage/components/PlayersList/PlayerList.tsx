import * as React from 'react';
import { connect } from 'react-redux';
import { cn } from '@bem-react/classname';

import './PlayerList.scss';

import { player } from 'store/types/room';
import IState from 'store/types';

interface IStatePropsRedux {
	players: player[];
}

interface IOwnProps {
	className: string;
}

interface IPlayerListProps extends IStatePropsRedux, IOwnProps {}

const cnPlayerList = cn('PlayerList');

const PlayerList: React.FC<IPlayerListProps> = ({ className, players = [] }) => (
	<div className={cnPlayerList(null, [ className ])}>
		{
			players.map((playerItem, ind) => (
				<div className={cnPlayerList('Player', { ready: playerItem.ready })} key={ind}>
					{ playerItem.userName }
				</div>
			))
		}
	</div>
);

const mapStateToProps = (state: IState): IStatePropsRedux => (
	{ players: state.room.players }
);

export default connect(mapStateToProps)(PlayerList);
