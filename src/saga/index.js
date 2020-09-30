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
  SET_LIST,
  GET_LISTS,
  UPDATE_LIST_ITEM,
  CREATE_LIST_ITEM,
  UPDATE_LIST,
  CREATE_LIST,
  DELETE_LIST,
  UPDATE_ALL,
  SAVE_ARCHIVED,
} from 'actions';
import { LOCAL_STORAGE } from 'constants.js';

const getToken = () => localStorage.getItem(LOCAL_STORAGE.TOKEN_KEY);
const getUser = (state) => state.auth.user;
const getIsLogged = (state) => state.auth.isLogged;

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

const fetchShoppingLists = async ({ token, filters, id = null }) => {
  const computedUrl =
    id === null ? `${url}/shopping-lists?${filters}` : `${url}/shopping-lists/${id}`;
  const response = await axios.get(computedUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

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

const putList = async ({ token, id, name, done, items = null }) => {
  const data = { name, done };

  if (items !== null && items.length !== 0) {
    data.shopping_list_items = items;
  }

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const response = await axios.put(`${url}/shopping-lists/${id}`, JSON.stringify(data), options);
  return response;
};

const deleteList = async ({ token, id }) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const response = await axios.delete(`${url}/shopping-lists/${id}`, options);
  return response;
};

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

const postListItem = async ({ token, description, done, listId = null }) => {
  const data = { description, done };

  if (listId !== null) {
    data.shopping_list = listId;
  }

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const response = await axios.post(`${url}/shopping-list-items`, JSON.stringify(data), options);
  return response;
};

const deleteListItem = async ({ token, id }) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const response = await axios.delete(`${url}/shopping-list-items/${id}`, options);
  return response;
};

const formatErrorText = (error) => {
  const { statusCode, error: text } = error.response.data;
  return `${statusCode}: ${text}`;
};

function* authorize({ payload: { login, password } }) {
  yield put({ type: REQUEST, payload: true });
  yield put({ type: SET_ERROR, payload: { isError: false, errorText: '' } });

  try {
    const response = yield call(fetchLogin, { login, password });
    yield put({ type: REQUEST, payload: false });

    if (response.status !== 200) {
      yield put({
        type: SET_ERROR,
        payload: { isError: true, errorText: 'Invalid login or password' },
      });
      return;
    }

    yield put({ type: SET_USER, payload: { user: response.data.user, token: response.data.jwt } });
    yield put(push('/list'));
  } catch (error) {
    yield put({ type: REQUEST, payload: false });
    yield put({
      type: SET_ERROR,
      payload: { isError: true, errorText: formatErrorText(error) },
    });
  }
}

function* getShoppingLists({ payload: { filters, id = null } }) {
  yield put({ type: REQUEST, payload: true });
  yield put({ type: SET_ERROR, payload: { isError: false, errorText: '' } });

  const token = yield select(getToken);
  const isLogged = yield select(getIsLogged);

  if (!isLogged) {
    return;
  }

  try {
    const response = yield call(fetchShoppingLists, { token, filters, id });
    yield put({ type: REQUEST, payload: false });

    if (response.status !== 200) {
      yield put({
        type: SET_ERROR,
        payload: { isError: true, errorText: 'An error occured during the request' },
      });
      return;
    }

    const { data } = response;

    if (id === null) {
      yield put({ type: SET_LISTS, payload: data });
      yield put({ type: SET_LIST, payload: {} });
      return;
    }

    yield put({ type: SET_LISTS, payload: [] });
    yield put({ type: SET_LIST, payload: data });
  } catch (error) {
    yield put({ type: REQUEST, payload: false });
    yield put({ type: SET_ERROR, payload: { isError: true, errorText: formatErrorText(error) } });
  }
}

function* updateShoppingListItem({ payload: { description, id, done } }) {
  yield put({ type: REQUEST, payload: true });
  yield put({ type: SET_ERROR, payload: { isError: false, errorText: '' } });

  const token = yield select(getToken);
  const isLogged = yield select(getIsLogged);

  if (!isLogged) {
    return;
  }

  try {
    const response = yield call(putListItem, { description, id, done, token });
    yield put({ type: REQUEST, payload: false });

    if (response.status !== 200) {
      yield put({
        type: SET_ERROR,
        payload: { isError: true, errorText: 'An error occured during the request' },
      });
    }
  } catch (error) {
    yield put({ type: REQUEST, payload: false });
    yield put({ type: SET_ERROR, payload: { isError: true, errorText: formatErrorText(error) } });
  }
}

