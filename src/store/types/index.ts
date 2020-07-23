import { roomState } from './room';
import { gameState } from './game';
import { appState } from './app';

export type actionType = {
	type: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	payload?: any;
	meta?: string;
}

type IState = {
	app: appState;
	room: roomState;
	game: gameState;
}

export default IState;
