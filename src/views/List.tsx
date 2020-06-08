import React, { useEffect, FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import MainTemplate from 'layout/MainTemplate';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Wrapper from 'components/list/Wrapper';

import { getLists as getListsAction } from 'actions';

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

type GetLists = {
  filters: string;
};

type Props = {
  getLists: ({ filters }: GetLists) => void;
  shoppingLists: Array<List>;
};

const List: FunctionComponent<Props> = ({ getLists, shoppingLists }) => {
  useEffect(() => {
    const filters = new URLSearchParams();
    filters.append('done', 'false');
    filters.append('_sort', 'id:DESC');
    getLists({ filters: filters.toString() });
  }, []);

  return (
    <MainTemplate>
      <Wrapper lists={shoppingLists} />
    </MainTemplate>
  );
};

List.propTypes = {
  getLists: PropTypes.func.isRequired,
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
    getLists: ({ filters }: GetLists) => dispatch(getListsAction({ filters })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
