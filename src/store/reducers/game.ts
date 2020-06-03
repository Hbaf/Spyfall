import * as types from 'store/actions/actionTypes/game';
import { actionType } from 'consts/types';
import { gameState } from 'store/types/game';

const initState: gameState = {
	room: {
		gameStarted: false,
		isGM: false,
		players: [],
	}
}

export default function gameReducer(state: gameState = initState, action: actionType): gameState {
    switch (action.type) {
		case types.JOIN_ROOM: {
			return {
				...state,
			};
		}

		default: { return state; }
	}
};
