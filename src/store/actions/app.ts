import * as types from 'store/actions/actionTypes/app';
import { actionType } from 'store/types';
import { appState } from 'store/types/app';


export const setName = (userName: string): actionType => ({
	type: types.SET_NAME,
	payload: userName,
})

export const appInited = (data: appState): actionType => ({
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

