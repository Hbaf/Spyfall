import * as socketConfig from "configs/api/socketConfig.json";
import * as roomActions from 'store/actions/room';
import { roomDO } from "api/types/room";
import { roomCreateDO, joinRoomDO, playerDO } from './types/room';

class RoomEndpointClass {
	socket: any;
	store: any;

	constructor(socket: any, store: any) {
		this.socket = socket;
		this.store = store;
		this.subscribe();
	}

	subscribe() {
		this.socket.on(socketConfig.ROOM_CREATED, (data: roomDO) => {
			this.store.dispatch(roomActions.createRoom(data));
		})
		this.socket.on(socketConfig.ROOM_CONNECTED, (data: roomDO) => {
			this.store.dispatch(roomActions.joinRoom(data));
		})
		this.socket.on(socketConfig.ROOM_IS_FULL, () => {
			this.store.dispatch();
		})
		this.socket.on(socketConfig.ROOM_DOESNT_EXIST, () => {
			this.store.dispatch();
		})
		this.socket.on(socketConfig.USER_JOINED, (data: playerDO) => {
			this.store.dispatch(roomActions.addPlayer(data));
		})
		this.socket.on(socketConfig.USER_CAME_OUT, (data: playerDO) => {
			this.store.dispatch(roomActions.removePlayer(data));
		})
		this.socket.on(socketConfig.USER_READY, (data: playerDO) => {
			this.store.dispatch(roomActions.playerReady(data));
		})
		this.socket.on(socketConfig.USER_NOT_READY, (data: playerDO) => {
			this.store.dispatch(roomActions.playerNotReady(data));
		})
		this.socket.on(socketConfig.NEW_GM, () => {
			this.store.dispatch(roomActions.newGM());
		})
	}

	createRoom(data: roomCreateDO) {
		this.socket.emit(socketConfig.CREATE_ROOM, data);
	}

	joinRoom(data: joinRoomDO) {
		this.socket.emit(socketConfig.CONNECT_TO_ROOM, data);
	}

	leaveRoom() {
		this.socket.emit(socketConfig.LEAVE_ROOM);
	}

	ready(data: playerDO) {
		this.socket.emit(socketConfig.USER_READY, data);
	}

	notReady(data: playerDO) {
		this.socket.emit(socketConfig.USER_NOT_READY, data);
	}
}

export default RoomEndpointClass;