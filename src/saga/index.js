import { call, put, takeLatest, select, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import axios from 'axios';
import url from 'api';
import md5 from 'js-md5';
import format from 'date-format';

import {
  REQUEST,
  AUTH_REQUEST,
  SET_USER,
  SET_ERROR,
  SET_LISTS,
  GET_LISTS,
  UPDATE_LIST_ITEM,
  CREATE_LIST_ITEM,
  UPDATE_LIST,
  CREATE_LIST,
} from 'actions';

const getToken = (state) => state.auth.token;
const getUser = (state) => state.auth.user;

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

const fetchShoppingLists = async ({ token, filters }) => {
  const response = await axios.get(`${url}/shopping-lists?${filters}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

function* getShoppingLists({ payload: { filters } }) {
  yield put({ type: REQUEST, payload: true });
  yield put({ type: SET_ERROR, payload: false });
  const token = yield select(getToken);

  try {
    const response = yield call(fetchShoppingLists, { token, filters });
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

const putListItem = async ({ token, id, description, done }) => {
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
    const response = yield call(putListItem, { description, id, done, token });

    if (response.status !== 200) {
      yield put({ type: SET_ERROR, payload: true });
    }
  } catch (error) {
    yield put({ type: SET_ERROR, payload: true });
  }
}

const postListItem = async ({ token, description, done }) => {
  const data = JSON.stringify({ description, done });
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const response = await axios.post(`${url}/shopping-list-items`, data, options);
  return response;
};

function* createShoppingListItem({ payload: { description, done } }) {
  yield put({ type: SET_ERROR, payload: false });
  yield put({ type: REQUEST, payload: true });
  const token = yield select(getToken);

  try {
    const response = yield call(postListItem, { description, done, token });
    yield put({ type: REQUEST, payload: false });

    if (response.status !== 200) {
      yield put({ type: SET_ERROR, payload: true });
    }
  } catch (error) {
    yield put({ type: SET_ERROR, payload: true });
    yield put({ type: REQUEST, payload: false });
  }
}

const putList = async ({ token, id, name, done }) => {
  const data = JSON.stringify({ name, done });
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const response = await axios.put(`${url}/shopping-lists/${id}`, data, options);
  return response;
};

function* updateShoppingList({ payload: { name, id, done } }) {
  yield put({ type: SET_ERROR, payload: false });
  const token = yield select(getToken);

  try {
    const response = yield call(putList, { name, id, done, token });

    if (response.status !== 200) {
      yield put({ type: SET_ERROR, payload: true });
    }
  } catch (error) {
    yield put({ type: SET_ERROR, payload: true });
  }
}

const postList = async ({ token, userId, name, done, items }) => {
  const data = JSON.stringify({
    name,
    done,
    created_on: format('yyyy-MM-dd hh:mm:ss'),
    created_at: format('yyyy-MM-dd hh:mm:ss'),
    user: userId,
    shopping_list_items: items,
  });
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const response = await axios.post(`${url}/shopping-lists`, data, options);
  return response;
};

function* createShoppingList({ payload: { name, done, items } }) {
  yield put({ type: SET_ERROR, payload: false });
  yield put({ type: REQUEST, payload: true });

  const token = yield select(getToken);
  const user = yield select(getUser);
  let responses = [];

  try {
    responses = yield all(
      items.map((item) => {
        const { description, done: itemDone } = item;
        return call(postListItem, { token, description, done: itemDone });
      }),
    );
  } catch (error) {
    yield put({ type: SET_ERROR, payload: true });
    yield put({ type: REQUEST, payload: false });
  }

  if (responses.length === 0) {
    yield put({ type: SET_ERROR, payload: true });
    yield put({ type: REQUEST, payload: false });
    return;
  }

  const hasErrors = responses.filter((response) => response.status !== 200).length > 0;

  if (hasErrors) {
    yield put({ type: SET_ERROR, payload: true });
    yield put({ type: REQUEST, payload: false });
    return;
  }

  const addedItems = responses.map((response) => {
    return response.data.id;
  });

  try {
    const response = yield call(postList, {
      name,
      done,
      items: addedItems,
      token,
      userId: user.id,
    });
    yield put({ type: REQUEST, payload: false });

    if (response.status !== 200) {
      yield put({ type: SET_ERROR, payload: true });
    }
  } catch (error) {
    yield put({ type: SET_ERROR, payload: true });
    yield put({ type: REQUEST, payload: false });
  }
}

function* saga() {
  yield takeLatest(AUTH_REQUEST, authorize);
  yield takeLatest(GET_LISTS, getShoppingLists);
  yield takeLatest(UPDATE_LIST_ITEM, updateShoppingListItem);
  yield takeLatest(CREATE_LIST_ITEM, createShoppingListItem);
  yield takeLatest(UPDATE_LIST, updateShoppingList);
  yield takeLatest(CREATE_LIST, createShoppingList);
}

export default saga;
