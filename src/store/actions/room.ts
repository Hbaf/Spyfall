import * as types from 'store/actions/actionTypes/room';
import { actionType } from 'store/types';
import { roomCreateData, roomJoinData } from 'store/types/room';

export const createRoom = (data: roomCreateData): actionType => ({
	type: types.CREATE_ROOM,
	payload: data,
})

export const joinRoom = (data: roomJoinData): actionType => ({
	type: types.JOIN_ROOM,
	payload: data,
})

export const leaveRoom = (): actionType => ({
	type: types.LEAVE_ROOM,
})

export const addPlayer = (name: string): actionType => ({
	type: types.ADD_PLAYER,
	payload: { name, ready: false}
})

export const removePlayer = (name: string): actionType => ({
	type: types.REMOVE_PLAYER,
	payload: name,
})

export const playerReady = (name: string): actionType => ({
	type: types.PLAYER_READY,
	payload: name,
})

export const playerNotReady = (name: string): actionType => ({
	type: types.PLAYER_NOT_READY,
	payload: name,
})

export const setName = (name: string): actionType => ({
	type: types.SET_NAME,
	payload: name,
})
