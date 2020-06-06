import { roomState } from './room';
import { gameState } from "./game";
import { appState } from "./app";

export type actionType = {
	type: string;
	payload?: any;
	meta?: any;
}

type IState = {
	app: appState;
	room: roomState;
	game: gameState;
}

export default IState;
