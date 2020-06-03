import { combineReducers } from 'redux';

import settingsReducer from "./settings";


const reducers = combineReducers({
    settings: settingsReducer,
});

export default reducers;