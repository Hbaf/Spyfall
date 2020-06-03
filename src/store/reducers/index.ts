import { combineReducers } from 'redux';

import settingsReducer from "./settings";
import gameReducer from './game';


const reducers = combineReducers({
	settings: settingsReducer,
	game: gameReducer,
});

export default reducers;