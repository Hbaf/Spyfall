import * as types from 'store/actions/actionTypes/room';
import { actionType } from 'store/types';
import { roomState } from 'store/types/room';
import { maxUserAmount } from 'consts/consts';

const initState: roomState = {
	gameStarted: false,
	userName: '',
	maxPlayers: maxUserAmount,
	isGM: false,
	players: [],
}

export default function roomReducer(state: roomState = initState, action: actionType): roomState {
    switch (action.type) {
		case types.JOIN_ROOM: {
			return {
				...state,
			};
		}

		case types.CREATE_ROOM: {
			const { name, players, password } = action.payload;
			return {
				...state,
				userName: name,
				maxPlayers: players,
				password,
			};
		}

		default: return state;
	}
};