function* createShoppingListItem({ payload: { description, done } }) {
  yield put({ type: SET_ERROR, payload: { isError: false, errorText: '' } });
  yield put({ type: REQUEST, payload: true });

  const token = yield select(getToken);
  const isLogged = yield select(getIsLogged);

  if (!isLogged) {
    return;
  }

  try {
    const response = yield call(postListItem, { description, done, token });
    yield put({ type: REQUEST, payload: false });

    if (response.status !== 200) {
      yield put({
        type: SET_ERROR,
        payload: { isError: true, errorText: 'An error occured during the request' },
      });
    }
  } catch (error) {
    yield put({ type: SET_ERROR, payload: { isError: true, errorText: formatErrorText(error) } });
    yield put({ type: REQUEST, payload: false });
  }
}

function* updateShoppingList({ payload: { name, id, done } }) {
  yield put({ type: SET_ERROR, payload: { isError: false, errorText: '' } });
  yield put({ type: REQUEST, payload: true });

  const token = yield select(getToken);
  const isLogged = yield select(getIsLogged);

  if (!isLogged) {
    return;
  }

  try {
    const response = yield call(putList, { name, id, done, token });
    yield put({ type: REQUEST, payload: false });

    if (response.status !== 200) {
      yield put({
        type: SET_ERROR,
        payload: { isError: true, errorText: 'An error occured during the request' },
      });
    }
  } catch (error) {
    yield put({ type: REQUEST, payload: false });
    yield put({ type: SET_ERROR, payload: { isError: true, errorText: formatErrorText(error) } });
  }
}

function* createShoppingList({ payload: { name, done, items } }) {
  yield put({ type: SET_ERROR, payload: { isError: false, errorText: '' } });
  yield put({ type: REQUEST, payload: true });

  const token = yield select(getToken);
  const user = yield select(getUser);
  const isLogged = yield select(getIsLogged);

  if (!isLogged) {
    return;
  }

  let responses = [];

  try {
    responses = yield all(
      items.map((item) => {
        const { description, done: itemDone } = item;
        return call(postListItem, { token, description, done: itemDone });
      }),
    );
  } catch (error) {
    yield put({
      type: SET_ERROR,
      payload: { isError: true, errorText: 'An error occured during the request' },
    });
    yield put({ type: REQUEST, payload: false });
  }

  if (responses.length === 0) {
    yield put({
      type: SET_ERROR,
      payload: { isError: true, errorText: 'An error occured during the request' },
    });
    yield put({ type: REQUEST, payload: false });
    return;
  }

  const hasErrors = responses.filter((response) => response.status !== 200).length > 0;

  if (hasErrors) {
    yield put({
      type: SET_ERROR,
      payload: { isError: true, errorText: 'An error occured during the request' },
    });
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
      yield put({
        type: SET_ERROR,
        payload: { isError: true, errorText: 'An error occured during the request' },
      });
      return;
    }

    yield put(push('/list'));
  } catch (error) {
    yield put({ type: REQUEST, payload: false });
    yield put({ type: SET_ERROR, payload: { isError: true, errorText: formatErrorText(error) } });
  }
}

function* updateAll({ payload: { id, name, newItems, deletedItems, changedItems } }) {
  yield put({ type: SET_ERROR, payload: { isError: false, errorText: '' } });
  yield put({ type: REQUEST, payload: true });

  const token = yield select(getToken);
  const isLogged = yield select(getIsLogged);

  if (!isLogged) {
    return;
  }

  let responses = [];

  try {
    responses = yield all(
      newItems.map(({ description, done: itemDone }) => {
        return call(postListItem, { token, description, done: itemDone, listId: id });
      }),
    );
  } catch (error) {
    yield put({ type: REQUEST, payload: false });
    yield put({ type: SET_ERROR, payload: { isError: true, errorText: formatErrorText(error) } });
  }

  try {
    const responsesDelete = yield all(
      deletedItems.map((item) => {
        return call(deleteListItem, { token, id: item });
      }),
    );
    responses = responses.concat(responsesDelete);
  } catch (error) {
    yield put({ type: REQUEST, payload: false });
    yield put({ type: SET_ERROR, payload: { isError: true, errorText: formatErrorText(error) } });
  }

  try {
    const responsesUpdate = yield all(
      changedItems.map(({ id: itemId, done, description }) => {
        return call(putListItem, { token, id: itemId, done, description });
      }),
    );
    responses = responses.concat(responsesUpdate);
  } catch (error) {
    yield put({ type: REQUEST, payload: false });
    const { statusCode, error: text } = error.response.data;
    const errorText = `${statusCode}: ${text}`;
    yield put({ type: SET_ERROR, payload: { isError: true, errorText } });
  }

  const allRequests = newItems.length + deletedItems.length + changedItems.length;

  if (responses.length !== allRequests) {
    yield put({
      type: SET_ERROR,
      payload: { isError: true, errorText: 'An error occured during the request' },
    });
    yield put({ type: REQUEST, payload: false });
    return;
  }

  const hasErrors = responses.filter((response) => response.status !== 200).length > 0;

  if (hasErrors) {
    yield put({
      type: SET_ERROR,
      payload: { isError: true, errorText: 'An error occured during the request' },
    });
    yield put({ type: REQUEST, payload: false });
    return;
  }

  try {
    const response = yield call(putList, {
      name,
      done: false,
      token,
      id,
    });
    yield put({ type: REQUEST, payload: false });

    if (response.status !== 200) {
      yield put({
        type: SET_ERROR,
        payload: { isError: true, errorText: 'An error occured during the request' },
      });
      return;
    }

    yield put(push('/list'));
  } catch (error) {
    yield put({ type: REQUEST, payload: false });
    yield put({ type: SET_ERROR, payload: { isError: true, errorText: formatErrorText(error) } });
  }
}

