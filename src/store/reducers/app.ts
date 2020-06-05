import * as types from 'store/actions/actionTypes/app';
import { actionType } from 'store/types';
import { appState } from 'store/types/app';

const initState: appState = {
	// TODO add local storage
	userName: '',
}

export default function appReducer (state: appState = initState, action: actionType): appState {
	switch (action.type) {
		case types.SET_NAME: {
			return {
				...state,
				userName: action.payload,
			}
		}

		default: return state;
	}
}