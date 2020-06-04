import * as types from 'store/actions/actionTypes/game';
import { actionType } from 'store/types';

export const resetGame = (): actionType => ({
	type: types.RESET_GAME
})