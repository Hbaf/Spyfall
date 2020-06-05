import * as socketConfig from "configs/api/socketConfig.json";
import * as gameActions from 'store/actions/room';
import { roomJoinData, roomCreateData } from "store/types/room";

class RoomEndpointClass {
	socket: any;
	store: any;

	constructor(socket: any, store: any) {
		this.socket = socket;
		this.store = store;
		this.subscribe();
	}

	subscribe() {
		this.socket.on(socketConfig.ROOM_CREATED, (data: any) => {
			this.store.dispatch(gameActions.createRoom(data));
		})
		this.socket.on(socketConfig.ROOM_CONNECTED, (data: roomJoinData) => {
			this.store.dispatch(gameActions.joinRoom(data));
		})
		this.socket.on(socketConfig.ROOM_IS_FULL, () => {
			this.store.dispatch();
		})
		this.socket.on(socketConfig.ROOM_DOESNT_EXIST, () => {
			this.store.dispatch();
		})
		this.socket.on(socketConfig.USER_JOINED, (data: string) => {
			this.store.dispatch(gameActions.addPlayer(data));
		})
		this.socket.on(socketConfig.USER_CAME_OUT, (data: string) => {
			this.store.dispatch(gameActions.removePlayer(data));
		})
		this.socket.on(socketConfig.USER_READY, (data: string) => {
			this.store.dispatch(gameActions.playerReady(data));
		})
		this.socket.on(socketConfig.USER_NOT_READY, (data: string) =>{
			this.store.dispatch(gameActions.playerNotReady(data));
		})
	}

	createRoom(data: roomCreateData) {
		this.socket.emit(socketConfig.CREATE_ROOM, data);
	}

	joinRoom(data: { id: string, name: string }) {
		this.socket.emit(socketConfig.CONNECT_TO_ROOM, data);
	}

	leaveRoom() {
		this.socket.emit(socketConfig.LEAVE_ROOM);
	}

	ready(data: string) {
		this.socket.emit(socketConfig.USER_READY, data);
	}

	notReady(data: string) {
		this.socket.emit(socketConfig.USER_NOT_READY, data);
	}
}

export default RoomEndpointClass;