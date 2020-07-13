import * as socketConfig from 'configs/api/socketConfig.json';
import * as appAction from 'store/actions/app';
import { appDO, locationToggleDO, editionToggleDO } from './types/app';
import { Store } from 'redux';

class AppEndpointClass {
	socket: SocketIOClient.Socket;
	store: Store;

	constructor(socket: SocketIOClient.Socket, store: Store) {
		this.socket = socket;
		this.store = store;
		this.subscribe();
	}

	subscribe() {
		this.socket.on(socketConfig.APP_INITED, (data: appDO) => {
			this.store.dispatch(appAction.appInited(data));
		});
		this.socket.on(socketConfig.TOGGLE_LOCATION, (data: locationToggleDO) => {
			this.store.dispatch(appAction.toggleLocation(data.id));
		});
		this.socket.on(socketConfig.TOGGLE_ALL_LOCATIONS, (data: locationToggleDO) => {
			this.store.dispatch(appAction.toggleEdition(data.id));
		});
	}

	toggleLocation(data: locationToggleDO) {
		this.socket.emit(socketConfig.TOGGLE_LOCATION, data);
	}

	toggleEdition(data: editionToggleDO) {
		this.socket.emit(socketConfig.TOGGLE_ALL_LOCATIONS, data);
	}
}

export default AppEndpointClass;
