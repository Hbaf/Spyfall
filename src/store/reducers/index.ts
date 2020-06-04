import { combineReducers } from 'redux';

import settingsReducer from "./settings";
import roomReducer from './room';
import gameReducer from './game';


const reducers = combineReducers({
	settings: settingsReducer,
	room: roomReducer,
	game: gameReducer,
});

export default reducers;