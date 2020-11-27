import { combineReducers } from 'redux';
import { buttons } from './buttons';
import { direction } from './direction';
import { gameboy } from './gameboy';

export const rootReducer = combineReducers({
    direction,
    gameboy
});