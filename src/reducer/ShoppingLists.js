import { SET_LISTS } from 'actions';

const initState = {
  lists: [],
};

const ListReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case SET_LISTS: {
      return {
        ...state,
        lists: payload,
      };
    }
    default:
      return state;
  }
};

export default ListReducer;
