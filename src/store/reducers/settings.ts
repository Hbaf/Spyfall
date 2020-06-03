import * as types from 'store/actions/actionTypes/settings';
import { actionType } from 'consts/types';
import { settingsState } from 'store/types/settings';


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
			selected: false,
		},
		{
			group: 0,
			name: 'Ship',
			selected: false,
		},
		{
			group: 0,
			name: 'Library',
			selected: false,
		},
		{
			group: 0,
			name: 'Bank',
			selected: false,
		},
		{
			group: 0,
			name: 'Cinema',
			selected: false,
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
			selected: false,
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
};


export default function settingsReducer(state: settingsState = initState, action: actionType): settingsState {
    switch (action.type) {
        case types.TOGGLE_LOCATION: {
			const locId = action.payload;
			const groupId = state.locations[locId].group;

			let tempLocs = state.locations.map((item, ind) => ind === locId ? { ...item, selected: !item.selected } : item );
			let tempGroups = [...state.groups];

			tempGroups[groupId].selected = tempGroups[groupId].locationsIds.reduce((acc, item) => acc && tempLocs[item].selected, true)

            return {
				...state,
				groups: tempGroups,
				locations: tempLocs,
            };
		}
		
		case types.TOGGLE_ALL_LOCATIONS: {
			let tempLocs = [ ...state.locations ];
			const groupId = action.payload;

			let tempGroups = [ ...state.groups ];
			tempGroups[groupId].selected = !tempGroups[groupId].selected;

			state.groups[ groupId ].locationsIds.forEach(id => {
				tempLocs[ id ].selected = tempGroups[groupId].selected;
			});
            return {
				...state,
				groups: tempGroups,
				locations: tempLocs,
            };
        }

        default:
            return state;
    }
};
