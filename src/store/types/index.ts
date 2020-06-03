import { settingsState } from "./settings";
import { gameState } from './game';

interface IState {
	settings: settingsState;
	game: gameState;
}

export default IState;
