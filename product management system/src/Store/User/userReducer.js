import {USER_ACTION_TYPES} from './userTypes.js';

const INITIAL_STATE = {
  currentUser: null,
  expiresIn: null
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload.currentUser, expiresIn: payload.expiresIn};
    default:
      return state;
  }
};