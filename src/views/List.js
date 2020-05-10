import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import MainTemplate from 'layout/MainTemplate';
import { connect } from 'react-redux';
import Wrapper from 'components/list/Wrapper';

const List = ({ getListsAction, shoppingLists }) => {
  useEffect(() => {
    const filters = new URLSearchParams();
    filters.append('done', false);
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
  return {
    isFetching: state.auth.isFetching,
    isError: state.auth.isError,
    shoppingLists: state.shoppingLists.lists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListsAction: ({ filters }) => dispatch({ type: 'GET_LISTS', payload: { filters } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
