import * as types from 'store/actions/actionTypes/settings';
import { actionType } from 'consts/types';



export const toggleLocation = (id: number): actionType => ({
	type: types.TOGGLE_LOCATION,
	payload: id,
});


export const toggleGroupLocation = (groupId: number): actionType => ({
	type: types.TOGGLE_ALL_LOCATIONS,
	payload: groupId,
});
