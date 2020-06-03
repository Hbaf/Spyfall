import * as React from 'react';

import { cn } from '@bem-react/classname';

import './PlayerList.scss';
import { player } from 'consts/types';

interface IPlayerListProps {
	className: string;
	players?: player[];
}

const cnPlayerList = cn('PlayerList');

const PlayerList: React.FC<IPlayerListProps> = ({ className, players=[] }) => {
	return (
		<div className={ cnPlayerList(null, [className]) }>
			{ players.map((player, ind) => <div className={ cnPlayerList('Player') } key={ind}>{ player.name }</div>) }
		</div>
	)
}

export default PlayerList