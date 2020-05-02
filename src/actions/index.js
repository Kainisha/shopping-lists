export const REQUEST = 'REQUEST';
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const SET_USER = 'SET_USER';
export const SET_ERROR = 'SET_ERROR';

export const authorize = (login, password) => ({
  type: AUTH_REQUEST,
  payload: { login, password },
});
