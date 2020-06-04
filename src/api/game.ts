import * as socketConfig from "configs/api/socketConfig.json";
import * as gameActions from 'store/actions/game';
import { gameData, startGameData } from "store/types/game";

class GameEndpointClass {
	socket: any;
	store: any;

	constructor(socket: any, store: any) {
		this.socket = socket;
		this.store = store;
		this.subscribe();
	}

	subscribe() {
		this.socket.on(socketConfig.GAME_STARTED, (data: gameData) => {
			this.store.dispatch(gameActions.initGame(data));
		})
		this.socket.on(socketConfig.GAME_RESET, () => {
			this.store.dispatch(gameActions.resetGame());
		})
	}

	startGame(data: startGameData) {
		this.socket.emit(socketConfig.START_GAME, data);
	}

	resetGame() {
		this.socket.emit(socketConfig.RESET_GAME);
	}
}

export default GameEndpointClass;