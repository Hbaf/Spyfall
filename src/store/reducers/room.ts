import * as types from 'store/actions/actionTypes/room';
import { actionType } from 'store/types';
import { roomState } from 'store/types/room';
import { maxUserAmount } from 'consts/consts';

const initState: roomState = {
	roomId: '',
	isGM: false,
	players: [],
	maxPlayers: maxUserAmount,
	password: '',
}

export default function roomReducer(state: roomState = initState, action: actionType): roomState {
    switch (action.type) {
		case types.CREATE_ROOM: {
			return {
				...state,
				...action.payload,
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
				roomId: undefined,
				password: '',
			}
		}

		case types.ADD_PLAYER: {
			return {
				...state,
				players: [...state.players, { userName: action.payload.userName, ready: false } ]
			}
		}

		case types.REMOVE_PLAYER: {
			return {
				...state,
				players: state.players.filter(item => item.userName !== action.payload.userName)
			}
		}

		case types.PLAYER_READY: {
			return {
				...state,
				players: state.players.map(
					player => player.userName === action.payload.userName ?
						{...player, ready: true } : player
				)
			}
		}

		case types.PLAYER_NOT_READY: {
			return {
				...state,
				players: state.players.map(
					player => player.userName === action.payload.userName ?
						{...player, ready: false } : player
				)
			}
		}

		default: return state;
	}
};
