import {USER_ACTION_TYPES} from './userTypes.js';
import {createAction} from '../../Utils/reducerUtil.js';

export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);