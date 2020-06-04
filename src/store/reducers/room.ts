import * as types from 'store/actions/actionTypes/room';
import { actionType } from 'store/types';
import { roomState } from 'store/types/room';
import { maxUserAmount } from 'consts/consts';

const initState: roomState = {
	userName: '',
	maxPlayers: maxUserAmount,
	isGM: false,
	players: [],
}

export default function roomReducer(state: roomState = initState, action: actionType): roomState {
    switch (action.type) {
		case types.CREATE_ROOM: {
			return {
				...state,
				...action.payload,
				isGM: true,
			};
		}

		case types.JOIN_ROOM: {
			return {
				...state,
				...action.payload
			};
		}

		case types.LEAVE_ROOM: {
			return {
				...state,
				isGM: false,
				players: [],
				maxPlayers: maxUserAmount,
				id: undefined,
				password: '',
			}
		}

		case types.ADD_PLAYER: {
			return {
				...state,
				players: [...state.players, action.payload ]
			}
		}

		case types.REMOVE_PLAYER: {
			return {
				...state,
				players: state.players.filter(item => item.name !== action.payload)
			}
		}

		case types.PLAYER_READY: {
			return {
				...state,
				players: state.players.map(
					item => item.name === action.payload ?
						{...item, ready: true } : item
				)
			}
		}

		case types.PLAYER_NOT_READY: {
			return {
				...state,
				players: state.players.map(
					item => item.name === action.payload ?
						{...item, ready: false } : item
				)
			}
		}

		case types.SET_NAME: {
			return {
				...state,
				userName: action.payload,
			}
		}

		default: return state;
	}
};
