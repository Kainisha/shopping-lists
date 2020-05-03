export const REQUEST = 'REQUEST';
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const SET_USER = 'SET_USER';
export const SET_ERROR = 'SET_ERROR';
export const SET_LISTS = 'SET_LISTS';
export const GET_LISTS = 'GET_LISTS';

export const authorize = (login, password) => ({
  type: AUTH_REQUEST,
  payload: { login, password },
});