function* saveArchived({ payload: { name, items } }) {
  yield put({ type: REQUEST, payload: true });
  yield put({ type: SET_ERROR, payload: { isError: false, errorText: '' } });

  const token = yield select(getToken);
  const user = yield select(getUser);
  const isLogged = yield select(getIsLogged);

  if (!isLogged) {
    return;
  }

  let list = {};

  try {
    const response = yield call(postList, {
      name,
      done: false,
      token,
      userId: user.id,
    });
    yield put({ type: REQUEST, payload: false });

    if (response.status !== 200) {
      yield put({
        type: SET_ERROR,
        payload: { isError: true, errorText: 'An error occured during the request' },
      });
      return;
    }

    list = response.data;
  } catch (error) {
    yield put({ type: REQUEST, payload: false });
    const { statusCode, error: text } = error.response.data;
    const errorText = `${statusCode}: ${text}`;
    yield put({ type: SET_ERROR, payload: { isError: true, errorText } });
  }

  const { id } = list;
  let responses = [];

  try {
    responses = yield all(
      items.map(({ description }) => {
        return call(postListItem, { token, description, done: false, listId: id });
      }),
    );
  } catch (error) {
    yield put({ type: REQUEST, payload: false });
    yield put({ type: SET_ERROR, payload: { isError: true, errorText: formatErrorText(error) } });
  }

  if (responses.length === 0) {
    yield put({
      type: SET_ERROR,
      payload: { isError: true, errorText: 'An error occured during the request' },
    });
    yield put({ type: REQUEST, payload: false });
    return;
  }

  const hasErrors = responses.filter((response) => response.status !== 200).length > 0;

  if (!hasErrors) {
    return;
  }

  yield put({
    type: SET_ERROR,
    payload: { isError: true, errorText: 'An error occured during the request' },
  });
  yield put({ type: REQUEST, payload: false });
}

function* deleteShoppingList({ payload: { id } }) {
  yield put({ type: REQUEST, payload: true });
  yield put({ type: SET_ERROR, payload: { isError: false, errorText: '' } });

  const token = yield select(getToken);

  try {
    let response = yield call(deleteList, { id, token });

    if (response.status !== 200) {
      yield put({ type: REQUEST, payload: false });
      yield put({
        type: SET_ERROR,
        payload: { isError: true, errorText: 'An error occured during the request' },
      });
      return;
    }

    const filtersParams = new URLSearchParams();
    filtersParams.append('done', false);
    filtersParams.append('_sort', 'id:DESC');

    response = yield call(fetchShoppingLists, { token, filters: filtersParams.toString() });
    yield put({ type: REQUEST, payload: false });

    const { data } = response;

    yield put({ type: SET_LISTS, payload: data });
    yield put({ type: SET_LIST, payload: {} });

    yield put(push('/list'));
  } catch (error) {
    yield put({ type: REQUEST, payload: false });
    yield put({ type: SET_ERROR, payload: { isError: true, errorText: formatErrorText(error) } });
  }
}

function* saga() {
  yield takeLatest(AUTH_REQUEST, authorize);
  yield takeLatest(GET_LISTS, getShoppingLists);
  yield takeLatest(UPDATE_LIST_ITEM, updateShoppingListItem);
  yield takeLatest(CREATE_LIST_ITEM, createShoppingListItem);
  yield takeLatest(UPDATE_LIST, updateShoppingList);
  yield takeLatest(CREATE_LIST, createShoppingList);
  yield takeLatest(DELETE_LIST, deleteShoppingList);
  yield takeLatest(UPDATE_ALL, updateAll);
  yield takeLatest(SAVE_ARCHIVED, saveArchived);
}

export default saga;
