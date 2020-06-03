import React, { useEffect, FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import MainTemplate from 'layout/MainTemplate';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Wrapper from 'components/list/Wrapper';

import { GET_LISTS } from 'actions';

interface Item {
  id: number;
  description: string;
  done: boolean;
}

interface List {
  name: string;
  id: number;
  done: boolean;
  // eslint-disable-next-line camelcase
  shopping_list_items: Array<Item>;
}

type GetListsAction = {
  filters: string;
};

type Props = {
  getListsAction: ({ filters }: GetListsAction) => void;
  shoppingLists: Array<List>;
};

const List: FunctionComponent<Props> = ({ getListsAction, shoppingLists }) => {
  useEffect(() => {
    const filters = new URLSearchParams();
    filters.append('done', 'false');
    filters.append('_sort', 'id:DESC');
    getListsAction({ filters: filters.toString() });
  }, []);

  return (
    <MainTemplate>
      <Wrapper lists={shoppingLists} />
    </MainTemplate>
  );
};

List.propTypes = {
  getListsAction: PropTypes.func.isRequired,
  shoppingLists: PropTypes.array.isRequired,
};

type MapState = {
  shoppingLists: { lists: Array<List> };
};

const mapStateToProps = (state: MapState) => {
  return {
    shoppingLists: state.shoppingLists.lists,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getListsAction: ({ filters }: GetListsAction) =>
      dispatch({ type: GET_LISTS, payload: { filters } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
