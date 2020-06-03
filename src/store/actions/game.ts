import * as types from 'store/actions/actionTypes/game';
import { actionType } from 'consts/types';
import { roomCreate } from 'store/types/game';

export const joinRoom = (id: string): actionType => ({
	type: types.JOIN_ROOM,
	payload: id,
})

export const createRoom = (data: roomCreate): actionType => ({
	type: types.JOIN_ROOM,
	payload: data,
})
