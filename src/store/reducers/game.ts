import * as types from 'store/actions/actionTypes/game';
import { actionType } from 'store/types';
import { gameState } from 'store/types/game';

const initState: gameState = {
	location: 'Airplane',
	locationImgUrl: 'https://cdn.vox-cdn.com/thumbor/oDdR6AF3DKIp7R73RYAXdLaC68g=/0x0:1280x720/1200x800/filters:focal(538x258:742x462)/cdn.vox-cdn.com/uploads/chorus_image/image/63621787/jetblue1.0.jpg',
	role: 'Captain',
	roleImgUrl: 'https://thumbs.dreamstime.com/z/airplane-captain-pilot-hat-airplane-captain-pilot-hat-looking-plane-turning-around-globe-concept-global-travelling-116138994.jpg',
	story: 'You were driving',
}

export default function gameReducerstate (state: gameState = initState, action: actionType): gameState {
	switch (action.type) {
		case types.RESET_GAME: {
			return {
				...state,
			}
		}

		default: return state
	}
}