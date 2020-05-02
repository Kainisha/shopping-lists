import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import axios from 'axios';
import url from 'api';
import md5 from 'js-md5';

import { REQUEST, AUTH_REQUEST, SET_USER, SET_ERROR } from 'actions';

const fetch = async ({ login, password }) => {
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
    const response = yield call(fetch, { login, password });
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

function* saga() {
  yield takeLatest(AUTH_REQUEST, authorize);
}

export default saga;
