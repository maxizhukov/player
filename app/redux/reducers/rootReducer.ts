import {combineReducers} from 'redux';
import {playerReducer} from './playerReducer';

export const rootReducer = combineReducers({
  playingSong: playerReducer,
});
