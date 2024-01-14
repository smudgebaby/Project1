import {combineReducers} from '@reduxjs/toolkit';
import {userReducer} from './User/userReducer.js';
import {cartReducer} from './Cart/cartReducer.js';

export const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer
});