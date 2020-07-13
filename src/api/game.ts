import * as socketConfig from 'configs/api/socketConfig.json';
import * as gameActions from 'store/actions/game';
import { gameDO } from 'api/types/game';
import { startGameDO } from './types/game';
import { Store } from 'redux';

class GameEndpointClass {
	socket: SocketIOClient.Socket;
	store: Store;

	constructor(socket: SocketIOClient.Socket, store: Store) {
		this.socket = socket;
		this.store = store;
		this.subscribe();
	}

	subscribe() {
		this.socket.on(socketConfig.GAME_STARTED, (data: gameDO) => {
			this.store.dispatch(gameActions.initGame(data));
		});
		this.socket.on(socketConfig.GAME_RESET, () => {
			this.store.dispatch(gameActions.resetGame());
		});
	}

	startGame(data: startGameDO) {
		this.socket.emit(socketConfig.START_GAME, data);
	}

	resetGame() {
		this.socket.emit(socketConfig.RESET_GAME);
	}
}

export default GameEndpointClass;
