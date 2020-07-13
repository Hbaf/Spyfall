import { roomState } from './room';
import { gameState } from './game';
import { appState } from './app';

export type actionType = {
	type: string;
	// eslint-disable-next-line
	payload?: any;
	meta?: string;
}

type IState = {
	app: appState;
	room: roomState;
	game: gameState;
}

export default IState;
