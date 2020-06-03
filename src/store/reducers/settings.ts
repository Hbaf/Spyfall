import * as types from 'store/actions/actionTypes/settings';
import { actionType } from 'consts/types';
import { settingsState } from 'store/types/settings';

import { minLocationsAmount } from 'consts/consts';

const initState: settingsState = {
	groups: [
		{
			name: 'Spyfall',
			selected: false,
			locationsIds: [
				0,1,2,3,4,5,
			],
		},
		{
			name: 'Spyfall 2',
			selected: false,
			locationsIds: [
				6,7,8,9,10,11
			],
		},
		{
			name: 'Custom',
			selected: false,
			locationsIds: [],
		}
	],
	locations: [
		{
			group: 0,
			name: 'Airplane',
			selected: true,
		},
		{
			group: 0,
			name: 'Ship',
			selected: true,
		},
		{
			group: 0,
			name: 'Library',
			selected: true,
		},
		{
			group: 0,
			name: 'Bank',
			selected: true,
		},
		{
			group: 0,
			name: 'Cinema',
			selected: true,
		},
		{
			group: 0,
			name: 'Beach',
			selected: false,
		},
		{
			group: 1,
			name: 'Space Station',
			selected: false,
		},
		{
			group: 1,
			name: 'Casino',
			selected: true,
		},
		{
			group: 1,
			name: 'Theatre',
			selected: false,
		},
		{
			group: 1,
			name: 'Aqua Park',
			selected: false,
		},
		{
			group: 1,
			name: 'Kreml',
			selected: false,
		},
		{
			group: 1,
			name: 'Disneyland',
			selected: false,
		},
	],
	selectedLocations: 6,
};


export default function settingsReducer(state: settingsState = initState, action: actionType): settingsState {
    switch (action.type) {
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

			console.log(tempLocs[locId].selected, tempSelectedAmount);

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
			console.log(tempGroups[groupId].selected, tempSelectedAmount);
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
