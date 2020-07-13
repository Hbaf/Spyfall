import * as types from 'store/actions/actionTypes/room';
import { actionType } from 'store/types';
import { roomDO, playerDO } from 'api/types/room';

export const createRoom = (data: roomDO): actionType => ({
	type: types.CREATE_ROOM,
	payload: data,
});

export const joinRoom = (data: roomDO): actionType => ({
	type: types.JOIN_ROOM,
	payload: data,
});

export const leaveRoom = (): actionType => ({ type: types.LEAVE_ROOM });

export const addPlayer = (data: playerDO): actionType => ({
	type: types.ADD_PLAYER,
	payload: data,
});

export const removePlayer = (data: playerDO): actionType => ({
	type: types.REMOVE_PLAYER,
	payload: data,
});

export const playerReady = (data: playerDO): actionType => ({
	type: types.PLAYER_READY,
	payload: data,
});

export const playerNotReady = (data: playerDO): actionType => ({
	type: types.PLAYER_NOT_READY,
	payload: data,
});

export const newGM = (): actionType => ({ type: types.NEW_GM });

export const setName = (name: string): actionType => ({
	type: types.SET_NAME,
	payload: name,
});
