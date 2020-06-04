import { settingsState } from "./settings";
import { roomState } from './room';
import { gameState } from "./game";

export type actionType = {
	type: string;
	payload?: any;
	meta?: any;
}

type IState = {
	settings: settingsState;
	room: roomState;
	game: gameState;
}

export default IState;
