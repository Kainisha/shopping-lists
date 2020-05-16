export const REQUEST = 'REQUEST';
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const SET_USER = 'SET_USER';
export const SET_ERROR = 'SET_ERROR';
export const SET_LISTS = 'SET_LISTS';
export const SET_LIST = 'SET_LIST';
export const GET_LISTS = 'GET_LISTS';
export const UPDATE_LIST_ITEM = 'UPDATE_LIST_ITEM';
export const CREATE_LIST_ITEM = 'CREATE_LIST_ITEM';
export const UPDATE_LIST = 'UPDATE_LIST';
export const CREATE_LIST = 'CREATE_LIST';
export const UPDATE_ALL = 'UPDATE_ALL';

export const authorize = (login, password) => ({
  type: AUTH_REQUEST,
  payload: { login, password },
});
