import * as types from 'store/actions/actionTypes/game';
import { actionType } from 'store/types';
import { gameDO } from 'api/types/game';


export const resetGame = (): actionType => ({ type: types.RESET_GAME });

export const initGame = (data: gameDO): actionType => ({
	type: types.START_GAME,
	payload: data,
});
