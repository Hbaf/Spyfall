import * as types from 'store/actions/actionTypes/game';
import { actionType } from 'consts/types';

export const joinRoom = (id: string): actionType => ({
	type: types.JOIN_ROOM,
	payload: id,
})

export const createRoom = (): actionType => ({
	type: types.JOIN_ROOM,
})
