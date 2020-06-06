import { combineReducers } from 'redux';

import appReducer from './app';
import roomReducer from './room';
import gameReducer from './game';


const reducers = combineReducers({
	app: appReducer,
	room: roomReducer,
	game: gameReducer,
});

export default reducers;