import * as socketConfig from "configs/api/socketConfig.json";
import * as appAction from 'store/actions/app';
import { appDO } from "./types/app";

class AppEndpointClass {
	socket: any;
	store: any;

	constructor(socket: any, store: any) {
		this.socket = socket;
		this.store = store;
		this.subscribe();
	}

	subscribe() {
		this.socket.on(socketConfig.APP_INITED, (data: appDO) => {
			this.store.dispatch(appAction.appInited(data));
		})
	}

}

export default AppEndpointClass;