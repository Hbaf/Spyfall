import * as types from 'store/actions/actionTypes/app';
import { actionType } from 'store/types';


export const setName = (name: string): actionType => ({
	type: types.SET_NAME,
	payload: name,
})
