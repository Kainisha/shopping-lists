import { call, put, takeLatest, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import axios from 'axios';
import url from 'api';
import md5 from 'js-md5';

import {
  REQUEST,
  AUTH_REQUEST,
  SET_USER,
  SET_ERROR,
  SET_LISTS,
  GET_LISTS,
  UPDATE_LIST_ITEM,
} from 'actions';

const fetchLogin = async ({ login, password }) => {
  md5(password);
  const hash = md5.create();
  hash.update(password);

  const response = await axios.post(`${url}/auth/local`, {
    identifier: login,
    password: hash.hex(),
  });

  return response;
};

function* authorize({ payload: { login, password } }) {
  yield put({ type: REQUEST, payload: true });
  yield put({ type: SET_ERROR, payload: false });

  try {
    const response = yield call(fetchLogin, { login, password });
    yield put({ type: REQUEST, payload: false });

    if (response.status !== 200) {
      yield put({ type: SET_ERROR, payload: true });
      return;
    }

    yield put({ type: SET_USER, payload: { user: response.data.user, token: response.data.jwt } });
    yield put(push('/list'));
  } catch (error) {
    yield put({ type: REQUEST, payload: false });
    yield put({ type: SET_ERROR, payload: true });
  }
}

const fetchShoppingLists = async ({ token }) => {
  const response = await axios.get(`${url}/shopping-lists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const getToken = (state) => state.auth.token;

function* getShoppingLists() {
  yield put({ type: REQUEST, payload: true });
  yield put({ type: SET_ERROR, payload: false });
  const token = yield select(getToken);

  try {
    const response = yield call(fetchShoppingLists, { token });
    yield put({ type: REQUEST, payload: false });

    if (response.status !== 200) {
      yield put({ type: SET_ERROR, payload: true });
      return;
    }

    yield put({ type: SET_LISTS, payload: response.data });
  } catch (error) {
    yield put({ type: REQUEST, payload: false });
    yield put({ type: SET_ERROR, payload: true });
  }
}

const putListListItem = async ({ token, id, description, done }) => {
  const data = JSON.stringify({ description, done });
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const response = await axios.put(`${url}/shopping-list-items/${id}`, data, options);
  return response;
};

function* updateShoppingListItem({ payload: { description, id, done } }) {
  yield put({ type: SET_ERROR, payload: false });
  const token = yield select(getToken);

  try {
    const response = yield call(putListListItem, { description, id, done, token });

    if (response.status !== 200) {
      yield put({ type: SET_ERROR, payload: true });
    }
  } catch (error) {
    yield put({ type: SET_ERROR, payload: true });
  }
}

function* saga() {
  yield takeLatest(AUTH_REQUEST, authorize);
  yield takeLatest(GET_LISTS, getShoppingLists);
  yield takeLatest(UPDATE_LIST_ITEM, updateShoppingListItem);
}

export default saga;
