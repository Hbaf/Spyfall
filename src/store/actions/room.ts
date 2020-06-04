import * as types from 'store/actions/actionTypes/room';
import { actionType } from 'store/types';
import { roomCreate } from 'store/types/room';

export const joinRoom = (id: string): actionType => ({
	type: types.JOIN_ROOM,
	payload: id,
})

export const createRoom = (data: roomCreate): actionType => ({
	type: types.CREATE_ROOM,
	payload: data,
})
