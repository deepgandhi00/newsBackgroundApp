import {combineReducers} from '@reduxjs/toolkit';
import appSlice from './appSlice';

const combineReducer = combineReducers({appSlice: appSlice});

const rootReducer = (state: any, action: {type: string; payload: any}) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }

  return combineReducer(state, action);
};

export default rootReducer;
