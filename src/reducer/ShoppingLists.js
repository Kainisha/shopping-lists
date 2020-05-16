import { SET_LISTS, SET_LIST } from 'actions';

const initState = {
  lists: [],
  list: {},
};

const ListReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case SET_LISTS: {
      return {
        ...state,
        lists: payload,
      };
    }
    case SET_LIST: {
      return {
        ...state,
        list: payload,
      };
    }
    default:
      return state;
  }
};

export default ListReducer;
