import { combineReducers } from 'redux';
import { buttons } from './buttons';
import { direction } from './direction';
import { gameboy } from './gameboy';
import { rustGameboy } from './rustGameboy';

export const rootReducer = combineReducers({
    buttons,
    direction,
    gameboy,
    rustGameboy
});