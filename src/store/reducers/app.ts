import * as types from 'store/actions/actionTypes/app';
import { actionType } from 'store/types';
import { appState } from 'store/types/app';
import { minLocationsAmount } from 'consts/consts';

const initState: appState = {
	// TODO add local storage
	userName: '',
	editions: [],
	groups: [],
	locations: [],
	selectedLocations: 0,
}

export default function appReducer (state: appState = initState, action: actionType): appState {
	switch (action.type) {
		case types.SET_NAME: {
			return {
				...state,
				userName: action.payload,
			}
		}

		case types.APP_INITED: {
			return {
				...state,
				...action.payload,
			}
		}

        case types.TOGGLE_LOCATION: {
			const locId = action.payload;
			const editionId = state.locations[locId].editionId;

			let tempLocs = [...state.locations];
			let tempSelectedAmount = state.selectedLocations;
			if (tempLocs[locId].selected && (tempSelectedAmount - 1 < minLocationsAmount)) {
				return state;
			}
			let tempEditions = [...state.editions];
			tempSelectedAmount = tempLocs[locId].selected ? tempSelectedAmount - 1 : tempSelectedAmount + 1
			tempLocs[locId].selected = !tempLocs[locId].selected;
			tempEditions[editionId].selected = tempEditions[editionId].locationIds.reduce((acc, item) => acc && tempLocs[item].selected, true)

            return {
				...state,
				editions: tempEditions,
				locations: tempLocs,
				selectedLocations: tempSelectedAmount,
            };
		}
		
		case types.TOGGLE_ALL_LOCATIONS: {
			let tempLocs = [ ...state.locations ];
			const editionId = action.payload;

			let tempSelectedAmount = state.selectedLocations;
			let tempEditions = [ ...state.editions ];
			const locLength = tempEditions[editionId].locationIds.length
			const selectedLocAmount = tempEditions[editionId].locationIds.reduce((acc, locationId) => tempLocs[locationId].selected ? acc + 1 : acc, 0);
			if (tempEditions[editionId].selected && (tempSelectedAmount - selectedLocAmount < minLocationsAmount)) {
				return state;
			}
			tempSelectedAmount = tempEditions[editionId].selected ?
				tempSelectedAmount - selectedLocAmount :
				tempSelectedAmount + locLength - selectedLocAmount;
			tempEditions[editionId].selected = !tempEditions[editionId].selected;

			state.editions[ editionId ].locationIds.forEach(id => {
				tempLocs[ id ].selected = tempEditions[editionId].selected;
			});

            return {
				...state,
				editions: tempEditions,
				locations: tempLocs,
				selectedLocations: tempSelectedAmount,
            };
        }

		default: return state;
	}
}
