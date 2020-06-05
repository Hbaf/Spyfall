import * as types from 'store/actions/actionTypes/settings';
import { actionType } from 'store/types';
import { settingsState } from 'store/types/settings';
import { minLocationsAmount } from 'consts/consts';

const initState: settingsState = {
	groups: [],
	locations: [],
	selectedLocations: 0,
};

export default function settingsReducer(state: settingsState = initState, action: actionType): settingsState {
    switch (action.type) {
		case types.APP_INITED: {
			return {
				...state,
				...action.payload,
			}
		}

        case types.TOGGLE_LOCATION: {
			const locId = action.payload;
			const groupId = state.locations[locId].group;

			let tempLocs = [...state.locations];
			let tempSelectedAmount = state.selectedLocations;
			if (tempLocs[locId].selected && (tempSelectedAmount - 1 < minLocationsAmount)) {
				return state;
			}
			let tempGroups = [...state.groups];

			tempSelectedAmount = tempLocs[locId].selected ? tempSelectedAmount - 1 : tempSelectedAmount + 1

			tempLocs[locId].selected = !tempLocs[locId].selected;

			tempGroups[groupId].selected = tempGroups[groupId].locationsIds.reduce((acc, item) => acc && tempLocs[item].selected, true)

            return {
				...state,
				groups: tempGroups,
				locations: tempLocs,
				selectedLocations: tempSelectedAmount,
            };
		}
		
		case types.TOGGLE_ALL_LOCATIONS: {
			let tempLocs = [ ...state.locations ];
			const groupId = action.payload;

			let tempSelectedAmount = state.selectedLocations;
			let tempGroups = [ ...state.groups ];
			const locLength = tempGroups[groupId].locationsIds.length
			const selectedLocAmount = tempGroups[groupId].locationsIds.reduce((acc, item)=> tempLocs[item].selected ? acc + 1 : acc, 0);
			if (tempGroups[groupId].selected && (tempSelectedAmount - selectedLocAmount < minLocationsAmount)) {
				return state;
			}
			tempSelectedAmount = tempGroups[groupId].selected ?
				tempSelectedAmount - selectedLocAmount :
				tempSelectedAmount + locLength - selectedLocAmount;
			tempGroups[groupId].selected = !tempGroups[groupId].selected;

			state.groups[ groupId ].locationsIds.forEach(id => {
				tempLocs[ id ].selected = tempGroups[groupId].selected;
			});

            return {
				...state,
				groups: tempGroups,
				locations: tempLocs,
				selectedLocations: tempSelectedAmount,
            };
        }

        default:
            return state;
    }
};
