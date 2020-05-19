import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import ShoppingListsReducer from 'reducer/ShoppingLists';

import { REQUEST, SET_USER, SET_ERROR } from 'actions';

const initState = {
  token: '',
  user: {},
  isLogged: false,
  isFetching: false,
  isError: false,
  errorText: '',
};

const AuthReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case REQUEST: {
      return {
        ...state,
        isFetching: payload,
      };
    }
    case SET_USER: {
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        isLogged: true,
      };
    }
    case SET_ERROR: {
      const { isError, errorText } = payload;
      return {
        ...state,
        isError,
        errorText,
      };
    }
    default:
      return state;
  }
};

const createRootReducer = (history) =>
  combineReducers({
    auth: AuthReducer,
    router: connectRouter(history),
    shoppingLists: ShoppingListsReducer,
  });

export default createRootReducer;
