import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import MainTemplate from 'layout/MainTemplate';
import { connect } from 'react-redux';
import Wrapper from 'components/list/Wrapper';

import { GET_LISTS } from 'actions';

const List = ({ getListsAction, shoppingLists }) => {
  useEffect(() => {
    const filters = new URLSearchParams();
    filters.append('done', false);
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
  getListsAction: PropTypes.func,
  shoppingLists: PropTypes.array,
};

List.defaultProps = {
  getListsAction: () => {},
  shoppingLists: [],
};

const mapStateToProps = (state) => {
  console.log('list changes');
  return {
    shoppingLists: state.shoppingLists.lists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListsAction: ({ filters }) => dispatch({ type: GET_LISTS, payload: { filters } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
