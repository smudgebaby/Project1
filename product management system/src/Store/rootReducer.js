import {combineReducers} from '@reduxjs/toolkit';
import {userReducer} from './User/userReducer.js';
import {cartReducer} from './Cart/cartReducer.js';
import {userSlice} from './userSlice.js';

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  cart: cartReducer
});