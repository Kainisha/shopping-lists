import { string } from 'prop-types';

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
export const DELETE_LIST = 'DELETE_LIST';
export const UPDATE_ALL = 'UPDATE_ALL';
export const SAVE_ARCHIVED = 'SAVE_ARCHIVED';

interface Authorize {
  (login: string, password: string): {
    type: string;
    payload: {
      login: string;
      password: string;
    };
  };
}

export const authorize: Authorize = (login, password) => ({
  type: AUTH_REQUEST,
  payload: { login, password },
});

interface GetLists {
  ({ filters, id }: { filters: string; id?: string }): {
    type: string;
    payload: { filters: string; id?: string };
  };
}

export const getLists: GetLists = ({ filters }) => ({
  type: GET_LISTS,
  payload: { filters },
});

interface Item {
  id: string;
  description: string;
  done: boolean;
  changed?: boolean;
}

interface CreateList {
  ({ name, done, items }: { name: string; done: boolean; items: Item[] }): {
    type: string;
    payload: { name: string; done: boolean };
  };
}

export const createList: CreateList = ({ name, done, items }) => ({
  type: CREATE_LIST,
  payload: { name, done, items },
});

interface UpdateAll {
  ({
    id,
    name,
    newItems,
    deletedItems,
    changedItems,
  }: {
    id: string | null;
    name: string;
    newItems: Item[];
    deletedItems: string[];
    changedItems: Item[];
  }): {
    type: string;
    payload: {
      id: string | null;
      name: string;
      newItems: Item[];
      deletedItems: string[];
      changedItems: Item[];
    };
  };
}

export const updateAll: UpdateAll = ({ id, name, newItems, deletedItems, changedItems }) => ({
  type: UPDATE_ALL,
  payload: { id, name, newItems, deletedItems, changedItems },
});

interface UpdateListItem {
  ({ id, description, done }: { id: number; done: boolean; description: string }): {
    type: string;
    payload: { id: number; description: string; done: boolean };
  };
}

export const updateListItem: UpdateListItem = ({ id, description, done }) => ({
  type: UPDATE_LIST_ITEM,
  payload: { id, description, done },
});
