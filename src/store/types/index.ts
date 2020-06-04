import { settingsState } from "./settings";
import { roomState } from './room';
import { gameState } from "./game";

type IState = {
	settings: settingsState;
	room: roomState;
	game: gameState;
}

export type actionType = {
	type: string;
	payload?: any;
	meta?: any;
}

export default IState;
