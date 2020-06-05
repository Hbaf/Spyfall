import * as types from 'store/actions/actionTypes/settings';
import { actionType } from 'store/types';
import { settingsState } from 'store/types/settings';

export const appInited = (data: settingsState): actionType => ({
	type: types.APP_INITED,
	payload: data,
})

export const toggleLocation = (id: number): actionType => ({
	type: types.TOGGLE_LOCATION,
	payload: id,
});


export const toggleGroupLocation = (groupId: number): actionType => ({
	type: types.TOGGLE_ALL_LOCATIONS,
	payload: groupId,
});
