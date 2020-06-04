import * as types from 'store/actions/actionTypes/game';
import { actionType } from 'store/types';
import { gameState } from 'store/types/game';

const initState: gameState = {
	gameStarted: false,
	location: '',
	locationImgUrl: undefined,
	role: '',
	roleImgUrl: undefined,
	story: '',
}

export default function gameReducerstate (state: gameState = initState, action: actionType): gameState {
	switch (action.type) {
		case types.RESET_GAME: {
			return {
				...state,
				gameStarted: false,
				location: '',
				locationImgUrl: undefined,
				role: '',
				roleImgUrl: undefined,
				story: '',
			}
		}

		case types.START_GAME: {
			const data = action.payload;
			return {
				...state,
				gameStarted: true,
				...data,
			}
		}

		default: return state
	}
}