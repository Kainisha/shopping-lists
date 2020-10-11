import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import ShoppingListsReducer from 'reducer/ShoppingLists';
import moment from 'moment';

import { REQUEST, SET_USER, SET_ERROR, LOGOUT_USER } from 'actions';
import { LOCAL_STORAGE } from 'constants.js';

const checkIsLogged = () => {
  const { TOKEN_EXPIRES_KEY } = LOCAL_STORAGE;
  const expiresInStorage = localStorage.getItem(TOKEN_EXPIRES_KEY);

  if (expiresInStorage === null) {
    return false;
  }

  const expiresIn = moment.unix(parseInt(expiresInStorage, 10));
  const nowDate = moment();

  return !nowDate.isAfter(expiresIn);
};

const initState = {
  token: '',
  user: {},
  isLogged: checkIsLogged(),
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
      const { user, token } = payload;

      const { TOKEN_KEY, TOKEN_EXPIRES_KEY } = LOCAL_STORAGE;

      const expiresIn = moment();
      expiresIn.add(1, 'h');

      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(TOKEN_EXPIRES_KEY, expiresIn.format('X'));

      return {
        ...state,
        user,
        token,
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
    case LOGOUT_USER: {
      const { TOKEN_KEY, TOKEN_EXPIRES_KEY } = LOCAL_STORAGE;

      localStorage.removeItem(TOKEN_EXPIRES_KEY);
      localStorage.removeItem(TOKEN_KEY);

      return {
        ...state,
        isLogged: false,
        token: null,
        user: {},
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
